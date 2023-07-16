function Notenumberchanged(notenumber) {
    $('#NoteNumber').val(notenumber);
    $('#AcceptCmb').val('');
    $('#Section3').isRed();
    var that = $('#NoteNo');
    var lsbtn = $('#btnLVT');
    var osbtn = $('#btnOVT');
    var appCombo = $('#IsApprovedComboValue');
    var disappreason = $('#DisapprovalReason');
    var tabclicked = $('#IsTabClicked').val();
    lsbtn.makeSLUDisable();
    osbtn.makeSLUDisable();
    disappreason.makeSLUDisable();
    appCombo.makeSLUDisable();
    appCombo.val(-1).isInvalid();
    that.isInvalid();
    $('#IsApprovedComboValue option:selected').removeAttr("selected");
    if (notenumber.length > 1) {
        that.isValid();
        $('#IsBackDenied').val(1);
        if (tabclicked == 1) {
            appCombo.makeSLUEnable();
        } else { appCombo.makeSLUDisable(); }
    }
    $.ajax({
        url: '/CTV/getDataFromNote',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#txtCenterCodenName').val(item.CentreCodenName);
                $('#txtForTheMonthYear').val(item.FortheMonthnYear);
                $('#txtFromDate').val(item.FromDateStr);
                $('#txtToDate').val(item.ToDateStr);
                $('#txtVehicleNo').val(item.Vehicleno);
                $('#txtVehicleType').val(item.VehicleType);
                $('#txtModelName').val(item.ModelName);
                $('#txtDriverNonName').val(item.DriverNonName);
                $('#cNoteDate').val(item.EntryDatestr);
                $('#cNoteTime').val(item.EntryTime);
                if (item.ApprovalFor == 0 || item.ApprovalFor == 2) { osbtn.makeSLUEnable(); }
                else if (item.ApprovalFor == 1) { lsbtn.makeSLUEnable(); }
                else if (item.ApprovalFor == 3) { lsbtn.makeSLUEnable(); osbtn.makeSLUEnable(); }
                $('#AcceptCmb').val(1);
                $('#Section3').isGreen();
                ActivateSubmit();
            });

        }
    });
};
function ValidateReason() {
    $('#IsBackMsg').val('1');
    var rctrl = $('#DisapprovalReason');
    if (rctrl.val().length > 2) { rctrl.isValidCtrl(); } else { rctrl.isInvalidCtrl(); }
    ActivateSubmit();
};
function ActivateSubmit() {
    var isothviewed = $('#IsOthViewed').val();
    var islvviewed = $('#IsLVViewed').val();
    var btnsubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnsubmit.attr('disabled', 'disabled');
    } else {
        if (isothviewed == 1 || islvviewed == 1) {
            btnsubmit.makeSLUEnable();
        }        
    }
};
function ApproveStatusChanged() {
    var appstatctrl = $('#IsApprovedComboValue');
    var disappreasonCtrl = $('#DisapprovalReason');
    if (appstatctrl.val() == 0) {
        appstatctrl.isValidCtrl();
        disappreasonCtrl.removeAttr('disabled').val('').isInvalid();
    }
    else if (appstatctrl.val() == 1) {
        appstatctrl.isValidCtrl();
        disappreasonCtrl.val('');
        disappreasonCtrl.attr('disabled', 'disabled').clearValidateClass();
    }
    else {
        appstatctrl.isInvalidCtrl();
        disappreasonCtrl.val('');
        disappreasonCtrl.attr('disabled', 'disabled').clearValidateClass();
    }

    $('#IsBackMsg').val('1');
    $('#IsBackDenied').val('1');
    ActivateSubmit();
};
$(document).ready(function () {
    $('#NoteNo').change(function () {
        var that = $(this);
        var notenumber = that.val();
        Notenumberchanged(notenumber);
        $('#IsBackMsg').val('1');
    });
    Notenumberchanged($('#NoteNo').val());
});
$.fn.clearValidateClass = function () {
    var that = this;
    that.removeClass('is-valid').removeClass('is-invalid');
};
//function ValidateAcceptCmb() {
//    var myCtrl = $('#AcceptCmb');
//    if (myCtrl.val() == 1) {
//        myCtrl.isValid();
//        LockSection('btnSection');
//        LockSection('Section2');
//        UnLockSection('AppSection');
//        $('#Section3').isGreen();
//        ActivateSubmit();
//    }
//    else {
//        myCtrl.isInvalid();
//        $('#Section3').isRed();
//        UnLockSection('btnSection');
//        UnLockSection('Section2');
//        LockSection('AppSection');
//        ActivateSubmit();
//    }
//};

