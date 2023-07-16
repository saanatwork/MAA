function RemoveRole()
{
    var employeeNumber = $('#EmployeeNumber').val();
    var myCtrlRow = $(RemoveRole.caller.arguments[0].target.closest('tr'));
    var empname = $('#DataHdr_EmployeeName').val();
    var roleids = myCtrlRow.find('.ridDiv').html();
    var rolenames = myCtrlRow.find('.rnameDiv').html();
    var url = '/RBAC/UserManagement/DeleteUserRole';
    var BodyParamInJson = '{"EmployeeNumber":"' + employeeNumber
        + '","RoleIDs":"' + roleids + '"}';
    var msg = "Are You Sure To Delete Roles : '" + rolenames + "' For Employee " + empname
    MyAlertWithCallBack(2, msg, function () {
        PostDataInAjax(url, BodyParamInJson).done(function (data) {           
            if (data.bResponseBool == true) {
                if (data.iRespinseInteger == 1) {
                    MyAlertWithRedirection(1, "Data Deleted Successfully.","/RBAC/UserManagement/Index");
                }
                else {
                    myCtrlRow.remove();
                    MyAlert(1, "Data Deleted Successfully.");
                }                
            }
            else {
                MyAlert(3, "System Failed To Delete Data.");
            }
        });
    });
}
function DeleteAllRoles() {
    var employeeNumber = $('#EmployeeNumber').val();
    var empname = $('#DataHdr_EmployeeName').val();
    var url = '/RBAC/UserManagement/DeleteUserRole';
    var BodyParamInJson = '{"EmployeeNumber":"' + employeeNumber
        + '","RoleIDs":"ALL"}';
    var msg = "Are You Sure To Delete All Roles For Employee - " + empname
    MyAlertWithCallBack(2, msg, function () {
        PostDataInAjax(url, BodyParamInJson).done(function (data) {
            if (data.bResponseBool == true) {
                MyAlertWithRedirection(1, "Data Deleted Successfully.", "/RBAC/UserManagement/Index");
            }
            else {
                MyAlert(3, "System Failed To Delete Data.");
            }
        });
    });
};
$(document).ready(function () {
    var btnDelete = $('#deleteBtn');
    var actionhdr = $('#actionHdr');
    if ($('#IsDelete').val() == 1) {
        btnDelete.removeClass('inVisible');
        actionhdr.removeClass('inVisible');
        $('.deleteBtntd').each(function () {
            $(this).removeClass('inVisible');
        });
    }
    else {
        btnDelete.addClass('inVisible');
        actionhdr.addClass('inVisible');
        $('.deleteBtntd').each(function () {
            $(this).addClass('inVisible');
        });
    }
});