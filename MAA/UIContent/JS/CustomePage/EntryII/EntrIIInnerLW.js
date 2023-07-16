function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    //alert(targetid);
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    SubmitButtonStat();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "LWVRemarks":
            if (value.length > 1 && WordCount(value) <= 100) {
                if (IsAlphaNumericWithSpace(value)) {
                    isvalid = true;
                }
            }
            break;
        case "DriverNoForManagement":
            if (value >= 1) { isvalid = true; }
            break;
    }


    return isvalid;
};
function SubmitButtonStat() {
    var isactive = true;
    var myBtn = $('#btnSubmit');
    var x = $('#VDTable').find('.is-invalid').length;
    if (x > 0) { isactive = false; }

    if (isactive) { myBtn.makeEnabled(); } else { myBtn.makeDisable(); }
};

function KMChanged() {
    var targetCtrl = $(KMChanged.caller.arguments[0].target);
    var timerid = targetCtrl.attr('id');
    var datadivid = 'V' + timerid;
    $('#' + datadivid).html(targetCtrl.val());
    if (targetCtrl.val() > 0) { targetCtrl.isValid(); }
    else { targetCtrl.isInvalid(); }
};
function EnableSubmitBtn() {
    var btnsubmit = $('#btnSubmit');
    var opt1 = $('#Option1').val();
    if (opt1 == 1) {
        btnsubmit.makeEnabled();
    } else {
        btnsubmit.makeDisable();
    }
};
function Option1Changed() {
    var optiondiv = $('#Option1Div');
    var optionCtrl = $('#Option1');
    if (optionCtrl.val() == 1) {
        optiondiv.isGreen();
        optionCtrl.isValid();
    } else {
        optionCtrl.isInvalid();
        optiondiv.isRed();
    }
    EnableSubmitBtn();
};
function RFIDInChanged() {
    var targetCtrl = $('#RFIDCardIn');
    var divCtrl = $('#VTourInTimeCtrl');
    var timCtrl = $('#TourInTimeCtrl');
    var RFIDDate = $('#SchFromDate').val();
    var RFIDNo = targetCtrl.val();
    if (targetCtrl.val() != '') {
        targetCtrl.isValid();
        $('#RFIDInDiv').html(RFIDNo);
        divCtrl.removeClass('inVisible');
        timCtrl.addClass('inVisible');
        $.ajax({
            url: '/EntryII/GetRFIDPunchTime',
            method: 'GET',
            data: { RFIDNumber: RFIDNo, PunchDate: RFIDDate },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    divCtrl.html(item.PunchInStr);
                });
            }
        });
    }
    else {
        //targetCtrl.isInvalid();
        $('#RFIDInDiv').html('NA');
        divCtrl.addClass('inVisible');
        timCtrl.removeClass('inVisible');
    }
};
function RFIDOutChanged() {
    var targetCtrl = $('#RFIDCardOut');
    var divCtrl = $('#VTourOutTimeCtrl');
    var timCtrl = $('#TourOutTimeCtrl');
    var RFIDDate = $('#SchToDate').val();
    var RFIDNo = targetCtrl.val();
    if (targetCtrl.val() != '') {
        targetCtrl.isValid();
        $('#RFIDOutDiv').html(targetCtrl.val());
        divCtrl.removeClass('inVisible');
        timCtrl.addClass('inVisible');
        $.ajax({
            url: '/EntryII/GetRFIDPunchTime',
            method: 'GET',
            data: { RFIDNumber: RFIDNo, PunchDate: RFIDDate },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    divCtrl.html(item.PunchOutStr);
                });
            }
        });
    }
    else {
        //targetCtrl.isInvalid();
        divCtrl.addClass('inVisible');
        timCtrl.removeClass('inVisible');
        $('#RFIDOutDiv').html('NA');
    }
    
};
function TimeInCtrlBlured(){
    var targetCtrl = $(TimeInCtrlBlured.caller.arguments[0].target);
    var timerid = targetCtrl.attr('id');
    var datadivid = 'V' + timerid;
    $('#' + datadivid).html(targetCtrl.val());
    //alert(targetCtrl.val());
    if (targetCtrl.val() != '') { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }
}
function LNfireSweetAlert() {
    //alert('Ok');
    Swal.fire({
        title: 'Driver Extra Punching',
        text: "Enter Late Night Punch For Driver",
        icon: 'success',
        html: `<div style="text-align:left;">
                            <div class="form-group">
                                <label class="swal-label"></label>
                                <input id="LNP" type="text" class="form-control timePicker"
                                                           onblur="ATIBlured()"
                                                           placeholder="Select Time">
                            </div>
                        </div>`,
        cancelButtonClass: 'btn-cancel',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Submit',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(callback);
    function callback(result) {
        if (result.value) {
            var punchtime = $('#LNP').val();
        }
    }
}
function VisiblePersonRow(personid) {
    //alert(personid);
    $('#TPDtlTable tbody tr').each(function () {
        $(this).addClass('inVisible');
    });
    $('.M_' + personid).each(function () {
        $(this).removeClass('inVisible');
    });
    $('#TPTable tbody tr').each(function () {
        $(this).removeClass('selected-row');
    });
    $('#tr_' + personid).each(function () {
        $(this).addClass('selected-row');
    });
};
function TPSelected() {
    var targetCtrl = $(TPSelected.caller.arguments[0].target);
    VisiblePersonRow(targetCtrl.attr('id'));
};
function ATIBlured(mvalue)
{
    var targetCtrl = $(ATIBlured.caller.arguments[0].target);
    var timerid = targetCtrl.attr('id');
    var datadivid = 'V' + timerid;
    $('#' + datadivid).html(targetCtrl.val());
    //LNfireSweetAlert();
    //alert(mvalue);
}
function ATIBluredEM() {
    var targetCtrl = $(ATIBluredEM.caller.arguments[0].target);
    var timerid = targetCtrl.attr('id');
    var datadivid = 'V' + timerid;
    $('#' + datadivid).html(targetCtrl.val());
    //alert(targetCtrl.val());
};
function ATIBluredLN() {
    var targetCtrl = $(ATIBluredLN.caller.arguments[0].target);
    var timerid = targetCtrl.attr('id');
    var datadivid = 'V' + timerid;
    $('#' + datadivid).html(targetCtrl.val());
};
$(document).ready(function () {
    var defPerson = $('#DefaultPersonID').val();
    var defPersonType = $('#DefaultPersonType').val();
    //alert(defPerson);
    $('#' + defPerson + '_' + defPersonType).attr('checked', true);
    VisiblePersonRow(defPerson + '_' + defPersonType);
    RFIDInChanged();
    RFIDOutChanged();
});
$(document).ready(function () {
    $('#btnSubmit').click(function () {
        var notenumber = $('#NoteNumber').val();
        var tblPersonRecords = '';
        var tblDateWiseRecords = '';
        var tblVDtls = '';
        tblPersonRecords = getRecordsFromTableV2('TPTable');
        tblDateWiseRecords = getRecordsFromTableV2('TPDtlTable');
        tblVDtls = getRecordsFromTableV2('VDTable');
        var x = '{"NoteNumber":"' + notenumber
            + '","DateWiseDetails":' + tblDateWiseRecords
            + ',"VDetails":' + tblVDtls+',"TPersons":'
            + tblPersonRecords + '}';
        //alert(tblDateWiseRecords);
        $.ajax({
            method: 'POST',
            url: '/EntryII/SaveLWOutIn',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: x,
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool == true) {
                        Swal.fire({
                            title: 'Confirmation',
                            text: 'Data Saved Successfully.',
                            icon: 'success',
                            customClass: 'swal-wide',
                            buttons: {
                                confirm: 'Ok'
                            },
                            confirmButtonColor: '#2527a2',
                        }).then(callback);
                        function callback(result) {
                            if (result.value) {
                                var url = "/Security/EntryII/LWCreate";
                                window.location.href = url;
                            }
                        }
                    } else {
                        Swal.fire({
                            title: 'Confirmation',
                            text: 'Failed To Save Date Wise Tour Details.',
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
    });
});
$(document).ready(function () {
    var ismanagement = $('#IsManagementPerson').val();
    var RFIDInCtrl = $('#RFIDCardIn');
    var RFIDOutCtrl = $('#RFIDCardOut');
    if (ismanagement == 1) {
        RFIDInCtrl.makeDisable();
        RFIDOutCtrl.makeDisable();
    } else {
        RFIDInCtrl.makeEnabled();
        RFIDOutCtrl.makeEnabled();
    }
});
$(document).ready(function () {
    //var kmInCtrl = $('#cActualKmIn');
    var rfidoutCtrl = $('#RFIDCardOut');
    var rfidinCtrl = $('#RFIDCardIn');
    var tOuttimeCtrl = $('#TourOutTimeCtrl');
    var tIntimeCtrl = $('#TourInTimeCtrl');
    var kmoutCtrl = $('#KMOutCtrl');
    var kminCtrl = $('#KMInCtrl');
    var isOut = $('#IsOutSaved').val();
    var isIn = $('#IsInSaved').val();
    //alert(isOut + ' - ' + isIn);
    var isactive = 'True'; //$('#VehicleDetails_IsActive').val();
    if (isactive == 'True') {
        if (isIn == 'True') {
            tIntimeCtrl.makeDisable();
            rfidinCtrl.makeDisable();
            kminCtrl.makeDisable()
            if (isOut == 'True') {
                rfidoutCtrl.makeDisable();
                tOuttimeCtrl.makeDisable();
                kmoutCtrl.makeDisable();
                //kmInCtrl.makeDisable();
            }
            else {
                rfidoutCtrl.makeEnabled();
                tOuttimeCtrl.makeEnabled();
                kmoutCtrl.makeEnabled();
            }
        }
        else {
            tOuttimeCtrl.makeDisable();
            rfidoutCtrl.makeDisable();
            rfidinCtrl.makeEnabled();
            tIntimeCtrl.makeEnabled();
            //kmInCtrl.makeDisable();
            kmoutCtrl.makeDisable();
            kminCtrl.makeEnabled();
        }
    }
    
});