$(document).ready(function () {
    $('#tfdHdr_EntEntryDate').val('');
    $('#tfdHdr_EntEntryTime').val('');
    $('#tfdHdr_TourFromDate').val('');
    $('#tfdHdr_TourToDate').val('');
    $('#NoteNumber').change(function () {
        Notenumberchanged($(this).val());
    });
    Notenumberchanged($('#NoteNumber').val());

});
function Notenumberchanged(notenumber) {
    $('#TourFB').makeDisable();
    var noteCtrl = $('#NoteNumber');
    var selectedvalue = 0;
    if (notenumber != '') {
        $.ajax({
            url: '/TFD/GetTFDHeaderData',
            method: 'GET',
            data: { Notenumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#tfdHdr_EntEntryDate').val(item.tfdHdr.EntEntryDatestr);
                    $('#tfdHdr_EntEntryTime').val(item.tfdHdr.EntEntryTime);
                    $('#tfdHdr_TourFromDate').val(item.tfdHdr.TourFromDatestr);
                    $('#tfdHdr_TourToDate').val(item.tfdHdr.TourToDatestr);
                    $('#tfdHdr_PurposeOfVisit').val(item.tfdHdr.PurposeOfVisit);
                    $('#TourFB').makeEnabled();
                });
            }
        });
        (async function () {
            const r1 = await GetEmployeeList(notenumber, selectedvalue);
        })();
        (async function () {
            const r2 = await GetTPDetails(notenumber);
        })();

    } else {  }
};
async function GetEmployeeList(notenumber, selectedvalue) {
    getDropDownDataWithSelectedValue('EmployeeNo', 'Select Employee', '/Security/TFD/GetENTAuthEmployeeList?NoteNumber=' + notenumber, selectedvalue);

}
async function GetTPDetails(notenumber) {
    // var notenumber = $('#NoteNumber').val();
    $('.CheckList').prop('checked', false);
    var TPDetailsDiv = $('#TPDiv');
    var dataSourceURL = '/TFD/TPView?NoteNumber=' + notenumber;
    $.ajax({
        url: dataSourceURL,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            TPDetailsDiv.removeClass('inVisible');
            TPDetailsDiv.html(result);
            $("#1").prop('checked', true);
            VisibleRows(1);
        },
        error: function (xhr, status) {
            TPDetailsDiv.html(xhr.responseText);
        }
    })
};