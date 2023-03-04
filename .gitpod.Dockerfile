FROM gitpod/workspace-mongodb:latest

USER root

RUN install-packages httpie jq silversearcher-ag

USER gitpod

ENV SHELL=/usr/bin/zsh

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
