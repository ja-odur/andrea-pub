from decouple import config
from paramiko.client import SSHClient


class SSHClientSingleton(type):
    _instances = {}
    _host_configs = {
        'python': config('PYTHON_SSH_HOST_PORT'),
        'javascript': config('NODE_SSH_HOST_PORT')
    }

    def __call__(cls, *args, **kwargs):
        language = kwargs.get("language")

        if not language:
            raise Exception("language is a required key argument")

        if not cls._instances.get(language):
            port = cls._host_configs.get(language)
            if not port:
                raise Exception('language is not configured')
            cls._instances[language] = super().__call__(*args, port=port, **kwargs)

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