
$(document).ready(function() {

    getData();
    
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
    $.post('/getEntrate', (res) =>{
        renderIN(res);
    });

}

function renderIN(IN) {
    IN.forEach((value, index)=>{
        var tabElem = '<tr>' +
            '<td id="type">Entrata</td>'+
            '<td>'+value.Nome+'</td>'+
            '<td>'+value.Data+'</td>'+
            '<td>'+value.Importo+'</td>'+
            '<td>'+value.Categoria+'</td>'+
            '<td><button id="'+value.ID+'" type="button" class="btn btn-primary"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>'+
            '</tr>';
        $('.resumeData').append(tabElem);
    });

    $.post('/getUscite', (res2) =>{
           renderOUT(res2);
    })
}

function renderOUT(res2) {
    res2.forEach((value, index)=>{
        var tabElem = '<tr>' +
            '<td id="type">Uscita</td>'+
            '<td>'+value.Nome+'</td>'+
            '<td>'+value.Data+'</td>'+
            '<td>'+value.Importo+'</td>'+
            '<td>'+value.Categoria+'</td>'+
            '<td><button id="'+value.ID+'" type="button" class="btn btn-primary"  onclick="deltupla(this.id)"><i class="fa fa-trash"></i></button></td>'+
            '</tr>';
        $('.resumeData').append(tabElem);
    })
}


function deltupla(id) {
    $("#modaldel").trigger('click');
    $("#safedel-btn").on('click', function () {
        var myid = $("#mytable td").getElementById("type");
        console.log("mioid" , myid);
        var typeOF = document.getElementById("type").innerHTML;
        // $.post("/delElem", {tipo: typeOF, ID:id}, ()=>{
        //     window.location.reload();
        // })
    });
}