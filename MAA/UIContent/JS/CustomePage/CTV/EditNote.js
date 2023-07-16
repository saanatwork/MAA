function ValidateAcceptCmb() {
    var myCtrl = $('#submitConfirmation');
    if (myCtrl.val() == 1) {
        myCtrl.isValid();
        LockSection('btnSection');
        $('#Section3').isGreen();
        activateSubmitBtn();
    }
    else {
        myCtrl.isInvalid();
        $('#Section3').isRed();
        UnLockSection('btnSection');
        activateSubmitBtn();
    }
    $('#IsBackDenied').val(1);
};
function activateSubmitBtn() {
    var btnSubmit = $('#btnSubmit');
    btnSubmit.makeSLUDisable();
    if ($('.is-invalid').length > 0) {
    }
    else {
        if ($('#IsOTSSaved').val() == 1 || $('#IsLTSSaved').val()==1) {
            btnSubmit.makeSLUEnable();
        }
    }    
};
$(document).ready(function () {
    var scCtrl = $('#submitConfirmation');
    if ($('#IsOTSSaved').val() == 1 || $('#IsLTSSaved').val() == 1) {
        scCtrl.makeSLUEnable();
    } else {
        scCtrl.makeSLUDisable();
    }
});