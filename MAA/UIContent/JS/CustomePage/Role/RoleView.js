$(document).ready(function () {
    (async function () {
        const r1 = await getInitialData();
    })();
});
async function GetModuleList(ID, selectedvalue) {
    getDropDownDataWithSelectedValue('ModuleId', 'Select Module', '/RBAC/Role/GetModule?ID='+ 0, selectedvalue);
};
function ModuleChange() {
}
function validatectrl_ValidateLength(value) {
    if (value.length > 0) {
        return true;
    } else { return false; }
};
function validatectrl_ValidatestringLength(value) {
    if (value != "-1") {
        return true;
    } else { return false; }
};
function EnableSubmitBtn() {
    // var z = getDivInvalidCount('ModuleDive');
    var z = getDivInvalidCount('MainDiv');
    var SubmitBtn = $('#BtnSave');

    if (z <= 0) {
        SubmitBtn.makeEnabled();
    } else {
        SubmitBtn.makeDisable();
    }
    $('#BtnSubmit').makeDisable();
};
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).isValidCtrl();
    } else {
        $(target).isInvalidCtrl();
    }
    EnableSubmitBtn();
};
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val());
    if (isvalid) { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }

    EnableSubmitBtn();
    $('#SubmitBtn').makeDisable();
};
function SaveData() {
    var target = SaveData.caller.arguments[0].target;
    var z = GetDataFromTable('TblTask');
    var RoleId = $("#RoleId").val();
    var RoleName = $("#RoleName").val();
  
    var model = '{"RoleId":"' + RoleId + '","RoleName":"' + RoleName + '","modulelist":' + z + '}';
    var url = '/RBAC/Role/Edit';
    alert(model);
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
                MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Role/Index");
        } else {
            MyAlert(3, data.sResponseString);
            $('#SubmitBtn').makeDisable();
        }
    });
};
function IsActiveClick() {
    var myCtrl = $(IsActiveClick.caller.arguments[0].target);
    if (myCtrl.prop('checked')) {
        myCtrl.val(1);
        EnableSubmitBtn();
    } else {
        myCtrl.val(0);

    }
};
async function GetActionsName(ActionId,value,SelectedValue) {
    (async function () {
        const r1 = await getMultiselectDataWithSelectedValues(ActionId.attr('id'), '/RBAC/Role/GetActionsList?Id=' + value, SelectedValue);
    })();

};
async function getInitialData() {
    var rowid = 0;
    var CanDelete = $('#CanDelete').val();
    var RID = $('#RoleId').val();
    var ModuleName = $('#ModuleName');
    var SubModuleName = $('#SubModuleName');
    var NavigationName = $('#NavigationName');
    var TaskName = $('#TaskName');
    var TaskNames = $('#TaskNames');
    var TaskId = $('#TaskId');
    var ID = $('#ID');
    var ActionId = $('#ActionId');
    var Action = $('#Actions');
    var ModuleName = $('#ModuleName');
    var NavigationIds = $('#NavigationId');
    var Roles = $('#Roles');
    var Actions = true;
    $.ajax({
        url: '/Role/GetRoleDetailsForView?RoleId=' + RID,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            if (CanDelete == false) {
                Actions = false;
            }
            $(data).each(function (index, item) {
                $('#RoleDiv').html(item.RoleId);
                $('#RoleName').val(item.RoleName);

                $(item.rolelist).each(function (indexs, items) {
                    if (indexs > 0) {
                       // rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, true, CanDelete == 1 ? true : false);
                        rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, Actions, false);
                        ModuleName = $('#ModuleName_' + rowid);
                        SubModuleName = $('#SubModuleName_' + rowid);
                        NavigationName = $('#NavigationName_' + rowid);
                        Roles = $('#Roles_' + rowid);
                        TaskName = $('#TaskName_' + rowid);
                        TaskNames = $('#TaskNames_' + rowid);
                        TaskId = $('#TaskId_' + rowid);
                        Action = $('#Actions_' + rowid);
                        NavigationIds = $('#NavigationId_' + rowid);
                       
                        
                    }
                    ModuleName.html(items.ModuleName);
                    SubModuleName.html(items.SubModuleName);
                    NavigationName.html(items.NavigationName);
                    Roles.val(RID);
                    TaskName.html(items.TaskName);
                    TaskNames.val(items.TaskName);
                    TaskId.val(items.TaskId);
                    Action.html(items.ActionIds);
                    NavigationIds.val(items.NavigationId)
                   
                   
                });
            });
        }
    });
};
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    var tblRow = tblRow.closest('.add-row');
    var targetCtrl = $(tblRow);
    var targetid = targetCtrl.attr('id');
    var Rocount = $('#TblTask').find('.add-row').length;
    var Roles ;
    var NavigationId ;
    var TaskId;
    if (targetid > 0) {
        Roles = $('#Roles_' + targetid).val();
        NavigationId = $('#NavigationId_' + targetid).val();
        TaskId = $('#TaskId_' + targetid).val();
    } else {
        Roles = $('#Roles').val();
        NavigationId = $('#NavigationId').val();
        TaskId = $('#TaskId').val();
    }
    var model = '{"RoleId":"' + Roles + '","NavigationId":"' + NavigationId + '","TaskId":"' + TaskId + '"}';
    var url = '/RBAC/Role/Delete';
    if (Rocount == 1) { 
        Swal.fire({
            title: 'Confirmation',
            text: 'This Last Record For This Role,If you Deleted then Entire Role Will be Deleted..!!',
            icon: 'question',
            customClass: 'swal-wide',
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonClass: 'btn-cancel',
            confirmButtonColor: '#2527a2',
            showCancelButton: true,
        }).then(function (result) {
            if (result.isConfirmed) {
                PostDataInAjax(url, model).done(function (data) {
                    if (data.bResponseBool) {
                            MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Role/Index");
                    } else {
                        MyAlert(3, data.sResponseString);

                    }
                });
            }
        });
    }
    else {
        PostDataInAjax(url, model).done(function (data) {
            if (data.bResponseBool) {
                    MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Role/Details?ID=" + Roles + "&CanDelete=1&CBUID=0");
            } else {
                MyAlert(3, data.sResponseString);
            }
        });
    }

};