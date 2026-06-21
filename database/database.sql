-- ============================================================
-- First In — database setup
-- Voer uit via: mysql -u root -p < database.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS first_in
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE first_in;

CREATE TABLE IF NOT EXISTS confessions (
  id                INT           AUTO_INCREMENT PRIMARY KEY,
  location          VARCHAR(100)  NOT NULL,
  content           TEXT          NOT NULL,
  recognition_count INT           NOT NULL DEFAULT 0,
  created_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
  id         INT           AUTO_INCREMENT PRIMARY KEY,
  author     VARCHAR(100)  NOT NULL DEFAULT '',
  location   VARCHAR(50)   NOT NULL DEFAULT '',
  stars      TINYINT       NOT NULL DEFAULT 5,
  quote      TEXT          NOT NULL,
  anonymous  TINYINT(1)    NOT NULL DEFAULT 0,
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id         INT           AUTO_INCREMENT PRIMARY KEY,
  image_data LONGBLOB      NOT NULL,
  mime_type  VARCHAR(50)   NOT NULL DEFAULT '',
  alt        VARCHAR(255)  NOT NULL DEFAULT '',
  created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  phone      VARCHAR(50)  NOT NULL,
  email      VARCHAR(255) NOT NULL,
  question   TEXT         NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
