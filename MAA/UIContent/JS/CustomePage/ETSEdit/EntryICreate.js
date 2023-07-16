function GetTPDetails() {
    var notenumber = $('#NoteNumber').val();
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
};
function NotenumberChanged(mVal) {
    //var TEBtn = $('#TourEditBtn');
    var TDBtn = $('#TravelingDtlBtn');
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

    if (notenumber != '') {
        notenumberCtrl.isValid();
        TDBtn.makeEnabled();
    } else { notenumberCtrl.isInvalid(); TDBtn.makeDisable(); }
    $.ajax({
        url: '/EntryI/GetNoteInfo',
        method: 'GET',
        data: { NoteNumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#SchFromDate').val(item.SchFromDate);
                $('#SchToDate').val(item.SchToDate);
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
                //alert(item.SchFromDate + ' - ' + $('#SchFromDate').val());
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
    EnableSubmitBtn();
    $('#VASubmitBtnActive').val();
    $('#IsVABtnEnabled').val();
    if (mVal == 1) { $('#IsVABtnEnabled').val(0); $('#VABtn').makeDisable(); }
};
function EnableSubmitBtn() {
    var submitBtn = $('#btnSubmit');
    var isenabled = false;
    if ($('#NoteNumber').val() != '') {
        if ($('#VASubmitBtnActive').val() == 1) {
            isenabled=true;
        }
    }
    if (isenabled) { submitBtn.makeEnabled(); } else { submitBtn.makeDisable(); }
};
$(document).ready(function () {
    NotenumberChanged(0);
    $('#btnBack').click(function () {
        var backbtnactive = $('#VASubmitBtnActive').val();
        var backurl = "/Security/EntryI/Index";
        if (backbtnactive == 1) {
            Swal.fire({
                title: 'Confirmation',
                text: "Are You Sure Want to Go Back?",
                icon: 'question',
                customClass: 'swal-wide',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonClass: 'btn-cancel',
                confirmButtonColor: '#2527a2',
                showCancelButton: true,
            }).then(callback);
            function callback(result) {
                if (result.value) {
                    window.location.href = backurl;
                }
            }
        }
        else {
            window.location.href = backurl;
        }
    });
    var vabtn = $('#VABtn');
    if ($('#IsVABtnEnabled').val() == 1) {
        vabtn.makeEnabled();
    } else { vabtn.makeDisable();}
});