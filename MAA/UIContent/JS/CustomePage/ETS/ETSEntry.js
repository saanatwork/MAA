function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    var rowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, true, false);
    $('#cmbDDPersonType_' + rowid).empty();
    $('#txtDDPersonType_' + rowid).val('').addClass('is-invalid');
    addbtn.makeDisable();
    EnableTravellingBtn();
}
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableTravellingBtn();
};
function EnableTravellingBtn() {
    var x = getDivInvalidCount('HdrDiv');
    var y = getDivInvalidCount('TravellingPerson');
    
    var DWTBtns = $('#VADBtn');
    var Btnsubmit = $('#Btnsubmit').val();

    if (Btnsubmit == 1) { DWTBtns.makeEnabled(); DWTBtns.removeClass('nodrop'); }
    
    if ((x + y) * 1 > 0) {
        DWTBtns.makeDisable();
    }
    else {
        DWTBtns.makeEnabled(); DWTBtns.removeClass('nodrop');
    }
};
function DDPersonTypeChanged() {
    var target = DDPersonTypeChanged.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);

    var docname = $('#etsHeader_AttachFile').val();
    if (docname != '') {
     var targetid = targetCtrl.attr('id');
     var mValue = targetCtrl.val();
        var selectvalue = 0;
        var Empval = "";
        GetDDPersonTypeChanged(targetid, mValue, selectvalue, Empval);

    if (mValue > 0) { targetCtrl.isValidCtrl(); } else { targetCtrl.isInvalidCtrl(); }
        EnableAddBtn(tblRow, 'AddBtn');
    } else {
        targetCtrl.val('').isInvalidCtrl();
        Swal.fire({
            title: 'Error',
            text: 'No Documents Uploaded Yet.So Can Not Proceed Further.',
            icon: 'question',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
    }
};
function GetDDPersonTypeChanged(targetid, mValue, selectedvalue, Empval) {
   // alert(targetid + '--' + mValue + '--' + selectedvalue);
    var cmbCtrl = $('#cmb' + targetid);
    var txtCtrl = $('#txt' + targetid);
   
    switch (mValue*1) {
        case 1:
            cmbCtrl.removeClass('inVisible').addClass('pickPersonName').isInvalidCtrl();
            txtCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
            getDropDownDataWithSelectedValue('cmb' + targetid, 'Select Employee', '/EHG/GetStaffList', selectedvalue);
            //getDropDownData('cmb' + targetid, 'Select Employee', '/EHG/GetStaffList');
            break;
        case 2:
            cmbCtrl.removeClass('inVisible').addClass('pickPersonName').isInvalidCtrl();
            txtCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
            getDropDownDataWithSelectedValue('cmb' + targetid, 'Select Driver', '/EHG/GetDriverList', selectedvalue);
            //getDropDownData('cmb' + targetid, 'Select Driver', '/EHG/GetDriverList');
            break;
        case 3:
            txtCtrl.removeClass('inVisible').addClass('pickPersonNametxt').isInvalidCtrl();
            cmbCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
            txtCtrl.val(Empval);
            break;
        case 4:
            txtCtrl.removeClass('inVisible').addClass('pickPersonNametxt').isInvalidCtrl();
            cmbCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
            txtCtrl.val(Empval);
            break;
        default:
            txtCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
            cmbCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
            break;
    }


};
function DDPickPersonChanged(x) {
   
    var target = DDPickPersonChanged.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var mIndex = $(tblRow).attr('id');
    var targetCtrl = $(target);
    var mValue = targetCtrl.val();
  
    //Check for Duplicate Person
    var dstat = 0;
    $('.xPerson').each(function () {
        if (mValue != '' && $(this).val() == mValue) { dstat += 1; }
        //alert(mValue + ' - ' + $(this).val() + ' - ' + dstat);
    });

    if (x == 1) {
        mValue = mValue.length;
    }
    if (mValue > 0) {
            targetCtrl.isValidCtrl();
    } else {
        targetCtrl.isInvalidCtrl();
    }
    if (x == 1) { GetVehicleEligibility(mIndex, 0); } else { GetVehicleEligibility(mIndex, mValue);}

    if (dstat > 1) {
        targetCtrl.val('');
        targetCtrl.isInvalidCtrl();
        Swal.fire({
            title: 'Data Duplicacy Error',
            text: 'Person You Have Selected Is Already Taken.',
            icon: 'error',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
    } else {
        getDesgnCode(mIndex, mValue);
        EnableAddBtn(tblRow, 'AddBtn');
    }
   
};
$(document).ready(function () {
    EnableTravellingBtn();
    getDropDownDataWithSelectedValue('DDPersonType', 'Select Person Type', '/Security/ETS/GetPersonTypes', 0);

});
function ValidateControl() {
    debugger;
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).isValidCtrl();
    } else {
        $(target).isInvalidCtrl();
    }
    //$('#BackBtnActive').val(1);
    EnableSubmitBtn();
    
};
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
  
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
   
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val());
    if (isvalid) { targetCtrl.isValidCtrl(); } else { targetCtrl.isInvalidCtrl(); }

    var mIndex = $(tblRow).attr('id');
    if (targetid == 'TaDaDenied' && $(target).val() == 1) {
        Swal.fire({
            title: 'Confirmation',
            text: 'Are You Sure To Deny The T.A & D.A Option?',
            icon: 'question',
            customClass: 'swal-wide',
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonClass: 'btn-cancel',
            confirmButtonColor: '#2527a2',
            showCancelButton: true,
        }).then(function (result) {
            if (result.isConfirmed) {

            }
            else {
                if (mIndex > 0) {
                    $('#TaDaDenied_' + mIndex).val(0);
                } else {
                    $('#TaDaDenied').val(0);
                }
                    
            }
        });

    }
    EnableAddBtn(tblRow, 'AddBtn');
    EnableTravellingBtn();
   // EnableSubmitBtn();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "TaDaDenied":
            isvalid = validatectrl_YesNoCombo(value);
            break;
        case "otherplace":
            isvalid = validatectrl_YesOrNo(value);
            if (isvalid) {
               $('#ID3').removeClass('border-red').addClass('border-green');
                UnLockControl('carryLaptop');
            }
            else {
                $('#ID3').removeClass('border-green').addClass('border-red');
                LockControl('carryLaptop');
                Policy.val('').isInvalidCtrl();
                carryLaptop.val('').isInvalidCtrl();
            }
            break;
        case "carryLaptop":
            isvalid = validatectrl_YesOrNo(value);
            if (isvalid) {
                $('#ID1').removeClass('border-red').addClass('border-green');
                UnLockControl('Policy');
            }
            else {
                $('#ID1').removeClass('border-green').addClass('border-red');
                LockControl('Policy');
                Policy.val('').isInvalidCtrl();
            }
            break;
        case "Policy":
            isvalid = validatectrl_YesOrNo(value);
            if (isvalid) { $('#ID2').removeClass('border-red').addClass('border-green'); }
            else { $('#ID2').removeClass('border-green').addClass('border-red'); }
            break;
    }
    return isvalid;
};
function validatectrl_ValidateLength(value) {
    if (value.length > 0) {
        return true;
    } else { return false; }
}
function validatectrl_YesNoCombo(value) {

    if (value * 1 >= 0) {
        return true;
    } else { return false; }
}
function validatectrl_YesOrNo(value) {
    
    if (value * 1 ==0) {
        return true;
    } else { return false; }
}
function EnableAddBtn(tblRow, addBtnBaseID) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); } else { addBtnctrl.makeEnabled(); }
    //alert(rowid + ' - ' + addBtnBaseID+' - '+tblrow.find('.is-invalid').length);
    EnableTravellingBtn();
};
function EnableSubmitBtn() {
   // var x = getDivInvalidCount('HdrDiv');
  //  var y = getDivInvalidCount('TravellingPerson');
    var z = getDivInvalidCount('Questions');
    var btn = $('#Btnsubmit').val();
    var SubmitBtn = $('#btnSubmited');
    //alert(z + ' - ' + btn);
   
    if (z <= 0 && btn == 1) {
        SubmitBtn.makeEnabled();
        SubmitBtn.removeClass('nodrop');
        //alert(btn);
    } else {
        SubmitBtn.makeDisable();
    }
};
function getDivInvalidCount(mdivID) {
    var x = 0;
    var mDiv = $('#' + mdivID);
    x = mDiv.find('.is-invalid').length;
    //alert(mdivID + ' - ' + x);
    return x;
};
function getDesgnCode(rowid, empCode) {
    var actualempcode = 0
    if ($.isNumeric(empCode)) { actualempcode = empCode; }
    var desgCtrl = $('#DesgCodenName');
    var persontypeCtrl = $('#DDPersonType');
    if (rowid != 0) {
        desgCtrl = $('#DesgCodenName_' + rowid);
        persontypeCtrl = $('#DDPersonType_' + rowid);
    }
    var mValue = persontypeCtrl.val();
    if (mValue <= 4 && mValue > 0) {
       
        var mUrl = "/ETS/GetDesgCodenName?empID=" + actualempcode + "&empType=" + mValue;
        $.ajax({
            url: mUrl,
            success: function (result) { desgCtrl.html(result); }
        });
        desgCtrl.html('qwe');
    }
    else {
        desgCtrl.html('');
    }
};
function GetVehicleEligibility(rowid, empCode) {
    debugger
    var actualempcode = 0
    if ($.isNumeric(empCode)) { actualempcode = empCode; }
    //alert(rowid + ' - ' + empCode + ' - ' + actualempcode);
    var VTypeCtrl = $('#EgblVehicleType');
    var typeCtrlname = $('#EgblVehicleTypeName');
    var persontypeCtrl = $('#DDPersonType');
    if (rowid != 0) {
        VTypeCtrl = $('#EgblVehicleType_' + rowid);
        typeCtrlname = $('#EgblVehicleTypeName_' + rowid);
        persontypeCtrl = $('#DDPersonType_' + rowid);
    }
    var mValue = persontypeCtrl.val() * 1;
    if (mValue <= 4 && mValue > 0)  {
        var mUrl = "/ETS/GetVehicleEligibility?EmployeeNumber=" + actualempcode;
        $.ajax({
            url: mUrl,
            success: function (result) {
                typeCtrlname.html(result.DisplayText);
                VTypeCtrl.html(result.ID);
            }
        });
        
    }
    else {
        typeCtrlname.html('');
        VTypeCtrl.html('');
    }
};
function TravellingPersonBtnClicked() {
    var notenumber = $('#etsHeader_NoteNumber').val();
    var DocName = $('#etsHeader_AttachFile').val();
    var CenterCodeName = $('#etsHeader_CenterCodeName').val();
    var Btnsubmit = $('#Btnsubmit').val();
    if (Btnsubmit == null) { Btnsubmit = 0;}
  //  alert(Btnsubmit);
    //OficeWorkTbl    
    var schrecords = getRecordsFromTableV2('Traveltbl');
    var x = '{"NoteNumber":"' + notenumber + '","AttachFile":"' + DocName + '","CenterCodeName":"' + CenterCodeName + '","Btnsubmit":"' + Btnsubmit + '","PersonDtls":' + schrecords + '}';
    $.ajax({
        method: 'POST',
        url: '/ETS/SetTravelingPersonDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    var url = "/Security/ETS/TravellingDetails?Btnsubmit="+Btnsubmit;
                    window.location.href = url;
                }
                else {
                    MyAlert(4, 'Failed To Update Traveling Person Details.')
                }
            });
        },
    });

};
function SaveFinalSubmit() {
    var notenumber = $('#etsHeader_NoteNumber').val();
    var DocName = $('#etsHeader_AttachFile').val();
    var CenterCodeName = $('#etsHeader_CenterCodeName').val();
  
    var x = '{"NoteNumber":"' + notenumber + '","AttachFile":"' + DocName + '","CenterCodeName":"' + CenterCodeName + '"}';
   // alert(x);
    $.ajax({
        method: 'POST',
        url: '/ETS/Create',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {

                var url = "/Security/ETS/Index";
                if (item.bResponseBool == true) {
                    MyAlertWithRedirection(1, 'Data saved successfully.', url)
                }
                else {
                    MyAlert(4, 'Failed To Update Details.')
                }

                //if (item.bResponseBool == true) {
                //    var url = "/Security/ETS/Index";
                   
                //    Swal.fire({
                //        title: 'Confirmation',
                //        text: 'Data saved successfully.',
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
                //            var url = "/Security/ETS/Index"
                //            window.location.href = url;
                //        }
                //    }
                //}
                //else {
                //    Swal.fire({
                //        title: 'Error',
                //        text: 'Failed To Update Traveling Person Details.',
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
}
$(document).ready(function () {
    var Btnsubmit = $('#Btnsubmit').val();
    if (Btnsubmit == 0) {
        if ($.isEmptyObject($('#etsHeader_AttachFile').val())) { LockSection('TravellingPerson'); }
        else { UnLockSection('TravellingPerson');}
        LockSection('Questions');
    }
    if (Btnsubmit == 1) {
        UnLockSection('Questions');
        //LockControl('carryLaptop');
       // LockControl('Policy');
    }

    (async function () {
        const r1 = await getInitialData();
    })();

});
async function getInitialData() {
    var rowid = 0;
    var TaDa;
    var NoteNumber = $('#NoteNumber');
    var DDPersonType = $('#DDPersonType');
    var cmbDDPersonType = $('#cmbDDPersonType');
    var txtDDPersonType = $('#txtDDPersonType');
    var DesgCodenName = $('#DesgCodenName');
    var EgblVehicleType = $('#EgblVehicleType');
    var EgblVehicleTypeName = $('#EgblVehicleTypeName');
    var TaDaDenied = $('#TaDaDenied');
    var AddBtn = $('#AddBtn');
    $.ajax({
        url: '/ETS/GetTraveelingPersonReverseData',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.Btnsubmit == 0) {
                    $(item.PersonDtls).each(function (indexs, Peritem) {
                        if (indexs > 0) {
                            rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, true, false);
                           
                            DDPersonType = $('#DDPersonType_' + rowid);
                            cmbDDPersonType = $('#cmbDDPersonType_' + rowid);
                            txtDDPersonType = $('#txtDDPersonType_' + rowid);
                            DesgCodenName = $('#DesgCodenName_' + rowid);
                            EgblVehicleType = $('#EgblVehicleType_' + rowid);
                            EgblVehicleTypeName = $('#EgblVehicleTypeName_' + rowid);
                            TaDaDenied = $('#TaDaDenied_' + rowid);
                            AddBtn = $('#AddBtn_' + rowid);
                        }
                       
                        getDropDownDataWithSelectedValue(DDPersonType.attr('id'), 'select Person Type', '/Security/EHG/GetPersonTypes', Peritem.PersonType);
                        DDPersonType.val(Peritem.PersonType).isValidCtrl();
                        GetDDPersonTypeChanged(DDPersonType.attr('id'), Peritem.PersonType, Peritem.EmployeeNo, Peritem.EmployeeNonName)
                        cmbDDPersonType.isValidCtrl();
                        txtDDPersonType.isValidCtrl();
                        //alert(Peritem.EmployeeNonName);
                        
                        getDesgnCode(rowid, Peritem.EmployeeNo);
                        
                        
                        
                        GetVehicleEligibility(rowid, Peritem.EmployeeNo);
                        if (Peritem.TADADenieds == true) { TaDa = 1 } else { TaDa=0};
                        TaDaDenied.val(TaDa).isValidCtrl();
                        AddBtn.makeDisable();
                        EnableTravellingBtn();
                    });
                }
            });
        }
    });
};
$('#btnClear').click(function () {
    var selectvalue = 0;
    var Empval = "";
    var mValue = 0;
    var DDPersonType = $('#DDPersonType');
    var TaDaDenied = $('#TaDaDenied');
    //$('Btnsubmit').val(0);
    $('#etsHeader_AttachFile').val('');
    $('#btnScan').removeClass('inVisible');
    $('#btnScanView').addClass('inVisible');
    $('#otherplace').val('').isInvalidCtrl();
    $('#carryLaptop').val('').isInvalidCtrl();
    $('#Policy').val('').isInvalidCtrl();
    DDPersonType.val('').isInvalidCtrl();
    GetDDPersonTypeChanged(DDPersonType.attr('id'), mValue, selectvalue, Empval);
    getDesgnCode(0, 0);
    GetVehicleEligibility(0,0);
    TaDaDenied.val('').isInvalidCtrl();
    $("#tbody2").empty();
    EnableTravellingBtn();

});


