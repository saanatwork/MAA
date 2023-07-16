function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
        $('#IsBtn').val(1);
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    $('#VABackBtnActive').val(1);
    EnableSubmitBtn();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "VADetails_MaterialStatus":
            if (value >= 0) { isvalid = true; }
            break;
        case "VADetails_DriverNumber":
            if (value>=0) {
                var x = $('#VADetails_DriverNumber option:selected').text();
                $('#VADetails_DriverName').val(x);
                $('#DriverNumber').val(value);
                isvalid = true;                
            }
            //alert(value+' - '+isvalid);
            break;
        case "VADetails_OtherVehicleModelName":
            if (value.length > 0) { isvalid = true; }
            break;
        case "VADetails_OtherVehicleNumber":
            if (IsAlphaNumeric(value)) {
                if (value.length == 10) {
                    var url = '/EHG/IsVehicleExist?VehicleNumber=' + value;
                    GetDataFromAjax(url).done(function (data) {
                        if (data.bResponseBool == true) {
                            isvalid = true;
                            var modelnameCtrl = $('#VADetails_OtherVehicleModelName');
                            modelnameCtrl.val('NA');
                            modelnameCtrl.clearValidateClass()
                            //modelnameCtrl.makeDisable();
                            $('#VADetails_OtherVehicleNumber').isValid();
                            $('#VADetails_VehicleNumber').clearValidateClass();
                        }
                        else {
                            $('#VADetails_OtherVehicleNumber').isInvalid();
                            MyAlert(4, "The Vehicle Number Entered Is Found As Company Vehicle.")
                        }
                        EnableSubmitBtn();
                    });
                    //isvalid = true;
                    //var modelnameCtrl = $('#VADetails_OtherVehicleModelName');
                    //modelnameCtrl.val('NA');
                    //modelnameCtrl.clearValidateClass()
                    ////modelnameCtrl.makeDisable();
                    //$('#VADetails_OtherVehicleNumber').isValid();
                    //$('#VADetails_VehicleNumber').clearValidateClass();
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
    var fromdate = $('#FromdateForMang').val();
    var todate = $('#ToDateForMang').val();
    var kmlimit = 500;
    if ($('#VADetails_VehicleType').val() == 'LV') { kmlimit = 1000; }    
    var vno = targetCtrl.val();
    //alert(vno + ' - ' + fromdate + ' - ' + todate + ' - ' + kmlimit);
    if (vno.length > 4) {
        var dataSourceURL = '/EHG/GetVehicleValidationForTour?VehicleNumber=' + vno + '&KMLimit=' + kmlimit + '&FromDate=' + fromdate + '&ToDate=' + todate;
        //alert(dataSourceURL);
        $.ajax({
            url: dataSourceURL,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.IsSuccess) {
                        Modelnamectrl.val(item.ModelName);
                        Modelnamectrl2.val(item.ModelName);
                        targetCtrl.isValid();
                        EnableSubmitBtn();
                    }
                    else {
                        MyAlert(4, item.Msg);
                        targetCtrl.isInvalid();
                        EnableSubmitBtn();
                    }
                });
            }
        });        
    } else { targetCtrl.isInvalid(); }
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
    var vehicleBelongsTo = vbtoCtrl.val() * 1;
    if (vehicleBelongsTo == 1) {
        ForCVCtrl.removeClass('inVisible');
        vnCtrl.isInvalid();
        //vnCtrl.val('');
        vnoCtrl.clearValidateClass();
        modelNameCtrl.clearValidateClass();        
        CVModelCtrl.removeClass('inVisible');        
        vbtoCtrl.isValid();
        vnoCtrl.val('');
        ForOVCtrl.addClass('inVisible');
        OVModelCtrl.addClass('inVisible');
    }
    else if (vehicleBelongsTo == 2) {
        ForOVCtrl.removeClass('inVisible');
        OVModelCtrl.removeClass('inVisible');
        vnCtrl.clearValidateClass();        
        vnoCtrl.isInvalid();
        modelNameCtrl.isInvalid();
        //vnoCtrl.val('');        
        vbtoCtrl.isValid();
        ForCVCtrl.addClass('inVisible');
        CVModelCtrl.addClass('inVisible');
        validatectrl('VADetails_OtherVehicleNumber', vnoCtrl.val());
    }
    else {
        vbtoCtrl.isInvalid();
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
    var x = getDivInvalidCount('HdrDiv');
    var SubmitBtn = $('#btnSubmit');
    //alert($('#IsBtn').val());
    if (x <= 0 && $('#IsBtn').val()==1) {
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
    $('#btnBack').click(function () {
        debugger;
        var backbtnactive = $('#VABackBtnActive').val();
        var backurl = "/Security/EHG/Create";
        if (backbtnactive == 1) {
            MyAlertWithRedirection(2, "Are You Sure Want to Go Back?", backurl);
            //Swal.fire({
            //    title: 'Confirmation',
            //    text: "Are You Sure Want to Go Back?",
            //    icon: 'question',
            //    customClass: 'swal-wide',
            //    confirmButtonText: "Yes",
            //    cancelButtonText: "No",
            //    cancelButtonClass: 'btn-cancel',
            //    confirmButtonColor: '#2527a2',
            //    showCancelButton: true,
            //}).then(callback);
            //function callback(result) {
            //    if (result.value) {
            //        window.location.href = backurl;
            //    }
            //}
        }
        else {
            window.location.href = backurl;
        }
    });
    //Checking Initial Data
    var matStatusCtrl = $('#VADetails_MaterialStatus');
    var driverCtrl = $('#VADetails_DriverNumber');
    if (matStatusCtrl.val() >= 0) { matStatusCtrl.isValid(); } else { matStatusCtrl.isInvalid(); }
    if (driverCtrl.val() >= 0) { driverCtrl.isValid(); } else { driverCtrl.isInvalid(); }
    if (vbtoCtrl.val() > 0) { vbtoCtrl.isValid(); VehicleBelongsToChanged(1);} else { vbtoCtrl.isInvalid(); }
    $('#IsBtn').val(0);
    var x = $('#VADetails_DriverNumber option:selected').text();
    $('#VADetails_DriverName').val(x);
    $('#DriverNumber').val(driverCtrl.val());
    if ($('#IsDriverCtrlEnable').val() == 0) {
        driverCtrl.attr('disabled', 'disabled'); driverCtrl.addClass('nodrop');
    } else { driverCtrl.removeAttr('disabled'); driverCtrl.removeClass('nodrop'); }
});
