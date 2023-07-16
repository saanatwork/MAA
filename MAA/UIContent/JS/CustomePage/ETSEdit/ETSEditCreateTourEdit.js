function Option1Visible() {
    var isvisible = false;
    var optionDiv = $('#mOptionDiv');
    var optionCtrl = $('#Option1');
    var edittag = $('#EditTag').val();
    if (edittag == 3) {
        $('#tour_extension').find('.tourcat').each(function () {
            if ($(this).val().indexOf('3') >= 0) { isvisible = true; }
        });
    }
    if (isvisible) {
        optionDiv.makeVisible(); if (optionCtrl.val() != 1) { optionCtrl.isInvalid() };
    }
    else {
        optionCtrl.removeClass('is-invalid'); optionDiv.addClass('inVisible');
    }
};
function Option1Changed() {
    var targetCtrl = $(Option1Changed.caller.arguments[0].target);
    var optionDiv = $('#mOptionDiv');    
    if (targetCtrl.val() == 1) {
        targetCtrl.isValid(); optionDiv.isGreen();
    } else { targetCtrl.isInvalid(); optionDiv.isRed(); }
    EnableSubmitBtn();
};
function ValidateEditDateCtrl() {
    var targetCtrl = $(ValidateEditDateCtrl.caller.arguments[0].target);
    var tblRowid = targetCtrl.attr('id').split('_')[1];
    var ctrl1 = $('#EditTagDiv_' + tblRowid);
    if (targetCtrl.val() != '') {
        targetCtrl.isValid(); ctrl1.html(1);
        $('.CancelDate').each(function () {
            $(this).makeDisable();
        });
        targetCtrl.makeEnabled();
    } else { targetCtrl.isInvalid(); ctrl1.html(0); }
    $('#backbtnactive').val(1);
    EnableSubmitBtn();
};
function ValidatePurposeOfEdit() {
    var poeCtrl = $('#PurposeOfEdit');
    if (poeCtrl.val() != '') {
        if (WordCount(poeCtrl.val()) <= 20) {
            poeCtrl.isValid();            
        } else { poeCtrl.isInvalid(); }
    } else { poeCtrl.isInvalid(); }
    $('#backbtnactive').val(1);
    EnableSubmitBtn();
};
function EditTagChanged() {
    var editTagCtrl = $('#EditTag');
    var editTag = editTagCtrl.val();
    var mPOA = $('#POA').val();
    if (editTag > 0) {
        editTagCtrl.isValid(); $('#backbtnactive').val(1);
        if (editTag == 1) {
            if ($('#IsCancelled').val() == 1) {
                editTagCtrl.val('0').isInvalid();
                MyAlert(4, 'Tour Can Be Cancelled Only Once.');
                //Swal.fire({
                //    title: 'Error',
                //    text: 'Tour Can Be Cancelled Only Once.',
                //    icon: 'error',
                //    customClass: 'swal-wide',
                //    buttons: {
                //        confirm: 'Ok'
                //    },
                //    confirmButtonColor: '#2527a2',
                //});
                togleDiv('AllDisable');
            } else { togleDiv('tour_cancel');}            
        }
        else if (editTag == 2) {
            if (mPOA == 1) {
                editTagCtrl.val('0').isInvalid();
                MyAlert(4, 'Other Edit Can Not Be Allowed When Purpose Of Allotment Is For Management.');
                //Swal.fire({
                //    title: 'Error',
                //    text: 'Other Edit Can Not Be Allowed When Purpose Of Allotment Is For Management.',
                //    icon: 'error',
                //    customClass: 'swal-wide',
                //    buttons: {
                //        confirm: 'Ok'
                //    },
                //    confirmButtonColor: '#2527a2',
                //});
                togleDiv('AllDisable');
            } else { togleDiv('other_edit');}            
        }
        else if (editTag == 3) {
            if ($('#IsExtensionAllowed').val() == 1) {
                if ($('#IsCancelled').val() == 1) {
                    editTagCtrl.val('0').isInvalid();
                    MyAlert(4, 'Tour Extension Can Not Be Done After Cancellation.');
                    //Swal.fire({
                    //    title: 'Error',
                    //    text: 'Tour Extension Can Not Be Done After Cancellation.',
                    //    icon: 'error',
                    //    customClass: 'swal-wide',
                    //    buttons: {
                    //        confirm: 'Ok'
                    //    },
                    //    confirmButtonColor: '#2527a2',
                    //});
                    togleDiv('AllDisable');
                }
                else {
                    togleDiv('tour_extension');
                    //if ($('#IsTourStarted').val() == 1) {
                    //    togleDiv('tour_extension');
                    //}
                    //else {
                    //    editTagCtrl.val('0').isInvalid();
                    //    MyAlert(4, 'Extension Of Tour Can Be Allowed After Commencement & Before Completion.');
                    //    togleDiv('AllDisable');
                    //}
                }
            }
            else {
                editTagCtrl.val('0').isInvalid();
                MyAlert(4, 'Extension Of Tour Can Be Allowed After Commencement & Before Completion.');
                //Swal.fire({
                //    title: 'Error',
                //    text: 'Extension Of Tour Can Be Allowed After Commencement & Before Completion.',
                //    icon: 'error',
                //    customClass: 'swal-wide',
                //    buttons: {
                //        confirm: 'Ok'
                //    },
                //    confirmButtonColor: '#2527a2',
                //});
                togleDiv('AllDisable');
            }            
        }
    }
    else { editTagCtrl.isInvalid(); }
    EnableSubmitBtn();
};
function togleDiv(divID) {
    var tourCancelDiv = $('#tour_cancel');
    var tourExtDiv = $('#tour_extension');
    var tourOtherDiv = $('#other_edit');
    tourCancelDiv.addClass('inVisible');
    tourExtDiv.addClass('inVisible');
    tourOtherDiv.addClass('inVisible');
    $('#' + divID).removeClass('inVisible');
};
function CRTourCategoryChangedReUsable(targetCtrl, tblRowid,mTag) {
    var CtrlMulti = mTag+'CenterCodeMulti';
    var CtrlDD = mTag+'CenterCodeDD';
    if (tblRowid > 0) {
        CtrlMulti = mTag+'CenterCodeMulti_' + tblRowid;
        CtrlDD = mTag+'CenterCodeDD_' + tblRowid;
    }
    myMultiCtrl = $('#' + CtrlMulti);
    myDDCtrl = $('#' + CtrlDD);
    var CatCodes = targetCtrl.val();
    var mValid = true;
    var mText = 'NA';
    if (CatCodes == 6) { mText = '13 / Nizambad'; }
    if (CatCodes.indexOf('1') >= 0 || CatCodes.indexOf('2') >= 0 || CatCodes.indexOf('3') >= 0) {
        if (CatCodes.indexOf('4') >= 0 || CatCodes.indexOf('5') >= 0 || CatCodes.indexOf('6') >= 0) {
            mValid = false;
        }
        else {
            toggleCentreDiv(mTag + 'COMultiDiv', tblRowid, '', mTag);
            toggleBranchDiv(mTag + 'BranchCodeText', tblRowid, 'NA', mTag);
            UnLockSLUCtrl(myMultiCtrl);
            //alert(myMultiCtrl.attr('id'));
            getMultiselectData(CtrlMulti, '/Security/ETS/GetLocationsFromTypes?TypeIDs=' + CatCodes);
            
        }
    } else {
        if (CatCodes.length > 1) {
            mValid = false;
        }
        else {
            if (CatCodes == 4) {
                toggleCentreDiv(mTag + 'CODDDiv', tblRowid, '', mTag);
                toggleBranchDiv(mTag + 'BRMultiDiv', tblRowid, '', mTag);
                UnLockSLUCtrl(myDDCtrl);
                getDropDownData(CtrlDD, 'Select Center Code', '/Security/ETS/GetLocationsFromType?TypeID=' + CatCodes);
                
            } else {
                toggleCentreDiv(mTag + 'CenterCodeText', tblRowid, mText, mTag);
                toggleBranchDiv(mTag + 'BranchCodeText', tblRowid, 'NA', mTag);
            }
        }
    }
    if (!mValid) {
        targetCtrl.multiselect('clearSelection');
        toggleCentreDiv(mTag + 'CenterCodeText', tblRowid, 'NA', mTag);
        toggleBranchDiv(mTag + 'BranchCodeText', tblRowid, 'NA', mTag);
        MyAlert(4, 'Invalid Combination Of Tour Category. Only Centre Visit,Branch & Centre Visit,Others Can Be Combined Together.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'Invalid Combination Of Tour Category. Only Centre Visit,Branch & Centre Visit,Others Can Be Combined Together.',
        //    icon: 'error',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
        targetCtrl.isInvalidCtrl();
    }
    else {
        //LockSLUCtrl(myMultiCtrl);
        //LockSLUCtrl(myDDCtrl);
        targetCtrl.isValidCtrl(); $('#backbtnactive').val(1);
    }
};
function CRTourCategoryChanged() {
    var target = CRTourCategoryChanged.caller.arguments[0].target;
    var tblRow = $(target.closest('.add-row'));
    var tblRowid = tblRow.attr('id');
    var targetCtrl = $(target);
    var mPOA = $('#POA').val();
    var mEPTour = $('#EPTour').val();
    if (mPOA == 1 && targetCtrl.val() != 7) {
        targetCtrl.multiselect('clearSelection');
        MyAlert(4, 'Only NA Can Be Selected As Tour Category For This Note.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'Only NA Can Be Selected As Tour Category For This Note.',
        //    icon: 'error',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
        targetCtrl.isInvalid();
    }
    else if (mPOA == 0 && targetCtrl.val() == 7) {
        targetCtrl.multiselect('clearSelection');
        MyAlert(4, 'NA Can Not Be Selected As Tour Category For This Note.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'NA Can Not Be Selected As Tour Category For This Note.',
        //    icon: 'error',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
        targetCtrl.isInvalid();
    }
    else if (mEPTour == 1 && targetCtrl.val() != 6){
        targetCtrl.multiselect('clearSelection');
        MyAlert(4, 'Only EP Tour Can Be Selected As Tour Category For This Note.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'Only EP Tour Can Be Selected As Tour Category For This Note.',
        //    icon: 'error',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
        targetCtrl.isInvalid();
    }
    else if (mEPTour == 0 && targetCtrl.val() == 6) {
        targetCtrl.multiselect('clearSelection');
        MyAlert(4, 'EP Tour Can Not Be Selected As Tour Category For This Note.');
        //Swal.fire({
        //    title: 'Error',
        //    text: 'EP Tour Can Not Be Selected As Tour Category For This Note.',
        //    icon: 'error',
        //    customClass: 'swal-wide',
        //    buttons: {
        //        confirm: 'Ok'
        //    },
        //    confirmButtonColor: '#2527a2',
        //});
        targetCtrl.isInvalid();
    }
    else {
        CRTourCategoryChangedReUsable(targetCtrl, tblRowid, 'CR');
    }    
    if (targetCtrl.val() == '') { targetCtrl.isInvalid(); }
    EnableAddBtnInCloneRow(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function OETourCategoryChanged() {
    var target = OETourCategoryChanged.caller.arguments[0].target;
    //var tblRow = $(target.closest('.add-row'));    
    var targetCtrl = $(target);
    var tblRowid = targetCtrl.attr('id').split('_')[1];
    CRTourCategoryChangedReUsable(targetCtrl, tblRowid, 'OE');
    var EditTagCtrl = $('#EditTagDivOE_' + tblRowid);
    if (targetCtrl.val() != '') { EditTagCtrl.html(1); } else { EditTagCtrl.html(0); targetCtrl.isInvalid(); }
    EnableSubmitBtn();
};
function CRCenterCodeDDChangedReUsable(targetCtrl, tblRowid,mTag) {
    var Ctrl1 = mTag+'BranchCodeMulti';
    var Ctrl2 = $('#' + mTag+'CenterCodeMulti');
    var mVal = targetCtrl.val();
    if (tblRowid > 0) {
        Ctrl1 = mTag+'BranchCodeMulti_' + tblRowid;
        Ctrl2 = $('#' + mTag+'CenterCodeMulti' + tblRowid);
    }
    UnLockSLUCtrl($('#' + Ctrl1));
    (async function () {
        const r1 = await getMultiselectData(Ctrl1, '/Security/ETS/getBranchType?CenterId=' + mVal);
    })();
    
    if (mVal > 0) {
        targetCtrl.isValidCtrl();
        Ctrl2.isValidCtrl();
        $('#backbtnactive').val(1);
    } else { targetCtrl.isInvalidCtrl(); }
};
function CRCenterCodeDDChanged() {
    var target = CRCenterCodeDDChanged.caller.arguments[0].target;
    var tblRow = $(target.closest('.add-row'));
    var tblRowid = tblRow.attr('id');
    var targetCtrl = $(target);
    CRCenterCodeDDChangedReUsable(targetCtrl, tblRowid,'CR');
    EnableAddBtnInCloneRow(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function OECenterCodeDDChanged() {
    var target = OECenterCodeDDChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    var tblRowid = targetCtrl.attr('id').split('_')[1];
    CRCenterCodeDDChangedReUsable(targetCtrl, tblRowid,'OE');
    EnableSubmitBtn();
};
function CRCenterCodeMultiChangedReUsable(targetCtrl, tblRowid,mTag) {
    var Ctrl1 = $('#' + mTag+'CenterCodeDD');
    if (tblRowid > 0) { Ctrl1 = $('#' + mTag+'CenterCodeDD_' + tblRowid);}
    if (targetCtrl.val() != '') {
        targetCtrl.isValid();
        Ctrl1.isValid(); $('#backbtnactive').val(1);
    } else { targetCtrl.isInvalid(); }
};
function CRCenterCodeMultiChanged() {
    var target = CRCenterCodeMultiChanged.caller.arguments[0].target;
    var tblRow = $(target.closest('.add-row'));
    var tblRowid = tblRow.attr('id');
    var targetCtrl = $(target);
    CRCenterCodeMultiChangedReUsable(targetCtrl, tblRowid,'CR');
    EnableAddBtnInCloneRow(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function OECenterCodeMultiChanged() {
    var target = OECenterCodeMultiChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    var tblRowid = targetCtrl.attr('id').split('_')[1];
    CRCenterCodeMultiChangedReUsable(targetCtrl, tblRowid,'OE');
    EnableSubmitBtn();
};
function ToDateChanged() {
    var target = ToDateChanged.caller.arguments[0].target;
    var tblRow = $(target.closest('.add-row'));
    var tblRowid = tblRow.attr('id');
    var targetCtrl = $(target);
    var tcatCtrl = $('#CRTourCategory');
    if (tblRowid > 0) {
        tcatCtrl = $('#CRTourCategory_' + tblRowid);
    }
    if (targetCtrl.val() != '') {
        targetCtrl.isValidCtrl();
        $('#backbtnactive').val(1);
        //alert(tcatCtrl.attr('id'));
        UnLockSLUCtrl(tcatCtrl);
        //var lbltodtCtrl = $('#lblToDate');
        //var crtodtCtrl = $('#CRTodate');
        //if (tblRowid > 0) {
        //    lbltodtCtrl = $('#lblToDate_' + tblRowid);
        //    crtodtCtrl = $('#CRTodate_' + tblRowid);
        //}
        //crtodtCtrl.html(lbltodtCtrl.val());
    } else {
        targetCtrl.isInvalidCtrl();
        LockSLUCtrl(tcatCtrl);
    }
    //EnableAddBtnInCloneRow(tblRow, 'AddBtn');
    //EnableSubmitBtn(); 
};
function CRBranchCodeMultiChanged() {
    var target = CRBranchCodeMultiChanged.caller.arguments[0].target;
    var tblRow = $(target.closest('.add-row'));
    var tblRowid = tblRow.attr('id');
    var targetCtrl = $(target);
    if (targetCtrl.val() != '') {
        targetCtrl.isValid();
    } else { targetCtrl.isInvalid(); }
    EnableAddBtnInCloneRow(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function OEBranchCodeMultiChanged() {
    var target = OEBranchCodeMultiChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    if (targetCtrl.val() != '') {
        targetCtrl.isValid();
    } else { targetCtrl.isInvalid(); }
    EnableSubmitBtn();
};
function toggleCentreDiv(divID, rowID, divText, mTag) {
    var ccTextCtrl = $('#' + mTag+'CenterCodeText');
    var ccMulCtrl = $('#' + mTag+'COMultiDiv');
    var ccDDCtrl = $('#' + mTag+'CODDDiv');
    var mCTRL = $('#' + divID);
    var Ctrl1 = $('#' + mTag + 'CenterCodeMulti');
    var Ctrl2 = $('#' + mTag + 'CenterCodeDD');
    if (rowID > 0) {
        ccTextCtrl = $('#' + mTag+'CenterCodeText_' + rowID);
        ccMulCtrl = $('#' + mTag+'COMultiDiv_' + rowID);
        ccDDCtrl = $('#' + mTag+'CODDDiv_' + rowID);
        mCTRL = $('#' + divID + '_' + rowID);
        Ctrl1 = $('#' + mTag + 'CenterCodeMulti_' + rowID);
        Ctrl2 = $('#' + mTag + 'CenterCodeDD_' + rowID);
    }
    //alert(divID + ' - ' + rowID+' - ' +mCTRL.attr('id'));
    ccTextCtrl.addClass('inVisible');
    ccMulCtrl.addClass('inVisible');
    ccDDCtrl.addClass('inVisible');
    mCTRL.removeClass('inVisible');
    ccTextCtrl.html(divText);
    if (divID == 'OECOMultiDiv' || divID == 'CRCOMultiDiv') {
        Ctrl1.isInvalid();
    } else { Ctrl1.isValid(); }
    if (divID == 'OECODDDiv' || divID == 'CRCODDDiv') {
        Ctrl2.isInvalid();
    } else { Ctrl2.isValid(); }
};
function toggleBranchDiv(divID, rowID, divText, mTag) {
    var ccTextCtrl = $('#' + mTag+'BranchCodeText');
    var ccMulCtrl = $('#' + mTag+'BRMultiDiv');
    var Ctrl1 = $('#' + mTag+'BranchCodeMulti');
    var mCTRL = $('#' + divID);
    if (rowID > 0) {
        ccTextCtrl = $('#' + mTag+'BranchCodeText_' + rowID);
        ccMulCtrl = $('#' + mTag+'BRMultiDiv_' + rowID);
        Ctrl1 = $('#' + mTag+'BranchCodeMulti_' + rowID);
        mCTRL = $('#' + divID + '_' + rowID);
    }
    ccTextCtrl.addClass('inVisible');
    ccMulCtrl.addClass('inVisible');
    mCTRL.removeClass('inVisible');
    ccTextCtrl.html(divText);
    if (divID == mTag+'BRMultiDiv') { Ctrl1.isInvalid(); } else { Ctrl1.isValid(); }
};
function EnableSubmitBtn() {
    var btnSubmit = $('#btnSubmit');
    var isenable = false;
    var editTag = $('#EditTag').val();
    Option1Visible();
    if (editTag == 1) {
        $('.mTCValidation').each(function () {
            if ($(this).html() == 1) { isenable = true;}
        });
    }
    else if (editTag == 2) {
        var x = 0;
        $('.mEditStatTag').each(function () {
            if ($(this).html() == 1) { x = 1; }
        });
        if (x==1 && getDivInvalidCount('other_edit') <= 0) { isenable = true;}
    } else if (editTag == 3) {
        if (getDivInvalidCount('tour_extension') <= 0) { isenable = true; }
    }
    if (isenable) {
        if (getDivInvalidCount('mHdrDiv') > 0) { isenable = false; }
        if (getDivInvalidCount('mOptionDiv') > 0) { isenable = false; }
    }
    if (isenable) { btnSubmit.makeSLUEnable(); } else { btnSubmit.makeSLUDisable();}
};
function RemoveBtnClicked() {
    var tblRow = RemoveBtnClicked.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    var lastRow = $('#tblTourExtension tr:last');
    UnLockRow(lastRow.attr('id'));
    EnableSubmitBtn();
};
function addCloneBtnClick() {
    var insrow = addCloneBtnClick.caller.arguments[0].target.closest('.add-row');
    var lasttodate = $(insrow).find('.datelabel').html();
    var maxDate = $('#MaxExtensionDate').val();
    var addbtn = $('#AddBtn');
    var insrowid = $(insrow).attr('id');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    //alert(maxDate + ' - ' + lasttodate);
    if (maxDate != lasttodate) {
        var clonerowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, true, false);
        var preToDate = $(insrow).find('.todt').val();
        var curFromDate = CustomDateChange(preToDate, 1, '/');
        $('#FromDateLbl_' + clonerowid).html(curFromDate);
        var toDTCtrl = $('#ToDate_' + clonerowid);
        toDTCtrl.val('');
        toDTCtrl.isInvalidCtrl();
        toDTCtrl.attr('min', ChangeDateFormatV2(curFromDate));
        $('#lblToDate_' + clonerowid).html('Select Date');
        $('#CRTourCategory_' + clonerowid).isInvalidCtrl();
        $('#CRCenterCodeMulti_' + clonerowid).isInvalidCtrl();
        $('#CRCenterCodeDD_' + clonerowid).isInvalidCtrl();
        $('#CRBranchCodeMulti_' + clonerowid).isInvalidCtrl();
        addbtn.makeDisable(); addbtn.addClass('nodrop');
        var maxSourceid = ($('#MaxSourceID').val() * 1) + clonerowid;
        $('#SourceIDDiv_' + clonerowid).html(maxSourceid);
        $('#CREditTagDiv_' + clonerowid).html(1);
        LockRow(insrowid);
        LockRow(clonerowid);
        UnLockSLUCtrl(toDTCtrl);
        //$('#CRTodate_' + clonerowid).html('-');
        EnableSubmitBtn();
    }
    else {
        addbtn.makeDisable(); addbtn.addClass('nodrop');
        MyAlert(4, 'Tour Extension Can Not Allowed For More Than 10 Days');
    }    
};
function btnSubmitClicked() {
    var editTag = $('#EditTag').val();
    var editPurpose = $('#PurposeOfEdit').val();
    var notenumber = $('#NoteNumber').val();
    var tblRecords = '';
    if (editTag == 1) {
        tblRecords = getRecordsFromTableV2('tblTourCancel');
    }
    else if (editTag == 2) {
        tblRecords = getRecordsFromTableV2('tblOtherEdit');
    }
    else if (editTag == 3) {
        tblRecords = getRecordsFromTableV2('tblTourExtension');
    }
    var x = '{"NoteNumber":"' + notenumber
        + '","EditTag":"' + editTag
        + '","ReasonForEdit":"' + editPurpose
        + '","DWTDetails":'
        + tblRecords + '}';
    //alert(tblRecords);
    $.ajax({
        method: 'POST',
        url: '/ETSEdit/SetDWTForTourEdit',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    MyAlertWithRedirection(1, 'Data Saved Successfully.', '/Security/ETSEdit/Create');
                    //Swal.fire({
                    //    title: 'Confirmation',
                    //    text: 'Data Saved Successfully.',
                    //    icon: 'success',
                    //    customClass: 'swal-wide',
                    //    buttons: {
                    //        confirm: 'Ok'
                    //    },
                    //    confirmButtonColor: '#2527a2',
                    //}).then(callback);
                    //function callback(result) {
                    //    if (result.value) {
                    //        var url = "/Security/ETSEdit/Create";
                    //        window.location.href = url;
                    //    }
                    //}                    
                }
                else {
                    MyAlert(3, 'Failed To Save Date Wise Tour Details.');
                    //Swal.fire({
                    //    title: 'Confirmation',
                    //    text: 'Failed To Save Date Wise Tour Details.',
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
$(document).ready(function () {
    $('#btnBack').click(function () {
        var backbtnactive = $('#backbtnactive').val();
        var backurl = "/Security/ETSEdit/Create";
        if (backbtnactive == 1) {
            MyAlertWithRedirection(2, "Are You Sure Want To Go Back?", backurl);
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
});