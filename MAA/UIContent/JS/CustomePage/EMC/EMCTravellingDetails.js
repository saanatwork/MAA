$(function () {
    $("#PublicTransport").change(function () {
        var PublicTransport = $('option:selected', this).val();
        var PersonType = $("#PersonType").val();
        MakevalueReset();
        PublicTransportchange(PublicTransport, PersonType, 0);
        GetTourCategory(PublicTransport);

    });
});
function PublicTransportchange(PublicTransport, PersonType, vehicleType) {
    var VehicleType = $('#VehicleType');
    if (PublicTransport * 1 == 0) {
        $('.forYes').hide();
        $('.forNo').show();
        $("#VehicleType").removeClass('is-valid').addClass('is-invalid');
        $("#ReasonVehicleReq").removeClass('is-valid').addClass('is-invalid');
        getDropDownDataWithSelectedValue(VehicleType.attr('id'), 'Select Type', '/EMC/GetVehicleTypes?TypeVal=' + PersonType, vehicleType);
    } else {
        $('.forYes').show();
        $('.forNo').hide();
        $("#VehicleType").val('');
        $("#ReasonVehicleReq").val('');
        $("#VehicleType").removeClass('is-invalid').addClass('is-valid');
        $("#ReasonVehicleReq").removeClass('is-invalid').addClass('is-valid');
    }


};
async function GetTourCategory(PublicTransport) {
    (async function () {
        const r1 = await getMultiselectData('TourCategory', '/EMC/GetTourCategories?PTval=' + PublicTransport);
    })();


};
function MakevalueReset() {
    $("#SchFromDate").val('').isInvalid();
    $("#SchFromTime").val('').isInvalid();
    $("#SchTourToDate").val('').isInvalid();
    $('#lblSchFromDate').html('Select Date');
    $('#lblSchTourToDate').html('Select Date');
    $("#SchTourToDate,#SchToDate").makeDisable();
    $("#PurposeOfVisit").val('').isInvalid();

    $('#tbody2').empty();
    $('#DDSchFromDate').html('');
    $('#SchToDate').val('');
    $('#SchToDate').isInvalid();
    $('#lblSchToDate').html('Select Date');
    ClearallDropdownData(0);
};
function fireSweetAlert(evt) {
    if (evt == "1") {
        Swal.fire({
            title: 'Information Message',
            text: "Employee Vehicle Selection Is Beyond The Eligiblity. Are You Sure To Proceed ?",
            icon: 'info',
            customClass: 'swal-wide my-info',
            cancelButtonClass: 'btn-cancel',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#2527a2',
            showCancelButton: true,

        })
    }
}
$(document).ready(function () {
    $('.forYes').hide();
    $('.forNo').hide();
    $('#SchTourToDate').makeDisable();
    $('#SchToDate').makeDisable();
    var IsEPTour = $('#IsEPTour').val();

    if (IsEPTour == 1) {
        PublicTransportchange("1", 0, 0);
        $("#PublicTransport").val("1").clearValidateClass();
        $("#PublicTransport").makeDisable();
        GetTourCategory("2");
    }

    var dateDetails = $('#dateDetails');
    var btnSubmit = $('#btnSubmit').val();
    if (btnSubmit * 1 == 0) {
        LockSection(dateDetails.attr('id'));
    }


});
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var tblRow = target.closest('.add-row');
    var isvalid = validatectrl(targetid, $(target).val(), $(tblRow).attr('id'));
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    //if (targetid == 'VehicleType') {
    //    fireSweetAlert($(target).val());
    //}

    if (targetid == "SchFromDate") { Datechange($(target).val()); $('#SchFromTime').makeEnabled(); $('#SchFromTime').val('').isInvalid(); }
    if (targetid == "SchTourToDate") { SetDatechange($(target).val()); } else {
        //$('#SchToDate').val('');
        //$('#SchToDate').isInvalid()
        //$('#SchToDate').makeDisable();
        //$('#lblSchToDate').html('Select Date');

    }

    //$('#SchToDate').val('');
    //$('#SchToDate').isInvalid();

    if (targetid != "ReasonVehicleReq" && targetid != "PurposeOfVisit") {
        $("#tbody2").empty();
        ClearallDropdownData(0);
    }

  


    EnableSubmitBtn();

};
function ValidateCloneRowCtrl() {

    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val(), $(tblRow).attr('id'));
    if (isvalid) { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }
    if (targetid == 'SchToDate') {
        RestRowsDeleted('TourWisetbl', $(tblRow).attr('id'));
        var todate = new Date($('#SchTourToDate').val());
        var preToDate = $(tblRow).find('.todt').val();
       
        var calculatedFromdate;
        if (preToDate != "") {
            calculatedFromdate = new Date(ChangeDateFormat(CustomDateChange(preToDate, 1, '-')));
        }
        if (todate <= calculatedFromdate) {
            $(tblRow).find('.addBtn').makeDisable();
        }
        $(tblRow).find('.btn-default').each(function () {
            $(this).removeClass('nodrop disabled bg-blue');
            $(this).removeAttr('disabled');
        });
    }
    EnableAddBtnInCloneRowIfOnlyLastV2(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function EnableAddBtnInCloneRowIfOnlyLastV2(tblRow, addBtnBaseID) {
    //If The Add Button Is Exist In The Last Row Then Only Enable 
    var mTodate = $('#SchTourToDate').val();
    var tDateCtrl = $('#SchToDate');
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id');
    if (rowid != 0) {
        addBtnBaseID = addBtnBaseID + '_' + rowid;
        tDateCtrl = $('#SchToDate_' + rowid);
    }
    var addBtnctrl = $('#' + addBtnBaseID);
    if (tblrow.is(":last-child")) {
        if (tblrow.find('.is-invalid').length > 0) {
            addBtnctrl.makeDisable();
        } else {
            if (mTodate == tDateCtrl.val()) {
                addBtnctrl.makeDisable();
            } else { addBtnctrl.makeEnabled(); }
        }
    }
    else { addBtnctrl.makeDisable(); }
};
function validatectrl(targetid, value, rowid) {
    var isvalid = false;

    switch (targetid) {
        case "ReasonVehicleReq":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "PublicTransport":
            isvalid = validatectrl_YesNoCombo(value);
            break;

        case "VehicleType":
            isvalid = validatectrl_YesNoCombo(value);
            break;
        case "SchFromDate":
            isvalid = validatectrl_ValidateLength(value);
            $('#SchFromDate').ApplyCustomDateFormat();
            break;
        case "SchFromTime":
            if (CompareDates()) {
                var time = formatAMPM(new Date);
                if (CompareTime(time, value)) {
                    isvalid = true;
                } else {
                    isvalid = false;
                    MyAlert(5,'Please Select Current Time Or Greater Than..!');
                    //AlertMessage();
                }
            } else {
                isvalid = validatectrl_ValidateLength(value);
            }
            break;
        case "SchTourToDate":
            ValidateEmployeeForTour($('#EmplyoyeeNoList').val(), $('#SchFromDate').val(), value);
            isvalid = validatectrl_ValidateLength(value);
            $('#SchTourToDate').ApplyCustomDateFormat();
            break;
        case "dateTour_SchToDate":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "dateTour_BranchCodeName":
            if (value > 0) {
                var insname = $('#dateTour_BranchCodeName option:selected').text();
                $('#dateTour_BranchCodeName').val(insname);

                isvalid = true;
            }
            break;
        case "SchToDate":
            var fromdateCtrl = $('#DDSchFromDate');
            if (rowid > 0) { fromdateCtrl = $('#DDSchFromDate_' + rowid); }
            if (CompareDate(fromdateCtrl.html(), 0, value, 1)) { isvalid = true; }
            else {
                if (value != "") {
                    MyAlert(5, 'To Date Must Be Greater Or Equal To From Date..!');
                }
               
                isvalid = false;
            }
           // $('#SchToDate').ApplyCustomDateFormat();
            break;
        case "TourCategory":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "CenterCodeName":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "BranchCodeName":
            isvalid = validatectrl_ValidateLength(value);
            break;
        case "PurposeOfVisit":

            isvalid = validatectrl_ValidateLength(value);
            break;

    }

    return isvalid;
};

function keypressCountWord(e) {
    var target = keypressCountWord.caller.arguments[0].target;
    var targetCtrl = $(target).val();
    var targetid = $(target).attr('id');
    var count;
    if (targetid == "PurposeOfVisit") { count = 200; } else { count = 50;}
    if (WordCount(targetCtrl) > (count*1)) {
        $(target).preventTypying();
    } else {
        $(target).off('keypress');
    }
}
function CompareDates() {
    var Val = false;
    var dt = new Date;
    var dateFString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    var To = new Date($('#SchFromDate').val());
    var dateTString = (To.getFullYear() + '-'
        + ('0' + (To.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (To.getDate())).slice(-2));
    if (dateFString == dateTString) { Val = true; }
    return Val;
}
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function AlertMessage() {


    Swal.fire({
        title: 'Error',
        text: 'Please Select Current time Or Greater Than!',
        icon: 'question',
        customClass: 'swal-wide',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    });
}
function validatectrl_YesNoCombo(value) {

    if (value * 1 >= 0) {
        return true;
    } else { return false; }
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
function EnableSubmitBtn() {
    var x = getDivInvalidCount('TravDetails');
    var y = getDivInvalidCount('dateDetails');
    var DWTBtn = $('#btnSubmits');
    var mEnable = false;
    var todate = $('#SchTourToDate').val();
    $('.todt').each(function () {
        if ($(this).val() == todate) { mEnable = true; }

    });
    if ((x + y) * 1 <= 0) {
        if (mEnable) { DWTBtn.makeEnabled(); } else { DWTBtn.makeDisable(); }
    } else { DWTBtn.makeDisable(); }
    var dateDetails = $('#dateDetails');
    if (x * 1 <= 0) {
        UnLockSection(dateDetails.attr('id'));
    } else { LockSection(dateDetails.attr('id')); }

};
function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }

    var rowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, false, false);
    var preToDate = $(insrow).find('.todt').val();
    var curFromDate = CustomDateChange(preToDate, 1, '/');
    $('#DDSchFromDate_' + rowid).html(curFromDate);
    var SchTourToDate = $('#SchTourToDate').val();
    $('#SchToDate_' + rowid).attr('max', SchTourToDate);
    $('#SchToDate_' + rowid).attr('min', preToDate);
    $('#SchToDate_' + rowid).val('');
    ClearallDropdownData(rowid);
    $('#btnSubmits').makeDisable();

    $('#TourCategory_' + rowid).isInvalid();
    addbtn.tooltip('hide');
    addbtn.makeDisable();
    //EnableSubmitBtn();

};
function EnableAddBtn(tblRow, addBtnBaseID) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); } else { addBtnctrl.makeEnabled(); }

};
function ClearallDropdownData(rowid) {
    var ccnamectrls = 'CenterCodeName';
    var bnamectrls = 'BranchCodeName';
    var CCNADiv = 'CentcodeNAdiv';
    var BBNADiv = 'BCNAdiv';
    var BCCtrlDiv = 'BCctrldiv';
    var Cctrldiv = 'CenterDiv';
    var dTourCategory = 'TourCategory';
    var SchToDate = 'SchToDate';
    var lblSchToDate = 'lblSchToDate';

    if (rowid > 0) {
        ccnamectrls = 'CenterCodeName_' + rowid;
        bnamectrls = 'BranchCodeName_' + rowid;
        CCNADiv = 'CentcodeNAdiv_' + rowid;
        BBNADiv = 'BCNAdiv_' + rowid;
        BCCtrlDiv = 'BCctrldiv_' + rowid;
        Cctrldiv = 'CenterDiv_' + rowid;
        dTourCategory = 'TourCategory_' + rowid;
        SchToDate = 'SchToDate_' + rowid;
        lblSchToDate = 'lblSchToDate_' + rowid;
    }

    $('#' + BCCtrlDiv).addClass('inVisible');
    $('#' + Cctrldiv).addClass('inVisible');
    $('#' + CCNADiv).removeClass('inVisible');
    $('#' + BBNADiv).removeClass('inVisible');
    $('#' + CCNADiv).html('NA');
    $('#' + BBNADiv).html('NA');

    $('#' + SchToDate).val('').isInvalid();
    $('#' + lblSchToDate).html('');

    $('#' + dTourCategory).multiselect('clearSelection');
    RemoveAllDataFromDropdown(ccnamectrls, bnamectrls);

    $('#' + dTourCategory).isInvalid();
    $('#' + ccnamectrls).isInvalid();
    $('#' + bnamectrls).isInvalid();
    EnableSubmitBtn();
};
function RemoveAllDataFromDropdown(CenterCode, BranchCode) {

    getMultiselectData(CenterCode, '/Security/EMC/GetLocationsFromTypes?TypeIDs=' + 0);
    getDropDownData(CenterCode, 'select Center Code', '/Security/EMC/GetLocationsFromType?TypeID=' + 0);
    getMultiselectData(BranchCode, '/Security/ETS/getBranchType?CenterId=' + 0);

}
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function ValueClears() {
    Datechange(0);
    SetDatechange(0)
    $('#SchFromDate').val('');
    $('#SchFromDate').isInvalid();
    $('#lblSchFromDate').html('Select Date');
    EnableSubmitBtn(0);
};
function Datechange(evt) {
    var CDate = ChangeDateFormat(evt);
    $('.ddSFDate').html(CDate);
    $('#SchTourToDate').makeEnabled();
    $('#SchTourToDate').val('');
    $('#SchTourToDate').isInvalid();
    $('#SchTourToDate').attr('min', evt);
    $('#lblSchTourToDate').html('Select Date');
    GetTourMaxDaysAllow(evt);

};
function SetDatechange(evt) {
    $('#SchToDate').makeEnabled();
    $('#SchToDate').val('').addClass('is-invalid');
    $('#lblSchToDate').html('Select Date');
    var SchFromDate = $('#SchFromDate').val();
    $('#SchToDate').attr('min', SchFromDate);
    $('#SchToDate').attr('max', evt);

};
function GetCenterCode() {
    var target = GetCenterCode.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var targetval = $(target).val();
    var targetCtrl = $(target);
    var rowid = $(target.closest('.add-row')).attr("id");

    var x = '';
    $('#' + targetid + ' option:selected').each(function () {
        x = x + '_' + $(this).val();
    });
    var selectval = '0';
    TourDateWiseDropdownvalue(rowid, targetval, x, selectval);
    toggleGroupv(target, targetid, targetval);

};
function TourDateWiseDropdownvalue(rowid, targetval, x, selectedvalues) {
    var CCnamectrl = 'CenterCodeName';
    var CCCtrldiv = 'CenterDiv';
    var CCNaDiv = 'CentcodeNAdiv';
    var BCnamectrl = 'BranchCodeName';
    var BCCtrlDiv = 'BCctrldiv';
    var BCNaDiv = 'BCNAdiv';
    if (rowid > 0) {
        CCnamectrl = 'CenterCodeName_' + rowid;
        CCCtrldiv = 'CenterDiv_' + rowid;
        CCNaDiv = 'CentcodeNAdiv_' + rowid;
        BCnamectrl = 'BranchCodeName_' + rowid;
        BCCtrlDiv = 'BCctrldiv_' + rowid;
        BCNaDiv = 'BCNAdiv_' + rowid;
    }

    $('#' + CCnamectrl).isValid();
    $('#' + BCnamectrl).isValid();

    $('#' + CCCtrldiv).addClass('inVisible');
    $('#' + BCCtrlDiv).addClass('inVisible');
    $('#' + CCNaDiv).html('').addClass('inVisible');
    $('#' + BCNaDiv).html('').addClass('inVisible');
    if (targetval == "4") {
        $('#' + CCCtrldiv).removeClass('inVisible');
        $('#' + BCCtrlDiv).removeClass('inVisible');
        $('#' + CCnamectrl).removeAttr('multiple');
        $('#' + CCnamectrl).multiselect('destroy');
        $('#' + CCnamectrl).isInvalid();
        $('#' + BCnamectrl).isInvalid();
        getDropDownDataWithSelectedValue(CCnamectrl, 'Select Center Code', '/Security/EMC/GetLocationsFromType?TypeID=' + 4, selectedvalues);
    } else if (targetval == "5") {
        $('#' + CCNaDiv).removeClass('inVisible').html('NA');
        $('#' + BCNaDiv).removeClass('inVisible').html('NA');
    } else if (targetval == "3" || targetval == "2" || targetval == "1" || targetval == "1,3" || targetval == "2,3" || targetval == "3,5") {
        $('#' + CCCtrldiv).removeClass('inVisible');
        $('#' + BCNaDiv).removeClass('inVisible').html('NA');
        $('#' + CCnamectrl).isInvalid();
        getMultiselectDataWithSelectedValues(CCnamectrl, '/Security/EMC/GetLocationsFromTypes?TypeIDs=' + x, selectedvalues);

    } else if (targetval == "6") {

        $('#' + CCCtrldiv).removeClass('inVisible');
        $('#' + BCNaDiv).removeClass('inVisible').html('NA');
        $('#' + CCnamectrl).removeAttr('multiple');
        $('#' + CCnamectrl).multiselect('destroy');
        $('#' + CCnamectrl).isInvalid();
        getDropDownDataWithSelectedValue(CCnamectrl, 'Select Center Code', '/Security/EMC/GetLocationsFromType?TypeID=' + 6, selectedvalues);
    }
    else {
        $('#' + CCNaDiv).removeClass('inVisible').html('NA');
        $('#' + BCNaDiv).removeClass('inVisible').html('NA');
    }

}
function BranchChanges() {
    var target = BranchChanges.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var targetval = $(target).val();
    var rowid = $(target.closest('.add-row')).attr("id");
    var bbnamectrl = 'BranchCodeName';
    var Tournamectrl = 'TourCategory';
    if (rowid > 0) {
        Tournamectrl = 'TourCategory_' + rowid;
        bbnamectrl = 'BranchCodeName_' + rowid;
    }
    var TourVal = $('#' + Tournamectrl).val();
    GetBranchData(rowid, targetval, TourVal, '0');

};
function GetBranchData(rowid, targetval, Tourval, Selectedvalue) {
    var PubT = $("#PublicTransport").val();
    var bbnamectrl = 'BranchCodeName';
    var Tournamectrl = 'TourCategory';
    if (rowid > 0) {
        Tournamectrl = 'TourCategory_' + rowid;
        bbnamectrl = 'BranchCodeName_' + rowid;
    }

    if (Tourval == "4") {

        $('#' + bbnamectrl).isInvalid();
        getMultiselectDataWithSelectedValues(bbnamectrl, '/Security/EMC/getBranchType?CenterId=' + targetval + '&PT=' + PubT, Selectedvalue);

    }


}
function SaveDataClicked() {
    var PersonType = $('#PersonType').val();
    var NoteNumber = $('#NoteNumber').val();
    var AttachFile = $('#AttachFile').val();
    var TravD = getRecordsFromTableV2('TravdtlTbl');
    var Tourwise = getRecordsFromTableV2('TourWisetbl');
    var x = '{"PersonType":"' + PersonType + '","NoteNumber":"' + NoteNumber + '","AttachFile":"' + AttachFile + '","TravellingDetails":' + TravD + ',"dateTour":' + Tourwise + '}';

    $.ajax({
        method: 'POST',
        url: '/EMC/SetTravNTourDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                var url = "/Security/EMC/Create";
                if (item.bResponseBool == true) {
                    MyAlertWithRedirection(1, 'Travelling & Date Wise Tour Details Saved Successfully.', url)
                }
                else {
                    MyAlert(4, 'Failed To Update Traveling Person Details.')
                }
            });
        },
    });

};
function toggleGroupv(target, multictrlId, value) {
    var idsval = "";
    var rowid = $(target.closest('.add-row')).attr("id");
    var ccnamectrl = 'CenterCodeName';
    var BBnamectrl = 'BranchCodeName';
    var ccnamectrl1 = $('#CenterCodeName');
    var BBnamectrl1 = $('#BranchCodeName');
    if (rowid > 0) {
        ccnamectrl = 'CenterCodeName_' + rowid;
        BBnamectrl = 'BranchCodeName_' + rowid;
        ccnamectrl1 = ('#CenterCodeName_' + rowid);
        BBnamectrl1 = $('#BranchCodeName_' + rowid);
    }
    if (value == "1,4") {
        MyAlert(5, 'This selection not allowed, Please change selected values.');
        $('#' + multictrlId).multiselect('clearSelection');
        RemoveAllDataFromDropdown(ccnamectrl, BBnamectrl);
        ccnamectrl1.isInvalid();
        BBnamectrl1.isInvalid();
    }
};
function Buttonclear() {
    $('.clear').val('');
    $('.clearNoVal').val('');
    $('.clear').isInvalid();
    $('.cleardate').html('Select Date');
    $("#tbody2").empty();
    ClearallDropdownData('');
}
$(document).ready(function () {

    (async function () {
        const r1 = await getInitialData();
    })();

});
async function getInitialData() {
    var rowid = 0;
    var NoteNumber = $('#NoteNumber');
    var AttachFile = $('#AttachFile');
    var CenterCodenName = $('#CenterCodenName');
    var PublicTransport = $('#PublicTransport');
    var PersonType = $('#PersonType');
    var VehicleType = $('#VehicleType');
    var SchFromDate = $('#SchFromDate');
    var SchFromTime = $('#SchFromTime');
    var SchTourToDate = $('#SchTourToDate');
    var PurposeOfVisit = $('#PurposeOfVisit');
    var ReasonVehicleReq = $('#ReasonVehicleReq');
    //For Tour Wise Date
    var DDSchFromDate = $('#DDSchFromDate');
    var SchToDate = $('#SchToDate');
    var TourCategory = $('#TourCategory');
    var CenterCodeName = $('#CenterCodeName');
    var CCNAdiv = $('#CentcodeNAdiv');
    var BranchCodeName = $('#BranchCodeName');
    var BCNAdiv = $('#BCNAdiv');
    var BCctrldiv = $('#BCctrldiv');
    var lblSchToDate = $('#lblSchToDate');
    var addbtnCtrl = $('#AddBtn');
    var IsEPTour = $('#IsEPTour').val();
    $.ajax({
        url: '/EMC/GetTraveelingDetailsReverseData',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {

                if (item.btnSubmit == 1) {
                    var PT = item.travDetails.PublicTransports == true ? 1 : 0;
                    NoteNumber.val(item.NoteNumber);
                    AttachFile.val(item.AttachFile);
                    CenterCodenName.val(item.CenterCodenName);
                    PersonType.val(item.PersonType);
                    //$(item.TravellingDetails).each(function (index, travitem) {

                    PublicTransport.val(PT).isValid();
                    PublicTransportchange(PT, item.PersonType, item.travDetails.VehicleType);
                    VehicleType.isValid();
                    ReasonVehicleReq.html(item.travDetails.ReasonVehicleReq).isValid();
                    SchFromDate.val(item.travDetails.SchFromDateStr).isValid();
                    $('#lblSchFromDate').html(item.travDetails.SchFromDateDisplay);
                    Datechange(item.travDetails.SchFromDateStr);
                    SchFromTime.val(item.travDetails.SchFromTime).isValid();
                    SchTourToDate.val(item.travDetails.SchTourToDateStr).isValid();
                    $('#lblSchTourToDate').html(item.travDetails.SchTourToDateDisplay);
                    SetDatechange(item.travDetails.SchTourToDateStr);
                    PurposeOfVisit.val(item.travDetails.PurposeOfVisit).isValid();
                    $(item.dateTour).each(function (indexs, travitem) {

                        if (indexs > 0) {
                            rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, true, false);
                            DDSchFromDate = $('#DDSchFromDate_' + rowid);
                            SchToDate = $('#SchToDate_' + rowid);
                            lblSchToDate = $('#lblSchToDate_' + rowid);
                            TourCategory = $('#TourCategory_' + rowid);
                            CenterCodeName = $('#CenterCodeName_' + rowid);
                            CCNAdiv = $('#CCNAdiv_' + rowid);
                            BranchCodeName = $('#BranchCodeName_' + rowid);
                            BCNAdiv = $('#BCNAdiv_' + rowid);
                            BCctrldiv = $('#BCctrldiv_' + rowid);
                            addbtnCtrl = $('#AddBtn_' + rowid);
                        }

                        DDSchFromDate.html(travitem.DDSchFromDate).isValid();
                        SchToDate.val(travitem.SchToDatestr).isValid();
                        lblSchToDate.html(travitem.DDSchToDate);
                        if (IsEPTour == 1) {
                            getMultiselectDataWithSelectedValues(TourCategory.attr('id'), '/EMC/GetTourCategories?PTval=' + 2, travitem.TourCategoryId);
                        } else {
                            getMultiselectDataWithSelectedValues(TourCategory.attr('id'), '/EMC/GetTourCategories?PTval=' + PT, travitem.TourCategoryId);
                        }

                        TourCategory.isValid();
                        TourDateWiseDropdownvalue(rowid, travitem.TourCategoryId, travitem.TourCategoryId, travitem.CenterCode);
                        CenterCodeName.isValid();
                        if (travitem.TourCategoryId == "4") {
                            GetBranchData(rowid, travitem.CenterCode, travitem.TourCategoryId, travitem.BranchCode);
                            BranchCodeName.isValid();
                        }
                        addbtnCtrl.makeDisable();
                    });
                }

            });
        }
    });
};
function GetTourMaxDaysAllow(Fromdate) {
    $.ajax({
        url: '/ETS/GetTourMaxDaysAllow',
        method: 'GET',
        data: { FromDate: Fromdate },
        dataType: 'json',
        success: function (data) {
            $('#SchTourToDate').attr('max', data);
        }
    });
}