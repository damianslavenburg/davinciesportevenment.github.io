CREATE DATABASE IF NOT EXISTS esport_event;
USE esport_event;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Voeg testgebruiker toe (wachtwoord = test123)
INSERT INTO users (username, password)
VALUES ('testgebruiker', '$2y$10$KbPbTtwAOYyNso9I28ELwOVyxrsAf9jT5qPVvh4BxdzZatZJp7FT2'); 
-- wachtwoord is gehashed met password_hash('test123', PASSWORD_DEFAULT)
