function CentreCodeChanged() {
    var COctrl = $('#CentreCode');    
    if (COctrl.val() != '') {
        COctrl.isValid();
        getDropDownData('cEmployeeNumber', 'Select employee', '/EMN/GetStaffList?CentreCode=' + COctrl.val());
    }
    else {
        COctrl.isInvalid();
    }
};
function EmployeeNumberChanged() {
    var ECctrl = $('#EmployeeNumber');
    if (ECctrl.val() != '') {
        //$('#EmployeeNumber').val(ECctrl.val());
        ECctrl.isValid();

    } else {
        ECctrl.isInvalid();
    }
};
function PunchDateChanged() {
    var myCtrl = $('#PunchDate');
    myCtrl.CustomDateFormat();
    if (myCtrl.val() != '') {
        //$('#PunchDate').val(myCtrl.val());
        myCtrl.isValid();

    } else {
        myCtrl.isInvalid();
    }
};
function PunchTimeChanged() {
    var myCtrl = $('#PunchTime');
    if (myCtrl.val() != '') {
        //$('#PunchTime').val(myCtrl.val());
        myCtrl.isValid();

    } else {
        myCtrl.isInvalid();
    }
};