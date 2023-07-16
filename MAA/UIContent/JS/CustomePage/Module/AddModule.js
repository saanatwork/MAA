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
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); } else { addBtnctrl.makeEnabled(); }

};
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function SaveData() {
    var x = GetDataFromTable('ModuleTable');
    var url = '/RBAC/Module/Create';
    PostDataInAjax(url, x).done(function (data) {
        if (data.bResponseBool) {
            MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Module/Index");
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
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "ModuleName":
            isvalid = validatectrl_ValidateLength(value);
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

function EnableSubmitBtn() {
    var z = getDivInvalidCount('ModuleDive');
    var SubmitBtn = $('#SubmitBtn');
    if (z <= 0) {
        SubmitBtn.makeEnabled();
    } else {
        SubmitBtn.makeDisable();
    }
};