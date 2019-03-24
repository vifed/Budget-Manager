var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mySql = require('mysql');

const myDB = mySql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"BudManDB"
});

var app = express();

myDB.connect((err)=>{
    if (err)
        throw err;
    else
        console.log("Database connesso!");
});

app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/userExists', (req, res)=>{
    myDB.query("SELECT * FROM Utente", (err, rows)=>{
        if(err)
            console.log(err);
        else{
            if(rows.length > 0){
                res.send("200");
            }
            else{
                res.send("404");
            }
        }
    })
});

app.post('/newUser', (req, res)=>{
    var user = {
        Nome: req.body.Nome,
        Cognome: req.body.Cognome,
        Email: req.body.Email
    };

    myDB.query("INSERT INTO Utente SET ?", user, (err, res )=>{
       if (err)
           console.log(err);
       console.log(res);
    });
    res.end();
});

app.post('/newIN', (req, res) =>{
    myDB.query("SELECT DISTINCT idUtente FROM Utente", (err, rows)=>{
       if(err)
           throw err;
       else{
           var newEntrata = {
               Utente: rows[0].idUtente,
               Nome: req.body.Nome,
               Data: req.body.Data,
               Importo: req.body.Importo,
               Categoria: req.body.Categoria
           };
           console.log(newEntrata);
           myDB.query("INSERT INTO Entrata SET ?", newEntrata, (err, res )=>{
               if (err)
                   console.log(err);
               console.log(res);
           });
       }
    });
    res.end();
});

app.post('/newOUT', (req, res) =>{
    myDB.query("SELECT DISTINCT idUtente FROM Utente", (err, rows)=>{
        if(err)
            throw err;
        else{
            var newUscita = {
                Utente: rows[0].idUtente,
                Nome: req.body.Nome,
                Data: req.body.Data,
                Importo: req.body.Importo,
                Categoria: req.body.Categoria
            };
            console.log(newUscita);
            myDB.query("INSERT INTO Uscita SET ?", newUscita, (err, res )=>{
                if (err)
                    console.log(err);
                console.log(res);
            });
        }
    });
    res.end();
});

// CREATE VIEW allData AS SELECT Entrata.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Entrata, Categoria WHERE Categoria.idCategoria = Entrata.Categoria



app.post('/getEntrate', (req, res)=>{
    myDB.query("SELECT Entrata.Nome, Data, Importo, Categoria.Nome AS Categoria FROM Entrata, Categoria WHERE Categoria.idCategoria = Entrata.Categoria", (err, rows) =>{
       if(err)
           throw err;
       else{
           if(rows.length){
               var inVals = [];
               for(let i=0; i<rows.length; i++){

               }
               console.log(rows);
           }
       }
    });

});

app.post('/getUscite', (req, res)=>{
    myDB.query("SELECT * FROM Uscita")

});


app.listen(8080, () =>{
    console.log("Server avviato sulla porta 8080!");
});