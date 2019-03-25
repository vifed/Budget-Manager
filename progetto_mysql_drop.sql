ALTER TABLE `Entrata` DROP FOREIGN KEY `Entrata_fk0`;

ALTER TABLE `Entrata` DROP FOREIGN KEY `Entrata_fk1`;

ALTER TABLE `Entrata copy` DROP FOREIGN KEY `Entrata copy_fk0`;

ALTER TABLE `Entrata copy` DROP FOREIGN KEY `Entrata copy_fk1`;

DROP TABLE IF EXISTS `Utente`;

DROP TABLE IF EXISTS `Entrata`;

DROP TABLE IF EXISTS `Categoria`;

DROP TABLE IF EXISTS `Uscita`;

