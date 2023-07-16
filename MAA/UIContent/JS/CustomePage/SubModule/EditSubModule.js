$(document).ready(function () {
    //(async function () {
    //    const r2 = await getDropDownDataWithSelectedValue('ModuleId', 'select Module', '/RBAC/Role/GetModule', 0);
    //})();

    (async function () {
        const r2 = await getInitialData();
    })();
    if ($('#CanDelete').val() == 1) {
        LockSection('ModuleDive');
    }
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
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); Savebtn.makeDisable(); } else { addBtnctrl.makeEnabled(); Savebtn.makeEnabled(); }

};
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    var rowid = $(tblRow).attr('id');

    var Id = 0;
    if (rowid > 0) {
        Id =$('#ID_' + rowid).val();
    } else {
        Id = $('#ID').val();
    }
    var model = '{"ID":"' + Id + '"}';
    DeleteRowData(model);

    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function IsActiveClick() {
    var myCtrl = $(IsActiveClick.caller.arguments[0].target);
    if (myCtrl.prop('checked')) {
        myCtrl.val(1);
    } else {
        myCtrl.val(0);
    }
};
function DeleteRowData(model) {
    
    PostDataInAjax('/RBAC/SubModule/Delete' , model).done(function (data) {
        if (data.bResponseBool) {
            MyAlert(1, data.sResponseString);
        } else {
            MyAlert(3, data.sResponseString);
        }
    });
}
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
        case "SubModuleName":
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
    var Savebtn = $('#Savebtn');
    if (z <= 0) {
        Savebtn.makeEnabled();
    } else {
        Savebtn.makeDisable();
    }
};
function SaveData() {
    var z = GetDataFromTable('ModuleTable');
    var MId = $("#ModuleId").val();
    var ButtonTypes = "Save";
    var model = '{"ModuleId":"' + MId + '","modulelist":' + z + ',"ButtonType":"' + ButtonTypes + '"}';
    var url = '/RBAC/SubModule/Edit';
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
            MyAlertWithRedirection(1, data.sResponseString, "/RBAC/SubModule/Index");
        } else {
            MyAlert(3, data.sResponseString);
            
        }
    });
};
function DeleteData() {
    var z = GetDataFromTable('ModuleTable');
    var MId = $("#ModuleId").val();
    var ButtonTypes = "Delete";
    var model = '{"ModuleId":"' + MId + '","modulelist":' + z + ',"ButtonType":"' + ButtonTypes + '"}';
    var url = '/RBAC/SubModule/Edit';
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
            MyAlertWithRedirection(1, data.sResponseString, "/RBAC/SubModule/Index");
        } else {
            MyAlert(3, data.sResponseString);

        }
    });
};
async function getInitialData() {
    var rowid = 0;
    var MiD = $('#ModuleId').val() * 1;
    var SubModuleName = $('#SubModuleName');
    var ID = $('#ID');
    var IsActiveInt = $('#IsActiveInt');
    $.ajax({
        url: '/SubModule/GetSubmoduleData?Id=' + MiD,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
               
                $('#ModuleName').val(item.ModuleName);
                $(item.sublist).each(function (indexs, items) {

                        if (indexs > 0) {
                            rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, true, false);
                            SubModuleName = $('#SubModuleName_' + rowid);
                            ID = $('#ID_' + rowid);
                            IsActiveInt = $('#IsActiveInt_' + rowid);
                    }
                    SubModuleName.val(items.SubModuleName).isValid();
                    ID.val(items.ID).isValid();

                    if (items.IsActive) {
                        IsActiveInt.val(items.IsActiveInt);
                        IsActiveInt.prop("checked", true);
                    } else {
                        IsActiveInt.val(items.IsActiveInt);
                    }
                        
                  
                   
                       
                    });
            });
        }
    });
};
