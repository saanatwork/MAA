$(document).ready(function () {
    (async function () {
        const r2 = await getDropDownDataWithSelectedValue('ModuleId', 'Select Module', '/RBAC/Role/GetModule', 0);
    })();
    LockSection('ModuleDive');
});
function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    var rowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, true, false);
    addbtn.tooltip('hide');
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
    var z = GetDataFromTable('ModuleTable');
    var MId = $("#ModuleId option:selected").val();
    var SubmitType = "Save";
    
    var model = '{"ModuleId":"' + MId + '","modulelist":' + z + ',"SubmitType":"' + SubmitType+'"}';
    var url = '/RBAC/SubModule/Create';
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
function FinalSubmit() {
    var z = GetDataFromTable('ModuleTable');
    var MId = $("#ModuleId option:selected").val();
    var SubmitType = "Final";
    var model = '{"ModuleId":"' + MId + '","modulelist":' + z + ',"SubmitType":"' + SubmitType + '"}';
    var url = '/RBAC/SubModule/Create';
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
            MyAlertWithRedirection(1, data.sResponseString, "/RBAC/SubModule/Index");
        } else {
            MyAlert(3, data.sResponseString);
        }
    });
};
function IsActiveClick() {
    var myCtrl = $(IsActiveClick.caller.arguments[0].target);
    if (myCtrl.prop('checked')) {
        myCtrl.val(1);
    } else {
        myCtrl.val(0);
    }
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
    EnableSubmitBtn();
    $('#SubmitBtn').makeDisable();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "SubModuleName":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "ModuleId":
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
    $('#SubModuleName').val('').isInvalid();
    $('#tbody2').empty();


    $('#SubmitBtn').makeDisable();
    UnLockSection('ModuleDive');
    EnableSubmitBtn();
};

