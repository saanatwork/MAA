function DeleteNote() {
    var notenumber = $('#NoteNo').val();
    $.ajax({
        method: 'POST',
        url: '/CTV/RemoveNote',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            NoteNumber: notenumber
        }),
        success: function (data) {
            $(data).each(function (index, item) {
                //alert(item.sResponseString);
            });
        },
    });
};
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    activateSubmitBtn();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {        
        case "submitConfirmation":
            if (value == 1)
            { isvalid = true; }
            break;
        case "DIC":
            if (value == 1) { isvalid = true; }
            break;

    }
    return isvalid;
};
function activateSubmitBtn() {
    var isactive = false;
    //alert($('.is-invalid').length);
    var btnSubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
    }
    else {
        if ($('#IsOTSSaved').val() == 1) {
            isactive = true;
        }        
    }
    if(isactive) {
        btnSubmit.removeAttr('disabled');
    } else {
        btnSubmit.attr('disabled', 'disabled');
    }
};
function btnClearClicked() {
    $('.canclear').each(function () {
        $(this).val('');
    });
    $('#submitConfirmation').removeClass('is-valid').addClass('is-invalid');
    $('#Vehicleno').removeClass('is-valid').addClass('is-invalid');
    $('#divErrorLVS').addClass('inVisible');
    $('#divErrorOTS').addClass('inVisible');
    $('#divError').addClass('inVisible');
    $('#btnLVT').attr('disabled', 'disabled');
    $('#btnOVT').attr('disabled', 'disabled');
    var noteno = $('#NoteNo').val();
    $.ajax({
        url: '/CTV/RemoveNoteDetails',
        method: 'GET',
        data: { NoteNumber: noteno },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                
            });
        }
    });
};
$(document).ready(function () {
    $('#divErrorX').addClass('inVisible');
    var vehiclenodropdown = $('#Vehicleno');    
    vehiclenodropdown.change(function () {
        var vno = $(this).val();
        if (vno != '') {
            $('#divErrorX').removeClass('inVisible')
            VehicleChange(vno, 1);
        } else {
            $('#Vehicleno').addClass('is-invalid').removeClass('is-valid');
            $('#divError').removeClass('show');
        }        
    });
    VehicleChange(vehiclenodropdown.val(), 0);    
});
$(document).ready(function () {
    //var btnovtctrl = $('#btnOVT');
    //if ($('#IsOTSSaved').val() == 1) {
    //    btnovtctrl.attr('disabled', 'disabled');
    //} else {
    //    btnovtctrl.removeAttr('disabled');
    //}
    
    $('#btnBack').click(function () {        
        //var url = getCBUrl();
        //alert(url);
        var backUrl = "/Security/CTV/ScheduleLists";
        if ($('#IsOTSSaved').val() == 1) {
            Swal.fire({
                title: 'Confirmation Message',
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
                    DeleteNote();
                    window.location.href = backUrl;
                    //$.ajax({
                    //    url: "/Security/CTV/Index",
                    //    success: function (result) { window.location.href = result; }
                    //});
                } else {
                    // second variant
                }
            }
        } else {
            DeleteNote();            
            window.location.href = backUrl;
            //$.ajax({
            //    url: "/Security/CTV/Index",
            //    success: function (result) {window.location.href =result;}
            //});
            //window.location.href = url;
        }
    });
});
function VehicleChange(vno, removetemp) {
    var vehiclenodropdown = $('#Vehicleno');
    var errorDiv = $('#divError');
    var btnLS = $('#btnLVT');
    var btnOS = $('#btnOVT');
    var errorDivLVS = $('#divErrorLVS');
    var errorDivOTS = $('#divErrorOTS');
    var ErrlblLVS = $('#lblErrorLVS');
    var ErrlblOTS = $('#lblErrorOTS');
    var notenumber = $('#NoteNo').val();
    errorDivLVS.addClass('inVisible');
    errorDivOTS.addClass('inVisible');
    $('#btnSubmit').attr('disabled', 'disabled');
    $('#submitConfirmation').val('').removeClass('is-valid').addClass('is-invalid');
    $.ajax({
        url: '/CTV/GetVehicleInfo',
        method: 'GET',
        data: { VehicleNo: vno, NoteNumber: notenumber, RemoveTemp:removetemp },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.IsSuccess) {
                    errorDiv.removeClass('show');
                    vehiclenodropdown.removeClass('is-invalid').addClass('is-valid');
                    //alert(item.IsActive);
                    if (item.IsActive) {
                        if (item.LocalTripRecords > 0) {
                            btnLS.removeAttr('disabled');
                            if ($('#IsOTSActivated').val() == 0) {
                                btnOS.attr('disabled', 'disabled');
                            }
                            else {
                                if (item.IsSlotAvbl) {
                                    btnOS.removeAttr('disabled');
                                }
                                else {
                                    btnOS.attr('disabled', 'disabled');
                                    errorDivOTS.removeClass('inVisible');
                                    ErrlblOTS.html('Local Vehicle Schedule Was Scheduled For All The Dates, So Other Trip Schedule Cannot Be Enabled');
                                }
                                //btnOS.removeAttr('disabled');
                            }
                            //btnOS.attr('disabled', 'disabled');
                        }
                        else {
                            if (item.IsSlotAvbl) {
                                btnOS.removeAttr('disabled');
                            }
                            else {
                                //alert('ok');
                                btnOS.attr('disabled', 'disabled');
                                errorDivOTS.removeClass('inVisible');
                                ErrlblOTS.html('Local Vehicle Schedule Was Scheduled For All The Dates, So Other Trip Schedule Cannot Be Enabled');
                            }
                            //$('#IsOTSActivated').val('1');
                            btnLS.attr('disabled', 'disabled');
                            //btnOS.removeAttr('disabled');
                            errorDivLVS.removeClass('inVisible');
                            ErrlblLVS.html('Local Vehicle Schedule Was Not Updated, So It Cannot Be Enabled');
                        }
                    }
                    else {
                        $('#lblError').html('Vehicle is not active');
                        errorDiv.addClass('show');
                        vehiclenodropdown.removeClass('is-valid').addClass('is-invalid');
                        btnOS.attr('disabled', 'disabled');
                        btnLS.attr('disabled', 'disabled');
                    }                                       
                    
                } else {
                    //alert("ok");
                    $('#lblError').html(item.Msg);
                    errorDiv.addClass('show');
                    vehiclenodropdown.removeClass('is-valid').addClass('is-invalid');
                    btnOS.attr('disabled', 'disabled');
                    btnLS.attr('disabled', 'disabled');
                }
                $('#VehicleTypeDisplay').val(item.VehicleType);
                $('#VehicleType').val(item.VehicleType);
                $('#ModelName').val(item.ModelName);
                $('#ModelNameDisplay').val(item.ModelName);
                $('#DriverNo').val(item.DriverNo);
                $('#DriverName').val(item.DriverName);
                $('#DriverNonName').val(item.DriverNonName);
                $('#DriverNonNameDisplay').val(item.DriverNonName);
            });
            activateSubmitBtn();
        }
    });
};