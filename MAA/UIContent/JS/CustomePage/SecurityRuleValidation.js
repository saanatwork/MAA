/// <reference path="../jquery-3.6.0.min.js" />
function validatecontrol() {
    var target = validatecontrol.caller.arguments[0].target;
    var targetid = $(target).attr('ID');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
        $('#btnSubmit').attr("disabled", "disabled");
    }
    //if (targetid != 'submitConfirmation') {
    //    $('#submitConfirmation').removeClass('is-valid').addClass('is-invalid').val("0");
    //}
    validateallcontrol();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "IsDAActualSpend":
            isvalid = true;
            $('.valGroup1').each(function () {
                thisctrl = $(this);
                if (value == "true") {
                    thisctrl.attr("disabled", "disabled").attr("placeholder", "NA").removeClass('is-invalid pointer').addClass('is-valid').val("");
                } else if (value == "false") {
                    thisctrl.removeAttr("disabled").attr("placeholder", "Amount").removeClass('is-invalid').addClass('is-valid pointer');
                    /*if (thisctrl.val() >= 0) { thisctrl.removeClass('is-invalid').addClass('is-valid') } else { thisctrl.removeClass('is-valid').addClass('is-invalid') };*/
                } else {
                    isvalid = false;
                }
            });
            break;
        case "IsLodgingAllowed":
            isvalid = true;
            $('.valGroup2').each(function () {
                thisctrl = $(this);
                if (value == "false") {
                    thisctrl.attr("disabled", "disabled").attr("placeholder", "NA").removeClass('is-invalid pointer').addClass('is-valid').val("");
                } else if (value == "true") {
                    thisctrl.removeAttr("disabled").attr("placeholder", "Amount").removeClass('is-invalid').addClass('is-valid pointer');
                    /*if (thisctrl.val() >= 0) { thisctrl.removeClass('is-invalid').addClass('is-valid') } else { thisctrl.removeClass('is-valid').addClass('is-invalid') }*/
                } else {
                    isvalid = false;
                }
            });
            break;
        case "Town_MaxLocalConv":
            isvalid = maxNumberValidator(value, 200);
            //mytooltipmsg($('#tt_Town_MaxLocalConv'), isvalid);
            break;
        case "City_MaxLocalConv":
            isvalid = maxNumberValidator(value, 500);
            //mytooltipmsg($('#tt_City_MaxLocalConv'), isvalid);
            break;
        case "Metro_MaxLocalConv":
            isvalid = maxNumberValidator(value, 999);
            //mytooltipmsg($('#tt_Metro_MaxLocalConv'), isvalid);
            break;
        case "Town_MaxLodgingExp":
            isvalid = validate4Digit(value);
            //mytooltipmsg($('#tt_Town_MaxLodgingExp'), isvalid);
            break;
        case "City_MaxLodgingExp":
            isvalid = validate4Digit(value);
            //mytooltipmsg($('#tt_City_MaxLodgingExp'), isvalid);
            break;
        case "Metro_MaxLodgingExp":
            isvalid = validate4Digit(value);
            //mytooltipmsg($('#tt_Metro_MaxLodgingExp'), isvalid);
            break;
        case "Town_DAPerDay":
            isvalid = validate4Digit(value);
            //mytooltipmsg($('#tt_Town_DAPerDay'), isvalid);
            break;
        case "City_DAPerDay":
            isvalid = validate4Digit(value);
            //mytooltipmsg($('#tt_City_DAPerDay'), isvalid);
            break;
        case "Metro_DAPerDay":
            isvalid = validate4Digit(value);
            //mytooltipmsg($('#tt_Metro_DAPerDay'), isvalid);
            break;
        case "submitConfirmation":
            if (value == '1') {
                isvalid = true;
            } else { isvalid = false; }
            break;
    }
    return isvalid;
};
function maxNumberValidator(value, maxnumber, tooltipControl) {
    if (value == '') {
        return false;
    }
    else if (value >= 0 && value <= maxnumber) {
        return true;
    } else { return false; }
}
function validate4Digit(value) {
    if (value == '') { return false; }
    else if (value >= 0 && value <= 9999) {
        return true;
    } else { return false; }
}
function validateallcontrol() {
    var btnsubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnsubmit.attr("disabled", "disabled");
    } else {
        btnsubmit.removeAttr("disabled");
    }
};
function mytooltipmsg(tooltipControl, isvalid) {
    if (isvalid) {
        tooltipControl.addClass('inVisible');
    } else {
        tooltipControl.removeClass('inVisible');
    }
};