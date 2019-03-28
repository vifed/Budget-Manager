$(document).ready(function () {

    getData();
    fillOption();

    $.post("/getMaxCatIn", (res)=>{
        res = JSON.parse(res);
        var tabElem = '<tr>' +
            '<td>' + res.Nome + '</td>' +
            '<td>' + res.Descrizione + '</td>' +
            '</tr>';
        $('.maxCatIn').append(tabElem);
    });

    $.post("/getMinCatIn", (res)=>{
        res = JSON.parse(res);
        var tabElem = '<tr>' +
            '<td>' + res.Nome + '</td>' +
            '<td>' + res.Descrizione + '</td>' +
            '</tr>';
        $('.minCatIn').append(tabElem);
    });

    $.post("/getMaxCatOut", (res)=>{
        res = JSON.parse(res);
        var tabElem = '<tr>' +
            '<td>' + res.Nome + '</td>' +
            '<td>' + res.Descrizione + '</td>' +
            '</tr>';
        $('.maxCatOut').append(tabElem);
    });

    $.post("/getMinCatOut", (res)=>{
        res = JSON.parse(res);
        var tabElem = '<tr>' +
            '<td>' + res.Nome + '</td>' +
            '<td>' + res.Descrizione + '</td>' +
            '</tr>';
        $('.minCatOut').append(tabElem);
    });
    
    $.post('/userExists', (res)=>{
        if(res === "404" ){
            alert("Devi prima inserire i dati dell'utente!");
            $(location).attr("href", "welcome.html");
        }
    });

    $("#addCat").click(()=>{
        var newCategory = {
            Nome: $("#nomeCat").val().trim(),
            Descrizione: $("#descrizione").val().trim(),
            Tipo: $("#tipoCat").val().trim(),
        };

        $.post('/newCat', newCategory, () =>{
            alert("Categoria aggiunta con successo!");
            location.reload();
        });
    });

    $("#addIN").click(()=>{
        var newEntrata = {
            Nome: $("#nomeIn").val().trim(),
            Data: $("#dataIn").val().trim(),
            Importo: $("#importIn").val().trim(),
            Categoria: $("#categoryIn").val().trim()
        };

        $.post('/newIN', newEntrata, () =>{
            alert("Entrata aggiunta con successo!");
            location.reload();
        });
    });

    $("#addOUT").click(()=>{
        var newUscita = {
            Nome: $("#nomeOut").val().trim(),
            Data: $("#dateOut").val().trim(),
            Importo: $("#importOut").val().trim(),
            Categoria: $("#categoryOut").val().trim()
        };


        $.post('/newOUT', newUscita, () =>{
            alert("Uscita aggiunta con successo!");
            location.reload();
        });
    })

});


function getData() {
    $.post('/allData', (res) =>{
        renderAll(res);
    });

    $.post('/getEntrate', (res2) =>{
        renderIN(res2);
    });

    $.post('/getUscite', (res3) =>{
        renderOUT(res3);
    })

}

function renderAll(IN) {
    IN.forEach((value, index)=>{
        var tipo ="";
        var tabElem="";
        switch (value.Tipo) {
            case 'U':
                tipo = 'Uscita';
                tabElem = '<tr>' +
                    '<td style="color: #D60939" id="type'+value.ID+'">'+tipo+'</td>'+
                    '<td>'+value.Nome+'</td>'+
                    '<td>'+value.Data+'</td>'+
                    '<td>'+value.Importo+' €</td>'+
                    '<td>'+value.Categoria+'</td>'+
                    '<td><button id="'+value.ID+'" type="button" class="btn btn-outline-primary"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>'+
                    '</tr>';
                break;
            case 'E':
                tipo = 'Entrata';
                tabElem = '<tr>' +
                    '<td style="color: #88FF74" id="type'+value.ID+'">'+tipo+'</td>'+
                    '<td>'+value.Nome+'</td>'+
                    '<td>'+value.Data+'</td>'+
                    '<td>'+value.Importo+' €</td>'+
                    '<td>'+value.Categoria+'</td>'+
                    '<td><button id="'+value.ID+'" type="button" class="btn btn-outline-danger"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>'+
                    '</tr>';
                break;
        }
        $('.resumeData').append(tabElem);
    });
}

function renderIN(res2) {

    var input=[];
    res2.forEach((value, index) => {
        var sample ={
            "Tipo": "Entrata",
            "Nome": value.Nome,
            "Data": value.Data,
            "Importo": value.Importo +" €",
            "Categoria":value.Categoria,
            "Elimina": '<button id="'+value.ID+'" type="button" class="btn btn-outline-primary"  onclick="delIn(this.id)"><i class="fa fa-trash"></i></button>'
        };
        input.push(sample);
    });
    var table = $('#tableIn').DataTable( {
        "data":input,
        "columns": [
            { "data": "Tipo" },
            { "data": "Nome" },
            { "data": "Data" },
            { "data": "Importo" },
            { "data": "Categoria" },
            { "data": "Elimina" }
        ],
        "pagingType": "simple",
        "language": {
            "sProcessing":    "Caricamento...",
            "sSearch":        "Cerca:",
            "sInfoEmpty":     " ",
            "oPaginate": {
                "sFirst":    "Primo",
                "sLast":    "Ultimo",
                "sNext":    "Successivo",
                "sPrevious": "Precedente"
            },
        }
    } );
}

function renderOUT(res2) {
    var input=[];
    res2.forEach((value, index) => {
        var sample ={
                "Tipo": "Uscita",
                "Nome": value.Nome,
                "Data": value.Data,
                "Importo": value.Importo +" €",
                "Categoria":value.Categoria,
                "Elimina": '<button id="'+value.ID+'" type="button" class="btn btn-outline-primary"  onclick="delOut(this.id)"><i class="fa fa-trash"></i></button>'
            };
        input.push(sample);
    });
    var table = $('#tableOut').DataTable( {
        "data":input,
        "columns": [
            { "data": "Tipo" },
            { "data": "Nome" },
            { "data": "Data" },
            { "data": "Importo" },
            { "data": "Categoria" },
            { "data": "Elimina" }
        ],
        "pagingType": "simple",
        "language": {
            "sProcessing":    "Caricamento...",
            "sSearch":        "Cerca:",
            "sInfoEmpty":     " ",
            "oPaginate": {
                "sFirst":    "Primo",
                "sLast":    "Ultimo",
                "sNext":    "Successivo",
                "sPrevious": "Precedente"
            },
        }
    } );
    // $('.dataTables_length').addClass('bs-select');
}


function delOut(id) {
    var typeOp="";
    $("#modaldel").trigger('click');
    $("#safedel-btn").on('click', function () {
        console.log(" del tupla : ", typeOp, id);
        $.post("/delElem", {tipo: "Uscita", ID:id}, ()=>{
            window.location.reload();
        })
    });
}

function delIn(id) {
    var typeOp="";
    $("#modaldel").trigger('click');
    $("#safedel-btn").on('click', function () {
        console.log(" del tupla : ", typeOp, id);
        $.post("/delElem", {tipo: "Entrata", ID:id}, ()=>{
            window.location.reload();
        })
    });
}

/** da uscite.html**/
$.post("/getMaxOut", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Nome + '</td>' +
        '<td>' + res.Data + '</td>' +
        '<td>' + res.Importo + ' €</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.maxtabOut').append(tabElem);
});

$.post("/getMinOut", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Nome + '</td>' +
        '<td>' + res.Data + '</td>' +
        '<td>' + res.Importo + ' €</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.mintabOut').append(tabElem);
});

$.post("/getAvgOut", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Importo + ' €</td>' +
        '</tr>';
    $('.avgtabOut').append(tabElem);
});

$.post("/getChartOut", (res)=>{
    var myLabels =[];
    var myData =[];
    res.forEach((value, index)=>{
        myLabels.push(value.Nome);
        myData.push(value.Totale);
    });
    var ctx = document.getElementById('myChartOut');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: myLabels,
            datasets: [{
                label: 'Valore totale',
                data: myData,
                backgroundColor: [
                    'rgba(208, 0, 0, 0.85)',
                    'rgba(49, 57, 60, 0.85)',
                    'rgba(62, 137, 20, 0.85)',
                    'rgba( 0, 127, 255, 0.85)',
                    'rgba(247, 152, 36, 0.85)',
                ],
                borderColor: [
                    'rgba(208, 0, 0, 0.85)',
                    'rgba(49, 57, 60, 0.85)',
                    'rgba(62, 137, 20, 0.85)',
                    'rgba( 0, 127, 255, 0.85)',
                    'rgba(247, 152, 36, 0.85)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'black'
                }
            },
            layout: {
                padding: {
                    left: 5,
                    right: 5,
                    top: 5,
                    bottom: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});
/** **/

/** da entrate.html **/

$.post("/getMaxIN", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Nome + '</td>' +
        '<td>' + res.Data + '</td>' +
        '<td>' + res.Importo + ' €</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.maxtabIn').append(tabElem);
});

$.post("/getMinIN", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Nome + '</td>' +
        '<td>' + res.Data + '</td>' +
        '<td>' + res.Importo + ' €</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.mintabIn').append(tabElem);
});

$.post("/getAvgIN", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Importo + ' €</td>' +
        '</tr>';
    $('.avgtabIn').append(tabElem);
});

$.post("/getChartIN", (res)=>{
    var myLabels =[];
    var myData =[];
    res.forEach((value, index)=>{
        myLabels.push(value.Nome);
        myData.push(value.Totale);
    });
    var ctx = document.getElementById('myChartIn');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: myLabels,
            datasets: [{
                label: 'Valore totale',
                data: myData,
                backgroundColor: [
                    'rgba( 0, 127, 255, 0.85)',
                    'rgba(62, 137, 20, 0.85)',
                    'rgba(247, 152, 36, 0.85)',
                    'rgba(208, 0, 0, 0.85)',
                    'rgba(49, 57, 60, 0.85)',
                ],
                borderColor: [
                    'rgba( 0, 127, 255, 0.85)',
                    'rgba(62, 137, 20, 0.85)',
                    'rgba(247, 152, 36, 0.85)',
                    'rgba(208, 0, 0, 0.85)',
                    'rgba(49, 57, 60, 0.85)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: 'black'
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
});
/** **/

function fillOption() {
    $.post("/getOp", (res) =>{
        res.forEach((value, index) => {
            switch (value.Tipo) {
                case 'U':
                    var tabout = '<tr>' +
                        '<td>'+value.ID+'</td>' +
                        '<td>'+value.Nome+'</td>' +
                        '<td>'+value.Descrizione+'</td>' +
                        '<td>Uscita</td>' +
                        '<td><button id="'+value.ID+'" type="button" class="btn btn-outline-danger"  onclick="delCat(this.id)"><i class="fa fa-trash"></i></button></td>'+
                        '</tr>';
                    $(".catOut").append(tabout);
                    var listCatOut ='<option value="'+value.ID+'">'+value.Nome+'</option>';
                    $("#categoryOut").append(listCatOut);
                    break;

                case 'E':
                    var tabEle = '<tr>' +
                        '<td>'+value.ID+'</td>' +
                        '<td>'+value.Nome+'</td>' +
                        '<td>'+value.Descrizione+'</td>' +
                        '<td>Entrata</td>' +
                        '<td><button id="'+value.ID+'" type="button" class="btn btn-outline-danger"  onclick="delCat(this.id)"><i class="fa fa-trash"></i></button></td>'+
                        '</tr>';
                    $(".catIn").append(tabEle);
                    var listCatIn ='<option value="'+value.ID+'">'+value.Nome+'</option>';
                    $("#categoryIn").append(listCatIn);
                    break;
            }
        })
    })
}

function delCat(id) {
    var typeOp="";
    $("#modaldel").trigger('click');
    $("#safedel-btn").on('click', function () {
        $.post("/delElem", {tipo: 'Categoria', ID:id}, ()=>{
            window.location.reload();
        })
    });
}