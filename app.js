var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mySql = require('mysql');


const myDB = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "BudManDB"
});


var app = express();

myDB.connect((err) => {
    if (err)
        throw err;
    else
        console.log("Database connesso!");
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/** Init app

var setup = function () {

    myDB.connect((err) => {
        if (err)
            throw err;
        else{
            console.log("Database connesso!");
            myDB.query("CREATE DATABASE IF NOT EXISTS BudMan DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; ", (err)=>{
                if(err)
                    throw err;

                else{
                    console.log("Database creato!");

                    myDB.query(" USE BudMan; ", (err)=>{
                        if(err)
                            throw err;
                    });

                    myDB.query("CREATE TABLE IF NOT EXISTS Utente(\n" +
                        "idUtente int(1) NOT NULL AUTO_INCREMENT,\n" +
                        "Nome varchar(15) NOT NULL DEFAULT 0,\n" +
                        "Cognome varchar(15) NOT NULL DEFAULT '0',\n" +
                        "Email varchar(15) NOT NULL DEFAULT '0',\n" +
                        "PRIMARY KEY (`idUtente`),\n" +
                        "UNIQUE KEY `Email` (`Email`),\n" +
                        "UNIQUE KEY `idUtente` (`idUtente`)\n" +
                        ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; ", (err)=>{
                        if(err)
                            throw err;
                    });


                    myDB.query(
                        "CREATE TABLE IF NOT EXISTS `Categoria` (\n" +
                        "  `ID` int(50) NOT NULL AUTO_INCREMENT,\n" +
                        "  `Nome` varchar(25) NOT NULL,\n" +
                        "  `Descrizione` text NOT NULL,\n" +
                        "  `Tipo` char(1) NOT NULL,\n" +
                        "  `Predefinito` tinyint(1) NOT NULL DEFAULT '0',\n" +
                        "  PRIMARY KEY (`ID`)\n" +
                        ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8; ", (err, res)=>{
                            if(err)
                                throw err;
                            else{
                                myDB.query("SELECT *  FROM Categoria", (err, rows)=>{
                                    if(err)
                                        throw err;
                                    else {
                                        if(!rows.length){
                                            myDB.query(" INSERT INTO `Categoria` (`Nome`, `Descrizione`, `Tipo`, `Predefinito`) VALUES\n" +
                                                "( 'Auto', 'Uscita di denaro relativa al mantenimento dell\\'autovettura. Es. Bollo Benzina, Assicurazione...', 'U', 1),\n" +
                                                "('Casa', 'Uscita di denaro relativa all\\'abitazione.\\r\\nEs. Affitto, Pulizie, Bollette, Riparazioni...', 'U', 1),\n" +
                                                "( 'Mediche', 'Uscita di denaro relativa al settore Medico.\\r\\nEs. Visite, Farmaci...', 'U', 1),\n" +
                                                "( 'Viaggi', 'Uscita di denaro relativa agli spostamenti e/o viaggi.\\r\\nEs Tram, Metro, Aereo, Hotel ...', 'U', 1),\n" +
                                                "('Shopping', 'Uscita di denaro relativa a compere di diverso tipo. Es. Abbigliamento, Accessori ...', 'U', 1),\n" +
                                                "( 'Altro', 'Uscita di denaro relativa ad operazioni non connesse alle categorie precedenti...', 'U', 1),\n" +
                                                "('Stipendio', 'Entrata di denaro relativa ad un compenso lavorativo.', 'E', 1),\n" +
                                                "('Vincita', 'Entrata di denaro relativa ad una vincita.\\r\\nEs. Lotto, Gratta e vinci, Scommesse...', 'E', 1),\n" +
                                                "( 'Donazione', 'Entrata di denaro relativa ad una donazione.\\r\\nEs. Donazione, Eredità, Compleanno...', 'E', 1),\n" +
                                                "( 'Altro', 'Entrata di denaro non connessa alle precedenti categorie', 'E', 1);\n ", (err)=>{
                                                if(err)
                                                    throw err;
                                            });
                                        }
                                    }
                                });
                            }
                        });


                    myDB.query("CREATE TABLE IF NOT EXISTS Entrata (\n" +
                        "ID int(255) NOT NULL AUTO_INCREMENT,\n" +
                        "Utente int(1) NOT NULL DEFAULT '0',\n" +
                        "Nome varchar(25) NOT NULL DEFAULT '0',\n" +
                        "Data date NOT NULL,\n" +
                        "Importo int(11) NOT NULL DEFAULT '0',\n" +
                        "Categoria int(9) NOT NULL DEFAULT '0',\n" +
                        "PRIMARY KEY (`ID`),\n" +
                        "KEY `Entrata_fk0` (`Utente`),\n" +
                        "KEY `Entrata_fk1` (`Categoria`)\n" +
                        ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;", (err)=>{
                        if(err)
                            throw err;
                        // else{
                        //     myDB.query("ALTER TABLE Entrata\n" +
                        //         "ADD CONSTRAINT Entrata_fk0 FOREIGN KEY (Utente) REFERENCES Utente (idUtente),\n" +
                        //         "ADD CONSTRAINT Entrata_fk1 FOREIGN KEY (Categoria) REFERENCES Categoria (ID);", (err)=>{
                        //         if (err)
                        //             throw err;
                        //     })
                        // }
                    });


                    myDB.query("CREATE TABLE IF NOT EXISTS Uscita (\n" +
                        "ID int(255) NOT NULL AUTO_INCREMENT,\n" +
                        "Utente int(1) NOT NULL DEFAULT '0',\n" +
                        "Nome varchar(25) NOT NULL DEFAULT '0',\n" +
                        "Data date NOT NULL,\n" +
                        "Importo int(11) NOT NULL DEFAULT '0',\n" +
                        "Categoria int(9) NOT NULL DEFAULT '0',\n" +
                        "PRIMARY KEY (`ID`),\n" +
                        "KEY `Uscita_fk0` (`Utente`),\n" +
                        "KEY `Uscita_fk1` (`Categoria`)\n" +
                        ") ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;", (err)=>{
                        if(err)
                            throw err;
                        // else{
                        //     myDB.query("ALTER TABLE Uscita\n" +
                        //         "ADD CONSTRAINT Entrata_fk0 FOREIGN KEY (Utente) REFERENCES Utente (idUtente),\n" +
                        //         "ADD CONSTRAINT Entrata_fk1 FOREIGN KEY (Categoria) REFERENCES Categoria (ID);", (err)=>{
                        //         if (err)
                        //             throw err;
                        //     })
                        // }
                    });

                    myDB.query("\n" +
                        "CREATE VIEW IF NOT EXISTS DatiTotali AS\n" +
                        "SELECT Entrata.ID, Entrata.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo\n" +
                        "FROM Entrata, Categoria\n" +
                        "WHERE Categoria.ID = Entrata.Categoria\n" +
                        "UNION\n" +
                        "SELECT Uscita.ID, Uscita.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo\n" +
                        "FROM Uscita, Categoria\n" +
                        "WHERE Categoria.ID = Uscita.Categoria ", (err)=>{
                        if(err)
                            throw err;
                    });

                    myDB.query("CREATE VIEW IF NOT EXISTS `SommaUscitePerCategoria` AS\n" +
                        "SELECT Categoria.Nome, SUM(Uscita.Importo) AS TOT_Uscita\n" +
                        "FROM Categoria, Uscita\n" +
                        "WHERE Categoria.ID=Uscita.Categoria\n" +
                        "GROUP BY Categoria.Nome", (err)=>{
                        if (err)
                            throw err;
                    });

                    myDB.query("CREATE VIEW IF NOT EXISTS `SommaEntrataPerCategoria` AS\n" +
                        "SELECT Categoria.Nome, SUM(Entrata.Importo) AS TOT_Entrata\n" +
                        "FROM Categoria, Entrata\n" +
                        "WHERE Categoria.ID=Entrata.Categoria\n" +
                        "GROUP BY Categoria.Nome", (err)=>{
                        if (err)
                            throw err;
                    });

                    myDB.query("CREATE VIEW IF NOT EXISTS `TotaleUscita` AS\n" +
                        "SELECT SUM(Uscita.Importo) AS Somma_Uscite FROM Uscita", (err)=>{
                        if (err)
                            throw err;
                    });

                    myDB.query("CREATE VIEW IF NOT EXISTS `TotaleEntrata` AS\n" +
                        "SELECT SUM(Entrata.Importo) AS Somma_Entrate FROM Entrata ", (err)=>{
                        if (err)
                            throw err;
                    });

                }
            });
        }
    });
};

const myDB = mySql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    // database: "BudMan"
});

setup();

 **/



app.post('/userExists', (req, res) => {
    myDB.query("SELECT * FROM Utente", (err, rows) => {
        if (err)
            console.log(err);
        else {
            if (rows.length > 0) {
                res.send("200");
            } else {
                res.send("404");
            }
        }
    })
});

app.post('/newUser', (req, res) => {
    myDB.query("SELECT * FROM Utente", (err, rows) => {
        if (err)
            console.log(err);
        else {
            if (!rows.length) {
                var user = {
                    Nome: req.body.Nome,
                    Cognome: req.body.Cognome,
                    Email: req.body.Email
                };
                myDB.query("INSERT INTO Utente SET ?", user, (err, res) => {
                    if (err)
                        console.log(err);
                });
            }
        }
        res.end();
    })
});

app.post("/saldo", (req, res)=>{
    myDB.query(" SELECT * FROM TotaleEntrata ", (err, fields)=>{
        if (err)
            throw err;
        else{
            myDB.query(" SELECT * FROM TotaleUscita ", (err, rows)=>{
                if (err)
                    throw err;
                else{
                    var saldo = fields[0].Somma_Entrate-rows[0].Somma_Uscite;
                }
                saldo = JSON.stringify(saldo);
                res.send(saldo).end();
            });
        }
    });

});

app.post('/lastIn', (req, res) =>{
        myDB.query("SELECT e1.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Entrata AS e1, Categoria WHERE NOT EXISTS ( SELECT * FROM Entrata AS e2 WHERE e1.Data < e2.Data) AND e1.Categoria=Categoria.ID",(err,rows) =>{
            if (err)
                throw err;
            else{
                if(rows.length) {
                    var data = reverseString(new Date(rows[0].Data).toJSON().slice(0, 10));
                    var sample = {
                        Nome: rows[0].Nome,
                        Data: data,
                        Importo: rows[0].Importo,
                        Categoria: rows[0].Categoria
                    };
                    res.send(JSON.stringify(sample)).end();
                }
                else
                    res.end();
            }
        })
});

app.post('/lastOut', (req, res) =>{
    if(req.body){
        myDB.query("SELECT u1.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Uscita AS u1, Categoria WHERE NOT EXISTS ( SELECT * FROM Uscita AS u2 WHERE u1.Data < u2.Data) AND u1.Categoria=Categoria.ID",(err,rows) =>{
            if (err)
                throw err;
            else{
                if(rows.length) {
                    var data = reverseString(new Date(rows[0].Data).toJSON().slice(0, 10));
                    var sample = {
                        Nome: rows[0].Nome,
                        Data: data,
                        Importo: rows[0].Importo,
                        Categoria: rows[0].Categoria
                    };
                    res.send(JSON.stringify(sample)).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post("/getOp", (req, res) => {
    myDB.query("SELECT * FROM Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var catLog = [];
                for (let i = 0; i < rows.length; i++) {
                    var sample = {
                        ID: rows[i].ID,
                        Nome: rows[i].Nome,
                        Descrizione: rows[i].Descrizione,
                        Tipo: rows[i].Tipo
                    };
                    catLog.push(sample);
                }
                res.send(catLog);
            }
        }
    })
});

app.post('/newCat', (req, res) => {
    if (req.body) {
        var newEntrata = {
            Nome: req.body.Nome,
            Descrizione: req.body.Descrizione,
            Tipo: req.body.Tipo,
        };
        myDB.query("INSERT INTO Categoria SET ?", newEntrata, (err, res) => {
            if (err)
                console.log(err);
        });
    }
    res.end();
});

app.post('/newIN', (req, res) => {
    myDB.query("SELECT DISTINCT idUtente FROM Utente", (err, rows) => {
        if (err)
            throw err;
        else {
            var newEntrata = {
                Utente: rows[0].idUtente,
                Nome: req.body.Nome,
                Data: req.body.Data,
                Importo: req.body.Importo,
                Categoria: req.body.Categoria
            };
            myDB.query("INSERT INTO Entrata SET ?", newEntrata, (err, res) => {
                if (err)
                    console.log(err);
            });
        }
    });
    res.end();
});

app.post('/newOUT', (req, res) => {
    myDB.query("SELECT DISTINCT idUtente FROM Utente", (err, rows) => {
        if (err)
            throw err;
        else {
            var newUscita = {
                Utente: rows[0].idUtente,
                Nome: req.body.Nome,
                Data: req.body.Data,
                Importo: req.body.Importo,
                Categoria: req.body.Categoria
            };
            myDB.query("INSERT INTO Uscita SET ?", newUscita, (err, res) => {
                if (err)
                    console.log(err);
            });
        }
    });
    res.end();
});

function reverseString(str) {
    return str.split("-").reverse().join("-");
}

app.post('/getEntrate', (req, res) => {
    myDB.query("SELECT Entrata.ID, Entrata.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Entrata, Categoria WHERE Categoria.ID = Entrata.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var inVals = [];
                for (let i = 0; i < rows.length; i++) {
                    var data  = reverseString(new Date(rows[i].Data).toJSON().slice(0, 10));
                    var sample = {
                        ID: rows[i].ID,
                        Nome: rows[i].Nome,
                        Data: data,
                        Importo: rows[i].Importo,
                        Categoria: rows[i].Categoria
                    };
                    inVals.push(sample);
                }
                res.send(inVals).end();
            }
            else
                res.end();
        }
    });

});

app.post('/getUscite', (req, res) => {
    myDB.query("SELECT Uscita.ID, Uscita.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Uscita, Categoria WHERE Categoria.ID = Uscita.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var inVals = [];
                for (let i = 0; i < rows.length; i++) {
                    var data  = reverseString(new Date(rows[i].Data).toJSON().slice(0, 10));
                    var sample = {
                        ID: rows[i].ID,
                        Nome: rows[i].Nome,
                        Data: data,
                        Importo: rows[i].Importo,
                        Categoria: rows[i].Categoria
                    };
                    inVals.push(sample);
                }
                res.send(inVals).end();
            }
            else
                res.end();
        }
    });

});

app.post('/allData', (req, res)=>{
    myDB.query("SELECT * FROM DatiTotali", (err, rows)=>{
        if (err)
            throw err;
        else{
            if(rows.length) {
                var resultVal = [];
                for(let i=0; i<rows.length; i++){
                    var data  = reverseString(new Date(rows[i].Data).toJSON().slice(0, 10));
                    var sample ={
                        ID: rows[i].ID,
                        Nome: rows[i].Nome,
                        Data: data,
                        Importo: rows[i].Importo,
                        Categoria: rows[i].Categoria,
                        Tipo: rows[i].Tipo
                    };
                    resultVal.push(sample);
                }
                res.send(resultVal).end();
            }
            else
                res.end();
        }
    })
});

app.post('/delElem', (req, res) => {
    if(req.body.tipo === "Categoria"){
        myDB.query("SELECT ID, Predefinito FROM "+req.body.tipo+" WHERE ID="+req.body.ID, (err, rows)=> {
            if (err)
                throw err;
            else{
                if (rows[0].Predefinito === 0) {
                    myDB.query("DELETE FROM Entrata WHERE Categoria="+rows[0].ID, (err)=>{
                        if(err)
                            throw err;
                        else{
                            myDB.query("DELETE FROM Uscita WHERE Categoria="+rows[0].ID, (err)=>{
                                if(err)
                                    throw err;
                                else{
                                    myDB.query("DELETE FROM " + req.body.tipo + " WHERE ID=" + req.body.ID, (err, ris) => {
                                        if (err)
                                            throw err;
                                        else
                                            res.end();
                                    })
                                }

                            });
                        }
                    });
                }
            }
        })
    }
    else{
        myDB.query("DELETE FROM "+req.body.tipo+" WHERE ID="+req.body.ID, (err)=>{
            if(err)
                throw err;
            else
                res.end();
        })
    }

});

app.post('/getMaxCatIn', (req, res) => {
    if(req.body){
        myDB.query("SELECT C1.Nome, C1.Descrizione  FROM Categoria AS C1 WHERE C1.ID IN" +
            "( SELECT Entrata.Categoria FROM Entrata WHERE C1.ID = Entrata.Categoria HAVING COUNT(*) >= ALL" +
            "( SELECT COUNT(*) AS TOT FROM Entrata, Categoria WHERE Categoria.ID = Entrata.Categoria GROUP BY Categoria.ID ) )", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var sample = {
                        Nome: rows[0].Nome,
                        Descrizione: rows[0].Descrizione,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMinCatIn', (req, res) => {
    if(req.body){
        myDB.query("SELECT C1.Nome, C1.Descrizione FROM Categoria AS C1 WHERE C1.ID IN" +
            "( SELECT Entrata.Categoria FROM Entrata WHERE C1.ID = Entrata.Categoria HAVING COUNT(*) <= ALL" +
            "( SELECT COUNT(*) AS TOT FROM Entrata, Categoria WHERE Categoria.ID = Entrata.Categoria GROUP BY Categoria.ID ) )", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var sample = {
                        Nome: rows[0].Nome,
                        Descrizione: rows[0].Descrizione,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMaxCatOut', (req, res) => {
    if(req.body){
        myDB.query("SELECT C1.Nome, C1.Descrizione  FROM Categoria AS C1 WHERE C1.ID IN" +
            "( SELECT Uscita.Categoria FROM Uscita WHERE C1.ID = Uscita.Categoria HAVING COUNT(*) >= ALL" +
            "( SELECT COUNT(*) AS TOT FROM Uscita, Categoria WHERE Categoria.ID = Uscita.Categoria GROUP BY Categoria.ID ) )", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var sample = {
                        Nome: rows[0].Nome,
                        Descrizione: rows[0].Descrizione,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMinCatOut', (req, res) => {
    if(req.body){
        myDB.query("SELECT C1.Nome, C1.Descrizione FROM Categoria AS C1 WHERE C1.ID IN" +
            "( SELECT Uscita.Categoria FROM Uscita WHERE C1.ID = Uscita.Categoria HAVING COUNT(*) <= ALL" +
            "( SELECT COUNT(*) AS TOT FROM Uscita, Categoria WHERE Categoria.ID = Uscita.Categoria GROUP BY Categoria.ID ) )", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var sample = {
                        Nome: rows[0].Nome,
                        Descrizione: rows[0].Descrizione,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMaxOut', (req, res) => {
    if(req.body){
        myDB.query("SELECT U1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Uscita AS U1, Categoria WHERE NOT EXISTS (SELECT * FROM Uscita WHERE U1.Importo<Importo)\n" +
            "AND Categoria.ID = U1.Categoria", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var data  = reverseString(new Date(rows[0].Data).toJSON().slice(0, 10));
                    var sample = {
                        Nome: rows[0].Nome,
                        Data: data,
                        Importo: rows[0].Importo,
                        Categoria: rows[0].Categoria,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMaxIN', (req, res) => {
    if(req.body){
        myDB.query("SELECT E1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Entrata AS E1, Categoria WHERE NOT EXISTS (SELECT * FROM Entrata WHERE E1.Importo<Importo)\n" +
            "AND Categoria.ID = E1.Categoria", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var data  = reverseString(new Date(rows[0].Data).toJSON().slice(0, 10));
                    var sample = {
                        Nome: rows[0].Nome,
                        Data: data,
                        Importo: rows[0].Importo,
                        Categoria: rows[0].Categoria,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMinOut', (req, res) => {
    if(req.body){
        myDB.query("SELECT U1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Uscita AS U1, Categoria WHERE NOT EXISTS (SELECT * FROM Uscita WHERE U1.Importo>Importo)\n" +
            "AND Categoria.ID = U1.Categoria", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var data  = reverseString(new Date(rows[0].Data).toJSON().slice(0, 10));
                    var sample = {
                        Nome: rows[0].Nome,
                        Data: data,
                        Importo: rows[0].Importo,
                        Categoria: rows[0].Categoria,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getMinIN', (req, res) => {
    if(req.body){
        myDB.query("SELECT E1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Entrata AS E1, Categoria WHERE NOT EXISTS (SELECT * FROM Entrata WHERE E1.Importo>Importo)\n" +
            "AND Categoria.ID = E1.Categoria", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var data  = reverseString(new Date(rows[0].Data).toJSON().slice(0, 10));
                    var sample = {
                        Nome: rows[0].Nome,
                        Data: data,
                        Importo: rows[0].Importo,
                        Categoria: rows[0].Categoria,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getAvgOut', (req, res) => {
    if(req.body){
        myDB.query("SELECT AVG(Uscita.Importo) AS Importo FROM Uscita", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var sample = {
                        Importo: rows[0].Importo,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});


app.post('/getAvgIN', (req, res) => {
    if(req.body){
        myDB.query("SELECT AVG(Entrata.Importo) AS Importo FROM Entrata", (err, rows) => {
            if (err)
                throw err;
            else {
                if (rows.length) {
                    var sample = {
                        Importo: rows[0].Importo,
                    };
                    sample = JSON.stringify(sample);
                    res.send(sample).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getChartOut', (req, res)=>{
    if(req.body){
        if(req.body){
            myDB.query("SELECT * FROM `SommaUscitePerCategoria` ORDER BY `TOT_Uscita` DESC", (err, rows)=>{
                if(err)
                    throw err;
                else{
                    if (rows.length){
                        var resultVal = [];
                        for(let i=0; i<rows.length; i++){
                            var sample ={
                                Nome: rows[i].Nome,
                                Totale: rows[i].TOT_Entrata
                            };
                            resultVal.push(sample);
                        }
                        res.send(resultVal).end();
                    }
                    else
                        res.end();
                }
            })
        }
    }
});


app.post('/getChartIN', (req, res)=>{
    if(req.body){
        myDB.query("SELECT * FROM `SommaEntrataPerCategoria` ORDER BY `TOT_Entrata` DESC", (err, rows)=>{
            if(err)
                throw err;
            else{
                if (rows.length){
                    var resultVal = [];
                    for(let i=0; i<rows.length; i++){
                        var sample ={
                            Nome: rows[i].Nome,
                            Totale: rows[i].TOT_Entrata
                        };
                        resultVal.push(sample);
                    }
                    res.send(resultVal).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/getChartCatIn', (req, res)=>{
    if(req.body){
        myDB.query("SELECT C.Nome, COUNT(*) AS TotXCat FROM Entrata AS E, Categoria AS C WHERE E.Categoria=C.ID GROUP BY E.Categoria", (err, rows)=>{
            if(err)
                throw err;
            else{
                if (rows.length){
                    var resultVal = [];
                    for(let i=0; i<rows.length; i++){
                        var sample ={
                            Nome: rows[i].Nome,
                            Totale: rows[i].TotXCat
                        };
                        resultVal.push(sample);
                    }
                    res.send(resultVal).end();
                }
                else
                    res.end();
            }
        })
    }
});


app.post('/getChartCatOut', (req, res)=>{
    if(req.body){
        myDB.query("SELECT C.Nome, COUNT(*) AS TotXCat FROM Uscita AS U, Categoria AS C WHERE U.Categoria=C.ID GROUP BY U.Categoria", (err, rows)=>{
            if(err)
                throw err;
            else{
                if (rows.length){
                    var resultVal = [];
                    for(let i=0; i<rows.length; i++){
                        var sample ={
                            Nome: rows[i].Nome,
                            Totale: rows[i].TotXCat
                        };
                        resultVal.push(sample);
                    }
                    res.send(resultVal).end();
                }
                else
                    res.end();
            }
        })
    }
});

app.post('/userData', (req, res)=>{
    if(req.body){
        myDB.query("SELECT Nome, Cognome FROM Utente", (err, rows)=>{
            if (err)
                throw err;
            else{
                if (rows.length){
                    var sample ={
                        Nome: rows[0].Nome,
                        Cognome: rows[0].Cognome
                    };
                    res.send(sample).end();
                }
                else
                    res.end();

            }
        });
    }
});

app.post('/resetAll', (req, res)=>{
    console.log("reset all\n");
    myDB.query("DELETE FROM Categoria WHERE Categoria.Predefinito=0", (err, rows)=>{
        if (err)
            throw err;
        else{
            myDB.query("TRUNCATE TABLE Entrata", (err, rows2)=>{
                if (err)
                    throw err;
                else{
                    myDB.query("TRUNCATE TABLE Uscita", (err, rows3)=>{
                        if (err)
                            throw err;
                        else{
                            res.end();
                        }
                    });
                }
            });
        }
    });
});

app.post('/delUser', (req, res)=>{
    console.log("delete user");
    /** to implement reset first**/
    myDB.query("DELETE FROM Utente", (err, rows)=>{
        if (err)
            throw err;
        else{
            console.log(rows);
            res.send(200).end();
        }
    });
});


app.listen(8080, () => {
    console.log("Server avviato sulla porta 8080!");
});
