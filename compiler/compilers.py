from dataclasses import dataclass
from django.conf import settings
from paramiko import AutoAddPolicy
from paramiko.client import SSHClient


@dataclass
class LanguageConfig:
    port: int
    entrypoint: str


class SSHClientSingleton(type):
    _instances = {}
    _host_configs = {
        'python': LanguageConfig(port=settings.PYTHON_SSH_HOST_PORT, entrypoint='python'),
        'javascript': LanguageConfig(port=settings.NODE_SSH_HOST_PORT, entrypoint='node')
    }

    def __call__(cls, *args, **kwargs):
        language = kwargs.get("language")

        if not language:
            raise Exception("language is a required key argument")

        if not cls._instances.get(language):
            lang_config = cls._host_configs.get(language)
            if not lang_config:
                raise Exception('language is not configured')
            cls._instances[language] = super().__call__(*args, lang_config=lang_config, **kwargs)

        return cls._instances[language]

    def close(cls, language=None):
        ssh_compiler = cls._instances.get(language)
        if ssh_compiler:
            ssh_compiler.client.close()
            del cls._instances[language]


class SSHCompiler(metaclass=SSHClientSingleton):

    def __init__(self, *args, port=None, **kwargs):

        self.client = SSHClient.connect(
            config('SSH_BASE_URL', 'localhost'),
            port=port,
            username=config('SSH_USER'),
            passowrd=config('SSH_USER_PASSWORD')
        )