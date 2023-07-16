function Option1Changed() {
    var OptCtrl = $('#Option1');
    //var OptDiv = $('#Option1Div');
    if (OptCtrl.val() == 1) {
        OptCtrl.isValidCtrl(); 
    } else {
        OptCtrl.isInvalidCtrl(); 
    }
    EnableSubmitBtn();
};
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).isValidCtrl();
        $('#IsBtn').val(1);
    } else {
        $(target).isInvalidCtrl();
    }
    $('#VABackBtnActive').val(1);
    EnableSubmitBtn();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "VADetails_MaterialStatus":
            $('#MaterialStatus').val(value);
            if (value >= 0) { isvalid = true; }
            break;
        case "mDriverName":
            $('#DriverName').val(value);
            if (value !='') {
                isvalid = true;
            }
            break;
        //case "VADetails_DriverNumber":
        //    if (value >= 0) {
        //        var x = $('#VADetails_DriverNumber option:selected').text();
        //        $('#VADetails_DriverName').val(x);
        //        isvalid = true;
        //    }
        //    //alert(value+' - '+isvalid);
        //    break;
        case "VADetails_OtherVehicleModelName":
            if (value.length > 0) { isvalid = true; }
            break;
        case "VADetails_OtherVehicleNumber":
            $('#OtherVehicleNumber').val(value)
            if (IsAlphaNumeric(value)) {
                if (value.length == 10) {
                    isvalid = true;
                    var modelnameCtrl = $('#VADetails_OtherVehicleModelName');
                    modelnameCtrl.val('NA');
                    modelnameCtrl.clearValidateClass()
                    //modelnameCtrl.makeDisable();
                    $('#VADetails_OtherVehicleNumber').isValidCtrl();
                    $('#VADetails_VehicleNumber').clearValidateClass();
                    //alert(value);
                }
            }
            break;
    }
    return isvalid;
};
function VehicleNoChanged(value) {
    var targetCtrl = $('#VADetails_VehicleNumber');
    var Modelnamectrl = $('#ModelName');
    var Modelnamectrl2 = $('#VADetails_ModelName');
    var vno = targetCtrl.val();
    var fromdate = $('#SchFromDate').val();
    var todate = $('#SchToDate').val();
    var kmlimit =500;
    if ($('#VADetails_VehicleType').val() == 'LV') { kmlimit = 1000; }
    $('#VehicleNumber').val(vno);
    if (vno.length > 4) {
        var dataSourceURL = '/EHG/GetVehicleValidationForTour?VehicleNumber=' + vno + '&KMLimit=' + kmlimit + '&FromDate=' + fromdate + '&ToDate=' + todate;
        $.ajax({
            url: dataSourceURL,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.IsSuccess) {
                        Modelnamectrl.val(item.ModelName);
                        Modelnamectrl2.val(item.ModelName);
                        //$('#VADetails_KMOut').val(item.KMOut);
                        //$('#VADetails_KMIn').val(item.KMIn);
                        //alert(item.KMIn + ' - ' + item.KMOut);
                        targetCtrl.isValidCtrl();
                        EnableSubmitBtn();
                    } else {
                        MyAlert(4, item.Msg);
                        targetCtrl.isInvalid();
                        EnableSubmitBtn();
                    }                    
                });
            }
        });
        targetCtrl.isValidCtrl();
    } else { targetCtrl.isInvalidCtrl(); }
    $('#IsBtn').val(value);
    EnableSubmitBtn();
};
function VehicleBelongsToChanged(mVal) {
    var vbtoCtrl = $('#VADetails_VehicleBelongsTo');
    var ForCVCtrl = $('#for_company_vehicle');
    var ForOVCtrl = $('#for_other_vehicle');
    var CVModelCtrl = $('#for_company_vehicle_model_name');
    var OVModelCtrl = $('#for_other_vehicle_model_name');
    var vnCtrl = $('#VADetails_VehicleNumber');
    var vnoCtrl = $('#VADetails_OtherVehicleNumber');
    var modelNameCtrl = $('#VADetails_OtherVehicleModelName');
    var drivernameCtrl = $('#mDriverName');
    if (drivernameCtrl.val().length > 2) {
        $('#VADetails_DriverName').val(drivernameCtrl.val());
        drivernameCtrl.isValidCtrl();
    }
    else { drivernameCtrl.isInvalidCtrl();}
    var vehicleBelongsTo = vbtoCtrl.val() * 1;
    $('#VehicleBelongsTo2').val(vehicleBelongsTo);
    //alert(drivernameCtrl.val());
    if (vehicleBelongsTo == 1) {
        ForCVCtrl.removeClass('inVisible');
        vnCtrl.isInvalidCtrl();
        //vnCtrl.val('');
        vnoCtrl.clearValidateClass();
        modelNameCtrl.clearValidateClass();
        CVModelCtrl.removeClass('inVisible');
        vbtoCtrl.isValidCtrl();
        vnoCtrl.val('');
        ForOVCtrl.addClass('inVisible');
        OVModelCtrl.addClass('inVisible');
    }
    else if (vehicleBelongsTo == 2) {
        ForOVCtrl.removeClass('inVisible');
        OVModelCtrl.removeClass('inVisible');
        vnCtrl.clearValidateClass();
        vnoCtrl.isInvalidCtrl();
        vnoCtrl.makeSLUEnable();
        modelNameCtrl.isInvalid();
        //vnoCtrl.val('');        
        vbtoCtrl.isValidCtrl();
        ForCVCtrl.addClass('inVisible');
        CVModelCtrl.addClass('inVisible');
        validatectrl('VADetails_OtherVehicleNumber', vnoCtrl.val());
    }
    else {
        vbtoCtrl.isInvalidCtrl();
        vnCtrl.clearValidateClass();
        vnoCtrl.clearValidateClass();
        ForCVCtrl.addClass('inVisible');
        ForOVCtrl.addClass('inVisible');
        CVModelCtrl.addClass('inVisible');
        OVModelCtrl.addClass('inVisible');
    }
    if (mVal == '1') {
        VehicleNoChanged(0);
    } else {
        validatectrl('VADetails_OtherVehicleNumber', vnoCtrl.val());
    }
    EnableSubmitBtn();
};
function EnableSubmitBtn() {
    var x = getDivInvalidCount('HdrDiv') + getDivInvalidCount('Option1Div');
    var SubmitBtn = $('#btnSubmit');
    if (x <= 0 && $('#IsBtn').val() == 1) {
        SubmitBtn.makeSLUEnable();
    } else { SubmitBtn.makeSLUDisable(); }
};
$(document).ready(function () {
    var vbtoCtrl = $('#VADetails_VehicleBelongsTo');
    vbtoCtrl.change(function () {
        VehicleBelongsToChanged(0);
        $('#VABackBtnActive').val(1);
        EnableSubmitBtn();
    });    
    //Checking Initial Data
    var matStatusCtrl = $('#VADetails_MaterialStatus');
    var driverCtrl = $('#mDriverName');
    if (matStatusCtrl.val() >= 0) { matStatusCtrl.isValid(); } else { matStatusCtrl.isInvalid(); }
    if (driverCtrl.val().length >= 0) { driverCtrl.isValid(); $('#DriverName').val(driverCtrl.val()); } else { driverCtrl.isInvalid(); }
    if (vbtoCtrl.val() > 0) {
        vbtoCtrl.isValid(); VehicleBelongsToChanged(1);
        if (vbtoCtrl.val() == 1) {
            $('#VADetails_OtherVehicleNumber').clearValidateClass();
        } else { $('#VADetails_VehicleNumber').clearValidateClass();}
    } else { vbtoCtrl.isInvalid(); }

    $('#IsBtn').val(0);
    if ($('#IsDriverCtrlEnable').val() == 1) {
        driverCtrl.addClass('SLUCtrl');
    } else {
        driverCtrl.attr('disabled','disabled').removeClass('SLUCtrl');
    }
});
$(document).ready(function () {
    $('#btnClear').click(function () {
        $('#VADetails_MaterialStatus').val(-1).isInvalid();
        $('#VADetails_VehicleBelongsTo').val(0).isInvalid();
        VehicleBelongsToChanged(0);
        //$('#mDriverName').val('').isInvalid();
    });
    $('#btnBack').click(function () {
        var backbtnactive = $('#VABackBtnActive').val();
        //alert(backbtnactive);
        var backurl = "/Security/EntryI/Create";
        if (backbtnactive == 1) {
            Swal.fire({
                title: 'Confirmation',
                text: "Are You Sure Want to Go Back?",
                icon: 'question',
                customClass: 'swal-wide',
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonClass: 'btn-cancel',
                confirmButtonColor: '#2527a2',
                showCancelButton: true,
            }).then(callback);
            function callback(result) {
                if (result.value) {
                    window.location.href = backurl;
                }
            }
        }
        else {
            window.location.href = backurl;
        }
    });
});
$(document).ready(function () {
    var actualempcode = $('#VADetails_AuthorisedEmpNumber').val();
    var VtypeProvided = $('#VehicleType').val();
    GetEmpEligibilty(actualempcode, VtypeProvided);
});
function GetEmpEligibilty(actualempcode, VtypeProvided) {    
    var mUrl = "/ETS/GetVehicleEligibility?EmployeeNumber=" + actualempcode;
    $.ajax({
        url: mUrl,
        success: function (result) {
            GetStatement(result.ID, VtypeProvided);
        }
    });
}
async function GetStatement(EligibleVT, VtypeProvided) {    
    var VA = $('#VA');
    var EV = $('#EV');
    var mUrl = "/ETS/getVehicleEligibilityStatement?EligibleVT=" + EligibleVT + "&ProvidedVT=" + VtypeProvided;
    $.ajax({
        url: mUrl,
        success: function (result) {
            if ($.trim(result.CStatement) == "1") {
                //VA.addClass('inVisible');
                VA.addClass('sectionB');
                $('#VAStatement').val('');
            } else if (result.CStatement == null) {
                //EV.addClass('inVisible');
                EV.addClass('sectionB');
                $('#EVStatement').val('');
                //VA.addClass('inVisible');
                VA.addClass('sectionB');
                $('#VAStatement').val('');
            }
        }
    });

};