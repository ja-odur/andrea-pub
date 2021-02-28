FROM python:3.6-slim-buster

# gcc for cgo
RUN apt-get update && apt-get install -y --no-install-recommends \
        curl \
		g++ \
		gcc \
		libc6-dev \
		make \
		pkg-config \
	&& rm -rf /var/lib/apt/lists/*

ARG url='https://storage.googleapis.com/golang/go1.15.7.linux-amd64.tar.gz'
ARG sha256='0d142143794721bb63ce6c8a6180c4062bcf8ef4715e7d6d6609f3a8282629b3'

RUN curl -sL $url -o go.tgz

RUN echo "$sha256 *go.tgz" | sha256sum --strict --check -;

RUN tar -C /usr/local -xzf go.tgz

ARG SSH_USER
ARG SSH_USER_PASSWORD

ENV TMPDIR /tmp/
ENV PATH /usr/local/go/bin:$PATH
ENV GOLANG_VERSION 1.15.7

RUN apt-get -y update && \
    apt-get -y --no-install-recommends install --fix-missing uuid-runtime openssh-server openssl && \
    rm -rf /var/lib/apt/lists/*


RUN useradd -m -s /bin/bash -p $(openssl passwd -1 $SSH_USER_PASSWORD) $SSH_USER