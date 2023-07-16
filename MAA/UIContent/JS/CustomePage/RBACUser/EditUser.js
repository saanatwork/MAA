$("#userNameModal").on("keyup", function () {
    var myCtrl = $(this);
    if (isAlphanumeric(myCtrl.val())) {
        var url = '/RBAC/UserManagement/ValidateUserName?UserName=' + $(this).val();
        GetDataFromAjax(url).done(function (data) {
            if (data) { myCtrl.isSValid(); }
            else {
                myCtrl.isSInvalid();
                $('#NewPassword').val('');
                MyAlert(4, 'User Name Already Exist');
            }
        });
    } else {
        myCtrl.isSInvalid();
        $('#NewPassword').val('');
    }
    SubmitBtnStatus('btnSave', 'HdrModalDiv');
});
$("#NewPassword").on("keyup", function () {
    $("#CnfPassword").val('').isSInvalid();
    var myCtrl = $(this);
    if (validatePassword(myCtrl.val())) {
        myCtrl.isSValid();
        $("#CnfPassword").makeSLUEnable();
    } else {
        myCtrl.isSInvalid();
        $("#CnfPassword").makeSLUDisable();
    }
    SubmitBtnStatus('btnSave', 'HdrModalDiv');
});
$("#CnfPassword").on("keyup", function () {
    var myCtrl = $(this);
    var newpassword = $('#NewPassword').val();
    if (newpassword == myCtrl.val()) {
        myCtrl.isSValid();
    }
    else {
        //MyAlert(4, 'Password Confirmation Failed.')
        myCtrl.isSInvalid();
    }
    SubmitBtnStatus('btnSave', 'HdrModalDiv');
});
$("#CnfPassword").on("blur", function () {
    var myCtrl = $(this);
    var newpassword = $('#NewPassword').val();
    if (newpassword == myCtrl.val()) {
        myCtrl.isSValid();
    }
    else {
        MyAlert(4, 'Password Confirmation Failed.')
        myCtrl.isSInvalid();
    }
    SubmitBtnStatus('btnSave', 'HdrModalDiv');
});
function SavePassword() {
    var empno = $('#EmployeeNumber').val();
    var username = $('#userNameModal').val();
    var password = $('#NewPassword').val();
    var x = '{"EmployeeNumber":"' + empno
        + '","UserName":"' + username
        + '","Password":"' + password + '"}';
    PostDataInAjax('/RBAC/UserManagement/UpdatePassword', x).done(function(data) {
        if (data.bResponseBool) {
            MyAlert(1, "Username & Password Updated Successfully");
            $('#NewPassword').val('').isSInvalid();
            $('#CnfPassword').makeSLUDisable();
            $('#CnfPassword').val('').isSInvalid();
            $('#reset_pwd').modal('hide');
        } else {
            MyAlert(3, "Failed To Update Username & Password");
        }
    });
};
function SaveData() {
    var empno = $('#EmployeeNumber').val();
    var empname = ' ';
    var username = ' ';
    var password = ' ';
    var IsActive = false;
    if ($('#check1').prop('checked')) { IsActive = true; }
    var schrecords = GetDataFromTable('myTable');
    var x = '{"EmployeeNumber":"' + empno
        + '","EmployeeName":"' + empname
        + '","UserName":"' + username
        + '","Password":"' + password
        + '","IsActive":"' + IsActive
        + '","UserRoleList":' + schrecords + '}';
    url = '/RBAC/UserManagement/UpdateUserData';
    PostDataInAjax(url, x).done(function (data) {
        $(data).each(function (index, item) {
            if (item.bResponseBool == true) {
                var url = "/RBAC/UserManagement/Index";
                MyAlertWithRedirection(1, "Data Updated Successfully.", url);
            }
            else {
                MyAlert(3, "System Failed To Update Data.");
            }
        });
    });
};
function RolesChanged() {
    var myCtrl = $(RolesChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') {
        if (IsUniqueRole(myCtrl)) {
            myCtrl.isValidCtrl();
        }
        else {
            myCtrl.isInvalidCtrl();
            MyAlert(4, "Selected Role Is Already Assigned.")
        }
    } else { myCtrl.isInvalidCtrl(); }
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function LocationTypeChanged() {
    var myCtrl = $(LocationTypeChanged.caller.arguments[0].target);
    var rowid = myCtrl.attr('id').split('_')[1];
    var myCashcadingID = 'Location_' + rowid;
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
    myCtrl.ApplyCustomDateFormat();
    var todateCtrl = $('#ToDate_' + myCtrl.attr('id').split('_')[1]);    
    if (myCtrl.val() != '') {
        myCtrl.isValidCtrl();
        var todatemin = CustomDateChangeV2(myCtrl.val(), 1);
        todateCtrl.attr('min', todatemin);
        UnLockSLUCtrl(todateCtrl);        
    } else { myCtrl.isInvalidCtrl(); }
    todateCtrl.val('').removeClass('is-valid is-invalid');
    todateCtrl.ApplyCustomDateFormat();
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function ToDateChanged() {
    var myCtrl = $(ToDateChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') { myCtrl.isValid(); } else { myCtrl.removeClass('is-valid is-invalid') }
    EnableAddBtn(myCtrl.attr('id').split('_')[1], 'AddBtn');
};
function IsActiveClicked() {
    var myCtrl = $(IsActiveClicked.caller.arguments[0].target);
    if (!myCtrl.prop('checked')) {
        MyConfirmationAlert("Are You Sure Want To Make User Inactive?", function () {
            var currentdate = GetCurrentDate(2);
            $('#myTable').find('.tdt').each(function () {
                $(this).removeAttr('min');
                $(this).val(currentdate).addClass('is-valid').removeClass('is-invalid');
                $(this).ApplyCustomDateFormat();
            });
            LockSLUSection($('#myTable'));
            $('#myTable').find('.rowlock').each(function () {
                $(this).makeSLUDisable();
            });
            $('#myTable').find('.cloneBtn').each(function () {
                $(this).makeSLUDisable();
            });
            //myCtrl.makeSLUDisable();
            $('#PasswordResetBtn').makeSLUDisable();
        }, function () {
            myCtrl.prop('checked', 'true');
        });
    } else {
        $('#PasswordResetBtn').makeSLUEnable();
        UnLockSLUSection($('#myTable'));
        $('#myTable').find('.rowlock').each(function () {
            $(this).makeSLUEnable();
        });
        $('#myTable').find('.tdt').each(function () {
            var that = $(this);
            var fromdate = $('#FromDate_' + that.attr('id').split('_')[1]);
            var todatemin = CustomDateChangeV2(fromdate.val(), 1);
            that.attr('min', todatemin);
            that.val('').removeClass('is-valid is-invalid');
            that.ApplyCustomDateFormat();
        });
    }
    
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
function CloneRowAddBtnClick() {
    var insrow = CloneRowAddBtnClick.caller.arguments[0].target.closest('.add-row');
    //var myCtrl = $(CloneRowAddBtnClick.caller.arguments[0].target);
    $('#myTable').find('.rowlock').each(function () {
        $(this).makeSLUDisable();
    });
    var sRowid = $(insrow).attr('id');
    var cRowid = TableRowCloaning('tbody1', 'tbody2', sRowid,true, true, false);
    $('#tblSection').removeClass('sectionB');
    $('#' + cRowid).find('.duprole').each(function () {
        UnLockSLUCtrl($(this));
    });
    $(insrow).find('.addBtn').each(function () {
        $(this).makeSLUDisable();
        $(this).tooltip('hide');
    });
    LockSLUContainer($('#' + cRowid));
    $('#' + cRowid).find('.duprole').each(function () {
        UnLockSLUCtrl($(this));
    });
    SubmitBtnStatus('btnSubmit', 'HdrDiv1');
};
$(document).ready(function () {
    var empno = $('#EmployeeNumber').val()
    var url = '/RBAC/UserManagement/GetUserRoleDetails?EmployeeNumber=' + empno;
    GetDataFromAjax(url).done(function (data) {        
        $(data).each(function (index, item) {
            if (item.RoleIDs.indexOf(',') > 0) {
                $('#Role_' + index).val(item.RoleIDs.split(',')).multiselect('refresh').isValidCtrl();
            } else {
                $('#Role_' + index).val(item.RoleIDs).multiselect('refresh').isValidCtrl();
            }
            if (item.LocationTypeCodes.indexOf(',') > 0) {
                $('#LocationType_' + index).val(item.LocationTypeCodes.split(',')).multiselect('refresh').isValidCtrl();
            } else {
                $('#LocationType_' + index).val(item.LocationTypeCodes).multiselect('refresh').isValidCtrl();
            }
            //Fill Location multiselect with valid data
            var url2 = '/Security/CTV2/GetToLocationsFromTypes?TypeIDs=' + item.LocationTypeCodes;
            GetDataFromAjax(url2).done(function (data) {
                refreshMultiselect(data, 'Location_' + index, true);
                if (item.LocationCodes.indexOf(',') > 0) {
                    $('#Location_' + index).val(item.LocationCodes.split(',')).multiselect('refresh').isValidCtrl();
                } else {
                    $('#Location_' + index).val(item.LocationCodes).multiselect('refresh').isValidCtrl();
                }
                UnLockSLUSection($('#'+index));
            });
            //Seting min value to Todate
            $('#ToDate_' + index).attr('min', CustomDateChangeV2(item.EffectiveFromDateStr, 1));
            //$('#FromDate_' + index).ApplyCustomDateFormat();
            if (index == $(data).length - 1) { $('#AddBtn_' + index).removeClass('inVisible'); }
        });
    });
    if (!$('#check1').prop('checked')) {
        $('#PasswordResetBtn').makeSLUDisable();
        LockSLUSection($('#myTable'));
        $('#myTable').find('.rowlock').each(function () {
            $(this).makeSLUDisable();
        });
        $('#myTable').find('.cloneBtn').each(function () {
            $(this).makeSLUDisable();
        });
    }

});
function CustomDateChangeV2(firstDate, addDays) {
    var myDate = new Date(firstDate);
    myDate.setDate(myDate.getDate() + addDays * 1);
    var output1 = myDate.toISOString().split('.');
    var output = output1[0].split('T');
    return output[0];
}
function IsUniqueRole(myCtrl) {
    var isvalid = true;
    $('.duprole').each(function () {
        that = $(this);
        if (that.attr('id') != myCtrl.attr('id')) {
            //alert(myCtrl.val() + ' - ' + that.val());
            if (CompareStringsForCommonValue(myCtrl.val(), that.val())) { isvalid = false; }
        }
    });
    return isvalid;
};