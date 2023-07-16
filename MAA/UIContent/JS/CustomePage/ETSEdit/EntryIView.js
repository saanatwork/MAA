function NotenumberChanged() {
    //var TEBtn = $('#TourEditBtn');
    //var TDBtn = $('#TravelingDtlBtn');
    var notenumberCtrl = $('#NoteNumber');
    var notenumber = notenumberCtrl.val();
    var lblNoteDesc = $('#lblNoteDesc');
    var notetype = notenumber.substring(7, 10);
    if (notetype == 'EHG') {
        lblNoteDesc.html('Ref. Employee’s Travelling  Details & Vehicle Allotment (By HG)  –  ENTRY Note No.');
    }
    else if (notetype == 'EZB') {
        lblNoteDesc.html('Ref. Employees Travelling  Schedule Details – ENTRY (FOR NZB STAFF) Note No.');
    }
    else if (notetype == 'EMN') {
        lblNoteDesc.html('Ref. Employees Travelling  Schedule Details – ENTRY (FOR MFG. CENTERS RECORDED AT NZB) Note No.');
    }
    else { lblNoteDesc.html('Ref. Employees Travelling  Schedule Details – ENTRY (FOR MFG. CENTERS) Note No.'); }

    $.ajax({
        url: '/EntryI/GetNoteInfoForView',
        method: 'GET',
        data: { NoteNumber: notenumber},
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#NoteEntryDate').val(item.EntryDateDisplay);
                $('#NoteEntryTime').val(item.EntryTime);
                $('#CentreCodenName').val(item.CenterName);
                $('#AppStat').val(item.IsApprovedDisplay);
                $('#AppDateTime').val(item.AppDateTimeDisplay);
                $('#AppReason').val(item.NotAppReason);
                $('#ratStat').val(item.IsRatifiedDisplay);
                $('#RatDT').val(item.RetDateTimeDisplay);
                $('#ratReason').val(item.RetReason);
                $('#VehicleType').val(item.VehicleType);
                $('#AuthorisedEmpNonName').val(item.AuthorisedEmpNonName);
                $('#DesgCodenNameOfAE').val(item.DesgCodenNameOfAE);
                if (item.IsApprovedDisplay == '-') {
                    $('#AppDivE1').addClass('alert-danger').removeClass('alert-success');
                } else { $('#AppDivE1').removeClass('alert-danger').addClass('alert-success'); }
                if (item.IsRatifiedDisplay == '-') {
                    $('#RatDivE1').addClass('alert-danger').removeClass('alert-success');
                } else { $('#RatDivE1').removeClass('alert-danger').addClass('alert-success'); }
                var TPDetailsDiv = $('#TPDiv');
                var dataSourceURL = '/EntryI/TPView?NoteNumber=' + notenumber;
                $.ajax({
                    url: dataSourceURL,
                    contentType: 'application/html; charset=utf-8',
                    type: 'GET',
                    dataType: 'html',
                    success: function (result) {
                        TPDetailsDiv.removeClass('inVisible');
                        TPDetailsDiv.html(result);
                    },
                    error: function (xhr, status) {
                        TPDetailsDiv.html(xhr.responseText);
                    }
                })
            });
        }
    });
    //$('#backbtnactive').val(1);
    //EnableSubmitBtn();
    //$('#VASubmitBtnActive').val();
    //$('#IsVABtnEnabled').val();
};
$(document).ready(function () {
    $('#mNoteNumber').val($('#NoteNumber').val());
    NotenumberChanged();
});
$(document).ready(function () {
    $('#btnBack').click(function () {
        var backurl = "/Security/EntryI/Index";
        window.location.href = backurl;
    });
});