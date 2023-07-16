$(document).ready(function () {
    var Empno = $('#tfdHdr_AuthEmployeeCode').val();
    $('#NoteNumber2').change(function () {
        Notenumberchanged($(this).val());
        $('#NoteNo').val($(this).val());
    });
    Notenumberchanged($('#NoteNumber2').val(), Empno);
    var btnDisplays = $('#submitcount').val();

    if (btnDisplays == 1) {
        $('#NoteNumber2').makeDisable();
        $('#Required').makeEnabled();
    } else {
        $('#NoteNumber2').makeEnabled();
        $('#Required').makeDisable();
    }
});
function Notenumberchanged(notenumber, Empno) {
    $('#TourFB').makeDisable();
    var noteCtrl = $('#NoteNumber2');
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
        noteCtrl.isValid();
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
               // $('#EmployeeNo').val('');
                //$('#EmployeeNo').isInvalid();
            });
        }
    });
        (async function () {
            const r1 = await GetEmployeeList(notenumber, Empno);
        })();
        (async function () {
            const r2 = await GetTPDetails(notenumber);
        })();
       
    } else { noteCtrl.isInvalid(); }
};
async function GetEmployeeList(notenumber, selectedvalue) {
    //if (selectedvalue == 0) {
    //    selectedvalue = '-1';
    //}
   getDropDownDataWithSelectedValue('EmployeeNo', 'Select Employee', '/Security/TFD/GetENTAuthEmployeeList?NoteNumber=' + notenumber, selectedvalue );
    if (selectedvalue * 1 > 0) {
        $('#EmployeeNo').isValid();
    }
};
async function GetTPDetails(notenumber) {
   // var notenumber = $('#NoteNumber').val();
    var TPDetailsDiv = $('#TPDiv');
    var TourDetailsDiv = $('#TourDiv');
    TourDetailsDiv.addClass('inVisible');
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
            VisibleRows($('#1').val(),1);
        },
        error: function (xhr, status) {
            TPDetailsDiv.html(xhr.responseText);
        }
    })
};
function VisibleRows(EmpNo, mid) {
    debugger;
    var TourDetailsDiv = $('#TourDiv');
    TourDetailsDiv.addClass('inVisible');
    var targetCtrl = $(VisibleRows.caller.arguments[0].target);
    var mID = 0;
    if (mid != 1) {
         mID = targetCtrl.attr('id');
    } else {
        mID = mid;
    }
   
    var PType = $('#PersonType_' + mID).html();
    var EmployeeNo = $('#AuthEmployeeCode_' + mID).html();
    // var PName = $('#PersonName_' + mID).html();
    var PersonCentre = $('#PersonCentre_' + mID).html();
    var NoteNo = $('#NoteNumber2 :selected').val();
    
   

    var dataSourceURL = '/TFD/DateWiseTourView?NoteNumbers=' + $.trim(NoteNo) + '&PersonType=' + $.trim(PType) + '&EmployeeNo=' + $.trim(EmployeeNo) + '&PersonCentre=' + $.trim(PersonCentre);
    $.ajax({
        url: dataSourceURL,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            TourDetailsDiv.removeClass('inVisible');
            TourDetailsDiv.html(result);
            $('#TourFB').makeEnabled();
        },
        error: function (xhr, status) {
            TourDetailsDiv.html(xhr.responseText);
        }
    })
};
function FinalSavedata() {
    var EntEntryDate= $('#tfdHdr_EntEntryDate').val();
    var EntEntryTime=$('#tfdHdr_EntEntryTime').val();
    var TourFromDate=$('#tfdHdr_TourFromDate').val();
    var TourToDate=$('#tfdHdr_TourToDate').val();
    var PurposeOfVisit=$('#tfdHdr_PurposeOfVisit').val();
    var AuthEmployeeCode = $('#EmployeeNo').val();
    var AuthEmployeeName = $('#EmployeeNo option:selected').text();
    var NoteNumber=$('#tfdHdr_NoteNumber').val();
    var RefNoteNumber = $('#NoteNo').val();
   
    var x = '{"NoteNumber":"' + NoteNumber + '","RefNoteNumber":"' + RefNoteNumber + '","EntEntryDate":"' + EntEntryDate + '","EntEntryTime": "' + EntEntryTime + '" ,"TourFromDate": "' + TourFromDate + '","TourToDate": "' + TourToDate + '", "PurposeOfVisit": "' + PurposeOfVisit + '", "AuthEmployeeCode": "' + AuthEmployeeCode + '", "AuthEmployeeName": "' + AuthEmployeeName + '"}';
    $.ajax({
        method: 'POST',
        url: '/TFD/Create',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'TFD Data Saved Successfully.',
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
                            var url = "/Security/TFD/Index";
                            window.location.href = url;
                        }
                    }
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed To Update Traveling Person Details.',
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

}
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    if (targetid == 'EmployeeNo') {
        $('#tfdHdr_AuthEmployeeCode').val($(target).val());
    }
   
    EnableSubmitBtn();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "EmployeeNo":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "Required":
            isvalid = validatectrl_ValidateLength(value);
            if (isvalid) {
                $('.content ').removeClass('border-red').addClass('border-green')
            }
            break;
            
    }
    return isvalid;
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
function EnableSubmitBtn() {
    var z = getDivInvalidCount('AllDiv');
    var btn = $('#submitcount').val();
    var SubmitBtn = $('#SubmitBtn');
    if (z <= 0 && btn == 1) {
        SubmitBtn.makeEnabled();
    } else {
        SubmitBtn.makeDisable();
    }
};




