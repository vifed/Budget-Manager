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

myDB.query("CREATE VIEW IF NOT EXISTS DatiTotali AS\n" +
    " SELECT Entrata.ID, Entrata.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Entrata, Categoria WHERE Categoria.ID = Entrata.Categoria\n" +
    " UNION\n" +
    " SELECT Uscita.ID, Uscita.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Uscita, Categoria WHERE Categoria.ID = Uscita.Categoria", (err)=>{
    if(err)
        throw err;
});

myDB.query("CREATE VIEW IF NOT EXISTS SommaUscitePerCategoria AS\n" +
    "SELECT Categoria.Nome, SUM(Uscita.Importo) AS TOT_Uscita\n" +
    "FROM Categoria, Uscita\n" +
    "WHERE Categoria.ID=Uscita.Categoria\n" +
    "GROUP BY Categoria.Nome", (err)=>{
    if (err)
        throw err;
});

myDB.query("CREATE VIEW IF NOT EXISTS SommaEntrataPerCategoria AS\n" +
    "SELECT Categoria.Nome, SUM(Entrata.Importo) AS TOT_Entrata\n" +
    "FROM Categoria, Entrata\n" +
    "WHERE Categoria.ID=Entrata.Categoria\n" +
    "GROUP BY Categoria.Nome", (err)=>{
    if (err)
        throw err;
});

myDB.query("CREATE VIEW IF NOT EXISTS MaxUscita AS\n" +
    "SELECT U1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Uscita AS U1, Categoria WHERE NOT EXISTS (SELECT * FROM Uscita WHERE U1.Importo<Importo)\n" +
    "AND Categoria.ID = U1.Categoria", (err)=>{
    if (err)
        throw err;
});

myDB.query("CREATE VIEW IF NOT EXISTS MaxEntrata AS\n" +
    "SELECT E1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Entrata AS E1, Categoria WHERE NOT EXISTS (SELECT * FROM Uscita WHERE E1.Importo<Importo)\n" +
    "AND Categoria.ID = E1.Categoria", (err)=>{
    if (err)
        throw err;
});

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
    var user = {
        Nome: req.body.Nome,
        Cognome: req.body.Cognome,
        Email: req.body.Email
    };

    myDB.query("INSERT INTO Utente SET ?", user, (err, res) => {
        if (err)
            console.log(err);
    });
    res.end();
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
    return str.split("-").reverse().join("/");
}

app.post('/getEntrate', (req, res) => {
    myDB.query("SELECT Entrata.ID, Entrata.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Entrata, Categoria WHERE Categoria.ID = Entrata.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var inVals = [];
                for (let i = 0; i < rows.length; i++) {
                    var data = reverseString(new Date(rows[i].Data).toLocaleDateString());
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
                    var data = reverseString(new Date(rows[i].Data).toLocaleDateString());
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
        }
    });

});

app.post('/allData', (req, res)=>{
    myDB.query("SELECT * FROM DatiTotali", (err, rows)=>{
        if (err)
            throw err;
        else{
            if(rows.length){
                var resultVal = [];
                for(let i=0; i<rows.length; i++){
                    var data = reverseString(new Date(rows[i].Data).toLocaleDateString());
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
        }
    })
});

app.post('/delElem', (req, res) => {
    myDB.query("DELETE FROM "+req.body.tipo+" WHERE ID="+req.body.ID, (err, ris)=>{
           if(err)
               throw err;
           else
               console.log(ris);
               res.end();
       })
});

app.post('/getMaxCatIn', (req, res) => {
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
        }
    })
});

app.post('/getMinCatIn', (req, res) => {
    myDB.query("SELECT C1.Nome, C1.Descrizione FROM Categoria AS C1 WHERE C1.ID IN" +
        "( SELECT Entrata.Categoria FROM Entrata WHERE C1.ID = Entrata.Categoria HAVING COUNT(*) <= ALL" +
        "( SELECT COUNT(*) AS TOT FROM Entrata, Categoria WHERE Categoria.ID = Entrata.Categoria GROUP BY Categoria.ID ) )", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                console.log(" min cat: ", rows);
                var sample = {
                    Nome: rows[0].Nome,
                    Descrizione: rows[0].Descrizione,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getMaxCatOut', (req, res) => {
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
        }
    })
});

app.post('/getMinCatOut', (req, res) => {
    myDB.query("SELECT C1.Nome, C1.Descrizione FROM Categoria AS C1 WHERE C1.ID IN" +
        "( SELECT Uscita.Categoria FROM Uscita WHERE C1.ID = Uscita.Categoria HAVING COUNT(*) <= ALL" +
        "( SELECT COUNT(*) AS TOT FROM Uscita, Categoria WHERE Categoria.ID = Uscita.Categoria GROUP BY Categoria.ID ) )", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                console.log(" min cat: ", rows);
                var sample = {
                    Nome: rows[0].Nome,
                    Descrizione: rows[0].Descrizione,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getMaxOut', (req, res) => {
    myDB.query("SELECT U1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Uscita AS U1, Categoria WHERE NOT EXISTS (SELECT * FROM Uscita WHERE U1.Importo<Importo)\n" +
        "AND Categoria.ID = U1.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var data = reverseString(new Date(rows[0].Data).toLocaleDateString());
                var sample = {
                    Nome: rows[0].Nome,
                    Data: data,
                    Importo: rows[0].Importo,
                    Categoria: rows[0].Categoria,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getMaxIN', (req, res) => {
    myDB.query("SELECT E1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Entrata AS E1, Categoria WHERE NOT EXISTS (SELECT * FROM Entrata WHERE E1.Importo<Importo)\n" +
        "AND Categoria.ID = E1.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var data = reverseString(new Date(rows[0].Data).toLocaleDateString());
                var sample = {
                    Nome: rows[0].Nome,
                    Data: data,
                    Importo: rows[0].Importo,
                    Categoria: rows[0].Categoria,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getMinOut', (req, res) => {
    myDB.query("SELECT U1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Uscita AS U1, Categoria WHERE NOT EXISTS (SELECT * FROM Uscita WHERE U1.Importo>Importo)\n" +
        "AND Categoria.ID = U1.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var data = reverseString(new Date(rows[0].Data).toLocaleDateString());
                var sample = {
                    Nome: rows[0].Nome,
                    Data: data,
                    Importo: rows[0].Importo,
                    Categoria: rows[0].Categoria,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getMinIN', (req, res) => {
    myDB.query("SELECT E1.Nome, Data, Importo, Categoria.Nome AS Categoria, Categoria.Tipo FROM Entrata AS E1, Categoria WHERE NOT EXISTS (SELECT * FROM Entrata WHERE E1.Importo>Importo)\n" +
        "AND Categoria.ID = E1.Categoria", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var data = reverseString(new Date(rows[0].Data).toLocaleDateString());
                var sample = {
                    Nome: rows[0].Nome,
                    Data: data,
                    Importo: rows[0].Importo,
                    Categoria: rows[0].Categoria,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getAvgOut', (req, res) => {
    myDB.query("SELECT AVG(Uscita.Importo) AS Importo FROM Uscita", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var data = reverseString(new Date(rows[0].Data).toLocaleDateString());
                var sample = {
                    Importo: rows[0].Importo,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});


app.post('/getAvgIN', (req, res) => {
    myDB.query("SELECT AVG(Entrata.Importo) AS Importo FROM Entrata", (err, rows) => {
        if (err)
            throw err;
        else {
            if (rows.length) {
                var data = reverseString(new Date(rows[0].Data).toLocaleDateString());
                var sample = {
                    Importo: rows[0].Importo,
                };
                sample = JSON.stringify(sample);
                res.send(sample).end();
            }
        }
    })
});

app.post('/getChartOut', (req, res)=>{
    myDB.query("SELECT * FROM `SommaUscitePerCategoria` ORDER BY `TOT_Uscita` DESC", (err, rows)=>{
           if(err)
               throw err;
           else{
               if (rows.length){
                   var resultVal = [];
                   for(let i=0; i<rows.length; i++){
                       var sample ={
                           Nome: rows[i].Nome,
                           Totale: rows[i].TOT_Uscita
                       };
                       resultVal.push(sample);

                   }
                   res.send(resultVal).end();
               }
           }
       })
});


app.post('/getChartIN', (req, res)=>{
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
                       console.log(sample);
                       resultVal.push(sample);
                   }
                   res.send(resultVal).end();
               }
           }
       })
});


app.listen(8080, () => {
    console.log("Server avviato sulla porta 8080!");
});