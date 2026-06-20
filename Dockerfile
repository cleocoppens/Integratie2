FROM php:8.2-apache

RUN apt-get update && apt-get install -y unzip libzip-dev \
    && docker-php-ext-install pdo_mysql zip

RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin --filename=composer
