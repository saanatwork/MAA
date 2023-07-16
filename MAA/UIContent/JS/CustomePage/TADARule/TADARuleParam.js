function BackButtonClicked() {
    var url = "/Security/TADARules/CreateRule";
    window.location.href = url;
};
function btnClearClicked() {
    //$('#submitConfirmation').val('').isInvalid();
    $('#TADARule_IsDAActualSpend').val('').isInvalid();
    $('#TADARule_IsLodgingAllowed').val('').isInvalid();
    IsLodgingAllowedChanged();
    IsActualSpendChanged();
};
function LockControl(groupClassName) {
    $('.' + groupClassName).each(function () {
        $(this).removeClass('is-invalid is-valid');
        $(this).val('').attr("placeholder", "NA").attr("disabled", "disabled");
    });
};
function UnlockControl(groupClassName) {
    $('.' + groupClassName).each(function () {
        $(this).removeAttr("disabled").attr("placeholder", "Amount");
        if ($(this).val() == '' || $(this).val() == 0) {
            $(this).isInvalid();
        } else { $(this).isValid();}
    });
};
function IsLodgingAllowedChanged() {
    var mCtrl = $('#TADARule_IsLodgingAllowed');
    var mVal = mCtrl.val();
    if (mVal == 'false') {
        mCtrl.isValid();
        LockControl('valGroup2');
    }
    else if (mVal == 'true') {
        mCtrl.isValid();
        UnlockControl('valGroup2');
    }
    else { mCtrl.isInvalid(); LockControl('valGroup2'); }
    SubmitBtnStat();
};
function IsActualSpendChanged() {
    var mCtrl = $('#TADARule_IsDAActualSpend');
    var mVal = mCtrl.val();
    if (mVal == 'true') {
        mCtrl.isValid();
        LockControl('valGroup1');
    }
    else if (mVal == 'false') {
        mCtrl.isValid();
        UnlockControl('valGroup1');
    }
    else { mCtrl.isInvalid(); LockControl('valGroup1'); }
    SubmitBtnStat();
};
function submitConfirmationChanged() {
    var mCtrl = $('#submitConfirmation');
    var mValue = mCtrl.val();
    if (mValue == 1) {
        mCtrl.isValid();
    } else { mCtrl.isInvalid();}
    SubmitBtnStat();
};
function validatecontrol() {
    var target = $(validatecontrol.caller.arguments[0].target);
    var isvalid = validatectrl(target.attr('id'), target.val());
    SubmitBtnStat();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "TADARule_Metro_DAPerDay":
        case "TADARule_City_DAPerDay":
        case "TADARule_Town_DAPerDay":
        case "TADARule_Metro_MaxLodgingExp":
        case "TADARule_City_MaxLodgingExp":
        case "TADARule_Town_MaxLodgingExp":
            if (value >0 && value<=9999) { isvalid = true; }else { isvalid = false; }
            break;
        case "TADARule_City_MaxLocalConv":
            if (value > 0 && value <= 500) { isvalid = true; } else { isvalid = false; }
            break;
        case "TADARule_Metro_MaxLocalConv":
            if (value > 0 && value <= 999) { isvalid = true; }else { isvalid = false; }
            break;
        case "TADARule_Town_MaxLocalConv" :
            if (value > 0 && value <= 200) { isvalid = true; }else { isvalid = false; }
            break;
    }
    var target = $('#' + targetid);
    if (isvalid) {
        target.removeClass('is-invalid').addClass('is-valid');
    }
    else {
        target.removeClass('is-valid').addClass('is-invalid');
    }
    return isvalid;
};
function SubmitBtnStat() {
    var btn = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btn.attr("disabled", "disabled")
    }
    else {
        btn.removeAttr('disabled');
    }
};
$(document).ready(function () {
    var locconv = $('#TADARule_LocalConvEligibility').val();
    if (locconv == 'False') { LockControl('valGroup3'); } else { UnlockControl('valGroup3'); }
    
    IsLodgingAllowedChanged();
    IsActualSpendChanged();

    //if ($('#IsParamBtn').val() == 1) {
    //    $('#submitConfirmation').val(1).isValid();
    //} else { $('#submitConfirmation').val('').isInvalid();}
});