$(document).ready(function () {
    var NoteNo = $('#emnHeader_NoteNumber').val();
    (async function () {
        const r1 = await getDropDownDataWithSelectedValue('CenterCN', 'All Centers', '/Security/EMN/getCenterCodeListFromTravellingPerson?NoteNumber=' + NoteNo, '-1');
    })();
    getTravellingPersonData('-1')
});
function CenterCNChanged() {
    var target = CenterCNChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    var mValue = targetCtrl.val();
    getTravellingPersonData(mValue);
    $('#btnTravDetails').makeEnabled();

};
async function getTravellingPersonData(CenterCode) {
    $("#tbody2").empty();
    
    var rowid = 0;
    var TaDa;
    var NoteNumber = $('#emnHeader_NoteNumber').val();
    var DDPersonType = $('#DDPersonType');
    var EmployeeNo = $('#EmployeeNo');
    var DesgCodenName = $('#DesgCodenName');
    var EgblVehicleTypeName = $('#EgblVehicleTypeName');
    var TaDaDenied = $('#TaDaDenied');
    DDPersonType.html('');
    EmployeeNo.html('');
    DesgCodenName.html('');
    EgblVehicleTypeName.html('');
    TaDaDenied.html('');
    debugger;
    $.ajax({
        url: '/EMN/GetTravellingPersonForEMN?NoteNumber=' + NoteNumber + '&CenterCode=' + CenterCode,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var Datalenght = Object.keys(data).length;
           
            if (Datalenght > 0) {
            $(data).each(function (indexs, items) {
                        if (indexs > 0) {
      
                            rowid = CloneRowWithNoControlsReturningID('tbody1', 'tbody2', indexs - 1)
                            DDPersonType = $('#DDPersonType_' + rowid);
                            EmployeeNo = $('#EmployeeNo_' + rowid);
                            DesgCodenName = $('#DesgCodenName_' + rowid);
                            EgblVehicleTypeName = $('#EgblVehicleTypeName_' + rowid);
                            TaDaDenied = $('#TaDaDenied_' + rowid);
                            
                        }
                        DDPersonType.html(items.PersonTypeName);
                        EmployeeNo.html(items.EmployeeNonName);
                        DesgCodenName.html(items.DesignationCodenName);
                        EgblVehicleTypeName.html(items.EligibleVehicleTypeName);

                        if (items.TADADenieds == true) { TaDa = 'Yes' } else { TaDa = 'No'}
                        TaDaDenied.html(TaDa);
                    });
            }
          
        }
    });
};