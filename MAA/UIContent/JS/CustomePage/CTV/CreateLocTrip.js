function SaveData() {
    var notenumber = $('#NoteNo').val();
    var vehiclenumber = $('#VehicleNo').val();
    var x = '{"NoteNumber":"' + notenumber
        + '","VehicleNo":"' + vehiclenumber
        + '"}';
    PostDataInAjax('/CTV2/SetLocData', x).done(function (data) {
        HandleResponseOfPostRequest(data, "/Security/CTV2/CreateNote");
    });    
};


$(document).ready(function () {
    var btnsave = $('#btnSave');
    if ($('#IsSaveVisible').val() == 0) {
        btnsave.addClass('inVisible');
    } else { btnsave.removeClass('inVisible'); }
});