function BankClicked() {
    var myCtrl = $('#cCustomer');
    var bankid = myCtrl.val();
    if (bankid != '') {
        myCtrl.addClass('is-valid').removeClass('is-invalid');
        MyAlert(1, 'Bank Selected');
    } else {
        myCtrl.addClass('is-invalid').removeClass('is-valid');
        MyAlert(3, 'Please Select A Bank Name');
    }
};