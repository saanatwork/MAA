function DriverNoChanged() {
    var myCtrl = $('#cDriverNumberName');
    if (myCtrl.val() != '') {
        if (isAlphabateWithMaxLimit(myCtrl.val(), 15)) {
            myCtrl.isValid();
            $('#DriverName').val(myCtrl.val());            
        }
        else { myCtrl.isInvalid(); }
        //myCtrl.isInvalid();
    }
    else {
        myCtrl.isInvalid();
    }
    $('#DriverNo').val(0);
    $('#IsDriverEntered').val(1);
    UpdateBtns();
};
function ValidateAcceptCmb() {
    var myCtrl = $('#AcceptCmb');
    if (myCtrl.val() == 1) {
        myCtrl.isValid();
        $('#VehicleNumber').makeDisable();
        $('#cDriverNumberName').makeDisable();
        LockSection('btnSection');
        $('#Section3').isGreen();
        SubmitBtnStatus('btnSubmit', 'HdrDiv');
    }
    else {
        myCtrl.isInvalid();
        $('#Section3').isRed();
        $('#VehicleNumber').makeEnable();
        if ($('#DriverNo').val() == 0) { $('#cDriverNumberName').makeEnable(); }
        UnLockSection('btnSection');
        UpdateBtns();
    }
};
function VehicleNoChanged() {
    var myCtrl = $('#VehicleNumber');
    var vno = myCtrl.val();
    $('#VehicleNumber2').val(vno);
    if (vno != '') {
        myCtrl.isValid();
        url='/CTV2/GetVehicleInfo?VehicleNumber=' + vno;
        GetDataFromAjax(url).done(function (data) {
            UpdateControlls(data);
            UpdateBtns();
        });
    }
    else {
        myCtrl.isInvalid();
        $('#IsOtherAvbl').val(0);
        $('#IsLocalAvbl').val(0);
        $('#divError').removeClass('show');
        var drivernameCtrl = $('#cDriverNumberName');
        drivernameCtrl.val('').removeClass('is-valid is-invalid');
        drivernameCtrl.makeDisable();
        $('#cVehicleType').val('');
        $('#cModelName').val('');
        $('#VehicleType').val('');
        $('#ModelName').val('');
        $('#DriverName').val('');
        $('#DriverNo').val('');
        UpdateBtns();
    }
};
function UpdateControlls(data) {
    var myCtrl = $('#VehicleNumber');
    var errorDiv = $('#divError');
    var btnLS = $('#btnLVT');
    var btnOS = $('#btnOVT');
    var errorDivLVS = $('#divErrorLVS');
    var errorDivOTS = $('#divErrorOTS');
    var ErrlblLVS = $('#lblErrorLVS');
    var ErrlblOTS = $('#lblErrorOTS');
    errorDivLVS.addClass('inVisible');
    errorDivOTS.addClass('inVisible');
    $('#IsOtherAvbl').val(0);
    $('#IsLocalAvbl').val(0);
    $(data).each(function (index, item) {
        if (item.IsSuccess) {          
            errorDiv.removeClass('show');
            myCtrl.isValid();
            if (item.IsActive) {
                if (item.IsSlotAvbl) { $('#IsOtherAvbl').val(1); }
                if (item.LocalTripRecords > 0) {
                    $('#IsLocalAvbl').val(1);
                    btnLS.makeEnable();
                    if ($('#IsLocalDtlSaved').val() == 0) {
                        btnOS.makeDisable();
                    }
                    else {
                        if (item.IsSlotAvbl) {                            
                            btnOS.makeEnable();
                        }
                        else {
                            btnOS.makeDisable();
                            errorDivOTS.removeClass('inVisible');
                            ErrlblOTS.html('Local Vehicle Schedule Was Scheduled For All The Dates, So Other Trip Schedule Cannot Be Enabled');
                            MyAlert(3, 'Local Vehicle Schedule Was Scheduled For All The Dates, So "Other Trip Schedule - Date Wise Vehicle Trip Details Entry" Button Cannot Be Enabled');
                        }
                    }
                }
                else {
                    if (item.IsSlotAvbl) {
                        $('#IsOtherAvbl').val(1);
                        btnOS.makeEnable();
                    }
                    else {
                        btnOS.makeDisable();
                        errorDivOTS.removeClass('inVisible');
                        ErrlblOTS.html('Local Vehicle Schedule Was Scheduled For All The Dates, So Other Trip Schedule Cannot Be Enabled');
                        MyAlert(5, 'Local Vehicle Schedule Was Scheduled For All The Dates, So "Other Trip Schedule - Date Wise Vehicle Trip Details Entry" Button Cannot Be Enabled');
                    }
                    btnLS.makeDisable();
                    errorDivLVS.removeClass('inVisible');
                    ErrlblLVS.html('Local Vehicle Schedule Was Not Updated, So Button Cannot Be Enabled');
                    MyAlert(5, 'Local Vehicle Schedule Was Not Updated, So "Local Vehicle Schedule - Date Wise Vehicle Trip Details Entry" Button Cannot Be Enabled');
                }
            }
            else {
                $('#lblError').html('Vehicle is not active');
                errorDiv.addClass('show');
                myCtrl.isInvalid();
                btnOS.makeDisable();
                btnLS.makeDisable();
                MyAlert(4, 'Vehicle Is Not Active');
            }
        }
        else {
            $('#lblError').html(item.Msg);
            errorDiv.addClass('show');
            myCtrl.isInvalid();
            btnOS.makeDisable();
            btnLS.makeDisable();
            MyAlert(4, item.Msg);
        }
        var drivernameCtrl = $('#cDriverNumberName');
        $('#cVehicleType').val(item.VehicleType);
        $('#cModelName').val(item.ModelName);
        //$('#cDriverNumber').val(item.DriverNo);
        drivernameCtrl.val(item.DriverNonName);
        $('#VehicleType').val(item.VehicleType);
        $('#ModelName').val(item.ModelName);
        $('#DriverName').val(item.DriverName);
        $('#DriverNo').val(item.DriverNo);
        if (item.DriverName == 'NA') {
            drivernameCtrl.makeEnable();
            drivernameCtrl.val('').isInvalid();
        } else { drivernameCtrl.makeDisable() }
    });
};
function UpdateBtns() {
    var btnLS = $('#btnLVT');
    var btnOS = $('#btnOVT');
    var x = $('#VehicleSection').find('.is-invalid').length;
    if (x == 0) {
        var IsStatement = false;
        var IsLocalAvbl = $('#IsLocalAvbl').val();
        var IsOtherAvbl = $('#IsOtherAvbl').val();
        var IsLocalDtlSaved = $('#IsLocalDtlSaved').val();
        var IsOthDtlSaved = $('#IsOthDtlSaved').val();
        //alert('IsLocalAvbl: ' + IsLocalAvbl + " IsLocalDtlSaved: " + IsLocalDtlSaved + " IsOtherAvbl: " + IsOtherAvbl);
        if (IsLocalAvbl == 1) {
            btnLS.makeEnable();
            if (IsLocalDtlSaved == 1) {
                if (IsOtherAvbl == 1) {
                    btnOS.makeEnable();
                    IsStatement = true;
                    // if (IsOthDtlSaved == 1) { IsStatement = true; } //Unlock this code if want to mandatorily save other trip schedule before proceeding.
                }
                else { btnOS.makeDisable(); IsStatement = true; }
            } else {
                btnOS.makeDisable();
            }
        }
        else {
            btnLS.makeDisable();
            if (IsOtherAvbl == 1) {
                btnOS.makeEnable();
                if (IsOthDtlSaved == 1) { IsStatement = true; }
            } else { btnOS.makeDisable(); }
        }
        if (IsStatement) {
            UnLockSection('Section3');
        } else {
            LockSection('Section3');
        }
    }
    else {
        btnLS.makeDisable();
        btnOS.makeDisable();
        LockSection('Section3');
    }
    
    SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
$("#VehicleNumber2").on("change", function () {
    var myCtrl = $(this);
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        var errorDiv = $('#divError');
        var btnLS = $('#btnLVT');
        var btnOS = $('#btnOVT');
        var errorDivLVS = $('#divErrorLVS');
        var errorDivOTS = $('#divErrorOTS');
        var ErrlblLVS = $('#lblErrorLVS');
        var ErrlblOTS = $('#lblErrorOTS');
        errorDivLVS.addClass('inVisible');
        errorDivOTS.addClass('inVisible');
        $.ajax({
            url: '/CTV2/GetVehicleInfo',
            method: 'GET',
            data: { VehicleNumber: myCtrl.val() },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.IsSuccess) {
                        errorDiv.removeClass('show');
                        myCtrl.isValid();
                        if (item.IsActive) {
                            if (item.LocalTripRecords > 0) {
                                $('#IsLocalAvbl').val(1);
                                btnLS.makeEnable();
                                if ($('#IsOTSActivated').val() == 0) {
                                    btnOS.makeDisable();
                                }
                                else {
                                    if (item.IsSlotAvbl) {
                                        btnOS.makeEnable();
                                    }
                                    else {
                                        btnOS.makeDisable();
                                        errorDivOTS.removeClass('inVisible');
                                        ErrlblOTS.html('Local Vehicle Schedule Was Scheduled For All The Dates, So Other Trip Schedule Cannot Be Enabled');
                                        MyAlert(3, 'Local Vehicle Schedule Was Scheduled For All The Dates, So "Other Trip Schedule - Date Wise Vehicle Trip Details Entry" Button Cannot Be Enabled');
                                    }
                                }
                            }
                            else {
                                if (item.IsSlotAvbl) {
                                    $('#IsOtherAvbl').val(1);
                                    btnOS.makeEnable();
                                }
                                else {
                                    btnOS.makeDisable();
                                    errorDivOTS.removeClass('inVisible');
                                    ErrlblOTS.html('Local Vehicle Schedule Was Scheduled For All The Dates, So Other Trip Schedule Cannot Be Enabled');
                                    MyAlert(5, 'Local Vehicle Schedule Was Scheduled For All The Dates, So "Other Trip Schedule - Date Wise Vehicle Trip Details Entry" Button Cannot Be Enabled');
                                }
                                btnLS.makeDisable();
                                errorDivLVS.removeClass('inVisible');
                                ErrlblLVS.html('Local Vehicle Schedule Was Not Updated, So Button Cannot Be Enabled');
                                MyAlert(5, 'Local Vehicle Schedule Was Not Updated, So "Local Vehicle Schedule - Date Wise Vehicle Trip Details Entry" Button Cannot Be Enabled');
                            }
                        }
                        else {
                            $('#lblError').html('Vehicle is not active');
                            errorDiv.addClass('show');
                            myCtrl.isInvalid();
                            btnOS.makeDisable();
                            btnLS.makeDisable();
                            MyAlert(4, 'Vehicle Is Not Active');
                        }
                    }
                    else {
                        $('#lblError').html(item.Msg);
                        errorDiv.addClass('show');
                        myCtrl.isInvalid();
                        btnOS.makeDisable();
                        btnLS.makeDisable();
                        MyAlert(4, item.Msg);
                    }
                    $('#cVehicleType').val(item.VehicleType);
                    $('#cModelName').val(item.ModelName);
                    $('#cDriverNumberName').val(item.DriverNonName);
                    $('#VehicleType').val(item.VehicleType);
                    $('#ModelName').val(item.ModelName);
                    $('#DriverName').val(item.DriverNonName);
                });                
            } 
        });
    } else {
        myCtrl.isInvalid();
    }
    SubmitBtnStatus('btnSubmit', 'HdrDiv');
});
function GetInitialData() {
    var vnCtrl= $('#VehicleNumber');
    if (vnCtrl.val() != '') {
        vnCtrl.isValid();
        $('#cVehicleType').val($('#VehicleType').val());
        $('#cModelName').val($('#ModelName').val());
        var drivernameCtrl = $('#cDriverNumberName');
        drivernameCtrl.val($('#DriverName').val());
        if ($('#IsDriverEntered').val() == 1) {
            drivernameCtrl.makeEnable();
            drivernameCtrl.isValid();
        } else { drivernameCtrl.makeDisable(); }
        if ($('#IsLocalDtlSaved').val() == 1 || $('#IsOthDtlSaved').val() == 1) {
            vnCtrl.makeDisable();
            drivernameCtrl.makeDisable();
        }       
    }
    else {
        vnCtrl.isInvalid();
    }    
    UpdateBtns();
};
$(document).ready(function () {
    LockSection('Section3');
    GetInitialData();
    //UnLockSection('Section3');
});