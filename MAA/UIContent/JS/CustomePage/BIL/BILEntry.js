$(document).ready(function () {
    $('#EmployeeNo').isInvalid();
    $('#RefNoteNumber').isInvalid();
    $('#RefEntryDate').val('');
    var selectedvalue = 0;
    $('#RefNoteNumber').change(function () {
        ValuesClear();
        Notenumberchanged($(this).val(), selectedvalue);

        $('#SubmitBtn').makeDisable();
    });
    var btnDisplays = $('#SubmitCount').val();
    
    if (btnDisplays == 1) {
        if ($('#EmpNo').val() != 0) {
        Notenumberchanged($('#RefNoteNumber').val(), $('#EmpNo').val());
            ChangeEmployee($('#EmpNo').val());
        }
       // $('#Save').makeEnabled();
       // $('#RefNoteNumber').makeDisable();
       // $('#EmployeeNo').makeDisable();

    } else {
        //$('#Save').makeDisable();
      // $('#RefNoteNumber').makeEnabled();
       // $('#EmployeeNo').makeEnabled();
        
    }
});
function Notenumberchanged(notenumber, selectedvalue) {
   
    var noteCtrl = $('#RefNoteNumber');
    $('#EmployeeNo').isInvalid();
    var lblNoteDesc = $('#lblNoteDesc');

    var notetype = notenumber.substring(7, 10);
    if (notetype == 'CTV') {
        lblNoteDesc.html('Ref. “Company Transport” Vehicle Trip Schedule – ENTRY Note No.:');
    }
    else if (notetype == 'TFD') {
        lblNoteDesc.html('Ref. Tour Information & Feed Back Details Note no.: ');
    }
    else if (notetype == 'DNR') {
        lblNoteDesc.html('Ref. Driver Negative Point Recording – ENTRY Note No.:');
    }
    else { lblNoteDesc.html('Ref. Tour Information & Feed Back Details Note no.:'); }
    if (notenumber != '') {
        noteCtrl.isValid();
        $.ajax({
            url: '/BIL/GetNoteHdr',
            method: 'GET',
            data: { Notenumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#RefEntryDatestr').val(item.RefEntryDatestr);
                    $('#RefEntryDate').val(item.RefEntryDatestr);
                    $('#RefEntryTime').val(item.RefEntryTime);
                    (async function () {
                        const r1 = await GetEmployeeList(notenumber, selectedvalue);
                    })();
                });
            }
        });
    } else { noteCtrl.isInvalid(); }
};
async function GetEmployeeList(notenumber, selectedvalue) {
    getDropDownDataWithSelectedValueWithColor('EmployeeNo', 'Select Employee', '/Security/BIL/GetEmployeeList?NoteNumber=' + notenumber, selectedvalue);

};
$('#EmployeeNo').change(function () {
    $('#EmployeeCodeName').val($("#EmployeeNo option:selected").text())
    ChangeEmployee($(this).val());
    $('#SubmitBtn').makeDisable();
   
});
function ChangeEmployee(EmployeeNo) {
    ValuesClear();
    $('#EmpNo').val(EmployeeNo);
    var noteCtrl = $('#EmployeeNo');
    var NoteNumber = $('#RefNoteNumber').val();
    $('#Deducted').makeDisable();
    
    if (EmployeeNo != '' && EmployeeNo != '-1') {
        var Active = GetInActiveInDD('EmployeeNo');
       // alert(Active);
       // if (Active) {
       //     $('#SubmitBtn').makeEnabled();
       //}
        noteCtrl.isValid();
        $.ajax({
            url: '/BIL/GetTAdARuleData',
            method: 'GET',
            data: { EmployeeNumber: EmployeeNo, NoteNumber: NoteNumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#TAAmount').attr('readonly', 'readonly');
                    $('#DAAmount').attr('readonly', 'readonly');
                    var date = new Date(parseInt(item.ActualTourInDate.substr(6)));
                    if (date.getFullYear() != 0001) {
                        $('#NoteNumber').val(item.NoteNumber);
                        if (item.PersonType != null && item.DesginationCodeName != null) {
                            if (item.status == 1) {

                                $('#PersonTypetxt').val(item.PersonType);
                                $('#DesigCodeName').val(item.DesginationCodeName);
                                $('#DAAmount').val(item.DAAmount);
                                $('#DADeducted').val(item.DADeducted);
                                $('#EDAllowance').val(item.EAmount);
                                $('#TourFromDateNTime').val(item.ActualTourInDatestr + "-" + item.ActualTourInTime);
                                $('#TourToDateNTime').val(item.ActualTourOutDatestr + "-" + item.ActualTourOutTime);
                                $('#TourFromDate').val(item.ActualTourInDatestr);
                                $('#TourToDate').val(item.ActualTourOutDatestr);
                                $('#NoOfDays').val(item.TotalNoOfDays);
                                $('#PurposeOfVisit').val(item.PurposeOfVisit);
                                $('#TotalExpenses').val(item.EAmount);
                                $('#Lodging').attr('max', item.MaxLodgingExp);
                                $('#LocalConveyance').attr('max', item.MaxLocalConv);
                                $('#TAAmount').val(0);
                                $('#LocalConveyance').val(0);
                                $('#Lodging').val(0);
                                $('#LocalConveyanceMax').val(item.MaxLocalConv);
                                $('#LodgingMax').val(item.MaxLodgingExp);
                                $('#TourFromTime').val(item.ActualTourInTime);
                                $('#TourToTime').val(item.ActualTourOutTime);
                                $('#TADADenied').val(item.TADADenied);

                                if (item.TADADenied) {
                                   // $('#TAAmount').attr('readonly', 'readonly');
                                   // $('#DAAmount').attr('readonly', 'readonly');
                                } else if (!item.TADADenied){
                                    if (!item.IsVehicleProvided) {
                                        $('#TAAmount').removeAttr('readonly', 'readonly');
                                        $('#DAAmount').removeAttr('readonly', 'readonly');
                                    } else if (item.IsVehicleProvided) {
                                       // $('#TAAmount').attr('readonly', 'readonly');
                                        $('#DAAmount').removeAttr('readonly', 'readonly'); 
                                    }
                                }

                                $('#IsVehicleProvided').val(item.IsVehicleProvided);
                            }
                            else if (item.status == 2) {

                                $('#PersonTypetxt').val(item.PersonType);
                                $('#DesigCodeName').val(item.DesginationCodeName);
                                $('#DAAmount').val(item.DAAmount);
                                $('#DADeducted').val(item.DADeducted);
                                $('#EDAllowance').val(item.EAmount);
                                $('#TourFromDateNTime').val(item.ActualTourInDatestr + "-" + item.ActualTourInTime);
                                $('#TourToDateNTime').val(item.ActualTourOutDatestr + "-" + item.ActualTourOutTime);
                                $('#TourFromDate').val(item.ActualTourInDatestr);
                                $('#TourToDate').val(item.ActualTourOutDatestr);
                                $('#NoOfDays').val(item.TotalNoOfDays);
                                $('#PurposeOfVisit').val(item.PurposeOfVisit);
                                $('#TotalExpenses').val(item.TotalExpenses);
                                $('#TAAmount').val(item.TAAmount);
                                $('#LocalConveyance').val(item.LocalConveyance);
                                $('#Lodging').val(item.Lodging);
                                $('#TourFromTime').val(item.TourFromTime);
                                $('#TourToTime').val(item.TourToTime);
                                $('#Lodging').attr('max', item.MaxLodgingExp);
                                $('#LocalConveyance').attr('max', item.MaxLocalConv);
                                $('#LocalConveyanceMax').val(item.MaxLocalConv);
                                $('#LodgingMax').val(item.MaxLodgingExp);

                                if (item.TADADenied) {
                                    // $('#TAAmount').attr('readonly', 'readonly');
                                    // $('#DAAmount').attr('readonly', 'readonly');
                                } else if (!item.TADADenied) {
                                    if (!item.IsVehicleProvided) {
                                        $('#TAAmount').removeAttr('readonly', 'readonly');
                                        $('#DAAmount').removeAttr('readonly', 'readonly');
                                    } else if (item.IsVehicleProvided) {
                                        // $('#TAAmount').attr('readonly', 'readonly');
                                        $('#DAAmount').removeAttr('readonly', 'readonly');

                                    }
                                } 
                                //if (item.IsVehicleProvided) {
                                //    $('#TAAmount').attr('readonly', 'readonly');
                                //} else {
                                //    $('#TAAmount').removeAttr('readonly', 'readonly');
                                //}
                                $('#TADADenied').val(item.TADADenied);
                                $('#IsVehicleProvided').val(item.IsVehicleProvided);
                            }
                            $('#Deducted').makeEnabled();
                        } else {
                            AlertMessage();
                        }
                    } else {
                        AlertMessage();
                    }

                });
            }
        });


    } else { noteCtrl.isInvalid(); }
}
function AlertMessage() {
    Swal.fire({
        title: 'Error',
        text: 'TA DA Rule Is Not Prepared For That Employee.So System Cannot Proceed Further',
        icon: 'question',
        customClass: 'swal-wide',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    });
}
function ValuesClear() {
    $('#PersonTypetxt').val('');
    $('#DesigCodeName').val('');
    $('#DAAmount').val(0);
    $('#DADeducted').val(0);
    $('#EDAllowance').val(0);
    $('#TourFromDateNTime').val('-');
    $('#TourToDateNTime').val('-');
    $('#TourFromDate').val('');
    $('#TourToDate').val('');
    $('#NoOfDays').val(0);
    $('#PurposeOfVisit').val('-');
    $('#TotalExpenses').val(0);
    $('#Lodging').attr('max', 0);
    $('#LocalConveyance').attr('max', 0);
    $('#TAAmount').val(0);
    $('#LocalConveyance').val(0);
    $('#Lodging').val(0);
    $('#TourFromTime').val('');
    $('#TourToTime').val('');
}

function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    EnableSubmitBtn();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "Policy":
            isvalid = validatectrl_YesNoCombo(value);
            if (isvalid) { $('.content').removeClass('border-red').addClass('border-green'); }
           
            break;
    }
    return isvalid;
};
function validatectrl_YesNoComboApproval(value) {

    if (value * 1 >= 0) {
        return true;
    } else { return false; }
};
function validatectrl_ValidatestringLength(value) {
    if (value != "-1") {
        return true;
    } else { return false; }
};
function validatectrl_ValidateLength(value) {

    if (value > 0) {
        return true;
    } else { return false; }
};
function validatectrl_YesNoCombo(value) {

    if (value * 1 > 0) {
        return true;
    } else { return false; }
};
function EnableSubmitBtn() {
    var z = getDivInvalidCount('AllData');
    var btn = $('#SubmitCount').val();
    var SubmitBtn = $('#Save');
    if (btn == 1) {
        $('#Policy').makeEnabled();
    }
    if (z <= 0 && btn == 1) {
        SubmitBtn.makeEnabled();
    }
};
function GetInActiveInDD(DDId) {
    var IsActive = false;
    var TotalOptions = 0;
    var Options = 0;
     Options = $('#' + DDId + '>option').length;
     SelectedOption = 0;
     TotalOptions = Options - 1;
    $('#' + DDId + '>option').each(function (){
        if ($(this).hasClass('Active')) { SelectedOption = SelectedOption + 1; }
    });
   // alert(SelectedOption + '==' + TotalOptions);

    if (SelectedOption == TotalOptions) {
        IsActive = true;
    }
    return IsActive;
    

}
function TPDBtnClicked() {
    var notenumber = $('#NoteNumber').val();
    var EmployeeNo = $('#EmployeeNo').val();
    var NoteNumber = $('#RefNoteNumber').val();
    $('#SubmitCount').val(1);
    var btn = $('#SubmitCount').val();
    if (btn == 1) {
        $('#Policy').makeEnabled();
    }
    if (notenumber != '') {
        var iDiv = $('#TPDModalDiv');
        var modalDiv = $('#TPDModal');
        var dataSourceURL = '/BIL/VMDeductionsFromDA?EmployeeNo=' + EmployeeNo + '&NoteNumber=' + NoteNumber;
        $.ajax({
            url: dataSourceURL,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html',
            success: function (result) {
                iDiv.html(result);
                modalDiv.modal('show');
                EnableSubmitBtn();
            },
            error: function (xhr, status) {

            }
        })
    }
    else {
        Swal.fire({
            title: 'Error',
            text: 'Select A NoteNumber To Deductions From DA Detail.',
            icon: 'error',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
    }
};

function numbervalidate(key) {
    var presskeys = (key.which) ? key.which : key.presskeys;
    //if (!(presskeys == 8 || presskeys == 46) && (presskeys < 48 || presskeys > 57)) {
    //    return false;
    //}
    if (String.fromCharCode(presskeys).match(/[^0-9]/g)) {
        return false;
    }
}
function TotalExpance() {
    var EDAmt = $('#EDAllowance').val() * 1;
    var taAmt = $('#TAAmount').val() * 1;
    var lcamt = $('#LocalConveyance').val() * 1;
    var lodamt = $('#Lodging').val() * 1;
    var total=EDAmt + taAmt + lcamt + lodamt;
    var Atotal = isNaN(total) ? 0 : total;
    $('#TotalExpenses').val(Atotal);
};
function Calculations(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    debugger;
    var targetCtrl = Calculations.caller.arguments[0].target;
    var mids = $(targetCtrl).attr('id');
    var maxvalue = $('#' + mids + 'Max').val() * 1;
    var txtcTrl = $('#' + mids);

    var mValue = txtcTrl.val();
    var mValuetatol = mValue > maxvalue ? maxvalue : mValue;
    txtcTrl.val(mValuetatol);
    TotalExpance();
    return true;
}
