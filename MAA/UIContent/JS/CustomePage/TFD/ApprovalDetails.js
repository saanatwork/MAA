$(document).ready(function () {

    $('#tfdHdr_EntryDatestr').val('');
    $('#tfdHdr_EntryTime').val('');
    $('#tfdHdr_RefNoteNumber').val('');
    $('#tfdHdr_AuthEmployeeName').val('');
    $('#tfdHdr_EntEntryDatestr').val('');
    $('#tfdHdr_EntEntryTime').val('');
    $('#tfdHdr_TourFromDatestr').val('');
    $('#tfdHdr_TourToDatestr').val('');
    $('#tfdHdr_PurposeOfVisit').val('');
    $('#tfdHdr_AuthEmployeeCode').val('');

    $('#NoteNumber').change(function () {
        Notenumberchanged($(this).val());
    });
    Notenumberchanged($('#tfdHdr_NoteNumber').val());
    var btnDisplays = $('#submitcount').val();
    if (btnDisplays > 0) {
        $('#tfdHdr_NoteNumber').makeDisable();
    } else {
        $('#tfdHdr_NoteNumber').makeEnabled();
    }
});
function Notenumberchanged(notenumber) {
    //  $('#TourFB').makeDisable();
    var noteCtrl = $('#tfdHdr_NoteNumber');
    var selectedvalue = 0;
    if (notenumber != '') {
        noteCtrl.isValid();
        $.ajax({
            url: '/TFD/GetTFDHdrData',
            method: 'GET',
            data: { Notenumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#tfdHdr_EntryDatestr').val(item.tfdHdr.EntryDatestr);
                    $('#tfdHdr_EntryTime').val(item.tfdHdr.EntryTime);
                    $('#tfdHdr_RefNoteNumber').val(item.tfdHdr.RefNoteNumber);
                    $('#tfdHdr_AuthEmployeeName').val(item.tfdHdr.AuthEmployeeName);
                    $('#tfdHdr_EntEntryDatestr').val(item.tfdHdr.EntEntryDatestr);
                    $('#tfdHdr_EntEntryTime').val(item.tfdHdr.EntEntryTime);
                    $('#tfdHdr_TourFromDatestr').val(item.tfdHdr.TourFromDatestr);
                    $('#tfdHdr_TourToDatestr').val(item.tfdHdr.TourToDatestr);
                    $('#tfdHdr_PurposeOfVisit').val(item.tfdHdr.PurposeOfVisit);
                    $('#tfdHdr_AuthEmployeeCode').val(item.tfdHdr.AuthEmployeeCode);

                    // $('#TourFB').makeEnabled();
                    (async function () {
                        const r2 = await GetTPDetails(item.tfdHdr.RefNoteNumber);
                    })();
                });
            }
        });



    } else { noteCtrl.isInvalid(); }
};
async function GetTPDetails(notenumber) {
    // var notenumber = $('#NoteNumber').val();
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
            //(async function () {
            //    const r6 = await GetDateWiseTour(notenumber);
            //})();
        },
        error: function (xhr, status) {
            TPDetailsDiv.html(xhr.responseText);
        }
    })
};
//async function GetDateWiseTour(notenumber) {
//    // alert(notenumber);
//    // var NoteNo = $('#tfdHdr_RefNoteNumber').val();
//    var TourDetailsDiv = $('#TourDiv');
//    TourDetailsDiv.removeClass('inVisible');
//    var dataSourceURL = '/TFD/DateWiseTourView?NoteNumbers=' + $.trim(notenumber);
//    $.ajax({
//        url: dataSourceURL,
//        contentType: 'application/html; charset=utf-8',
//        type: 'GET',
//        dataType: 'html',
//        success: function (result) {
//            TourDetailsDiv.html(result);
//        },
//        error: function (xhr, status) {
//            TourDetailsDiv.html(xhr.responseText);
//        }
//    })
//}