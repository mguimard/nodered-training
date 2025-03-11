-- create the databases
CREATE DATABASE IF NOT EXISTS mydb;

CREATE TABLE IF NOT EXISTS `mytable` (
  `data` int(11) NULL
);

-- create the users for each database
CREATE USER 'user'@'%' IDENTIFIED BY 'password';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `mydb`.* TO 'user'@'%';

FLUSH PRIVILEGES;
