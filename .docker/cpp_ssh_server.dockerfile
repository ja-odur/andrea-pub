FROM gcc
ARG SSH_USER
ARG SSH_USER_PASSWORD

ENV TMPDIR /tmp/

RUN apt-get -y update && \
    apt-get -y --no-install-recommends install --fix-missing uuid-runtime openssh-server openssl && \
    rm -rf /var/lib/apt/lists/*


RUN useradd -m -s /bin/bash -p $(openssl passwd -1 $SSH_USER_PASSWORD) $SSH_USER
