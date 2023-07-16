$(document).ready(function () {
    (async function () {
        const r3 = await getInitialData();
    })();
    if ($('#CanDelete').val() == 1) {
        LockSection('ModuleDive');
    }
});

function SaveData() {
    var target = SaveData.caller.arguments[0].target;
    var SubmitType = $(target).attr('data-name');
    var z = GetDataFromTable('ModuleTable');
    var NavId = $("#NavigationId").val();
    var model = '{"NavigationId":"' + NavId + '","SubmitType":"' + SubmitType + '","modulelist":' + z + '}';
    var url = '/RBAC/Task/Edit';
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
    } else {
        myCtrl.val(0);
    }
    $('#SubmitBtn').makeEnabled();
};





async function getInitialData() {
    var rowid = 0;
    var MiD = $('#NavigationId').val() * 1;
    var TaskName = $('#TaskName');
    var TaskId = $('#TaskId');
    var IsActiveInt = $('#IsActiveInt');
    var Id = $('#ID');
    $.ajax({
        url: '/Task/GetTaskData?Id=' + MiD,
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            $(data).each(function (index, item) {
                //$('#ModuleName').val(item.ModuleName);
                //$('#SubModuleName').val(item.SubModuleName);
                //$('#NavigationName').val(item.NavigationName);
                //$('#ModuleId').val(item.ModuleId);
                //$('#SubModuleId').val(item.SubModuleId);
                //$('#NavigationId').val(item.NavigationId);
                $(item.navlist).each(function (indexs, items) {
                    if (indexs > 0) {
                        rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, true, false);
                        IsActiveInt = $('#IsActiveInt_' + rowid);
                        TaskName = $('#TaskName_' + rowid);
                        TaskId = $('#TaskId_' + rowid);
                        Id = $('#ID_' + rowid);
                    }
                    if (items.IsActive) {
                        IsActiveInt.val(items.IsActiveInt);
                        IsActiveInt.prop("checked", true);
                    } else {
                        IsActiveInt.val(items.IsActiveInt);
                        IsActiveInt.prop("checked", false);
                    }

                    TaskName.html(items.TaskName);
                    TaskId.val(items.TaskId);
                    Id.val(items.ID);

                   
                });
            });
        }
    });
};
