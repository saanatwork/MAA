function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    var rowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, true, false);
    ClearRowvalues(rowid);
    addbtn.makeDisable();
    EnableSubmitBtn();
};
function ClearRowvalues(rowid) {
    debugger;
    $('#TourCategory_' + rowid).val('').isInvalid();
    $('#CenterCodeName_' + rowid).val('').isInvalid();
    $('#TourFeedBack_' + rowid).val('').isInvalid();
    $('#ActionTaken_' + rowid).val('').isInvalid();

};
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
$(document).ready(function () {
    GetTourCategory();
    (async function () {
        const r4 = await getInitialData();
    })();
});
async function GetTourCategory() {
    var RefNoteNumber=$('#RefNoteNumber').val();
    (async function () {
        const r1 = await getMultiselectData('TourCategory', '/TFD/GetTourCategories?NoteNumber=' + RefNoteNumber);
    })();
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
  //  toggleGroupv(target, targetid, targetval);

};
function TourDateWiseDropdownvalue(rowid, targetval, x, selectedvalues) {
    var CCnamectrl = 'CenterCodeName';
    var CCCtrldiv = 'CenterDiv';
    var CCNaDiv = 'CentcodeNAdiv';
    if (rowid > 0) {
        CCnamectrl = 'CenterCodeName_' + rowid;
        CCCtrldiv = 'CenterDiv_' + rowid;
        CCNaDiv = 'CentcodeNAdiv_' + rowid;
        
    }

    var RefNoteNumber = $('#RefNoteNumber').val();
    $('#' + CCNaDiv).html('').addClass('inVisible');
    getMultiselectDataWithSelectedValues(CCnamectrl, '/Security/TFD/GetLocationsFromTypes?TypeIDs=' + x + '&NoteNumber=' + RefNoteNumber, selectedvalues);
     
}
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val(), $(tblRow).attr('id'));
    if (isvalid) { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }
    EnableAddBtn(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function EnableAddBtn(tblRow, addBtnBaseID) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
   if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); } else { addBtnctrl.makeEnabled(); }

};
function validatectrl(targetid, value, rowid) {
    var isvalid = false;
    switch (targetid) {
        case "ActionTaken":
            isvalid = validatectrl_YesNoCombo(value);
            break;
        case "TourCategory":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "CenterCodeName":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "TourFeedBack":
            isvalid = validatectrl_ValidateLength(value);
            if (value.length > 1 && WordCount(value) <= 100) {
                isvalid = true;
            }else {

                targetid.preventTypying();
            }
            break;

    }

    return isvalid;
};
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
    var x = getDivInvalidCount('FeedBackDetails');
    var DWTBtn = $('#btnSubmits');
    if (x * 1 <= 0) {
        DWTBtn.makeEnabled();
    } else { DWTBtn.makeDisable(); }
};
function SaveDataClicked() {
    var NoteNumber = $('#NoteNumber').val();
    var RefNoteNumber = $('#RefNoteNumber').val();
    var tblFeedBack = getRecordsFromTableV2('tblFeedBack');
    var x = '{"NoteNumber":"' + NoteNumber + '","RefNoteNumber":"' + RefNoteNumber + '","tfdfbdetails":' + tblFeedBack + '}';
    $.ajax({
        method: 'POST',
        url: '/TFD/SetTourFeedBackDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Tour Feedback Details Saved Successfully.',
                        setTimeout: 5000,
                        icon: 'success',
                        customClass: 'swal-wide',
                        buttons: {
                            confirm: 'Ok'
                        },
                        confirmButtonColor: '#2527a2',
                    }).then(callback);
                    function callback(result) {
                        if (result.value) {
                            var url = "/Security/TFD/Create";
                            window.location.href = url;
                        }
                    }
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed To Update Traveling Person Details.',
                        icon: 'question',
                        customClass: 'swal-wide',
                        buttons: {
                            confirm: 'Ok'
                        },
                        confirmButtonColor: '#2527a2',
                    });
                }
            });
        },
    });

};
async function getInitialData() {
    var rowid = 0;
    var NoteNumber = $('#NoteNumber');
    var RefNoteNumber = $('#RefNoteNumber');
    var TourCategory = $('#TourCategory');
    var CenterCodeName = $('#CenterCodeName');
    var TourFeedBack = $('#TourFeedBack');
    var ActionTaken = $('#ActionTaken');
    var addbtnCtrl = $('#AddBtn');
    $.ajax({
        url: '/TFD/GetFDReverseData',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {

                if (item.submitcount == 1) {
                   
                    NoteNumber.val(item.NoteNumber);
                    RefNoteNumber.val(item.RefNoteNumber);
                    $(item.tfdfbdetails).each(function (indexs, travitem) {

                        if (indexs > 0) {
                            rowid = CloneRowReturningID('tbody1', 'tbody2', indexs - 1, true, false);
                            TourCategory = $('#TourCategory_' + rowid);
                            CenterCodeName = $('#CenterCodeName_' + rowid);
                            TourFeedBack = $('#TourFeedBack_' + rowid);
                            ActionTaken = $('#ActionTaken_' + rowid);
             
                        }

                        getMultiselectDataWithSelectedValues(TourCategory.attr('id'), '/TFD/GetTourCategories?NoteNumber=' + item.RefNoteNumber, travitem.TourCategory);
                        TourCategory.isValid();
                        TourDateWiseDropdownvalue(rowid, travitem.TourCategory, travitem.TourCategory, travitem.CenterCodeName);
                        CenterCodeName.isValid();
                        TourFeedBack.val(travitem.TourFeedBack);
                        TourFeedBack.isValid();
                        var PT = travitem.ActionTakens == true ? 1 : 0;
                        ActionTaken.val(PT);
                        ActionTaken.isValid();
                        addbtnCtrl.makeDisable();
                    });
                }

            });
        }
    });
};

function keypressCountWord(e) {
    var target = keypressCountWord.caller.arguments[0].target;
    var targetCtrl = $(target).val();
    if (WordCount(targetCtrl) > 100) {
        $(target).preventTypying();
    } else {
        $(target).off('keypress');
    }
}