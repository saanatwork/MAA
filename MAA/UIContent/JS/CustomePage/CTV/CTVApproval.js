function BackButtonClicked() {
    var url = "/Security/CTV/ApprovalLists";
    if ($('#IsBackMsg').val() == 1) {
        Swal.fire({
            title: 'Confirmation Message',
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
                //alert(url);
                window.location.href = url;
            } else {
                // second variant
            }
        }
    }
    else { window.location.href = url;}
};
function ValidateReason() {
    $('#IsBackMsg').val('1');
    var rctrl = $('#DisapprovalReason');
    if (rctrl.val().length > 2) { rctrl.isValid(); } else { rctrl.isInvalid(); }
    ActivateSubmit();
};
function ActivateSubmit() {
    //var active = false;
    var isothviewed = $('#IsOthViewed').val();
    var islvviewed = $('#IsLVViewed').val();
    //var btnlvt = $('#btnLVT').prop('disabled');
    //var btnovt = $('#btnOVT').prop('disabled');
    
    //alert(isothviewed);
    //alert("LV-"+btnlvt.prop('disabled'));
    var btnsubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnsubmit.attr('disabled', 'disabled');
    } else {
        if (isothviewed == 1 || islvviewed == 1) {
            //alert('Ok');
            btnsubmit.makeEnabled();
        }
        //if (btnlvt == 'false') {
        //    if (islvviewed == 1) { btnsubmit.makeEnabled(); }
        //} else if (btnovt == 'false') {
        //    if (isothviewed == 1) { btnsubmit.makeEnabled(); }
        //}
    }
};
function ApproveStatusChanged() {
    var appstatctrl = $('#IsApprovedComboValue');
    var disappreasonCtrl = $('#DisapprovalReason');
    if (appstatctrl.val() == 2) {
        appstatctrl.isValid();
        disappreasonCtrl.removeAttr('disabled').val('').isInvalid();        
    }
    else if (appstatctrl.val() == 1) {
        appstatctrl.isValid();
        disappreasonCtrl.val('');
        disappreasonCtrl.attr('disabled', 'disabled').clearValidateClass();
    }
    else {
        appstatctrl.isInvalid();
        disappreasonCtrl.val('');
        disappreasonCtrl.attr('disabled', 'disabled').clearValidateClass();
    }

    $('#IsBackMsg').val('1');
    ActivateSubmit();
};
$.fn.makeEnabled = function () {
    var that = this;
    that.removeAttr('disabled');
};
$.fn.makeDisable = function () {
    var that = this;
    that.attr('disabled', 'disabled');
};
$.fn.isInvalid = function () {
    var that = this;
    that.addClass('is-invalid').removeClass('is-valid');
};
$.fn.isValid = function () {
    var that = this;
    that.addClass('is-valid').removeClass('is-invalid');
};
$.fn.clearValidateClass = function () {
    var that = this;
    that.removeClass('is-valid').removeClass('is-invalid');
};

$(document).ready(function () {    
    $('#NoteNo').change(function () {
        var that= $(this);        
        var notenumber = that.val();
        Notenumberchanged(notenumber);
        $('#IsBackMsg').val('1');
    });
    Notenumberchanged($('#NoteNo').val());
});
function Notenumberchanged(notenumber) {    
    var that = $('#NoteNo');
    var lsbtn = $('#btnLVT');
    var osbtn = $('#btnOVT');
    var appCombo = $('#IsApprovedComboValue');
    var disappreason = $('#DisapprovalReason');
    var tabclicked = $('#IsTabClicked').val();
    appCombo.val(0).isInvalid();
    $('#IsApprovedComboValue option:selected').removeAttr("selected");
    if (notenumber.length > 1){
        that.isValid();
        if (tabclicked == 1) {
            appCombo.makeEnabled();
        } else { appCombo.makeDisable(); }
        disappreason.makeDisable();
        //appCombo.addClass('pointer');
    }
    else {
        that.isInvalid();
        appCombo.makeDisable();
        disappreason.makeDisable();
        //appCombo.removeClass('pointer')
    }
    
    //alert(notenumber.length);
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
                if (item.ApprovalFor == 0 || item.ApprovalFor == 2) { osbtn.removeAttr('disabled'); }
                else if (item.ApprovalFor == 1) { lsbtn.removeAttr('disabled'); }
                else if (item.ApprovalFor == 3) { lsbtn.removeAttr('disabled'); osbtn.removeAttr('disabled'); }
                
                ActivateSubmit();
            });

        }
    });
};