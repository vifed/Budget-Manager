
$(document).ready(function() {
    getData();
    
    $.post('/userExists', (res)=>{
        console.log("res e'", res.valueOf());
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

        console.log("dati in input:  ", newEntrata);

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
    $.post('/getEntrate', (res) =>{
        $.post('/getUscite', (res2) =>{
            renderData(res, res2);
        })
    });

}

function renderData(IN, OUT) {
    IN.forEach((value, index)=>{
        var tabElem = '<tr>' +
            '<td>Entrata</td>'+
            '<td>'+value.Nome+'</td>'+
            '<td>'+value.Data+'</td>'+
            '<td>'+value.Importo+'</td>'+
            '<td>'+value.Categoria+'</td>'+
            '<td><button id="'+value.ID+'" type="button" class="btn btn-primary"><i class="fa fa-trash"></i></button></td>'+
            '</tr>';
        $('.resumeData').append(tabElem);
    });
    OUT.forEach((value, index)=>{
        var tabElem = '<tr>' +
            '<td>Uscita</td>'+
            '<td>'+value.Nome+'</td>'+
            '<td>'+value.Data+'</td>'+
            '<td>'+value.Importo+'</td>'+
            '<td>'+value.Categoria+'</td>'+
            '<td><button id="'+value.ID+'" type="button" class="btn btn-primary"><i class="fa fa-trash"></i></button></td>'+
            '</tr>';
        $('.resumeData').append(tabElem);
    })
}
