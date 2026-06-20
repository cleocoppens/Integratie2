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

CREATE TABLE IF NOT EXISTS contacts (
  id         INT          AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  phone      VARCHAR(50)  NOT NULL,
  email      VARCHAR(255) NOT NULL,
  question   TEXT         NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
