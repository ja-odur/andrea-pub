from dataclasses import dataclass
from django.conf import settings
from paramiko import AutoAddPolicy
from paramiko.client import SSHClient
from paramiko.ssh_exception import SSHException
from .exceptions import LanguageNotConfiguredError
from .languages import CPP, GO, JAVASCRIPT, PYTHON


@dataclass
class LanguageConfig:
    port: int
    entrypoint: str
    language: str


@dataclass
class CodeOutput:
    output: list
    error: list


class SSHClientSingleton(type):
    _instances = {}
    _host_configs = {
        PYTHON: LanguageConfig(port=settings.PYTHON_SSH_HOST_PORT, entrypoint='run_python_script.sh', language=PYTHON),
        JAVASCRIPT: LanguageConfig(
            port=settings.NODE_SSH_HOST_PORT,
            entrypoint='run_node_script.sh',
            language=JAVASCRIPT
        ),
        GO: LanguageConfig(port=settings.GO_SSH_HOST_PORT, entrypoint='run_go_script.sh', language=GO),
        CPP: LanguageConfig(port=settings.CPP_SSH_HOST_PORT, entrypoint='run_cpp_script.sh', language=CPP),
    }

    def __call__(cls, *args, **kwargs):
        language = kwargs.get("language")

        if not language:
            raise Exception("language is a required key argument")

        if not cls._instances.get(language):
            lang_config = cls._host_configs.get(language)
            if not lang_config:
                raise LanguageNotConfiguredError(
                    f"The language '{language}' is not configured. The configured languages are "
                    f"{list(cls._host_configs.keys())}."
                )
            cls._instances[language] = super().__call__(*args, lang_config=lang_config, **kwargs)

        return cls._instances[language]

    def close(cls, language=None):
        ssh_compiler = cls._instances.get(language)
        if ssh_compiler:
            ssh_compiler.client.close()
            del cls._instances[language]


class SSHCompiler(metaclass=SSHClientSingleton):

    NEW_LINE = '\n'

    def __init__(self, *args, lang_config=None, **kwargs):
        self.lang_config = lang_config
        self.client = SSHClient()
        self.client.set_missing_host_key_policy(AutoAddPolicy())
        self.client.connect(
            settings.SSH_BASE_URL,
            port=self.lang_config.port,
            username=settings.SSH_USER,
            password=settings.SSH_USER_PASSWORD
        )

    def exec_command(self, command, include_entrypoint=True, **kwargs):
        command = f'{self.lang_config.entrypoint} {command}' if include_entrypoint else command
        try:
            return self._format_exec_result(self.client.exec_command(command, **kwargs))
        except SSHException:
            self.disconnect()
            compiler = self.__class__(language=self.lang_config.language)
            return compiler._format_exec_result(compiler.client.exec_command(command, **kwargs))

    def exec_as_heredoc(self, command, include_entrypoint=True, **kwargs):
        heredoc_structure = '<<EOF\n{}\nEOF'
        command = heredoc_structure.format(command)
        return self.exec_command(command, include_entrypoint=include_entrypoint, **kwargs)

    def _format_exec_result(self, exec_result):
        _, stdout, stderr = exec_result
        output = [r for r in stdout.read().decode().split(self.NEW_LINE) if r]
        error = [r for r in stderr.read().decode().split(self.NEW_LINE) if r]

        return CodeOutput(output=output, error=error)

    def disconnect(self):
        return self.__class__.close(self.lang_config.language)
