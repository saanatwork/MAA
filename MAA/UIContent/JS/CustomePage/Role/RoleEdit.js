$(document).ready(function () {
   
    (async function () {
        const r1 = await getInitialData();
    })();
    (async function () {
        const r2 = await GetModuleList(0, 0);
    })();



});
async function GetModuleList(ID, selectedvalue) {
    getDropDownDataWithSelectedValue('ModuleId', 'Select Module', '/RBAC/Role/GetModule?ID='+ 0, selectedvalue);

};
function ModuleChange() {
}
async function GetTPDetails(NavigationId) {
    var TPDetailsDiv = $('#TaskDiv');
    TPDetailsDiv.addClass('inVisible');
    var dataSourceURL = '/RBAC/Role/TaskDetails?NavigationId=' + NavigationId;
    $.ajax({
        url: dataSourceURL,
        contentType: 'application/html; charset=utf-8',
        type: 'GET',
        dataType: 'html',
        success: function (result) {
            TPDetailsDiv.removeClass('inVisible');
            TPDetailsDiv.html(result);
            $('.ApplyMultiSelectWithSelectAll').each(function () {
                that = $(this);
                that.prop('multiple', 'multiple');
                that.multiselect({
                    templates: {
                        button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                    },
                    includeSelectAllOption: true,
                    selectAllName: 'select-all-name'
                });
                that.multiselect('clearSelection');
                that.multiselect('refresh');
            });
        },
        error: function (xhr, status) {
            TPDetailsDiv.html(xhr.responseText);
        }
    })
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "RoleName":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "ModuleId":
            isvalid = validatectrl_ValidatestringLength(value);
            $('#BtnSubmit').makeDisable();
            break;
        case "SubModuleId":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "NavigationId":
            isvalid = validatectrl_ValidatestringLength(value);
        case "ActionIDs":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "ActionId":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "TaskId":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
       
        default:
    }
    return isvalid;
};
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
    EnableAddBtn(tblRow, 'AddBtn');
};
function SaveData() {
    var target = SaveData.caller.arguments[0].target;
    var z = GetDataFromTable('TblTask');
    var RoleId = $("#RoleId").val();
    var RoleName = $("#RoleName").val();
    var model = '{"RoleId":"' + RoleId + '","RoleName":"' + RoleName + '","modulelist":' + z + '}';
    var url = '/RBAC/Role/Edit';
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
async function GetActionsName(ActionId, value, SelectedValue) {
   
    (async function () {
        const r1 = await getMultiselectDataWithSelectedValues(ActionId.attr('id'), '/RBAC/Role/GetActionsList?Id=' + value, SelectedValue);
    })();

};
async function getInitialData() {
    var rowid = 0;
    var RID = $('#RoleId').val();
    var ModuleName = $('#ModuleName');
    var SubModuleName = $('#SubModuleName');
    var NavigationName = $('#NavigationName');
    var TaskName = $('#TaskName');
    var TaskNames = $('#TaskNames');
    var TaskId = $('#TskID');
    var ID = $('#ID');
    var ActionId = $('#ActionId');
    var ModuleName = $('#ModuleName');
    var NavigationIds = $('#NavigationIds');
    $.ajax({
        url: '/Role/GetRoleDetails?RoleId=' + RID,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#RoleDiv').html(item.RoleId);
                $('#RoleName').val(item.RoleName);
                $(item.rolelist).each(function (indexs, items) {
                    debugger;
                    if (indexs > 0) {
                        rowid = CloneRowReturningIDV2('tbody1', 'tbody2', indexs - 1, false, false);
                        ModuleName = $('#ModuleName_' + rowid);
                        SubModuleName = $('#SubModuleName_' + rowid);
                        NavigationName = $('#NavigationName_' + rowid);
                        TaskName = $('#TaskName_' + rowid);
                        TaskNames = $('#TaskNames_' + rowid);
                        TaskId = $('#TskID_' + rowid);
                        ActionId = $('#ActionId_' + rowid);
                        NavigationIds = $('#NavigationIds_' + rowid);
                    }
                    ModuleName.html(items.ModuleName);
                    SubModuleName.html(items.SubModuleName);
                    NavigationName.html(items.NavigationName);
                    TaskName.html(items.TaskName);
                    TaskNames.val(items.TaskName);
                    TaskId.val(items.TaskId);
                    GetActionsName(ActionId, items.TaskId, items.ActionIds);
                    ActionId.isValid();
                    NavigationIds.val(items.NavigationId)
                    $('.ApplyMultiSelectWithSelectAll').each(function () {
                        that = $(this);
                        that.prop('multiple', 'multiple');
                        that.multiselect({
                            templates: {
                                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                            },
                            includeSelectAllOption: true,
                            selectAllName: 'select-all-name'
                        });
                        that.multiselect('clearSelection');
                        that.multiselect('refresh');
                    });
                });
            });
        }
    });
};
function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    var rowid = CloneRowReturningID('tbody3', 'tbody4', $(insrow).attr('id') * 1, true, false);
    addbtn.tooltip('hide');
    $('#SubModuleId_' + rowid).empty();
    $('#NavigationId_' + rowid).empty();
    $('#TaskId_' + rowid).empty();
    $('#ActionIDs_' + rowid).multiselect('refresh');
    addbtn.makeDisable();
    $('#BtnSubmit').makeDisable();
};
function EnableAddBtn(tblRow, addBtnBaseID) {
    debugger;
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);

    var Savebtn = $('#Savebtn');
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); $('#BtnSubmit').makeDisable(); } else {
        addBtnctrl.makeEnabled();
        $('#BtnSubmit').makeEnabled();
    }

};
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody4');
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function CheckValueDuplicate() {
    var target = CheckValueDuplicate.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var mIndex = $(tblRow).attr('id');
    var targetCtrl = $(target);
    var mValue = targetCtrl.val();

    //Check for Duplicate Person
    var dstat = 0;
    $('.xPerson').each(function () {
        if (mValue != '' && $(this).val() == mValue) { dstat += 1; }
    });

    if (dstat > 1) {
        targetCtrl.val('');
        targetCtrl.isInvalid();
        Swal.fire({
            title: 'Data Duplicacy Error',
            text: 'Task You Have Selected Is Already Taken.',
            icon: 'error',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
    } else {
        getDesgnCode(mIndex, mValue);
        EnableAddBtn(tblRow, 'AddBtn');
    }
}