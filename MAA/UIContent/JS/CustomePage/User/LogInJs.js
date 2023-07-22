function UserNameChanged() {
    var myCtrl = $('#UserNameCtrl');
    if (myCtrl.val() != '') {
        if (myCtrl.val().length > 9) {
            var url = '/Ajax/ValidateUser?UserID=' + myCtrl.val();
            GetDataFromAjax(url).done(function (data) {
                if (data.bResponseBool) { myCtrl.isValid();  } else { myCtrl.isInvalid();  }
            });
        } else { myCtrl.isInvalid(); }
    }
    else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function PasswordChanged() {
    var myCtrl = $('#PasswordCtrl');
    if (myCtrl.val() != '' && myCtrl.val().length > 5) {
        myCtrl.isValid();
    } else { myCtrl.isInvalid(); }
    ChangeBtnStatus('btnSubmit', 'MainDiv');
};
function LogInBtnClicked() {
    var x = GetDataFromDivHavingNoTables('MainDiv');
    var url = '/Ajax/LogIn';
    var RedirectUrl = '/Home/DashBoard'
    PostDataInAjaxWithResponseHandleingNoMsg(url, x, true, RedirectUrl);
   
};