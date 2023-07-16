$(document).ready(function () {
    $('#NoteNo').change(function () {

        Notenumberchanged($(this).val());
        ActivateOutbtn($(this).val());
    });
    Notenumberchanged($('#NoteNo').val());

    var issubmit = $('#ISSubmitActive').val();
    var driversame = $('#driversame');
    var vehicledriver = $('#vehicledriver');
    var NoteNo = $('#NoteNo');
    var NoteDisplay = $('#NoteDisplay');
    if (issubmit == 1) {
        NoteNo.addClass('inVisible');
        NoteDisplay.removeClass('inVisible');
        NoteDisplay.val(NoteNo.val());
        driversame.removeAttr('disabled');
        vehicledriver.removeAttr('disabled');
    }
});
function Notenumberchanged(notenumber) {
    var that = $('#NoteNo');
    $.ajax({
        url: '/CTV/getDataFromNote',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#CenterCode').val(item.CentreCodenName);
                $('#FortheMonthnYear').val(item.FortheMonthnYear);
                //$('#txtFromDate').val(item.FromDateStr);
                //$('#txtToDate').val(item.ToDateStr);
                $('#VehicleNo').val(item.Vehicleno);
                $('#VehicleType').val(item.VehicleType);
                $('#ModelName').val(item.ModelName);
                $('#CTVEntryDate').val(item.EntryDatestr);
                $('#CTVEntryTime').val(item.EntryTime);
                //$('#txtDriverNonName').val(item.DriverNonName);
                //if (item.ApprovalFor == 0 || item.ApprovalFor == 2) { osbtn.removeAttr('disabled') }
                //else if (item.ApprovalFor == 1) { lsbtn.removeAttr('disabled') }
                // that.isValid();
                that.addClass('is-valid').removeClass('is-invalid');
            });
        }
    });
};
function ActivateOutbtn(notenumber) {

    var btnOut = $('#btnCMOD');
    var btnIn = $('#btnCMID');
    $.ajax({
        // url: '/MaterialGatePass/CheckAvailableNoteNoforOut',
        url: '/MaterialGatePass/getMGPButtonStatus',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            if (data.OutButtonActive == true) {
                btnOut.removeAttr('disabled');
                btnIn.attr('disabled', 'disabled');}
            else if (data.IsGVMRSubmit == true) {
                btnOut.attr('disabled', 'disabled');
                btnIn.attr('disabled', 'disabled');
                MyAlert(5, 'Please Check GVMR Details For Vehicle & Material In Process..!');}
            else if (data.IsGVMRSubmit == false) {
                if (data.InButtonActive == true) {
                    btnIn.removeAttr('disabled');
                    btnOut.attr('disabled', 'disabled');
                }
                else {
                    btnOut.attr('disabled', 'disabled');
                    btnIn.attr('disabled', 'disabled');}
            } else {
                btnOut.attr('disabled', 'disabled');
                btnIn.attr('disabled', 'disabled');
            }

            //if (data.length > 0) {
            //  $(data).each(function (index, item) {
            //     alert(item.OutButtonActive + '/' + item.InButtonActive)
            //btnOut.removeAttr('disabled');
            //btnIn.removeAttr('disabled');
            //Comment for Testing out details only 
            //if (item.OutActive == false && item.InActive == false) {
            //    btnOut.removeAttr('disabled');
            //    btnIn.attr('disabled', 'disabled');
            //} else if (item.OutActive == true && item.InActive == false) {
            //    btnIn.removeAttr('disabled');
            //    btnOut.attr('disabled', 'disabled');       
            //} else if (item.OutActive == true && item.InActive == true) {
            //   // btnOut.removeAttr('disabled');
            //    btnOut.attr('disabled', 'disabled');
            //    btnIn.attr('disabled', 'disabled');
            //}
            //else {
            //    btnOut.removeAttr('disabled');
            //    btnIn.attr('disabled', 'disabled');
            //}
            // });
            //} else {
            //          btnOut.attr('disabled', 'disabled');
            //          btnIn.attr('disabled', 'disabled');
            //     }

        }

    });
};
function btnClearClicked() {
    var btnOut = $('#btnCMOD');
    var btnIn = $('#btnCMID');
    $('.canclear').each(function () {
        $(this).val('');
        $('#NoteNo').isInvalid();
        $('#driversame').isInvalid();
        $('#vehicledriver').isInvalid();
    });
    btnOut.makeDisable();
    btnIn.makeDisable();
    //$('#submitConfirmation').removeClass('is-valid').addClass('is-invalid');
    //$('#Vehicleno').removeClass('is-valid').addClass('is-invalid');
    //$('#divErrorLVS').addClass('inVisible');
    //$('#divErrorOTS').addClass('inVisible');
    //$('#divError').addClass('inVisible');
    //$('#btnLVT').attr('disabled', 'disabled');
    //$('#btnOVT').attr('disabled', 'disabled');
    //var noteno = $('#NoteNo').val();
    //$.ajax({
    //    url: '/CTV/RemoveNoteDetails',
    //    method: 'GET',
    //    data: { NoteNumber: noteno },
    //    dataType: 'json',
    //    success: function (data) {
    //        $(data).each(function (index, item) {

    //        });
    //    }
    //});
};
function activateSubmitBtn() {
    var issubmit = $('#ISSubmitActive').val();
    var btnSubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnSubmit.attr('disabled', 'disabled');
    } else {
        if (issubmit == 1) {
            btnSubmit.removeAttr('disabled');
        } else {
            btnSubmit.attr('disabled', 'disabled');
        }
    }
};
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var targetvalue = $(target).val();
    var isvalid = validatectrl(targetid, targetvalue);

    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    activateSubmitBtn();
};
function validatectrl(targetid, mvalue) {
    var isvalid = false;
    if (targetid == 'vehicledriver' || targetid == 'driversame') {
        if (mvalue == 'Yes') {
            if (targetid == 'vehicledriver') {
                $('.contents').removeClass('border-red').addClass('border-green');
            }
            if (targetid == 'driversame') {
                $('.content').removeClass('border-red').addClass('border-green');
            }

            isvalid = true;
        } else {
            if (targetid == 'vehicledriver') {
                $('.contents').removeClass('border-green').addClass('border-red');
            }
            if (targetid == 'driversame') {
                $('.content').removeClass('border-green').addClass('border-red');
            }

        }
    }
    return isvalid;
};