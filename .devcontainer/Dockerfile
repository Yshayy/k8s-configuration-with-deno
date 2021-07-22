FROM mcr.microsoft.com/vscode/devcontainers/base:focal
ENV SHELL=/usr/bin/zsh

ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ARG ENABLE_NONROOT_DOCKER="true"
# [Option] Use the OSS Moby Engine instead of the licensed Docker Engine
ARG USE_MOBY="true"

# Install needed packages and setup non-root user. Use a separate RUN statement to add your
# own dependencies. A user of "automatic" attempts to reuse an user ID if one already exists.

ARG USERNAME=automatic
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN wget https://raw.githubusercontent.com/microsoft/vscode-dev-containers/main/script-library/docker-in-docker-debian.sh
RUN bash ./docker-in-docker-debian.sh

VOLUME [ "/var/lib/docker" ]

RUN curl -sSL -o /usr/local/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x /usr/local/bin/kubectl

RUN curl -fsSL https://download.docker.com/linux/static/stable/x86_64/docker-19.03.9.tgz | \
    tar zxvf - --strip 1 -C /usr/bin docker/docker
    
RUN sed -i "/plugins=/c\plugins=(docker git kubectl)" /home/vscode/.zshrc
# Install k3d
RUN curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno \
    && curl -fsSL https://deno.land/x/install/install.sh | sh

ENV PATH=${DENO_INSTALL}/bin:/home/vscode/.deno/bin:$PATH:${PATH} \
    DENO_DIR=${DENO_INSTALL}/.cache/deno

RUN chown -R vscode /deno

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends <your-package-list-here>
# Setting the ENTRYPOINT to docker-init.sh will start up the Docker Engine 
# inside the container "overrideCommand": false is set in devcontainer.json. 
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]