function RegisterBtnClicked() {
    var x = GetDataFromDivHavingNoTables('MainDiv');
    url = '/Ajax/SetUser';
    redirecturl='/Home/Index'
    PostDataInAjax(url, x).done(function (data) {
        HandleResponseOfPostRequest(data, data.sResponseString, true, redirecturl, false, '');
    });
};
function DistrictChanged() {
    var selectedValue = $("input[name='location']:checked").val();
    var Isrural = true;
    if (selectedValue == 'urban') { Isrural = false; }
    var myCtrl = $('#DistrictCtrl');
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        var url = '/Ajax/GetBlockOfaDistrict?DistrictID=' + myCtrl.val() + '&IsRural=' + Isrural;
        GetDataFromAjax(url).done(function (data) {
            DropdownRefresh(data, 'BlockCtrl', false, 'Select Block Or ULB');
        });
    }
    else {
        myCtrl.isInvalid();
        $('#BlockCtrl').empty(); // Clear existing options       
    }
    ChangeBtnStatus('btnSubmit','MainDiv');
};
function BlockChanged() {
    var myCtrl = $('#BlockCtrl');
    if (myCtrl.val() != '') { myCtrl.isValid(); } else { myCtrl.isInvalid();}
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function DesignationChanged() {
    var myCtrl = $('#DesignationCtrl');
    if (myCtrl.val() != '') { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function FirstNameChanged() {
    var myCtrl = $('#FNameCtrl');
    if (myCtrl.val() != '') {
        if (isOnlyAlphabatesWithSpace(myCtrl.val())) {
            myCtrl.isValid();
        } else { myCtrl.isInvalid(); }
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function LastNameChanged() {
    var myCtrl = $('#LNameCtrl');
    if (myCtrl.val() != '') {
        if (isOnlyAlphabates(myCtrl.val())) {
            myCtrl.isValid();
        } else { myCtrl.isInvalid(); }
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function ContactNoChanged() {
    var myCtrl = $('#CNOCtrl');
    if (myCtrl.val() != '') {
        if (isValidContactNumber(myCtrl.val())) {
            myCtrl.isValid();
        } else { myCtrl.isInvalid(); }
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function EmailChanged() {
    var myCtrl = $('#EmailCtrl');
    if (myCtrl.val() != '') {
        if (isValidEmailID(myCtrl.val())) {
            myCtrl.isValid();
        } else { myCtrl.isInvalid(); }
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function PasswordChanged() {
    var myCtrl = $('#PasswordCtrl');
    if (myCtrl.val() != '') {
        if (validatePassword(myCtrl.val())) {
            myCtrl.isValid();
        } else { myCtrl.isInvalid(); }
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function CnfPasswordChanged() {
    var myCtrl = $('#CnfPasswordCtrl');
    var myPassword = $('#PasswordCtrl').val();
    if (myCtrl.val() != '' && myCtrl.val() == myPassword) {
            myCtrl.isValid();
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function SQChanged() {
    var myCtrl = $('#SQCtrl');
    var myAnsCtrl = $('#ASQCtrl');
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        myAnsCtrl.makeEnable();
    }
    else { myCtrl.isInvalid(); myAnsCtrl.isInvalid();myAnsCtrl.makeDisable(); }
    myAnsCtrl.val('');
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function ASQChanged() {
    var myCtrl = $('#ASQCtrl');
    if (myCtrl.val() != '') {
        myCtrl.isValid();
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
$(document).ready(function () {
    $("input[name='location']").change(function () {
        var selectedValue = $("input[name='location']:checked").val();
        if (selectedValue) {
            DistrictChanged();
        } 
    });
});