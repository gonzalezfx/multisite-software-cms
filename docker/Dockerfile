FROM php:7.4-apache
MAINTAINER webmaster@company.com

# Define working directory
WORKDIR /var/www/

# Add user for laravel application
# RUN groupadd -g 1000 www
# RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy source code
COPY --chown=www-data:www-data ./ /var/www/

# Save variables from args on build time
ARG APP_NAME
ARG APP_ENV
ARG APP_KEY
ARG APP_DEBUG
ARG APP_URL
ARG APP_PROXY_URL
ARG ASSET_URL
ARG MIX_ASSET_URL
ARG RELATIVE_PUBLIC_PATH

ARG DB_HOST
ARG DB_PORT
ARG DB_DATABASE
ARG DB_USERNAME
ARG DB_PASSWORD

ARG MAIL_TEST_ADDRESS
ARG MAIL_MAILER
ARG MAIL_HOST
ARG MAIL_PORT
ARG MAIL_USERNAME
ARG MAIL_PASSWORD
ARG MAIL_ENCRYPTION
ARG MAIL_FROM_ADDRESS

# Use variables as environment variables on container execution
ENV APP_NAME=$APP_NAME
ENV APP_ENV=$APP_ENV
ENV APP_KEY=$APP_KEY
ENV APP_DEBUG=$APP_DEBUG
ENV APP_URL=$APP_URL
ENV APP_PROXY_URL=$APP_PROXY_URL
ENV ASSET_URL=$ASSET_URL
ENV MIX_ASSET_URL=$MIX_ASSET_URL
ENV RELATIVE_PUBLIC_PATH=$RELATIVE_PUBLIC_PATH

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_DATABASE=$DB_DATABASE
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD

ENV MAIL_TEST_ADDRESS=$MAIL_TEST_ADDRESS
ENV MAIL_MAILER=$MAIL_MAILER
ENV MAIL_HOST=$MAIL_HOST
ENV MAIL_PORT=$MAIL_PORT
ENV MAIL_USERNAME=$MAIL_USERNAME
ENV MAIL_PASSWORD=$MAIL_PASSWORD
ENV MAIL_ENCRYPTION=$MAIL_ENCRYPTION
ENV MAIL_FROM_ADDRESS=$MAIL_FROM_ADDRESS


# Copy configuration files
COPY ./docker/start-app /usr/local/bin
COPY ./docker/configure-app /usr/local/bin
COPY ./docker/configurations/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./docker/configurations/crontab /etc/cron.d/mycrontab
COPY ./docker/configurations/php.ini /usr/local/etc/php/php.ini

# Set executable permissions
RUN chmod +x /usr/local/bin/start-app
RUN chmod +x /usr/local/bin/configure-app

# Dependencies installation
RUN apt-get update && apt-get upgrade -y && apt-get install -y \
        locales \
        nano \
        cron \
        curl \
        sudo \
        iproute2 \
        zip \
        unzip \
        libicu-dev \
        zlib1g-dev \
        libxml2 \
        libxml2-dev \
        libreadline-dev \
        libzip-dev \
        libmcrypt-dev \
    && pecl install mcrypt-1.0.3 \
    && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
        iconv \
        intl \
        xml \
        soap \
        opcache \
        pdo \
        pdo_mysql \
        mysqli \
        zip \
        sockets \
        bcmath \
    && docker-php-ext-enable mcrypt

RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
    mv composer.phar /usr/local/bin/composer

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable apache modules
RUN a2enmod rewrite

# Cronjobs configuration
RUN mkdir /var/log/myapp
RUN chmod +x /etc/cron.d/mycrontab
RUN touch /etc/cron.d/mycrontab
RUN touch /var/log/myapp/cronjobs.log
RUN crontab /etc/cron.d/mycrontab

# App configuration
RUN configure-app

# Start app
CMD ["start-app"]
