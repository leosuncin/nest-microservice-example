FROM gitpod/workspace-mongodb:latest

USER root

RUN install-packages httpie jq silversearcher-ag

USER gitpod
