CREATE TABLE IF NOT EXISTS `Utente` (
	`idUtente` int(1) NOT NULL AUTO_INCREMENT,
	`Nome` varchar(15) NOT NULL,
	`Cognome` varchar(15) NOT NULL,
	`Email` varchar(15) NOT NULL UNIQUE,
	PRIMARY KEY (`idUtente`)
);

CREATE TABLE IF NOT EXISTS`Entrata` (
	`ID` int(255) NOT NULL AUTO_INCREMENT,
	`Utente` int(1) NOT NULL,
	`Nome` varchar(25) NOT NULL,
	`Data` DATE NOT NULL,
	`Importo` int NOT NULL,
	`Categoria` int(9) NOT NULL,
	PRIMARY KEY (`ID`)
);

CREATE TABLE IF NOT EXISTS`Categoria` (
	`idCategoria` int(9) NOT NULL AUTO_INCREMENT,
	`Nome` varchar(25) NOT NULL,
	`Descrizione` TEXT(50) NOT NULL,
	PRIMARY KEY (`idCategoria`)
);

CREATE TABLE IF NOT EXISTS`Uscita` (
	`ID` int(255) NOT NULL AUTO_INCREMENT,
	`Utente` int(1) NOT NULL,
	`Nome` varchar(25) NOT NULL ,
	`Data` DATE NOT NULL,
	`Importo` int NOT NULL ,
	`Categoria` int(9) NOT NULL ,
	PRIMARY KEY (`ID`)
);

ALTER TABLE `Entrata` ADD CONSTRAINT `Entrata_fk0` FOREIGN KEY (`Utente`) REFERENCES `Utente`(`idUtente`);

ALTER TABLE `Entrata` ADD CONSTRAINT `Entrata_fk1` FOREIGN KEY (`Categoria`) REFERENCES `Categoria`(`idCategoria`);

ALTER TABLE `Uscita` ADD CONSTRAINT `Uscita_fk0` FOREIGN KEY (`Utente`) REFERENCES `Utente`(`idUtente`);

ALTER TABLE `Uscita` ADD CONSTRAINT `Uscita_fk1` FOREIGN KEY (`Categoria`) REFERENCES `Categoria`(`idCategoria`);
