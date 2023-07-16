$(document).ready(function () {
    var NoteNo = $('#emnHeader_NoteNumber').val();
    (async function () {
        const r1 = await getTravellingPersonData();
    })();
});
async function getTravellingPersonData() {
    $("#tbody2").empty(); 
    var rowid = 0;
    var TaDa;
    var NoteNumber = $('#emnHeader_NoteNumber').val();
    var DDPersonType = $('#DDPersonType');
    var EmployeeNo = $('#EmployeeNo');
    var DesgCodenName = $('#DesgCodenName');
    var EgblVehicleTypeName = $('#EgblVehicleTypeName');
    var TaDaDenied = $('#TaDaDenied');
    var EPNoteNumber = $('#EPNoteNumber');
    var NoteDate = $('#NoteDate');
    DDPersonType.html('');
    EmployeeNo.html('');
    DesgCodenName.html('');
    EgblVehicleTypeName.html('');
    TaDaDenied.html('');
    EPNoteNumber.html('');
    NoteDate.html('');
    $.ajax({
        url: '/EMC/GetTravellingPersonForEMC?NoteNumber=' + NoteNumber,
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
                            EPNoteNumber = $('#EPNoteNumber_' + rowid);
                            NoteDate = $('#NoteDate_' + rowid);
                        }
                        DDPersonType.html(items.PersonTypeName);
                        EmployeeNo.html(items.EmployeeNonName);
                        DesgCodenName.html(items.DesignationCodenName);
                        EgblVehicleTypeName.html(items.EligibleVehicleTypeName);
                if ($.trim(items.EPNoteNumber) == "NA") { EPNoteNumber.html(items.EPNoteNumber); } else {
                      EPNoteNumber.html(items.EPNoteNumber);
                    NoteDate.html(items.NoteDatestr);
                }
                        if (items.TADADenieds == true) { TaDa = 'Yes' } else { TaDa = 'No'}
                        TaDaDenied.html(TaDa);
                    });
            }
          
        }
    });
};