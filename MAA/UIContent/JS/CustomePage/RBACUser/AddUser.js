$("#EmployeeNumber").on("change", function () {
    var desg = $("#EmployeeNumber option:selected").attr('data-desg');
    var myCtrl = $(this);
    if (myCtrl.val() > 0) {
        $('#EmpDesg').val(desg);
        myCtrl.isValidCtrl();
    } else {
        $('#EmpDesg').val('');
        $("#UserName").val('').addClass('is-invalid');
        myCtrl.isInvalidCtrl();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
});
$("#UserName").on("keyup", function () {
    var myCtrl = $(this);
    if (isAlphanumeric(myCtrl.val())) {
        var url = '/RBAC/UserManagement/ValidateUserName?UserName=' + $(this).val();
        GetDataFromAjax(url).done(function (data) {
            if (data) { myCtrl.isValidCtrl(); }
            else {
                myCtrl.isInvalidCtrl();
                $('#NewPassword').val('');
                MyAlert(4, 'User Name Already Exist');
            }
        });        
    } else {
        myCtrl.isInvalidCtrl();
        $('#NewPassword').val('');
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
});
$("#NewPassword").on("keyup", function () {
    var myCtrl = $(this);
    if (validatePassword(myCtrl.val())) {
        myCtrl.isValidCtrl();
    } else {
        myCtrl.isInvalidCtrl();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
});
$("#CnfPassword").on("keyup", function () {    
    var myCtrl = $(this);
    var newpassword = $('#NewPassword').val();
    if (newpassword == myCtrl.val()) {
        myCtrl.isValidCtrl();
    }
    else {
        //MyAlert(4, 'Password Confirmation Failed.')
        myCtrl.isInvalidCtrl();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
});
$("#CnfPassword").on("blur", function () {
    var myCtrl = $(this);
    var newpassword = $('#NewPassword').val();
    if (newpassword == myCtrl.val()) {
        myCtrl.isValidCtrl();
    }
    else {
        MyAlert(4, 'Password Confirmation Failed.')
        myCtrl.isInvalidCtrl();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
});
$("#EffectiveDate").on("change", function () {
    var myCtrl = $(this);
    if (myCtrl.val() !='') {
        myCtrl.isValid();
    } else {
        myCtrl.isInvalid();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
});
function RolesChanged() {
    var myCtrl = $(RolesChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') {
        if (IsUniqueRole(myCtrl)) {
            myCtrl.isValidCtrl();
        }
        else {
            myCtrl.isInvalidCtrl();
            MyAlert(4,"Selected Role Is Already Assigned.")
        }
    } else { myCtrl.isInvalidCtrl(); }
    EnableAddBtn(myCtrl.attr('id').split('_')[1],'AddBtn');
};
function IsUniqueRole(myCtrl) {
    var isvalid = true;
    $('.duprole').each(function () {
        that = $(this);
        if (that.attr('id') != myCtrl.attr('id')) {
            //alert(myCtrl.val() + ' - ' + that.val());
            if (CompareStringsForCommonValue(myCtrl.val(), that.val())) { isvalid = false;}
        }        
    });
    return isvalid;
};
function LocationTypeChanged() {
    var myCtrl = $(LocationTypeChanged.caller.arguments[0].target);
    var rowid = myCtrl.attr('id').split('_')[1];
    var myCashcadingID = 'LocationCode_' + rowid;
    if (myCtrl.val() != '') {
        var url = '/Security/CTV2/GetToLocationsFromTypes?TypeIDs=' + myCtrl.val();
        GetDataFromAjax(url).done(function (data) {
            refreshMultiselect(data, myCashcadingID, true);
        });
        myCtrl.isValidCtrl();
    } else { myCtrl.isInvalidCtrl(); }
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function LocationCodeChanged() {
    var myCtrl = $(LocationCodeChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') { myCtrl.isValidCtrl(); } else { myCtrl.isInvalidCtrl(); }
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function FromDateChanged() {
    var myCtrl = $(FromDateChanged.caller.arguments[0].target);
    var todateCtrl = $('#EffectiveToDate_' + myCtrl.attr('id').split('_')[1]);
    var todatemin = CustomDateChangeV2(myCtrl.val(), 1);    
    if (myCtrl.val() != '') {
        myCtrl.isValidCtrl();
        todateCtrl.attr('min', todatemin);
    } else { myCtrl.isInvalidCtrl(); }
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function ToDateChanged() {
    var myCtrl = $(ToDateChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') { myCtrl.isValidCtrl(); } else { myCtrl.isInvalidCtrl(); }
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function CloneRowAddBtnClick() {
    var insrow = CloneRowAddBtnClick.caller.arguments[0].target.closest('.add-row');
    var myCtrl = $(CloneRowAddBtnClick.caller.arguments[0].target);
    var sRowid = $(insrow).attr('id');
    var cRowid = TableRowCloaning('tbody1', 'tbody2', sRowid, true, true, false);
    $('#tblSection').removeClass('sectionB');
    $('#' + cRowid).find('.duprole').each(function () {
        UnLockSLUCtrl($(this));
    });
    myCtrl.tooltip('hide');
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
};
function EnableAddBtn(rowid, addBtnBaseID) {
    var tblrow = $('#' + rowid);
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
    if (tblrow.find('.is-invalid').length > 0) {
        addBtnctrl.makeSLUDisable();
    }
    else {
        addBtnctrl.makeSLUEnable();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
};
function CustomDateChangeV2(firstDate, addDays) {
    var myDate = new Date(firstDate);
    myDate.setDate(myDate.getDate() + addDays * 1);
    var output1 = myDate.toISOString().split('.');
    var output = output1[0].split('T');
    return output[0];    
}
function SaveData() {
    var empno = $('#EmployeeNumber').val();
    var empname = $('#EmployeeNumber option:selected').text();
    var username = $('#UserName').val();
    var password = $('#NewPassword').val();
    var IsActive = false;
    if ($('#check1').prop('checked')) { IsActive = true; }
    var schrecords = GetDataFromTable('myTable');
    var x = '{"EmployeeNumber":"' + empno
        + '","EmployeeName":"' + empname
        + '","UserName":"' + username
        + '","Password":"' + password
        + '","IsActive":"' + IsActive
        + '","UserRoleList":' + schrecords + '}';
    url = '/RBAC/UserManagement/SetUserData';
    PostDataInAjax(url,x).done(function (data) {
        $(data).each(function (index, item) {
            if (item.bResponseBool == true) {
                var url = "/RBAC/UserManagement/Index";
                MyAlertWithRedirection(1, "Data Saved Successfully.", url);
            }
            else {
                MyAlert(3, "System Failed To Save Data.");
            }
        });
    });
};