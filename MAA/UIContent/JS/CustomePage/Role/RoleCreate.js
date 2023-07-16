$(document).ready(function () {
 
    (async function () {
        const r1 = await GetModuleList(0, 0);
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
            $('#SubModuleId,#NavigationId').val('').isInvalid();
            $('#NavigationId').empty();
            $('#TaskDiv').addClass('inVisible');
            break;
        case "SubModuleId":
            isvalid = validatectrl_ValidatestringLength(value);
            $('#NavigationId').val('').isInvalid();
            $('#TaskDiv').addClass('inVisible');
            break;
        case "NavigationId":
            isvalid = validatectrl_ValidatestringLength(value);
            GetTPDetails(value);
        case "ActionIDs":
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
function validatectrl_ValidatestringLength(value) {
    if (value != "-1") {
        return true;
    } else { return false; }
};
function EnableSubmitBtn() {
    //var r = $(EnableSubmitBtn.caller.arguments[0].target.closest('.add-row'));
    //var Checked = r.find('checkbox').Checked();
    //alert(Checked);

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
    var SubmitType = $(target).attr('name');
    var z = GetDataFromTable('Tasktbl');
    var RoleId = $("#RoleIds").val();
    var RoleName = $("#RoleName").val();
    var NavId = $("#NavigationId option:selected").val();
    var model = '{"RoleId":"' + RoleId + '","RoleName":"' + RoleName + '","NavigationId":"' + NavId + '","modulelist":' + z + ',"SubmitType":"' + SubmitType + '"}';
    var url = '/RBAC/Role/Create';
    PostDataInAjax(url, model).done(function (data) {
        if (data.bResponseBool) {
            if (SubmitType == "Save") {
                MyAlert(1, data.sResponseString);
                $("#RoleName").prop('readonly', true);
                //MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Role/Create");
                $('#BtnSubmit').makeEnabled();
            } else {
                MyAlertWithRedirection(1, data.sResponseString, "/RBAC/Role/Index");
            }

        } else {
            MyAlert(3, data.sResponseString);
            $('#SubmitBtn').makeDisable();
        }
    });
};

function IsActiveClick() {
    var myCtrl = $(IsActiveClick.caller.arguments[0].target);
    var rowid = $(myCtrl.closest('.add-row')).attr("id");
    var ActionIDs = $('#ActionIDs_0');
    if (rowid > 0) {
        ActionIDs = $('#ActionIDs_' + rowid);
    }
    debugger;
    if (myCtrl.prop('checked')) {
        myCtrl.val(1);
        ActionIDs.addClass('is-invalid');
        ActionIDs.removeAttr('disabled');
    
        $(myCtrl.closest('.add-row')).find('.multiselect').removeClass('disabled');
        $(myCtrl.closest('.add-row')).find('.multiselect').removeAttr('disabled');

    } else {
        myCtrl.val(0);
        ActionIDs.removeClass('is-invalid');
        $(myCtrl.closest('.add-row')).find('.multiselect').addClass('disabled');
        $(myCtrl.closest('.add-row')).find('.multiselect').attrty('disabled');

        
    }
   
   
};