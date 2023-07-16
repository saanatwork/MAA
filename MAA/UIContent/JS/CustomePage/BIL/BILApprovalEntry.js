function AddClonebtn() {
    var insrow = AddClonebtn.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    var checklist = $('#CheckList');
    var EmployeeCodes = $('#EmployeeCodes');
    var RefNoteNumbers = $('#RefNoteNumbers');
    var CenterCodeName = $('#CenterCodeName');
    var PersonTypetxt = $('#PersonTypetxt');
    var EmployeeCodeName = $('#EmployeeCodeName');
    var DesigCodeName = $('#DesigCodeName');
    var TourFromDate = $('#TourFromDate');
    var TourToDate = $('#TourToDate');
    var NoOfDays = $('#NoOfDays');
    var PurposeOfVisit = $('#PurposeOfVisit');
    EnableAddBtnInCloneRowIfOnlyLastV2(insrow, 'AddBtn');
    var rowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, true, false);
    if (rowid > 0) {
        addbtn = $('#AddBtn_' + rowid);
        checklist = $('#CheckList_' + rowid);
        EmployeeCodes = $('#EmployeeCodes_' + rowid);
        RefNoteNumbers = $('#RefNoteNumbers_' + rowid);
        CenterCodeName = $('#CenterCodeName_' + rowid);
        PersonTypetxt = $('#PersonTypetxt_' + rowid);
        EmployeeCodeName = $('#EmployeeCodeName_' + rowid);
        DesigCodeName = $('#DesigCodeName_' + rowid);
        TourFromDate = $('#TourFromDate_' + rowid);
        TourToDate = $('#TourToDate_' + rowid);
        NoOfDays = $('#NoOfDays_' + rowid);
        PurposeOfVisit = $('#PurposeOfVisit_' + rowid);
    }
    EmployeeCodes.html('');
    RefNoteNumbers.html('');
    CenterCodeName.html('');
    PersonTypetxt.html('');
    EmployeeCodeName.html('');
    DesigCodeName.html('');
    TourFromDate.html('');
    TourToDate.html('');
    NoOfDays.html('');
    PurposeOfVisit.html('');


    checklist.prop('checked', false);
    checklist.removeClass('selected-row');
    $('.CheckList').prop('checked', false);
    $('#ExpensesDetailsDiv').addClass('inVisible');
    addbtn.makeDisable();
    checklist.makeDisable();
    $('#BtnSubmit').makeDisable();
    $('#Checked').val('-1').isInvalid();
    $('#Checked').makeDisable();
    $('.content').removeClass('border-green').addClass('border-red');

}
function removeClonebtn() {
    var tblRow = removeClonebtn.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableAddBtn(tblRow, 'AddBtn', 'CheckList');
    $('#ExpensesDetailsDiv').addClass('inVisible');
    var lastRowId = $('#BILTable tr:last').attr('id');
    var CheckList = $('#CheckList');
    if (lastRowId > 0) {
        CheckList = $('#CheckList_' + lastRowId);
    }
    CheckList.prop('checked', true);
    VisibleRowsEnable(lastRowId);

};
function EnableAddBtnInCloneRowIfOnlyLastV2(tblRow, addBtnBaseID) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id');
    var addbtn = $('#AddBtn');
    if (rowid > 0) {
        addbtn = $('#AddBtn_' + rowid);
    }
    addbtn.tooltip('hide');
    addbtn.makeDisable();
};
function EnableAddBtn(tblRow, addBtnBaseID,CheckId) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; CheckId = CheckId + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
    var CheckId = $('#' + CheckId);
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); CheckId.makeDisable(); } else { addBtnctrl.makeEnabled(); CheckId.makeEnabled(); }
    
   
};
$(document).ready(function () {
    (async function () {
        const r1 = await getDropDownDataWithSelectedValueWithColor('NoteNumbers', 'select NoteNumber', '/Security/BIL/GetBILNoteNumberList', 0);;
    })();
});
function VisibleRows() {
    $('#SubmitCount').val(0);
    $('#BtnSubmit').makeDisable();
    var ExpensesDetailsDiv = $('#ExpensesDetailsDiv');
    var rowid = 0;    
    var targetCtrl = $(VisibleRows.caller.arguments[0].target);
    var insrow = targetCtrl.closest('.add-row');
    rowid = $(insrow).attr('id');
    var EmployeeCode = $('#EmployeeCodes');
    var RefNoteNumber = $('#RefNoteNumbers');
    var NoteNo = $('#NoteNumbers');
    if (rowid > 0) {
        NoteNo = $('#NoteNumbers_' + rowid);
        EmployeeCode = $('#EmployeeCodes_' + rowid);
        RefNoteNumber = $('#RefNoteNumbers_' + rowid);
    }

    
    $('#NoteNumber').val($.trim(NoteNo.val()));
    $('#EmployeeNo').val(EmployeeCode.html());
    $('#RefNoteNumber').val($.trim(RefNoteNumber.html()));
    ExpensesDetailsDiv.addClass('inVisible');

    if ($.trim(NoteNo.val()) != '' && $.trim(NoteNo.val())!='-1') {
        var dataSourceURL = '/BIL/ExpensesDetails?NoteNumber=' + $.trim(NoteNo.val());
        $.ajax({
            url: dataSourceURL,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html',
            success: function (result) {
                ExpensesDetailsDiv.removeClass('inVisible');
                ExpensesDetailsDiv.html(result);
            },
            error: function (xhr, status) {
                ExpensesDetailsDiv.html(xhr.responseText);
            }
        })
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Please Select Bill No.',
            icon: 'question',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });

    }
};
function VisibleRowsEnable(rowid) {
    $('#SubmitCount').val(0);
    $('#BtnSubmit').makeDisable();
    $('#Checked').makeDisable();
    var ExpensesDetailsDiv = $('#ExpensesDetailsDiv');
    var EmployeeCode = $('#EmployeeCodes');
    var RefNoteNumber = $('#RefNoteNumbers');
    var NoteNo = $('#NoteNumbers');
    if (rowid > 0) {
        NoteNo = $('#NoteNumbers_' + rowid);
        EmployeeCode = $('#EmployeeCodes_' + rowid);
        RefNoteNumber = $('#RefNoteNumbers_' + rowid);
    }
    $('#NoteNumber').val($.trim(NoteNo.val()));
    $('#EmployeeNo').val(EmployeeCode.html());
    $('#RefNoteNumber').val($.trim(RefNoteNumber.html()));
    ExpensesDetailsDiv.addClass('inVisible');

    if ($.trim(NoteNo.val()) != '' && $.trim(NoteNo.val()) != '-1') {
        var dataSourceURL = '/BIL/ExpensesDetails?NoteNumber=' + $.trim(NoteNo.val());
        $.ajax({
            url: dataSourceURL,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            dataType: 'html',
            success: function (result) {
                ExpensesDetailsDiv.removeClass('inVisible');
                ExpensesDetailsDiv.html(result);
            },
            error: function (xhr, status) {
                ExpensesDetailsDiv.html(xhr.responseText);
            }
        })
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Please Select Bill No.',
            icon: 'question',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });

    }
};
$('#btnBacks').click(function () {
    var url = "/Security/BIL/ApprovalIndex";
    if ($('#NoteNumber').val() != "") {
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

                window.location.href = url;
            }

        }
    } else {

        window.location.href = url;
    };
});
$('#clrbtn').click(function () {
    var url = "/Security/BIL/ApprovalCreate";
    window.location.href = url;
});
$(document).ready(function () {
    $('#btnTourRule').click(function () {
        var url = "/Security/TourRule/ViewRedirection?CBUID=1";
        window.open(url);
    });
});
function ChangeNoteNumber() {
    $('#ExpensesDetailsDiv').addClass('inVisible');
    var rowid = 0;
    var targetCtrl = $(ChangeNoteNumber.caller.arguments[0].target);
    var insrow = targetCtrl.closest('.add-row');
    rowid = $(insrow).attr('id');
    var mID = targetCtrl.attr('id');
    $('.CheckList').prop('checked', false);
    $('.CheckList').removeClass('selected-row');
    var TargetVal = $(targetCtrl).val();
    var EmployeeCode = $('#EmployeeCodes');
    var RefNoteNumber = $('#RefNoteNumbers');
    var CenterCodeName = $('#CenterCodeName');
    var PersonTypetxt = $('#PersonTypetxt');
    var EmployeeCodeName = $('#EmployeeCodeName');
    var DesigCodeName = $('#DesigCodeName');
    var TourFromDate = $('#TourFromDate');
    var TourToDate = $('#TourToDate');
    var NoOfDays = $('#NoOfDays');
    var PurposeOfVisit = $('#PurposeOfVisit');
    var CheckList = $('#CheckList');
    var AddBtn = $('#AddBtn');
    var dstat = 0;
    $('.xPerson').each(function () {
        if (TargetVal != '' && $(this).val() == TargetVal) { dstat += 1; }
        //alert(mValue + ' - ' + $(this).val() + ' - ' + dstat);
    });
    if (dstat > 1) {
        Swal.fire({
            title: 'Data Duplicacy Error',
            text: 'Bill No You Have Selected Is Already Taken.',
            icon: 'error',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
        if (rowid > 0) {
            CheckList = $('#CheckList_' + rowid);
            AddBtn = $('#AddBtn_' + rowid);
        }
        AddBtn.makeDisable();
        CheckList.makeDisable();
        $(targetCtrl).val('')
        $(targetCtrl).removeClass('is-valid').addClass('is-invalid');
       
       

    } else {
        $.ajax({
            url: '/BIL/GetTADABillGenerationDataHdr',
            method: 'GET',
            data: { NoteNumber: TargetVal },
            dataType: 'json',
            success: function (data) {
               
                $(data).each(function (index, item) {
                    if (TargetVal != "-1") {
                    if (rowid > 0) {
                        EmployeeCode = $('#EmployeeCodes_' + rowid);
                        RefNoteNumber = $('#RefNoteNumbers_' + rowid);
                        CenterCodeName = $('#CenterCodeName_' + rowid);
                        PersonTypetxt = $('#PersonTypetxt_' + rowid);
                        EmployeeCodeName = $('#EmployeeCodeName_' + rowid);
                        DesigCodeName = $('#DesigCodeName_' + rowid);
                        TourFromDate = $('#TourFromDate_' + rowid);
                        TourToDate = $('#TourToDate_' + rowid);
                        NoOfDays = $('#NoOfDays_' + rowid);
                        PurposeOfVisit = $('#PurposeOfVisit_' + rowid);
                        CheckList = $('#CheckList_' + rowid);

                    }

                    EmployeeCode.html(item.EmployeeNo);
                    RefNoteNumber.html(item.RefNoteNumber);
                    CenterCodeName.html(item.CenterCodeName);
                    PersonTypetxt.html(item.PersonTypetxt);
                    EmployeeCodeName.html(item.EmployeeCodeName);
                    DesigCodeName.html(item.DesigCodeName);
                    TourFromDate.html(item.TourFromDateNTime + "-" + item.TourFromTime);
                    TourToDate.html(item.TourToDateNTime + "-" + item.TourToTime);
                    NoOfDays.html(item.NoOfDays);
                    PurposeOfVisit.html(item.PurposeOfVisit);
                    CheckList.prop('checked', true);
                    VisibleRowsEnable(rowid);
                    
                    }
                 });
            },
            error: function (xhr, status) {
                alert(xhr.responseText);
            }
        });
    }

    
};
function TotalExpance() {
    var target = TotalExpance.caller.arguments[0].target;
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    var TotalExpenses = $('#ATotalAmount').val();
    if (targetCtrl.val() != 0 && targetCtrl.val() != "") {
        var Total = parseInt(TotalExpenses) + parseInt(targetCtrl.val());
        $('#ATotalAmount').val(Total);
    }
};
function TPDBtnClicked() {
    var notenumber = $('#NoteNumber').val();
    var EmployeeNo= $('#EmployeeNo').val();
    var NoteNumber = $('#RefNoteNumber').val();
    $('#SubmitCount').val(1);
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
                $('#IsApproves').makeEnabled();
                $('#ApproveReason').makeEnabled();
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
function ValidateControl() {
    var target = ValidateControl.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    if (targetid == 'IsApproves') {
        if ($(target).val() == 1) {
            $('#ApproveReason').makeDisable();
            $('#ApproveReason').val('');
            $('#ApproveReason').removeClass('is-invalid').removeClass('is-valid');
        } else {
            $('#ApproveReason').makeEnabled()
            $('#ApproveReason').isInvalid();
        }
    }
    EnableSubmitBtn();

};
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val());
    if (isvalid) { targetCtrl.isValid(); } else { targetCtrl.isInvalid(); }
    EnableAddBtn(tblRow, 'AddBtn','CheckList');

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        
        case "NoteNumbers":
            isvalid = validatectrl_ValidatestringLength(value);
         break;
        case "IsApproves":
            isvalid = validatectrl_YesNoComboApproval(value);
            break;
        case "ApproveReason":
            isvalid = validatectrl_ValidatestringLength(value);
            break;
        case "AReamrk":
            isvalid = validatectrl_ValidatestringLength(value);
            break; 
        case "Checked":
            isvalid = validatectrl_ValidatestringLength(value);
            if (isvalid) {
                $('.content').removeClass('border-red').addClass('border-green');
                $('#BtnSubmit').makeEnabled();
            } else {
                $('.content').removeClass('border-green').addClass('border-red');
                $('#BtnSubmit').makeDisable();
            }
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
    debugger;
    if (value.length >= 0) {
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
    var SubmitBtn = $('#SubmitBtn');
    if (z <= 0 && btn == 1) {
        SubmitBtn.makeEnabled();
    } else {
        SubmitBtn.makeDisable();
    }
};
function SaveDetails() {
    var notenumber = $('#NoteNumber').val();
    var AEDAmount = $('#AED').val();
    var ATAAmount = $('#ATA').val();
    var ALocAmount = $('#ALoc').val();
    var ALodAmount = $('#ALod').val();
    var ATotalAmount = $('#ATotalAmount').val();
    var AReamrk = $('#AReamrk').val();
    var IsApproves = $('#IsApproves').val();
    var IsApproved;
    if (IsApproves == "1") {
        IsApproved = true;
    } else {
        IsApproved = false;
    }
    var ApproveReason = $('#ApproveReason').val();
    var status = 1;
    var x = '{"NoteNumber":"' + notenumber + '","AEDAmount":"' + AEDAmount + '","ATAAmount":"' + ATAAmount + '","ALocAmount":"' + ALocAmount + '","ALodAmount":"' + ALodAmount + '","ATotalAmount":"' + ATotalAmount + '","AReamrk":"' + AReamrk + '","IsApproved":"' + IsApproved + '","ApprovalReason":"' + ApproveReason + '","status":"' + status + '"}';
    $.ajax({
        method: 'POST',
        url: '/BIL/ApprovalCreate',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    $('#SubmitCount').val(0);
                    Swal.fire({
                        title: 'Confirmation',
                        text: ' Data Saved Successfully for '+ notenumber ,
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
                            $('#SubmitBtn').makeDisable();
                            $('#Checked').makeEnabled();
                            //var url = "/Security/EMN/Index"
                            //window.location.href = url;
                        }
                    }
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed To Update.',
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
function FinalSubmit() {
    var status =2;
    var schrecords = getRecordsFromTableV2('BILTable');
    var x = '{"status":"' + status + '","NoteList":' + schrecords + '}';
  
    $.ajax({
        method: 'POST',
        url: '/BIL/ApprovalCreate',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Bill No Approval Process saved successfully.',
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
                           var url = "/Security/BIL/ApprovalIndex";
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
}
function totalAmount() {
    let table1_value_1 = parseInt(document.getElementById("first-table-tr").children[1].children[0].children[0].value);
    let table1_value_2 = parseInt(document.getElementById("first-table-tr").children[2].children[0].children[0].value);
    let table1_value_3 = parseInt(document.getElementById("first-table-tr").children[3].children[0].children[0].value);
    let table1_value_4 = parseInt(document.getElementById("first-table-tr").children[4].children[0].children[0].value);
   var total = table1_value_1 + table1_value_2 + table1_value_3 + table1_value_4;
    document.getElementById("ATotalAmount").value = isNaN(total) ? 0 : total;
}
function decrementQty(e) {
    var value = e.parentElement.parentElement.firstElementChild.value;
    value = value.trim().replace(/\,/g, '');
    value = isNaN(value) ? 1 : value;
    value--;
    value = value < 0 ? 0 : value;
    e.parentElement.parentElement.firstElementChild.value = value;
    TotalExp();
}
function AEDincrementQty() {
    var targetCtrl = AEDincrementQty.caller.arguments[0].target;
    var mids =  $(targetCtrl).attr('id');
     var maxvalue = $('#A' + mids + 'Max').html() * 1;
   
    var txtcTrl = $('#A' + mids);
    var mValue = txtcTrl.val() * 1;
    //alert(mids + "--" + maxvalue + '--' + mValue);
    mValue += 1;
    mValue = mValue > maxvalue ? maxvalue : mValue;
    txtcTrl.val(mValue);
    TotalExp();
};
function TotalExp() {
    var edamt = $('#AED').val() * 1;
    var atamt = $('#ATA').val() * 1;
    var alamt = $('#ALoc').val() * 1;
    var aloamt = $('#ALod').val() * 1;
    var total = edamt + atamt + alamt + aloamt;
    var Atotal = isNaN(total) ? 0 : total;
    $('#ATotalAmount').val(Atotal);
};
function numbervalidate(key) {
    var presskeys = (key.which) ? key.which : key.presskeys;
    if (String.fromCharCode(presskeys).match(/[^0-9]/g)) {
        return false;
    }
    //if (!(presskeys == 8 || presskeys == 46) && (presskeys < 48 || presskeys > 57)) {
    //    return false;
    //}
    //var regex = new RegExp("^[^<>';.:]+$");
    //if (!regex.test(key)) {
    //    event.preventDefault();
    //    return false;
    //}
}
function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    var targetCtrl = isNumber.caller.arguments[0].target;
    var mids = $(targetCtrl).attr('id');
    var maxvalue = $('#' + mids + 'Max').html() * 1;
    var txtcTrl = $('#' + mids);
    var mValue = txtcTrl.val();
    var mValuetatol = mValue > maxvalue ? maxvalue : mValue;
    txtcTrl.val(mValuetatol);
    TotalExp();
    return true;
}
function keypressCountWord(e) {
    var target = keypressCountWord.caller.arguments[0].target;
    var targetCtrl = $(target).val();
    if (WordCount(targetCtrl) > 50) {
        $(target).preventTypying();
    } else {
        $(target).off('keypress');
    }
}




    
  
