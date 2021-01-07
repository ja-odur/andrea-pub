FROM python:3.6-slim-buster
RUN apt-get -y update && \
    apt-get -y --no-install-recommends install --fix-missing openssh-server openssl && \
    rm -rf /var/lib/apt/lists/*

ARG SSH_USER
ARG SSH_USER_PASSWORD

RUN useradd -m -s /bin/bash -p $(openssl passwd -1 $SSH_USER_PASSWORD) $SSH_USER
