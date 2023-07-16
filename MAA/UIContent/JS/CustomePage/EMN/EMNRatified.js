$(document).ready(function () {
    $('#NoteNumber').change(function () {
        Notenumberchanged($(this).val());
    });

    Notenumberchanged($('#NoteNumber').val());
    var btnDisplays = $("#btnDisplay").val();
    var Approval = $("#Approval");
    var TraveDetails = $("#TraveDetails");
    if (btnDisplays == 1) {
        $('#NoteNumber').makeDisable();
        UnLockSection('TraveDetails');
        $('#btnTravDetails').makeEnabled();
        //LockSection('Approval');
    } else {
        $('#NoteNumber').makeEnabled();
        LockSection('TraveDetails');
        LockSection('Approval');
    }
});
function Notenumberchanged(notenumber) {

    var noteCtrl = $('#NoteNumber');
    if (notenumber != '') {
        noteCtrl.isValid();
        $('.Qdiv').removeClass('inVisible');
        TPTableClear();
   
    $.ajax({
        url: '/EMN/GetEMNHdrDetails',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#CenterCodeName').val(item.emnHeader.CenterCodeName);
                $('#AttachFile').val(item.emnHeader.AttachFile);
                $('#EntryDate').val(item.emnHeader.EntryDateDisplay);
                $('#EntryTime').val(item.emnHeader.EntryTime);
                var approv = item.emnHeader.IsApproved == true ? "Yes" : "No"
                if (notenumber == null || notenumber == "") {
                    $('#IsApproved').val('-');
                    $('#ApprovedDateTime').val('-');
                    $('#ApprovedReason').val('-');
                } else {
                    $('#IsApproved').val(approv);
                    $('#ApprovedDateTime').val(item.emnHeader.ApproveDatestr + " " + item.emnHeader.ApproveTime);
                    $('#ApprovedReason').val(item.emnHeader.ApprovedReason);
                }
              
                $('#approval').removeClass('alert-danger').addClass('alert-success');

                if (item.TourCatStatus) {
                    $('#OtherPlace').val('Yes')
                } else { $('#OtherPlace').val('-') }
               
                getTravellingPersonData('-1')
               // if ($('#CenterCodeName').val() != "") { $('#btnTravDetails').makeEnabled(); }

            });

            if ($("#btnDisplay").val() == 0) {
                MyAlert(0, 'For Futher Process ,Please check Attachment File First..!!');
            }
        }
    });
        GetEmployeeList(notenumber)
    } else { noteCtrl.isInvalid(); $('.Qdiv').addClass('inVisible'); }
};
function GetEmployeeList(notenumber) {
    (async function () {
        const r2 = await getDropDownDataWithSelectedValue('CenterCN', 'All Centers', '/Security/EMN/getCenterCodeListFromTravellingPerson?NoteNumber=' + notenumber, '-1');
    })();
}
$(document).ready(function () {
    $('#btnViewDoc').click(function () {
        var docfilename = $('#AttachFile').val();
        var filepath = "/Upload/Forms/" + docfilename;
        if (docfilename.length > 2) { OpenWindow(filepath); $('#btnTravDetails').makeEnabled();}
        else {
            MyAlert(0, 'No Document Found For This Note');
            $('#btnTravDetails').makeDisable();
        }
    });
})
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).isValidCtrl();
    } else {
        $(target).isInvalidCtrl();
    }
    if (targetid == 'IsRatified') {
        if ($(target).val() == 1) {
            $('#RatifiedReason').makeDisable();
            $('#RatifiedReason').val('');
            $('#RatifiedReason').removeClass('is-invalid').removeClass('is-valid');
        } else {
            $('#RatifiedReason').makeEnabled()
            $('#RatifiedReason').isInvalid();
        }
    }
    EnableSubmitBtn();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    var Approval = $('#Approval')
    switch (targetid) {
        case "OtherP":
            isvalid = validatectrl_YesNoCombo(value);
            if (isvalid) {
                $('.OtherP').removeClass('border-red').addClass('border-green');
               // UnLockControl('Approval');
                $('#RDiv').addClass('SLUSection');
            }
            else {
                $('.OtherP').removeClass('border-green').addClass('border-red');
               // LockSection('Approval');
                $('#RDiv').removeClass('SLUSection');
            }
            break;
        case "IsRatified":
            isvalid = validatectrl_YesNoComboApproval(value);
            break;
        case "RatifiedReason":
            isvalid = validatectrl_ValidateLength(value);
            break;

    }

    return isvalid;
};
function validatectrl_ValidateLength(value) {
    if (value.length > 0) {
        return true;
    } else { return false; }
};
function validatectrl_YesNoCombo(value) {

    if (value * 1 > 0) {
        return true;
    } else { return false; }
};
function validatectrl_YesNoComboApproval(value) {

    if (value * 1 >= 0) {
        return true;
    } else { return false; }
};
function EnableSubmitBtn() {
    var x = getDivInvalidCount('TravDetails');
    var y = getDivInvalidCount('dateDetails');
    var DWTBtn = $('#btnSubmit');
    var btnDisplay = $('#btnDisplay').val();

    // alert(x); alert(y);
    if ((x + y) * 1 > 0 || btnDisplay == 0) {
        DWTBtn.makeDisable();
    }
    else {
        DWTBtn.makeEnabled();
    }
};
function Buttonclear() {
    $('.clear').val('');
    $('.clear').isInvalid();
}
function SaveDataClicked() {
    var NoteNumber = $('#NoteNumber').val();
    var IsRatified = $('#IsRatified').val();
    var RatifiedReason = $('#RatifiedReason').val();
    var x = '{"NoteNumber":"' + NoteNumber + '","IsRatified":"' + IsRatified + '","RatifiedReason":"' + RatifiedReason + '"}';
    $.ajax({
        method: 'POST',
        url: '/EMN/RTFNCreate',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {

                var url = "/Security/EMN/RTFNIndex";
                if (item.bResponseBool == true) {
                    MyAlertWithRedirection(1, 'Ratification Process Saved Successfully.', url)
                }
                else {
                    MyAlert(4, 'Failed To Update Details.')
                }

                //if (item.bResponseBool == true) {

                //    Swal.fire({
                //        title: 'Confirmation',
                //        text: 'Ratification Process Saved Successfully.',
                //        setTimeout: 5000,
                //        icon: 'success',
                //        customClass: 'swal-wide',
                //        buttons: {
                //            confirm: 'Ok'
                //        },
                //        confirmButtonColor: '#2527a2',
                //    }).then(callback);
                //    function callback(result) {
                //        if (result.value) {
                //            var url = "/Security/EMN/RTFNIndex";
                //            window.location.href = url;
                //        }
                //    }
                //}
                //else {
                //    Swal.fire({
                //        title: 'Error',
                //        text: 'Failed To Update Approval Process.',
                //        icon: 'question',
                //        customClass: 'swal-wide',
                //        buttons: {
                //            confirm: 'Ok'
                //        },
                //        confirmButtonColor: '#2527a2',
                //    });
                //}
            });
        },
    });

};
function CenterCNChanged() {
    var target = CenterCNChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    var mValue = targetCtrl.val();
    getTravellingPersonData(mValue);
};
function TPTableClear() {
    $("#tbody2").empty();
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

};
async function getTravellingPersonData(CenterCode) {
    TPTableClear();
    //$('#btnTravDetails').makeDisable();
    var rowid = 0;
    var TaDa;
    var NoteNumber = $('#NoteNumber').val();
    var DDPersonType = $('#DDPersonType');
    var EmployeeNo = $('#EmployeeNo');
    var DesgCodenName = $('#DesgCodenName');
    var EgblVehicleTypeName = $('#EgblVehicleTypeName');
    var TaDaDenied = $('#TaDaDenied');
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

                    if (items.TADADenieds == true) { TaDa = 'Yes' } else { TaDa = 'No' }
                    TaDaDenied.html(TaDa);
                });
               
            }

        }
    });
};