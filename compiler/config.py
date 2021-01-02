
"""Module for application configuration"""

# Third-Party libraries
from pathlib import Path
from dotenv import load_dotenv

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path, verbose=True)


class Config:
    """Base Application configurations"""
    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    """Application production configurations"""
    pass


class DevelopmentConfig(Config):
    """Application development configurations"""
    DEBUG = True


class TestingConfig(Config):
    """Applications testing configuration"""
    TESTING = True


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}