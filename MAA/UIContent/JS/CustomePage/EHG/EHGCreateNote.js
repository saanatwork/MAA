function btnScanViewClicked() {    
    var filename = $('#ehgHeader_DocFileName').val();
    var filepath = "/Upload/Forms/" + filename;
    if (filename != '') {
        OpenFileInNewTab(filepath);
    } else { MyAlert(3, 'Unable To Find Uploaded File.');}
};
function fireSweetAlert() {
    Swal.fire({
        title: 'Attach Travelling Request Form',
        text: "Are you sure you want to delete this?",
        icon: 'success',
        html: `<div style="text-align:left;">
                                                <div class="form-group">
                                                    <label class="swal-label">Attach File(Only Pdf,Png & Jpg Files)</label>
                                                    <input type="file" id="uploadCtrl" name="uploadCtrl" class="form-control" placeholder="">
                                                </div>
                                            </div>`,
        cancelButtonClass: 'btn-cancel',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Submit',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(callback);
    function callback(result) {
        if (result.value) {
            var data = new FormData();
            var files = $("#uploadCtrl").get(0).files;
            if (files.length > 0) {
                data.append("MyImages", files[0]);
                $.ajax({
                    url: "/Common/UploadFile",
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        $(response).each(function (index, item) {
                            if (item.ResponseStat == 1) {
                                $('#ehgHeader_DocFileName').val(item.FileName);
                                $('#btnScan').addClass('inVisible');
                                $('#btnScanView').removeClass('inVisible');
                                var filepath = "/Upload/Forms/" + item.FileName;
                                OpenFileInNewTab(filepath);
                                $('#btnScan').ButtonOk();
                            }
                            else {
                                MyAlert(3, item.ResponseMsg);                                
                            }
                        });
                    },
                    error: function (er) {
                    }
                });
            }
            else {
                MyAlert(4, 'Select Only Pdf,Png & Jpg Files.');                
            }
        }
    }
}
$.fn.UnHideObject = function () {
    var that = this;
    that.removeClass('inVisible');
};
$.fn.HideObject = function () {
    var that = this;
    that.addClass('inVisible');
};
///////////////////////////////////// Inspected
function VehicleTypeChanged(mval) {
    var POACtrl = $('#for_LV');
    var POA2WhCtrl = $('#for_2_wheeler');
    var ForManagementDiv = $('#for_Management');
    var ForOfficeWorkDiv = $('#for_OfficeWork');
    var POADropdown = $('#ehgHeader_PurposeOfAllotment');
    var VehicletypeCtrl = $('#ehgHeader_VehicleType');
    var selectedvt = VehicletypeCtrl.val();
    $('#VehicleType').val(selectedvt);
    ForOfficeWorkDiv.HideObject();
    ForManagementDiv.HideObject();
    POACtrl.HideObject();
    POA2WhCtrl.HideObject();
    POADropdown.val('').isInvalidCtrl();
    $('#BtnDiv').removeClass('SLUSection');
    if (selectedvt == 1) {
        POACtrl.UnHideObject();
    }
    else if (selectedvt == 2) {
        POA2WhCtrl.UnHideObject();
        ForOfficeWorkDiv.UnHideObject();
        POADropdown.removeClass('is-invalid').removeClass('is-valid');
        $('#BtnDiv').addClass('SLUSection');
    }

    if (selectedvt > 0) {
        VehicletypeCtrl.isValidCtrl();
    }
    else { VehicletypeCtrl.isInvalidCtrl(); }
    // Null Value for rest of the controlls
    if (mval == 1) {
        $('#ehgHeader_MaterialStatus').val('').isInvalidCtrl();
        $('#ehgHeader_Instructor').val('').isInvalidCtrl();
    }
    if (selectedvt == 2 && $('#OkToOpen').val() == 0) {
        VehicletypeCtrl.isInvalidCtrl();
        MyAlert(5, 'Screen Is Alloted For 2 Wheeler Only On Holidays, Weekly Offs And Off-General Shift Timing On Working Days.')
    }
    EnableDateWiseTourBtn();
};
function EnableDateWiseTourBtn() {
    var x = getDivInvalidCount('HdrDiv');
    var y = getDivInvalidCount('for_OfficeWork');
    var DWTBtn = $('#DateWiseTourBtn2');
    var vadBtn = $('#VADBtn');
    var acc = $('#AcceptCmb');
    var dwtFilled = $('#DWSubmitBtnActive').val();
    var vaFilled = $('#VASubmitBtnActive').val();
    acc.makeSLUDisable();
    DWTBtn.makeSLUDisable();
    vadBtn.makeSLUDisable();
    if ((x + y) * 1 > 0) {
        //DWTBtn.makeSLUDisable();
        //vadBtn.makeSLUDisable();
    }
    else {
        if ($('#ehgHeader_PurposeOfAllotment').val() == 1) {
            //DWTBtn.makeSLUDisable();
            //vadBtn.makeSLUDisable();
        }
        else {
            DWTBtn.makeSLUEnable();
            if (dwtFilled == 1) {
                vadBtn.makeSLUEnable();
                //acc.makeSLUEnable();
                $('#BtnDiv').removeClass('sectionB');
            }
        }
    }
    
    if (dwtFilled == 1 && vaFilled == 1) {
        //alert(dwtFilled + ' - ' + vaFilled);
        UnLockSLUSectionAllCtrl($('#StatementDiv'));
    }
};
function addOfficeWorkCloneBtnClick() {
    var vehicletype = $('#ehgHeader_VehicleType').val();
    var noofPersons = $('.mpersons').length;
    if (vehicletype == 2 && noofPersons >= 2) {
        MyAlert(4,"Can Not Add More Than Two Persons When Vehicle Type Provided Is 2Wheeler. ")
    }
    else {
    var insrow = addOfficeWorkCloneBtnClick.caller.arguments[0].target.closest('.add-row');
    var sRowid = $(insrow).attr('id');
    var frmdtlblSource = $('#lblFromDate');
    var btnAdd = $('#AddBtn');
    if (sRowid > 0) {
        frmdtlblSource = $('#lblFromDate_' + sRowid);
        btnAdd = $('#AddBtn_' + sRowid);
    }
    var rowid = CloneRowReturningID('tbody3', 'tbody4', $(insrow).attr('id') * 1, true, false);
    $('#PurposeOfVisit_' + rowid).val('');
    $('#cmbDDPersonType_' + rowid).empty();
    $('#ToDate_' + rowid).val('');
    $('#lblFromDate_' + rowid).html(frmdtlblSource.html());
    $('#FromTime_' + rowid).addClass('is-valid').removeClass('is-invalid SLUCtrl');
    $('#FromTime_' + rowid).attr('disabled', 'disabled');
    $('#txtDDPersonType_' + rowid).val('');
    $('#FromDate_' + rowid).addClass('is-valid').removeClass('is-invalid SLUCtrl');
    $('#FromDate_' + rowid).attr('disabled', 'disabled');
    $('#DDAuthorisedEmpForWork').attr('disabled', 'disabled');
        $('#sOfficeworkDiv').removeClass('sectionB');
        $('#FromDate_' + rowid).ApplyCustomDateFormat();
        $('#ToDate_' + rowid).on("change", function () {
                $(this).ApplyCustomDateFormat();
        });
    UnLockSLUContainer($('#' + rowid));
    EnableDateWiseTourBtn();
    $('#AddBtn_' + rowid).makeSLUDisable();
    $('#DeleteBtn_' + rowid).makeSLUEnable();
    }
};
function removeOfficeWorkCloneBtnClick() {
    var myCtrl = $(removeOfficeWorkCloneBtnClick.caller.arguments[0].target);
    var tblRow = removeOfficeWorkCloneBtnClick.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody4');
    UpdateAuthorisedPersonForOfficeWork('Select Authorized Person');
    EnableDateWiseTourBtn();
    $('#DDAuthorisedEmpForWork').removeAttr('disabled');
    UnLockSLUContainerAllCtrl($('#OficeWorkTbl tr:last'));
    UnLockSLUSection($('#OfficeWorkStmnt'));
    //myCtrl.RowRemoveButtonClicked();
    //$('#OficeWorkTbl tr:last').find('button').each(function () {
    //    $(this).makeSLUEnable();
    //});
};
function CRToDateChanged() {
    var target = CRToDateChanged.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    var fdtCtrl = $('#FromDate');
    //var tdtCtrl = $('#ToDate');
    var personCtrl = $('#cmbDDPersonType');
    if (targetid.indexOf('_') >= 0) {
        targetid = targetid.split('_')[0];
        fdtCtrl = $('#FromDate_' + $(tblRow).attr('id'));
        //tdtCtrl = $('#ToDate_' + $(tblRow).attr('id'));
        personCtrl = $('#cmbDDPersonType_' + $(tblRow).attr('id'));
    }
    if (targetCtrl.val() != '') {
        if (CompareDateV2(fdtCtrl.val(), 0, targetCtrl.val(), 0)) {
            var url = '/EHG/GetEmployeeValidationForTour?Employees=' + personCtrl.val() + '&FromDate=' + fdtCtrl.val() + '&ToDate=' + targetCtrl.val();
            GetDataFromAjax(url).done(function (data) {
                if (data.bResponseBool == true) {
                    //MyAlert(1, 'Validation Successful');
                    targetCtrl.isValidCtrl();
                }
                else {
                    MyAlert(4, data.sResponseString);
                    targetCtrl.isInvalidCtrl();
                }
            });

        } else { targetCtrl.isInvalidCtrl(); }
    } else { targetCtrl.isInvalidCtrl();}
};
/////////////////////////////////////////////////////////////
$.fn.clearValidateClass = function () {
    var that = this;
    that.removeClass('is-valid').removeClass('is-invalid');
}; 
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    //alert(targetid);
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).isValidCtrl();
    } else {
        $(target).isInvalidCtrl();        
    }
    if (targetid == 'AuthorisedEmpNoForManagement' ||
        targetid == 'DriverNoForManagement' || 
        targetid == 'FromdateForMang' ||
        targetid == 'FromTimeForMang' ||
        targetid == 'ToDateForMang' ||
        targetid == 'PurposeOfVisitFoeMang' || 
        targetid == 'TADADeniedForManagement' ) {
        $('#' + targetid + '2').val($(target).val());
    }    
    if (targetid == 'FromdateForMang' || 'ToDateForMang')
    {
        $(target).ApplyCustomDateFormat();
    }
    //if (targetid.indexOf('_') >= 0) {
    //    if (targetid.split('_')[0] == 'TaDaDenied' && $(target).val() == 1) {
    //        MyAlertWithCallBack(6, 'Are You Sure To Deny The TADA Option?', 'CancelRTadaDenied(' + targetid.split('_')[1] + ')')
    //    }
    //}
    //else if (targetid == 'TaDaDenied' && $(target).val() == 1) {
    //    MyAlertWithCallBack(6, 'Are You Sure To Deny The TADA Option?', 'CancelRTadaDenied(0)')
    //}
    $('#BackBtnActive').val(1);
    EnableSubmitBtn();
    EnableDateWiseTourBtn();
    if (targetid == 'AuthorisedEmpNoForManagement' && isvalid) {
        UnLockSection('StatementDiv');
    } else { LockSection('StatementDiv'); }

    if (targetid == 'TADADeniedForManagement' && $(target).val() == 1) {
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
                //addBtnCtrl.removeAttr('disabled');
            }
            else {
                $('#TADADeniedForManagement').val(0);
            }
        });
        /*MyAlertWithCallBack(2, 'Are You Sure To Deny The T.A & D.A Option?', 'CancelTadaDenied')*/
    }
};
function CancelTadaDenied() {
    $('#TADADeniedForManagement').val(0);
};
function CancelRTadaDenied(index) {
    if (index == 0) {
        $('#TaDaDenied').val(0);
    } else { $('#TaDaDenied_' + index).val(0);}
    
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "ehgHeader_MaterialStatus":
            $('#MaterialStatus').val(value);
            if (value >= 0) { isvalid = true; }
            //$('#ehgHeader_Instructor').val('').isInvalidCtrl();
            break;
        case "ehgHeader_Instructor":
            if (value > 0) {
                var insname = $('#ehgHeader_Instructor option:selected').text();
                $('#ehgHeader_InstructorName').val(insname);
                $('#Instructor').val(value);
                isvalid = true;
            }
            break;
        case "FromDate":            
            if (value != '') { return true;}
            break;
        case "FromTime":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "ToDate":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "PurposeOfVisit":
            if (value.length >= 1 && value.length <= 200) {
            //if (value.length > 1 && WordCount(value) <= 200) {
                if (IsAlphaNumericWithSpace(value)) {
                    isvalid = true;
                }                
            }
            break;
        case "TaDaDenied":
            if (value != '') { isvalid = true;}
            //isvalid = validatectrl_YesNoCombo(value);
            break;
        case "AuthorisedEmpNoForManagement":            
            if (value > 0) {
                var empname = $('#AuthorisedEmpNoForManagement option:selected').text();
                $('#AuthorisedEmpNameForManagement').val(empname);                
                isvalid = true;
            }
            break;        
        case "FromdateForMang":
            if (value != '') {
                if ($('#lblFromdateForMang').html() == 'Select Date') {
                    var today = new Date();
                    var yesterday = new Date(today);
                    yesterday.setDate(today.getDate() - 1);
                    var formattedDate = yesterday.toISOString().split('T')[0];
                    if (value == formattedDate) { isvalid = false; }
                    else {
                        isvalid = true;
                    }
                }
                else {
                    isvalid = true;
                    var maxdays = $('#MaxDaysOfTourForEmp').val();
                    var mtdt = CustomDateChangeV2(value, maxdays);
                    $('#ToDateForMang').attr('max', mtdt).attr('min', value);
                    //$('#ToDateForMang').val('').isInvalidCtrl();
                    //$('#lblToDateForMang').html('Select Date');
                }
                $('#ActualTOutDtForMang').html(ChangeDateFormat(value));
            }
            break;
        case "FromTimeForMang":
            //alert(value);
            if (value != '') {                
                isvalid = true;
                $('#ActualTOutTimeForMang').html(value);
            }
            break;
        case "ToDateForMang":
            if (value != '') {
                var fromdate = $('#FromdateForMang').val();
                var personCtrl = $('#DriverNoForManagement');
                var url = '/EHG/GetEmployeeValidationForTour?Employees=' + personCtrl.val() + '&FromDate=' + fromdate + '&ToDate=' + value;
                
                isvalid = CompareDateV2(fromdate, 0, value, 0);
                //alert($('#' + targetid).attr('max') +' - '+value+ ' - ' + $('#' + targetid).attr('min'))
                if (!isvalid) {
                    $('#ToDateForMang').prop('title', 'To Date Should Be Same Or Latter Than From Date');
                }
                else {
                    GetDataFromAjax(url).done(function (data) {
                        if (data.bResponseBool == true) {
                            //MyAlert(1, 'Validation Successful');
                            //targetCtrl.isValidCtrl();
                            $('#ToDateForMang').isValid();
                        }
                        else {
                            MyAlert(4, data.sResponseString);
                            /*targetCtrl.isInvalidCtrl();*/
                            $('#ToDateForMang').isInvalid();
                        }
                    })
                }
                //$('#ReTInDtForMang').html(ChangeDateFormat(value));
                $('#ReTInDtForMang').html(ChangeDateFormat('Nil'));
            }
            break;
        case "TADADeniedForManagement":
            if (value != -1) { isvalid = true; }
            break;
        case "PurposeOfVisitFoeMang":
            if (value.length >= 1 && value.length <= 200) {
                if (IsAlphaNumericWithSpace(value)) {
                    isvalid = true;
                }
            }
            break;
        case "DriverNoForManagement":
            if (value >= 1) { isvalid = true; }
            break;
    }
    
    if (targetid == 'AuthorisedEmpNoForManagement' && isvalid) {
        //LockDiv('sManagementDiv');
        //$('#AuthorisedEmpNoForManagement').removeAttr('disabled');
    }
    else if (targetid == 'AuthorisedEmpNoForManagement' && !isvalid) {
        //UnLockDiv('sManagementDiv');
    }
    return isvalid;
};
function validatectrl_ValidateLength(value) {
    if (value.length > 0) {
        return true;
    } else { return false;}
}
function validatectrl_YesNoCombo(value) {
    if (value*1 >= 0) {
        return true;
    } else { return false; }
}
function DateWiseTourDtlClicked() {
    var notenumber = $('#ehgHeader_NoteNumber').val();
    var vehicletype = $('#ehgHeader_VehicleType').val();
    var poallotment = $('#ehgHeader_PurposeOfAllotment').val();
    var matstat = $('#ehgHeader_MaterialStatus').val();
    var instructor = $('#ehgHeader_Instructor').val();
    var authEMpname = $('#DDAuthorisedEmpForWork option:selected').text();
    var InstructorName = $('#ehgHeader_Instructor option:selected').text();
    var DocName = $('#ehgHeader_DocFileName').val();
    //OficeWorkTbl    
    var schrecords = getRecordsFromTableV2('OficeWorkTbl');
    //var x = '{"NoteNumber":"' + notenumber + '","AuthorisedEmpName":"' + authorisedemp + '","PersonDtls":' + schrecords + '}';
    var x = '{"NoteNumber":"' + notenumber
        + '","VehicleType":"' + vehicletype + '","PurposeOfAllotment":"' + poallotment
        + '","MaterialStatus":"' + matstat + '","Instructor":"' + instructor
        + '","AuthorisedEmployeeName":"' + authEMpname
        + '","DocFileName":"' + DocName + '","InstructorName":"' + InstructorName
        + '","PersonDtls":' + schrecords + '}';
    $.ajax({
        method: 'POST',
        url: '/EHG/GetTravelingPersonDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    var url = "/Security/EHG/DateWiseTourDetails";
                    window.location.href = url;
                }
                else {
                    MyAlert(3, 'Failed To Update Traveling Person Details.');
                    //Swal.fire({
                    //    title: 'Error',
                    //    text: 'Failed To Update Traveling Person Details.',
                    //    icon: 'question',
                    //    customClass: 'swal-wide',
                    //    buttons: {
                    //        confirm: 'Ok'
                    //    },
                    //    confirmButtonColor: '#2527a2',
                    //});
                }
            });
        },
    });
    
};
function getDesgnCode(rowid, empCode) {
    var actualempcode=0
    if ($.isNumeric(empCode)) { actualempcode = empCode; }
    var desgCtrl = $('#DesgCodenName');
    var persontypeCtrl = $('#DDPersonType');
    if (rowid != 0) {
        desgCtrl = $('#DesgCodenName_' + rowid);
        persontypeCtrl = $('#DDPersonType_' + rowid);
    }    
    var mValue = persontypeCtrl.val()*1;
    if (mValue<=4 && mValue>0) {
        var mUrl = "/EHG/GetDesgCodenName?empID=" + actualempcode + "&empType=" + mValue;
        $.ajax({
            url: mUrl,
            success: function (result) { desgCtrl.html(result); }
        });
        //desgCtrl.html('qwe');
    }
    else {
        desgCtrl.html('');
    }
};
function DDPersonTypeChanged() {
    var target = DDPersonTypeChanged.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var docname = $('#ehgHeader_DocFileName').val();
    if (docname != '') {        
        var targetid = targetCtrl.attr('id');
        var mValue = targetCtrl.val();
        var cmbCtrl = $('#cmb' + targetid);
        var txtCtrl = $('#txt' + targetid);
        //alert(mValue);
        //$('#ehgHeader_PersonType').val(mValue);
        switch (mValue) {
            case '1':
                cmbCtrl.removeClass('inVisible').addClass('pickPersonName').isInvalidCtrl();
                txtCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
                getDropDownData('cmb' + targetid, 'Select Employee', '/EHG/GetStaffList');
                break;
            case '2':
                cmbCtrl.removeClass('inVisible').addClass('pickPersonName').isInvalidCtrl();
                txtCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
                getDropDownData('cmb' + targetid, 'Select Driver', '/EHG/GetDriverList');
                break;
            case '3':
                txtCtrl.removeClass('inVisible').addClass('pickPersonNametxt').isInvalidCtrl();
                cmbCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
                break;
            case '4':
                txtCtrl.removeClass('inVisible').addClass('pickPersonNametxt').isInvalidCtrl();
                cmbCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
                break;
            default:
                txtCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
                cmbCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
                break;
        }
        if (mValue > 0) { targetCtrl.isValidCtrl(); } else { targetCtrl.isInvalidCtrl(); }
        EnableAddBtn(tblRow, 'AddBtn');
    } else {
        targetCtrl.val('').isInvalidCtrl();
        MyAlert(4, 'No Documents Uploaded Yet.So Can Not Proceed Further.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'No Documents Uploaded Yet.So Can Not Proceed Further.',
        //    icon: 'question',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
    }

    
};
function DDPickPersonChanged(x) {
    var target = DDPickPersonChanged.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var mIndex = $(tblRow).attr('id');
    var targetCtrl = $(target);
    var mValue = targetCtrl.val();
    var myctrlID = targetCtrl.attr('id');
    var altCtrlID = 'txtDDPersonType';
    if (myctrlID.substr(0, 3) == 'cmb') {
        altCtrlID = 'txt' + myctrlID.substr(3, myctrlID.length);
    } else { altCtrlID = 'cmb' + myctrlID.substr(3, myctrlID.length); }
    var altCtrl = $('#' + altCtrlID);
    //Check for Duplicate Person
    var dstat = 0;
    $('.xPerson').each(function () {        
        if (mValue != '' && $(this).val() == mValue) { dstat +=1; }
        //alert(mValue + ' - ' + $(this).val() + ' - ' + dstat);
    });
    //Check for Duplicate Person - end
    if (x == 1) {
        if (isAlphabateWithSpace(mValue,20))
        {
            targetCtrl.isValidCtrl();
            altCtrl.removeClass('is-invalid');
        } else { targetCtrl.isInvalidCtrl(); }
    }
    else if (mValue > 0) { targetCtrl.isValidCtrl(); }
    else { targetCtrl.isInvalidCtrl(); }
    if (dstat>1) {
        targetCtrl.val('');
        targetCtrl.isInvalidCtrl();
        MyAlert(4, 'Person You Have Selected Is Already Taken.');
        //Swal.fire({
        //    title: 'Data Duplicacy Error',
        //    text: 'Person You Have Selected Is Already Taken.',
        //    icon: 'error',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
    }
    else {
        getDesgnCode(mIndex, mValue);
        EnableAddBtn(tblRow, 'AddBtn');
        UpdateAuthorisedPersonForOfficeWork('Select Authorized Person');
    }    
};
function DriverNoForManagementChanged() {
    var target = DriverNoForManagementChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    var docname = $('#ehgHeader_DocFileName').val();
    if (docname != '') {        
        var driverno = targetCtrl.val();
        if (driverno > 0) {
            var drivername = $('#DriverNoForManagement option:selected').text();
            $('#DriverNameForManagement').val(drivername);
            var mUrl = "/EHG/GetDesgCodenName?empID=" + driverno + "&empType=2";
            $.ajax({
                url: mUrl,
                success: function (result) {
                    $('#tbl1Designation').html(result);
                    $('#DesgCodeNNameForManagement').val(result);
                }
            });
            targetCtrl.isValidCtrl();
        }
        else {
            targetCtrl.isInvalidCtrl();
        }
        $('#BackBtnActive').val(1);
    } else {
        targetCtrl.val('').isInvalidCtrl();
        MyAlert(4, 'No Documents Uploaded Yet.So Can Not Proceed Further.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'No Documents Uploaded Yet.So Can Not Proceed Further.',
        //    icon: 'question',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
    }
    EnableSubmitBtn();
};
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    var fdtCtrl = $('#FromDate');
    var tdtCtrl = $('#ToDate');
    var lbltdtCtrl = $('#lblToDate');
    var tdtCtrl = $('#ToDate');
    var personCtrl = $('#cmbDDPersonType');
    var addBtnCtrl = $('#AddBtn');
    if (targetid.indexOf('_') >= 0) {
        targetid = targetid.split('_')[0];
        fdtCtrl = $('#FromDate_' + $(tblRow).attr('id'));
        tdtCtrl = $('#ToDate_' + $(tblRow).attr('id'));
        lbltdtCtrl = $('#lblToDate_' + $(tblRow).attr('id'));
        personCtrl = $('#cmbDDPersonType_' + $(tblRow).attr('id'));
        addBtnCtrl = $('#AddBtn_'+ $(tblRow).attr('id'));
    }
    var isvalid = validatectrl(targetid, targetCtrl.val());
    //for todate>fromdate validation
    
    if (targetid == 'ToDate') {
        isvalid = CompareDateV2(fdtCtrl.val(), 0, targetCtrl.val(), 0);
        var url = '/EHG/GetEmployeeValidationForTour?Employees=' + personCtrl.val() + '&FromDate=' + fdtCtrl.val() + '&ToDate=' + targetCtrl.val();
        isvalid = ValidateEmployeeForTour(personCtrl.val(), fdtCtrl.val(), tdtCtrl.val());
    }
    
    if (targetid == 'FromDate' && isvalid) {
        var maxdays = $('#MaxDaysOfTourForEmp').val();
        var mtdt = CustomDateChangeV2(targetCtrl.val(), maxdays);
        tdtCtrl.attr('max', mtdt).attr('min', targetCtrl.val());
        tdtCtrl.val('').isInvalidCtrl();
        lbltdtCtrl.html('Select Date');
    }
    if (isvalid) { targetCtrl.isValidCtrl(); } else { targetCtrl.isInvalidCtrl(); }
    EnableAddBtn(tblRow, 'AddBtn');
    EnableDateWiseTourBtn();
    EnableSubmitBtn();
    if (targetid == 'TaDaDenied' && targetCtrl.val() == 1) {
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
                addBtnCtrl.removeAttr('disabled');
            }
            else {
                targetCtrl.val(0);
            }
        });
        //MyAlertWithCallBack(2, 'Are You Sure To Deny The T.A & D.A Option?', function () {            
            
        //});
    }   
    
};
function EnableAddBtn(tblRow, addBtnBaseID) {
    var authempCtrl=$('#DDAuthorisedEmpForWork');
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
    //alert(rowid+' -  '+tblrow.find('.is-invalid').length);
    if (tblrow.find('.is-invalid').length > 0) {
        addBtnctrl.makeSLUDisable();
        authempCtrl.makeSLUDisable();
    }
    else {
        addBtnctrl.makeSLUEnable();
        authempCtrl.makeSLUEnable();
        UnLockSLUSection($('#OfficeWorkStmnt'));
    }
    //alert(rowid + ' - ' + addBtnBaseID+' - '+tblrow.find('.is-invalid').length);
    EnableDateWiseTourBtn();
};
function getDivInvalidCount(mdivID) {
    var x = 0;
    var mDiv = $('#' + mdivID);
    x = mDiv.find('.is-invalid').length;
    //alert(mdivID + ' - ' + x);
    return x;
};

function EnableSubmitBtn() {
    var vehtypeCtrl = $('#ehgHeader_VehicleType');
    var poaCtrl = $('#ehgHeader_PurposeOfAllotment');
    var p = vehtypeCtrl.val();
    var q = poaCtrl.val();
    //ForManagementDivRemoveInValidStatus();
    if (p == 2) { poaCtrl.removeClass('is-invalid'); }    
    var x = getDivInvalidCount('HdrDiv');
    var y = getDivInvalidCount('for_OfficeWork');
    var z = getDivInvalidCount('for_Management');
    var a = $('#AcceptCmb').val();
    var b = $('#DWSubmitBtnActive').val();
    var c = $('#VASubmitBtnActive').val();    
    var IsSubmitActive = false;
    var SubmitBtn = $('#btnSubmit');
    //alert(x + ' - ' + y + ' - ' + z);
    if (a == 1) { IsSubmitActive = true; } else { IsSubmitActive = false; }
    if (IsSubmitActive) {
        IsSubmitActive = false;
        if (x <= 0) {
            if (p == 2) {
                if (y <= 0) {
                    if (b == 1 && c == 1) {
                        IsSubmitActive = true;
                    }                    
                }
            }
            else if (p == 1) {
                if (q == 1) {
                    if (z <= 0) { IsSubmitActive = true; }
                }
                else if (y <= 0) {
                    if (b == 1 && c == 1) {
                        IsSubmitActive = true;
                    }
                    //IsSubmitActive = true;
                }
            }
        }
    }    
    if (IsSubmitActive) {        
        SubmitBtn.makeSLUEnable();
    } else { SubmitBtn.makeSLUDisable(); }    
};
function UpdateAuthorisedPersonForOfficeWork(defaultText) {
    var DDCtrl = $('#DDAuthorisedEmpForWork');
    DDCtrl.empty();
    DDCtrl.append($('<option/>', { value: "-1", text: defaultText }));
    $('.pickPersonName').each(function () {
        var mText = $(this).find('option:selected').text();
        if (mText.length > 0)
        {
            DDCtrl.append($('<option/>', { value: mText, text: mText }));
        }
    });
    $('.pickPersonNametxt').each(function () {
        var mText = $(this).val();
        if (mText.length > 0) {
            DDCtrl.append($('<option/>', { value: mText, text: mText }));
        }
    });
};
async function UpdateAuthorisedPersonForOfficeWorkWithSelectedValue(defaultText,selectedValue) {
    var DDCtrl = $('#DDAuthorisedEmpForWork');
    DDCtrl.empty();
    DDCtrl.append($('<option/>', { value: "-1", text: defaultText }));
    $('.pickPersonName').each(function () {
        var mText = $(this).find('option:selected').text();
        if (mText.length > 0) {
            DDCtrl.append($('<option/>', { value: mText, text: mText }));
        }
    });
    $('.pickPersonNametxt').each(function () {
        var mText = $(this).val();
        if (mText.length > 0) {
            DDCtrl.append($('<option/>', { value: mText, text: mText }));
        }
    });
    DDCtrl.val(selectedValue);
    if (selectedValue.length > 0) { DDCtrl.isValidCtrl(); } else { DDCtrl.isInvalidCtrl(); }
    //alert(selectedValue);
};
function DDAuthorisedEmpForWorkChanged() {
    var targetCtrl = $(DDAuthorisedEmpForWorkChanged.caller.arguments[0].target);
    if (targetCtrl.val() !='-1' && targetCtrl.val().length > 0) {
        $('#ehgHeader_AuthorisedEmployeeName').val(targetCtrl.val());
        //$('#AuthorisedEmpNo').val(targetCtrl.val());
        targetCtrl.isValidCtrl();
        //LockDiv('sOfficeworkDiv');
        //targetCtrl.removeAttr('disabled');
    }
    else {
        targetCtrl.isInvalidCtrl();
        //UnLockDiv('sOfficeworkDiv');
    }
    //$('.cloneBtn').each(function () {
    //    alert($(this).attr('id'))
    //    $(this).attr('disabled');
    //});
    EnableDateWiseTourBtn();

};

function ForManagementDivRemoveInValidStatus() {
    //if ($('#for_Management').hasClass('inVisible')) {
    //} else {
    var vehtypeCtrl = $('#ehgHeader_VehicleType');
    var poaCtrl = $('#ehgHeader_PurposeOfAllotment');
    var p = vehtypeCtrl.val();
    var q = poaCtrl.val();
    if (p == 1 && q == 1) {
        var Ctrl1 = $('#DriverNoForManagement');
        var ctrl2 = $('#FromdateForMang');
        var ctrl3 = $('#FromTimeForMang');
        var ctrl4 = $('#ToDateForMang');
        var ctrl5 = $('#PurposeOfVisitFoeMang');
        var ctrl6 = $('#TADADeniedForManagement');
        var ctrl7 = $('#AuthorisedEmpNoForManagement');
        //alert(ctrl3.val() + ' - ' + ctrl4.val());
        var isvalid = validatectrl('DriverNoForManagement', Ctrl1.val());
        if (isvalid) {
            Ctrl1.isValidCtrl();
            isvalid = validatectrl('FromdateForMang', ctrl2.val());
            if (isvalid) {
                ctrl2.isValidCtrl();
                isvalid = validatectrl('FromTimeForMang', ctrl3.val());
                if (isvalid) {
                    ctrl3.isValidCtrl();
                    //alert(ctrl4.val());
                    isvalid = validatectrl('ToDateForMang', ctrl4.val());                    
                    if (isvalid) {
                        ctrl4.isValidCtrl();
                        isvalid = validatectrl('PurposeOfVisitFoeMang', ctrl5.val());
                        if (isvalid) {
                            ctrl5.isValidCtrl();
                            isvalid = validatectrl('TADADeniedForManagement', ctrl6.val());
                            if (isvalid) {
                                ctrl6.isValidCtrl();
                                isvalid = validatectrl('AuthorisedEmpNoForManagement', ctrl7.val());
                                if (isvalid) {
                                    ctrl7.isValidCtrl();
                                }
                                else { ctrl7.isInvalidCtrl(); }
                            }
                            else { ctrl6.isInvalidCtrl(); }
                        }
                        else { ctrl5.isInvalidCtrl(); }
                    }
                    else { ctrl4.isInvalidCtrl(); }
                }
                else { ctrl3.isInvalidCtrl(); }
            }
            else { ctrl2.isInvalidCtrl(); }
        } else { Ctrl1.isInvalidCtrl() }
    } else {
        $('#DriverNoForManagement').removeClass('is-invalid');
        $('#FromdateForMang').removeClass('is-invalid');
        $('#FromTimeForMang').removeClass('is-invalid');
        $('#ToDateForMang').removeClass('is-invalid');
        $('#PurposeOfVisitFoeMang').removeClass('is-invalid');
        $('#TADADeniedForManagement').removeClass('is-invalid');
        $('#AuthorisedEmpNoForManagement').removeClass('is-invalid');
    }
        
    //}
    
};
function POADropdownChanged(mval) {
    //LockNextCtrls('ehgHeader_PurposeOfAllotment');
    var ForManagementDiv = $('#for_Management');
    var ForOfficeWorkDiv = $('#for_OfficeWork');
    var POADropdown = $('#ehgHeader_PurposeOfAllotment');
    var isUploaded = 0;
    if ($('#ehgHeader_DocFileName').val().length > 1) { isUploaded = 1;}
    var DWTBtn = $('#DateWiseTourBtn2');
    var VABtn = $('#VADBtn');
    var selectedvt = POADropdown.val();
    $('#POA').val(selectedvt);
    $('#ehgHeader_POA2').val(selectedvt);
    //if (isUploaded == 1) {
        if (selectedvt == 1) {
            ForOfficeWorkDiv.addClass('inVisible');
            ForManagementDiv.removeClass('inVisible');
            //DWTBtn.makeSLUDisable();
            //VABtn.makeSLUDisable();
        }
        else if (selectedvt == 2) {
            ForOfficeWorkDiv.removeClass('inVisible');
            ForManagementDivRemoveInValidStatus();
            ForManagementDiv.addClass('inVisible');

            //DWTBtn.makeSLUEnable();
            //VABtn.makeSLUEnable();
        }
        else {            
            ForOfficeWorkDiv.addClass('inVisible');
            ForManagementDivRemoveInValidStatus();
            ForManagementDiv.addClass('inVisible');
            //DWTBtn.makeSLUDisable();
            //VABtn.makeSLUDisable();
        };
    //}
    //else {
    //    ForOfficeWorkDiv.addClass('inVisible');
    //    ForManagementDiv.addClass('inVisible');
    //}
    if (selectedvt > 0) {
        POADropdown.isValidCtrl();
        //UnlockNextCtrl('ehgHeader_PurposeOfAllotment');
    } else { POADropdown.isInvalidCtrl(); }
    // Null Value for rest of the controlls
    if (mval == 1) {
        $('#ehgHeader_MaterialStatus').val('').isInvalidCtrl();
        $('#ehgHeader_Instructor').val('').isInvalidCtrl();
    }    
    //
    if (selectedvt != 1 && $('#OkToOpen').val() == 0) {
        POADropdown.isInvalidCtrl();
        MyAlert(5,'Screen Is Alloted For Office Work Only On Holidays, Weekly Offs And Off-General Shift Timing On Working Days.')
    }
    EnableDateWiseTourBtn();
    
};
async function getInitialDataForTravelingPerson() {
    var notenumber = $('#ehgHeader_NoteNumber').val();
    var rowid;
    var authPerson = $('#ehgHeader_AuthorisedEmployeeName').val();
    var persontypeCtrl = $('#DDPersonType');
    var cmbpersonCtrl = $('#cmbDDPersonType');
    var txtpersonCtrl = $('#txtDDPersonType');
    var fromdateCtrl = $('#FromDate');
    var fromtimeCtrl = $('#FromTime');
    var todateCtrl = $('#ToDate');
    var povCtrl = $('#PurposeOfVisit');
    var tadaDeniedCtrl = $('#TaDaDenied');
    var fromdatelblCtrl = $('#lblFromDate');
    var todatelblCtrl = $('#lblToDate');
    var addbtnCtrl = $('#AddBtn');
    var desgCtrl = $('#DesgCodenName');
    var authempCtrl = $('#DDAuthorisedEmpForWork');
    authempCtrl.empty();
    authempCtrl.append($('<option/>', { value: "-1", text: "Select Authorised Employee" }));
    $.ajax({
        url: '/EHG/GetTPDetails',
        method: 'GET',
        data: { NoteNumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                if (index > 0) {                    
                    rowid = CloneRowReturningID('tbody3', 'tbody4', index-1, true, false);
                    persontypeCtrl=$('#DDPersonType_' + rowid);
                    cmbpersonCtrl = $('#cmbDDPersonType_' + rowid);
                    txtpersonCtrl = $('#txtDDPersonType_' + rowid);
                    fromdateCtrl = $('#FromDate_' + rowid);
                    fromtimeCtrl = $('#FromTime_' + rowid);
                    todateCtrl = $('#ToDate_' + rowid);
                    povCtrl = $('#PurposeOfVisit_' + rowid);
                    tadaDeniedCtrl = $('#TaDaDenied_' + rowid);
                    fromdatelblCtrl = $('#lblFromDate_' + rowid);
                    todatelblCtrl = $('#lblToDate_' + rowid);
                    addbtnCtrl = $('#AddBtn_' + rowid);
                    desgCtrl = $('#DesgCodenName_' + rowid);
                    fromdateCtrl.removeClass('SLUCtrl').attr('disabled');
                    fromtimeCtrl.removeClass('SLUCtrl').attr('disabled');
                }
                persontypeCtrl.val(item.PersonType).isValid();
                txtpersonCtrl.val(item.EmployeeNonName).isValid();
                desgCtrl.html(item.DesignationCodenName);
                fromdateCtrl.val(item.FromDateStr).isValid();
                fromtimeCtrl.val(item.FromTime).isValid();
                todateCtrl.val(item.ToDateStr).isValid();
                povCtrl.val(item.PurposeOfVisit).isValid();
                tadaDeniedCtrl.val(item.TADADenied ? 1 : 0).isValid();
                fromdatelblCtrl.html(item.FromDateStrDisplay);
                todatelblCtrl.html(item.ToDateStrDisplay);                
                authempCtrl.append($('<option/>', { value: item.EmployeeNonName, text: item.EmployeeNonName }));
                authempCtrl.val(authPerson).isValid();
                if (item.IsAuthorised) { authPerson = item.EmployeeNonName; }
                switch (item.PersonType) {
                    case 1:
                        cmbpersonCtrl.removeClass('inVisible').addClass('pickPersonName').isInvalidCtrl();
                        txtpersonCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
                        (async function () {
                            const r1 = await getDropDownDataWithSelectedValue(cmbpersonCtrl.attr('id'), 'Select Employee', '/EHG/GetStaffList', item.EmployeeNo);
                        })();
                        break;
                    case 2:
                        cmbpersonCtrl.removeClass('inVisible').addClass('pickPersonName').isInvalidCtrl();
                        txtpersonCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
                        (async function () {
                            const r1 = await getDropDownDataWithSelectedValue(cmbpersonCtrl.attr('id'), 'Select Driver', '/EHG/GetDriverList', item.EmployeeNo);
                        })();
                        break;
                    case 3:
                        txtpersonCtrl.removeClass('inVisible').addClass('pickPersonNametxt');
                        cmbpersonCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();                        
                        break;
                    case 4:
                        txtpersonCtrl.removeClass('inVisible').addClass('pickPersonNametxt');
                        cmbpersonCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
                        break;
                    default:
                        txtpersonCtrl.addClass('inVisible').removeClass('pickPersonNametxt').clearValidateClass();
                        cmbpersonCtrl.addClass('inVisible').removeClass('pickPersonName').clearValidateClass();
                        break;
                }
                cmbpersonCtrl.isValid();                
                EnableDateWiseTourBtn();
                LockSLUContainer($('#' + index));
                //$('#' + index).find('.SLUCtrl').each(function () {
                //    $(this).removeClass('SLUCtrl');
                //});
                if (authPerson != '') {
                    //LockDiv('sOfficeworkDiv'); 
                }
            });
            //addbtnCtrl.makeSLUEnable();
        }
    });
};
$(document).ready(function () {
    //For Auto Display Initially.
    var uploadedDoc = $('#ehgHeader_DocFileName').val();
    var UploadBtn = $('#btnScan');
    var ViewUploadBtn=$('#btnScanView');
    if (uploadedDoc != '') {
        UploadBtn.addClass('inVisible');
        ViewUploadBtn.removeClass('inVisible');
        //UnLockSection('Section1');
        //LockSection('AppDiv');
        //LockSection('BtnDiv');
        //LockSection('StatementDiv');
    } else {
        UploadBtn.removeClass('inVisible');
        ViewUploadBtn.addClass('inVisible');
        //LockSection('Section1');
    }
    
});
$(document).ready(function () {
    var VehicletypeCtrl = $('#ehgHeader_VehicleType');
    var POADropdown = $('#ehgHeader_PurposeOfAllotment');
    var acCtrl = $('#AcceptCmb');
    VehicletypeCtrl.change(function () {
        VehicleTypeChanged(1);
        $('#BackBtnActive').val(1);
        EnableSubmitBtn();
    });
    POADropdown.change(function () {
        POADropdownChanged(1);
        $('#BackBtnActive').val(1);
        EnableSubmitBtn();
    });
    $('#btnBack').click(function () {
        var backbtnactive = $('#BackBtnActive').val();
        var backurl = "/Security/EHG/Index";
        if (backbtnactive == 1) {
            MyAlertWithRedirection(2, "Are You Sure Want to Go Back?", "/Security/EHG/Index");
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
    acCtrl.change(function () {
        //debugger;
        if (acCtrl.val() == 1) {
            acCtrl.isValidCtrl();
            LockSection('BtnDiv');
        } else {
            acCtrl.isInvalidCtrl();
            if ($('#ehgHeader_PurposeOfAllotment').val() != 1) { UnLockSection('BtnDiv'); }
        }
        EnableSubmitBtn();

    });
});
$(document).ready(function () {
    //getDropDownData('DDPersonType', 'Select Type', '/EHG/GetPersonTypes');
    var maxdt = $('#MaxFromDate').val();
    var mindt = $('#MinFromDate').val();
    $('#FromDate').attr('max', maxdt).attr('min', mindt);
    $('#ToDate').attr('min', mindt);
});
$(document).ready(function () {
    VehicleTypeChanged(0);
    $('#ehgHeader_PurposeOfAllotment').val($('#POA').val());
    POADropdownChanged(0);
    (async function () {
        const r1 = await getInitialDataForTravelingPerson();
    })();
    
    var matstat = $('#ehgHeader_MaterialStatus');    
    if (matstat.val() >= 0) {
        matstat.isValidCtrl();
    } else {
        matstat.isInvalidCtrl();
    }
    var instCtrl = $('#ehgHeader_Instructor');
    if (instCtrl.val() > 0) {
        instCtrl.isValidCtrl();
    } else {
        instCtrl.isInvalidCtrl();
    }
    var dwtFilled = $('#DWSubmitBtnActive').val();
    var vaFilled = $('#VASubmitBtnActive').val();
    var dwtBtnCtrl = $('#DateWiseTourBtn2');
    var vadBtnCtrl = $('#VADBtn');
    var hdrDiv = $('#HdrDiv');
    var managementDiv = $('#for_Management');
    var officeworkDiv = $('#for_OfficeWork');
    if (dwtFilled == 1) {
        dwtBtnCtrl.makeSLUEnable();
        vadBtnCtrl.makeSLUEnable();
    } else {
        //alert('ok');
        //dwtBtnCtrl.makeSLUEnable();
        vadBtnCtrl.makeSLUDisable();
    }
    if (dwtFilled == 1 || vaFilled == 1) {
        hdrDiv.addClass('sectionB');
        //managementDiv.addClass('sectionB');
        //officeworkDiv.addClass('sectionB');
        hdrDiv.find('.form-control').each(function () {
            $(this).attr('disabled','disabled');
        });
        hdrDiv.find('.form-select').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        managementDiv.find('.form-control').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        managementDiv.find('.form-select').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        officeworkDiv.find('.form-control').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        officeworkDiv.find('.form-select').each(function () {
            $(this).attr('disabled', 'disabled');
        });
        //vadBtnCtrl.ButtonOk();
        //debugger;
        //$('#AcceptCmb').removeAttr('disabled');
        //UnLockSLUCtrl($('#AcceptCmb'));
    }
    
    var POAValue = $('#VehicleType').val();
    if (POAValue == 2) { officeworkDiv.removeClass('inVisible'); }
    EnableSubmitBtn();
    
});
$(document).ready(function () {
    $('.timePickerPreDateCtrlV2ForMang').each(function () {        
        var myDtCtrl = $('#FromdateForMang');
        //var myNextCtrl = $('#FromLocationType_' + $(this).attr('id').split('_')[1]);
        $(this).datetimepicker({
            format: "hh:mm A"
        }).on("dp.show", function (e) {
            time = "01:00 PM"
        }).on("dp.change", function (e) {
            var myDate = myDtCtrl.val();
            $('#FromTimeForMang2').val($(this).val());
            $(this).isValid();
            if (myDate != '') {
                //alert(IsValidTimeSelected(myDate, $(this).val()));
                if (!IsValidTimeSelected(myDate, $(this).val())) {
                    $(this).isInvalid();
                    //myNextCtrl.EntrynDisabledForEntry();
                    MyAlert(4, "Selected Time Should Be Greater Than The Current Time.");
                }
                //IsIntervalChecking(myDate, $(this).val(), $(this).attr('id').split('_')[1]);
            }

        });
    });
    $('.timePickerPreDateCtrlV2ForOffice').each(function () {
        var myDtCtrl = $('#FromDate');
        if ($(this).attr('id').indexOf('_') >= 0) { myDtCtrl = $('#FromDate_' + $(this).attr('id').split('_')[1]); }
        
        //var myNextCtrl = $('#FromLocationType_' + $(this).attr('id').split('_')[1]);
        $(this).datetimepicker({
            format: "hh:mm A"
        }).on("dp.show", function (e) {
            time = "01:00 PM"
        }).on("dp.change", function (e) {
            var myDate = myDtCtrl.val();
            $(this).isValid();
            if (myDate != '') {
                //alert(IsValidTimeSelected(myDate, $(this).val()));
                if (!IsValidTimeSelected(myDate, $(this).val())) {
                    $(this).addClass('is-invalid').removeClass('is-valid');
                    //$(this).inValidCtrl();
                    //myNextCtrl.EntrynDisabledForEntry();
                    MyAlert(4, "Selected Time Should Be Greater Than The Current Time.");
                }
                //IsIntervalChecking(myDate, $(this).val(), $(this).attr('id').split('_')[1]);
            }

        });
    });
    //alert($('#FromdateForMang').val());
    $('.CustomDateFormatCloneRow').each(function () {
        $(this).CustomDateFormatCloneRow();
    });
});
