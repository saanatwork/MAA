$(document).ready(function () {
    allvalclear();
    $('#NoteNumber').change(function () {
        Notenumberchanged($(this).val());
        $('#TFBD').makeDisable();
        $('#HCVD').makeDisable();
    });
    Notenumberchanged($('#NoteNumber').val());
    $('#NoteNo').val($('#NoteNumber').val())
    var btnDisplays = $('#submitcount').val();
    if (btnDisplays > 0) {
        $('#NoteNumber').makeDisable();
        $('#IsApproves').removeAttr('disabled', 'disabled');
        $('#ApproveReason').removeAttr('disabled', 'disabled');
    } else {
        $('#NoteNumber').makeEnabled();
    }
    var btnenable = $('#btnEnable').val();
    if (btnenable==1) {
        $('#TFBD').makeEnabled();
    }
});
function allvalclear() {
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
}
function Notenumberchanged(notenumber) {
  //  $('#TourFB').makeDisable();
    var noteCtrl = $('#NoteNumber');
    $('#NoteNo').val(notenumber);
    var lblNoteDesc = $('#lblNoteDesc');
    var selectedvalue = 0;
    if (notenumber != '') {
       
        $.ajax({
            url: '/TFD/GetTFDHdrData',
            method: 'GET',
            data: { Notenumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    var notetype = item.tfdHdr.RefNoteNumber.substring(7, 10);
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

                    $('#tfdHdr_EntryDatestr').val(item.tfdHdr.EntryDatestr);
                    $('#tfdHdr_EntryTime').val(item.tfdHdr.EntryTime);
                    $('#tfdHdr_RefNoteNumber').val(item.tfdHdr.RefNoteNumber);
                    $('#tfdHdr_AuthEmployeeName').val(item.tfdHdr.AuthEmployeeName);
                    $('#tfdHdr_EntEntryDatestr').val(item.tfdHdr.EntEntryDatestr);
                    //var str = item.tfdHdr.EntEntryTime;
                    //var lastIndex = str.lastIndexOf(".");
                    //str = str.substring(0, lastIndex);
                    $('#tfdHdr_EntEntryTime').val(item.tfdHdr.EntEntryTime);
                    $('#tfdHdr_TourFromDatestr').val(item.tfdHdr.TourFromDatestr);
                    $('#tfdHdr_TourToDatestr').val(item.tfdHdr.TourToDatestr);
                    $('#tfdHdr_PurposeOfVisit').val(item.tfdHdr.PurposeOfVisit);
                    $('#tfdHdr_AuthEmployeeCode').val(item.tfdHdr.AuthEmployeeCode);
                    noteCtrl.isValid();
                    (async function () {
                        const r2 = await GetTPDetails(item.tfdHdr.RefNoteNumber, item.tfdHdr.AuthEmployeeCode);
                    })();
                });
            }
        });
       
      

    } else { noteCtrl.isInvalid(); }
};
async function GetTPDetails(notenumber,empno) {
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
            $('#1').prop('checked', true);
            $('#1').add('selected-row');
            (async function () {
                const r6 = await GetDateWiseTour(notenumber, empno);
            })(); 
        },
        error: function (xhr, status) {
            TPDetailsDiv.html(xhr.responseText);
        }
    })
};
async function GetDateWiseTour(notenumber, empno) {
   // alert(notenumber);
   // var NoteNo = $('#tfdHdr_RefNoteNumber').val();
    var TourDetailsDiv = $('#TourDiv');
    TourDetailsDiv.addClass('inVisible');
    var Employeeno = $('tfdHdr_AuthEmployeeCode').val();
    var dataSourceURL = '/TFD/ApprovalDateWiseTourView?NoteNumbers=' + $.trim(notenumber) + '&EmployeeNo=' + empno;
    $.ajax({
        url: dataSourceURL,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            TourDetailsDiv.removeClass('inVisible');
            TourDetailsDiv.html(result);
            (async function () {
                const r8 = await VisibleRows($('#1').val());
            })();
        },
        error: function (xhr, status) {
            TourDetailsDiv.html(xhr.responseText);
        }
    })
}
function SaveDataClicked() {
    var IsApproves = $('#IsApproves').val();
    var ApproveReason = $('#ApproveReason').val();
    var NoteNumber = $('#NoteNumber').val();
    var TravD = getRecordsFromTableV2('DateTbl');
    var x = '{"ApproveReason":"' + ApproveReason + '","IsApproves":"' + IsApproves + '","NoteNumber":"' + NoteNumber + '","TFdDateWise":' + TravD + '}';
    $.ajax({
        method: 'POST',
        url: '/TFD/SetFinalApprovalSubmit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Tour FeedBack Details Saved Successfully.',
                        setTimeout: 5000,
                        icon: 'success',
                        customClass: 'swal-wide',
                        buttons: {
                            confirm: 'Ok'
                        },
                        confirmButtonColor: '#2527a2',
                    }).then(callback);
                    function callback(result) {
                        if (result.value) {
                            var url = "/Security/TFD/ApprovalIndex";
                            window.location.href = url;
                        }
                    }
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed To Update FeedBack Details.',
                        icon: 'question',
                        customClass: 'swal-wide',
                        buttons: {
                            confirm: 'Ok'
                        },
                        confirmButtonColor: '#2527a2',
                    });
                }
            });
        },
    });

};
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val(), $(tblRow).attr('id'));
    if (isvalid) { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }

    EnableSubmitBtn();
};
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    if (targetid == 'IsApproves') {
        if ($(target).val() == 1) {
            $('#ApproveReason').makeDisable();
            $('#ApproveReason').val('');
            $('#ApproveReason').removeClass('is-invalid').removeClass('is-valid');
        } else {
            $('#ApproveReason').makeEnabled()
            $('#ApproveReason').isInvalid();
        }
    }
    EnableSubmitBtn();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "IsApproves":
            isvalid = validatectrl_YesNoComboApproval(value);
            break;
        case "ApproveReason":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "IsApprovals":
            isvalid = validatectrl_YesNoComboApproval(value);
            break;
        case "ApprovalRemark":
            isvalid = validatectrl_ValidatestringLength(value);
            if (value.length > 1 && WordCount(value) <= 100) { isvalid = true; }
            break;

    }
    return isvalid;
};
function validatectrl_YesNoComboApproval(value) {

    if (value * 1 >= 0) {
        return true;
    } else { return false; }
};
function validatectrl_ValidatestringLength(value) {
    if (value != "-1") {
        return true;
    } else { return false; }
};
function validatectrl_ValidateLength(value) {

    if (value > 0) {
        return true;
    } else { return false; }
};
function validatectrl_YesNoCombo(value) {

    if (value * 1 > 0) {
        return true;
    } else { return false; }
};
function EnableSubmitBtn() {
    var z = getDivInvalidCount('AllData');
    var btn = $('#submitcount').val();
    var SubmitBtn = $('#SubmitBtn');
    if (z <= 0 && btn == 1) {
        SubmitBtn.makeEnabled();
    }

   
};
function Btnclear() {
    allvalclear();
    $('#TourDiv').addClass('inVisible');
    $('#TPDiv').addClass('inVisible');
    $('#NoteNumber').val('').isInvalid();
    $('#IsApproves').val('').isInvalid();
    $('#ApproveReason').val('').isInvalid();
    $('#ApproveReason').removeAttr('disabled');
    $('#HCVD').makeDisable();
    $('#TFBD').makeDisable();
    Notenumberchanged($('#NoteNumber').val(''));
}
function keypressCountWord(e) {
    var target = keypressCountWord.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target).val();
    if (targetCtrl.length > 1 && WordCount(targetCtrl) >= 100) {
        $(target).preventTypying();
    }
}
async function VisibleRows(EmpNo) {
    $('.allperson').each(function () {
        $(this).addClass('inVisible');
    });
    $('#EmployeeNo').val(EmpNo);
    $('#DateTbl').removeClass('inVisible');
    $('.'+EmpNo).each(function () {
        $(this).removeClass('inVisible');
    });
    $('#HCVD').makeEnabled();
 //   $('#TFBD').makeEnabled();
}
