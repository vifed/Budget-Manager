
$(document).ready(function() {
    
    fillGrid();
    
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

        console.log("dati in input:  ", newUscita);

        $.post('/newOUT', newUscita, () =>{
            alert("Uscita aggiunta con successo!");
            location.reload();
        });
    })

});


function fillGrid() {
    
}