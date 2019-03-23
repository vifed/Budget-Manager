

$(document).ready(function() {
    // if(!userExixts()){
    //
    // }
    // else{
    //
    // }
    $("#saveBtn").click(function () {
        var   Nome= $("#inputNome").val().trim();
        var    Cognome= $("#inputCognome").val().trim();
        var   Email= $("#inputEmail").val().trim();
        //send data to DB
        $(location).attr("href", "../public/dashboard.html");
    });

});