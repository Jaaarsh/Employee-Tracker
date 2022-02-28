DROP DATABASE IF EXISTS eta_db;
-- short for employee tracker application--
CREATE DATABASE eta_db;

USE eta_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(30),
  salary DECIMAL,
  department VARCHAR(30)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role VARCHAR(30),
  manager VARCHAR(30)
);
