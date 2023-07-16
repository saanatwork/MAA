$(document).ready(function () {
    (async function () {
        const r3 = await getInitialData();
    })();
});
async function GetVechileType(selectedval) {
    var DropdownCtrl = $('#VehicleTypeProvideds');
    var pubTran = $('#travDetails_PublicTransports').val();
    var VType = $('#travDetails_VehicleType').val();
    var PublicT = VType;
    $('#VehicleTypeVal').val('');

    if (pubTran == 'True') {
        DropdownCtrl.append($('<option/>', { value: "3", text: "Public Transport" }));
        DropdownCtrl.isValid();
        DropdownCtrl.makeDisable();
        $('#VehicleTypeVal').val(3);
    }
    if (pubTran == 'False') {
        getDropDownDataWithSelectedValue(DropdownCtrl.attr('id'), 'Select', '/Security/ETS/GetVehicleTypes?TypeVal=' + PublicT + '&PT=PT', selectedval)
    }
};
async function GetAuthEmployee(selectedval, Vtype) {
    var NoteNo = $('#NoteNumber').val();
    var pubTran = $('#travDetails_PublicTransports').val();
    var DropdownCtrl = $('#EmployeeNonName');
    var EligibleVeh = $('#EligibleVeh');
    var VehicleAlloc = $('#VehicleAlloc');
    var dateDetails = $('#dateDetails');
    //VehicleAlloc.isInvalid();
    //EligibleVeh.isInvalid();
    dateDetails.show();
    DropdownCtrl.makeEnabled();
    DropdownCtrl.val('');
   // DropdownCtrl.isInvalid();
    if (Vtype == "") {
        if (pubTran == 'False') {
            getDropDownDataWithSelectedValue(DropdownCtrl.attr('id'), 'Select', '/Security/EMN/GetEmployeeNoName?Noteno=' + NoteNo, selectedval)
        } else {
            DropdownCtrl.append($('<option/>', { value: "NA", text: "NA" }));
            DropdownCtrl.clearValidateClass();
            DropdownCtrl.makeDisable();
            DropdownCtrl.makeDisable();
            VehicleAlloc.addClass('is-valid').removeClass('is-invalid');
            EligibleVeh.addClass('is-valid').removeClass('is-invalid');
            dateDetails.hide();

        }
    } else if (Vtype == "3") {

        DropdownCtrl.append($('<option/>', { value: "NA", text: "NA" }));
        DropdownCtrl.val('NA');
        DropdownCtrl.clearValidateClass();
        DropdownCtrl.makeDisable();
        VehicleAlloc.addClass('is-valid').removeClass('is-invalid');
        EligibleVeh.addClass('is-valid').removeClass('is-invalid');
        dateDetails.hide();
    } else {
       // DropdownCtrl.isInvalid();
        getDropDownDataWithSelectedValue(DropdownCtrl.attr('id'), 'Select', '/Security/EMN/GetEmployeeNoName?Noteno=' + NoteNo, selectedval)
    }
      EnableSubmitBtnActive();
};
function ValidateControlCtrl() {
    var target = ValidateControlCtrl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    //if (targetid == 'VehicleTypeProvideds') {
    //    if ($(target).val() == "") {
    //        $('#EmployeeNonName').val('').removeClass('is-invalid').removeClass('is-valid');
    //        $('#EmployeeNonName').makeDisable();
    //    } else {
    //        $('#EmployeeNonName').val('');
    //        $('#EmployeeNonName').makeEnabled();
    //        $('#EmployeeNonName').isInvalid();
    //    }


    //} 

    EnableSubmitBtnActive();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "VehicleAlloc":
            isvalid = validatectrl_YesNoCombo(value);
            break;
        case "EligibleVeh":
            isvalid = validatectrl_YesNoCombo(value);
            break;
        case "ReasonVehicleProvideds":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "VehicleTypeProvideds":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "EmployeeNonName":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
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
function validatectrl_YesNoCombo(value) {

    if (value * 1 > 0) {
        return true;
    } else { return false; }
};
function EnableSubmitBtnActive() {
    var x = getDivInvalidCount('TravDetails');
    var y = getDivInvalidCount('dateDetails');
    var DWTBtn = $('#btnSubmit');
    if ((x + y) * 1 > 0) {
        DWTBtn.makeDisable();
    }
    else {
        DWTBtn.makeEnabled();
    }
};
function Buttonclear() {
    $('.clear').val('');
    $('.clear').isInvalid();
};
function SaveDataTravClicked() {
    debugger;
    var VehicleTypeId;
    var Vtypeval = $('#VehicleTypeVal').val();
    var VehicleTypeProvided = $('#VehicleTypeProvideds').val();
    if (Vtypeval != "") {
        VehicleTypeId = Vtypeval;
    } else { VehicleTypeId = VehicleTypeProvided; }

    var ReasonVehicleProvided = $('#ReasonVehicleProvideds').val();
    var NoteNumber = $('#NoteNumber').val();
    var EmployeeNonName = $('#EmployeeNonName').val();
    var x = '{"VehicleTypeProvided":"' + VehicleTypeId + '","NoteNumber":"' + NoteNumber + '","ReasonVehicleProvided":"' + ReasonVehicleProvided + '","EmployeeNonName":"' + EmployeeNonName + '"}';
    $.ajax({
        method: 'POST',
        url: '/EMN/SetApprovalTravDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                var url = "/Security/EMN/EMNApproveNote?NoteNumber=" + NoteNumber;
                if (item.bResponseBool == true) {
                    MyAlertWithRedirection(1, 'Travelling Approval Details Update Successfully.', url)
                }
                else {
                    MyAlert(4, 'Failed To Update Details.')
                }

                //if (item.bResponseBool == true) {

                //    Swal.fire({
                //        title: 'Confirmation',
                //        text: 'Travelling Approval Details Update Successfully.',
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
                //            var url = "/Security/EMN/EMNApproveNote?NoteNumber=" + NoteNumber;
                //            window.location.href = url;
                //        }
                //    }
                //}
                //else {
                //    Swal.fire({
                //        title: 'Error',
                //        text: 'Failed To Update Traveling Details.',
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
async function getInitialData() {
  
    var selectedval = "";
    var Vtype = "";
    var NoteNo = $('#NoteNumber');
    var EmpNoName = $('#travDetails_EmpNoName');
    var ReasonVehicleProvided = $('#travDetails_ReasonVehicleProvided');
    var VehicleTypeProvided = $('#travDetails_VehicleTypeProvided');
    var EmployeeNonName = $('#EmployeeNonName');
    var VehicleTypeProvideds = $('#VehicleTypeProvideds');
    var EligibleVeh = $('#EligibleVeh');
    var VehicleAlloc = $('#VehicleAlloc');
    var btnSubmit = $('#btnSubmit');
    if (VehicleTypeProvided.val() > 0) {
        btnSubmit.makeDisable();
        $('#ReasonVehicleProvideds').val(ReasonVehicleProvided.val());
        $('#ReasonVehicleProvideds').isValid();
        (async function () {
            const r1 = await GetVechileType(VehicleTypeProvided.val());
            const r2 = await GetAuthEmployee($.trim(EmpNoName.val()), VehicleTypeProvided.val());
        })();
       
        GetEmpEligibilty(parseInt($.trim(EmpNoName.val())), VehicleTypeProvided.val());
        VehicleTypeProvideds.addClass('is-valid valid').removeClass('is-invalid');
        EligibleVeh.val('1').addClass('is-valid valid').removeClass('is-invalid');
        VehicleAlloc.val('1').addClass('is-valid valid').removeClass('is-invalid');
        EmployeeNonName.addClass('is-valid valid').removeClass('is-invalid');

    } else {
        (async function () {
            const r1 = await GetVechileType(selectedval);
            const r2 = await GetAuthEmployee(selectedval, Vtype);
        })();

    }
    EnableSubmitBtnActive();

};
$(function () {
    var selectedval = "";
    var EligibleVeh = $('#EligibleVeh');
    var VehicleAlloc = $('#VehicleAlloc');
    $("#VehicleTypeProvideds").change(function () {
        var Vtype = $('option:selected', this).val();
        GetAuthEmployee(selectedval, Vtype);
        EligibleVeh.val('');
        EligibleVeh.isInvalid();
        VehicleAlloc.val('');
        VehicleAlloc.isInvalid();
        if (Vtype != 3) {
            $('#EmployeeNonName').isInvalid();
        }
    });
});
$(function () {
    var selectedval = "";
    $("#EmployeeNonName").change(function () {
        var EMPName = $('option:selected', this).val();
        GetEmpEligibilty(parseInt(EMPName), selectedval)
    });
});
function GetEmpEligibilty(actualempcode, VtypeProvided) {
    if (VtypeProvided == "") {
        var VtypeProvided = $("#VehicleTypeProvideds").val();
    }
    var mUrl = "/ETS/GetVehicleEligibility?EmployeeNumber=" + actualempcode;
    $.ajax({
        url: mUrl,
        success: function (result) {

            GetStatement(result.ID, VtypeProvided);
            // alert(result.DisplayText);
            //alert(result.ID);
        }
    });
}
async function GetStatement(EligibleVT, VtypeProvided) {
  
    var EligibleVeh = $('#EligibleVeh');
    var VehicleAlloc = $('#VehicleAlloc');
    var dateDetails = $('#dateDetails');
    var VA = $('#VA');
    var EV = $('#EV');

    VehicleAlloc.isInvalid();
    EligibleVeh.isInvalid();
    dateDetails.show();
    var mUrl = "/ETS/getVehicleEligibilityStatement?EligibleVT=" + EligibleVT + "&ProvidedVT=" + VtypeProvided;
    $.ajax({
        url: mUrl,
        success: function (result) {
            if ($.trim(result.CStatement) == "1") {
                VehicleAlloc.isValid();
                VA.hide();
            } else if (result.CStatement == null) {
                VehicleAlloc.isValid();
                EligibleVeh.isValid();
                dateDetails.hide();
            }
            EnableSubmitBtnActive();
        }
    });
   
};
function keypressCountWord(e) {
    var target = keypressCountWord.caller.arguments[0].target;
    var targetCtrl = $(target).val();
    if (WordCount(targetCtrl) > 50) {
        $(target).preventTypying();
    } else {
        $(target).off('keypress');
    }
}