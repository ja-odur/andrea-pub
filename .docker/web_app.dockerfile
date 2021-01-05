## base image
FROM python:3.6-slim-buster AS PythonNodeBase

## Install node 12
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt install -y nodejs && apt-get clean

## dependency image
FROM PythonNodeBase AS build-requirements

## install dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    apt-get clean

## virtualenv
ENV VIRTUAL_ENV=/opt/venv
ARG NODE_ROOT=/root/node_dependencies
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


## add and install python requirements
RUN pip install --upgrade pip && pip install pip-tools pipenv-to-requirements pipenv
ADD Pipfile .
RUN pipenv run pipenv_to_requirements -o requirements-custom.in && \
    pip-compile requirements-custom.in -o requirements.txt && pip-sync && \
    pip install -r requirements.txt && \
    rm requirements-custom.in requirements.txt

## add and install node requirements
RUN mkdir $NODE_ROOT
ADD package.json $NODE_ROOT
WORKDIR $NODE_ROOT

RUN npm install

RUN apt-get -y purge gcc && apt-get clean

## build-image
FROM PythonNodeBase

MAINTAINER Odur Joseph <odurjoseph8@gmail.com>

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ARG VIRTUAL_ENV=/opt/venv
ARG NODE_ROOT=/root/node_dependencies
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
ARG HOME='/app'

## copy Python and node dependencies from build image
COPY --from=build-requirements $VIRTUAL_ENV $VIRTUAL_ENV
COPY --from=build-requirements $NODE_ROOT/node_modules $HOME/node_modules

WORKDIR $HOME
ADD . $HOME/

ENV DJANGO_SETTINGS_MODULE backend.settings

ENV PATH="${PATH}:${HOME}/node_modules/.bin"

EXPOSE 3000 8000
