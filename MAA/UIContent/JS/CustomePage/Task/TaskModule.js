$(document).ready(function () {
   
    (async function () {
        const r2 = await getDropDownDataWithSelectedValue('ModuleId', 'Select Module', '/RBAC/Role/GetModule', 0);
    })();
    //(async function () {
    //    const r3 = await getInitialData();
    //})();
    //if ($('#CanDelete').val() == 1) {
    //    LockSection('ModuleDive');
    //}
});
function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    var rowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, true, false);
    addbtn.tooltip('hide');
    $('#ID_' + rowid).val(0);
    addbtn.makeDisable();
    EnableSubmitBtn();
};
function EnableAddBtn(tblRow, addBtnBaseID) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);

    var Savebtn = $('#Savebtn');
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable();} else {
        addBtnctrl.makeEnabled();
        
    }

};
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function SaveData() {
    var target = SaveData.caller.arguments[0].target;
    var SubmitType = $(target).attr('data-name');
    var z = GetDataFromTable('ModuleTable');
    var MId = $("#ModuleId option:selected").val();
    var SubId = $("#SubModuleId option:selected").val();
    var NavId = $("#NavigationId option:selected").val();
    var model = '{"ModuleId":"' + MId + '","SubModuleId":"' + SubId + '","NavigationId":"' + NavId + '","modulelist":' + z + ',"SubmitType":"' + SubmitType+'"}';
    var url = '/RBAC/Task/Create';
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
                MyAlert(1, data.sResponseString);
                $('#Savebtn').makeDisable();
                $('#SubmitBtn').makeEnabled();
        } else {
            MyAlert(3, data.sResponseString);
            $('#SubmitBtn').makeDisable();
        }
    });
};


function SubmitData() {
    var target = SubmitData.caller.arguments[0].target;
    var SubmitType = $(target).attr('data-name');
    var z = GetDataFromTable('ModuleTable');
    var MId = $("#ModuleId option:selected").val();
    var SubId = $("#SubModuleId option:selected").val();
    var NavId = $("#NavigationId option:selected").val();
    var model = '{"ModuleId":"' + MId + '","SubModuleId":"' + SubId + '","NavigationId":"' + NavId + '","modulelist":' + z + ',"SubmitType":"' + SubmitType + '"}';
    var url = '/RBAC/Task/Create';
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
                MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Task/Index");
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
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "NavigationName":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "ModuleId":
            isvalid = validatectrl_ValidatestringLength(value);
            $('#SubModuleId,#NavigationId').val('').isInvalid();
            $('#NavigationId').empty();
            $('#ModuleDive').addClass('inVisible');
            $('#Savebtn').makeDisable();
            $('#SubmitBtn').makeDisable();
            break;
        case "SubModuleId":
            isvalid = validatectrl_ValidatestringLength(value);
            $('#NavigationId').val('').isInvalid();
            $('#ModuleDive').addClass('inVisible');
            $('#Savebtn').makeDisable();
            $('#SubmitBtn').makeDisable();
            break;
        case "NavigationId":
            isvalid = validatectrl_ValidatestringLength(value);
            if (isvalid) {
                $('#ModuleDive').removeClass('inVisible');
                getInitialData();
            } else {
                $('#ModuleDive').addClass('inVisible');
            }
            $('#Savebtn').makeDisable();
            $('#SubmitBtn').makeDisable();
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
function EnableSubmitBtn() {
   // var z = getDivInvalidCount('ModuleDive');
    var z = getDivInvalidCount('MainDiv');
    var SubmitBtn = $('#Savebtn');

    if (z <= 0) {
        SubmitBtn.makeEnabled();
    } else {
        SubmitBtn.makeDisable();
    }
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
};
function EmptyTable() {
    $('#tbody2').empty();
    $('#NavigationName').val('').isInvalid();
    $('#SubModuleId').isInvalid();
    
}
async function getInitialData() {
    $('#tbody2').empty();

    var rowid = 0;
    var TaskName = $('#TaskName');
    var TaskId = $('#TaskId');
    var IsActiveInt = $('#IsActiveInt');
    $.ajax({
        url: '/Task/GetTaskNameList',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, items) {
                    if (index > 0) {
                        rowid = CloneRowReturningID('tbody1', 'tbody2', index - 1, false, false);
                        TaskName = $('#TaskName_' + rowid);
                        TaskId = $('#TaskId_' + rowid);
                        IsActiveInt = $('#IsActiveInt_' + rowid);
                }
                IsActiveInt.prop('checked', false);
                IsActiveInt.val('0');
                TaskName.html(items.DisplayText);
                TaskId.val(items.ID);
            });
        }
    });
};
