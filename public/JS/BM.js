
$(document).ready(function () {

    getData();
    // getMax();
    
    $.post('/userExists', (res)=>{
        if(res === "404" ){
            alert("Devi prima inserire i dati dell'utente!");
            $(location).attr("href", "welcome.html");
        }
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
        var tipo = (value.Tipo === 'U') ? 'Uscita': 'Entrata';
        var tabElem = '<tr>' +
            '<td id="type'+value.ID+'">'+tipo+'</td>'+
            '<td>'+value.Nome+'</td>'+
            '<td>'+value.Data+'</td>'+
            '<td>'+value.Importo+'</td>'+
            '<td>'+value.Categoria+'</td>'+
            '<td><button id="'+value.ID+'" type="button" class="btn btn-primary"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>'+
            '</tr>';
        $('.resumeData').append(tabElem);
    });
}

function renderIN(res2) {
    res2.forEach((value, index) => {
        var tabElem = '<tr>' +
            '<td id="type'+value.ID+'">Entrata</td>' +
            '<td>' + value.Nome + '</td>' +
            '<td>' + value.Data + '</td>' +
            '<td>' + value.Importo + '</td>' +
            '<td>' + value.Categoria + '</td>' +
            '<td><button id="'+ value.ID +'" type="button" class="btn btn-danger"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>' +
            '</tr>';
        $('.datiIn').append(tabElem);
    })
}

function renderOUT(res2) {
    res2.forEach((value, index) => {
        var tabElem = '<tr>' +
            '<td id="type'+value.ID+'">Uscita</td>' +
            '<td>' + value.Nome + '</td>' +
            '<td>' + value.Data + '</td>' +
            '<td>' + value.Importo + '</td>' +
            '<td>' + value.Categoria + '</td>' +
            '<td><button id="'+value.ID+'" type="button" class="btn btn-primary"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>' +
            '</tr>';
        $('.datiOut').append(tabElem);
    })
}


function deltupla(id) {
    var typeOp="";
    $("#modaldel").trigger('click');
    $("#safedel-btn").on('click', function () {
        typeOp = document.getElementById("type"+id).innerHTML;
        $.post("/delElem", {tipo: typeOp, ID:id}, ()=>{
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
        '<td>' + res.Importo + '</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.maxtabOut').append(tabElem);
});

$.post("/getMinOut", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Nome + '</td>' +
        '<td>' + res.Data + '</td>' +
        '<td>' + res.Importo + '</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.mintab').append(tabElem);
});

$.post("/getAvgOut", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Importo + '</td>' +
        '</tr>';
    $('.avgtab').append(tabElem);
});

$.post("/getChartOut", (res)=>{
    var myLabels =[];
    var myData =[];
    res.forEach((value, index)=>{
        myLabels.push(value.Nome);
        myData.push(value.Totale);
    });
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: myLabels,
            datasets: [{
                label: 'Valore maggiore',
                data: myData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
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
        '<td>' + res.Importo + '</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.maxtabIn').append(tabElem);
});

$.post("/getMinIN", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Nome + '</td>' +
        '<td>' + res.Data + '</td>' +
        '<td>' + res.Importo + '</td>' +
        '<td>' + res.Categoria + '</td>' +
        '</tr>';
    $('.mintab').append(tabElem);
});

$.post("/getAvgIN", (res)=>{
    res = JSON.parse(res);
    var tabElem = '<tr>' +
        '<td>' + res.Importo + '</td>' +
        '</tr>';
    $('.avgtab').append(tabElem);
});

$.post("/getChartIN", (res)=>{
    var myLabels =[];
    var myData =[];
    res.forEach((value, index)=>{
        myLabels.push(value.Nome);
        myData.push(value.Totale);
        console.log("nome", myLabels[index], " tot ", myData[index]);
    });

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: myLabels,
            datasets: [{
                label: '# of Prezzo',
                data: myData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3
            }]
        },
        options: {
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