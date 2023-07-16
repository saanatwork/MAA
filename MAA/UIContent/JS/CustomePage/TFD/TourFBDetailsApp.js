$(document).ready(function () {
    (async function () {
        const r4 = await getInitialData();
    })();
});

async function getInitialData() {
    $("#tbody2").empty();
    var rowid = 0;
    var TourCategory = $('#TourCategory');
    var CenterCodeName = $('#CenterCodeName');
    var TourFeedBack = $('#TourFeedBack');
    var ActionTakens = $('#ActionTakens');
    var ConcernDeptCode = $('#ConcernDeptCode');
    var IDs = $('#IDs');
    var NoteNumberid = $('#NoteNumberid');
    
    var NoteNumber = $('#NoteNumber').val();
    $.ajax({
        url: '/TFD/GetFbDetails?NoteNumber=' + NoteNumber,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {

                if (index > 0) {
                    rowid = CloneRowReturningID('tbody1', 'tbody2', index - 1, true, false);
                        TourCategory = $('#TourCategory_' + rowid);
                        CenterCodeName = $('#CenterCodeName_' + rowid);
                        TourFeedBack = $('#TourFeedBack_' + rowid);
                        ActionTakens = $('#ActionTakens_' + rowid);
                        ConcernDeptCode = $('#ConcernDeptCode_' + rowid);
                        IDs = $('#IDs_' + rowid);
                        NoteNumberid = $('#NoteNumberid_' + rowid);
                      
                    }
                    TourCategory.html(item.TourCategoryText);
                    CenterCodeName.html(item.CenterCodeNametxt);
                    TourFeedBack.html(item.TourFeedBack);
                    if (item.ActionTakens == true) {
                        ActionTakens.html("Yes");
                } else { ActionTakens.html("No"); }
              
                 GetConDept(ConcernDeptCode.attr('id'), item.NoteNumber, item.ConcernDeptCode);
                if (item.ConcernDeptCode >0) {
                    ConcernDeptCode.isValid();
                    $('#CIGI').makeEnabled();
                    $('.content ').removeClass('border-red').addClass('border-green')
                    $('#CIGI').val('1').isValid();

                }
               
                IDs.html(item.ID);
                NoteNumberid.html(item.NoteNumber);
            });
        }
    });
};
async function GetConDept(ConcernDeptCode,NoteNumber, selectedval) {
    (async function () {
        const r5 = await getDropDownDataWithSelectedValue(ConcernDeptCode, 'select', '/Security/TFD/GetENTConcernDeptList?Notenumber='+ NoteNumber,selectedval );
    })();
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
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val(), $(tblRow).attr('id'));
    if (isvalid) { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }
    $('#CIGI').makeEnabled();
    EnableSubmitBtn();
};
function validatectrl(targetid, value, rowid) {
    var isvalid = false;

    switch (targetid) {
        case "CIGI":
            isvalid = validatectrl_YesNoCombo(value);
            if (isvalid) {
                $('.content ').removeClass('border-red').addClass('border-green');
            } else {
                $('.content ').removeClass('border-green').addClass('border-red');
            }
            break;
        case "ConcernDeptCode":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
    }

    return isvalid;
};
function validatectrl_YesNoCombo(value) {

    if (value * 1 > 0) {
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
    var TravD = getRecordsFromTableV2('TravdtlTbl');
    var x = '{"NoteNumber":"' + NoteNumber + '","tfdfApprovalbdetails":' + TravD + '}';
   // alert(x);
    $.ajax({
        method: 'POST',
        url: '/TFD/SetApprovalFBDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Tour FeedBack Details Saved Successfully.',
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
                            var url = "/Security/TFD/ApprovalCreate?NoteNumber=" + NoteNumber;
                            window.location.href = url;
                        }
                    }
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed To Update FeedBack Details.',
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