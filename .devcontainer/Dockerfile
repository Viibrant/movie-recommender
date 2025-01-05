# Use the Bun Debian-based image
ARG VARIANT=debian
FROM oven/bun:${VARIANT}

# Install additional tools, including npm
RUN apt-get update \
    && apt-get -y install --no-install-recommends \
    git \
    nano \
    vim-tiny \
    sudo \
    zsh \
    curl \
    ca-certificates \
    nodejs \
    npm \
    && apt-get clean -y

# Update CA certificates
RUN update-ca-certificates

# Set up sudo for the "bun" user
RUN usermod -aG sudo bun && \
    echo "bun ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Remove root password for security
RUN passwd -d root

# Switch to Zsh and install Oh My Zsh
USER bun
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

# Install Zsh plugins
RUN ZSH_CUSTOM=${ZSH_CUSTOM:-~/.oh-my-zsh/custom} && \
    git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions && \
    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting && \
    git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git $ZSH_CUSTOM/plugins/fast-syntax-highlighting && \
    git clone --depth 1 https://github.com/marlonrichert/zsh-autocomplete.git $ZSH_CUSTOM/plugins/zsh-autocomplete

# Enable Zsh plugins
RUN sed -i 's/plugins=(git)/plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting zsh-autocomplete)/' ~/.zshrc

# Switch back to root to set Zsh as the default shell for "bun"
USER root
RUN sed -i 's|/bin/sh|/usr/bin/zsh|' /etc/passwd

# Revert back to bun user
USER bun
