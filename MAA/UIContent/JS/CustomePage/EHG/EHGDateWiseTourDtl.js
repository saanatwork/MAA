/////   Verified
$(document).ready(function () {
    $('.ApplyMultiSelect').each(function () {
        that = $(this);
        that.prop('multiple', 'multiple');
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
});
function TourCategoryChanged(destinationCtrlID, datasourceURL) {
    var target = TourCategoryChanged.caller.arguments[0].target;
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    //alert(targetid);
    var rowid = $(target.closest('.add-row')).attr("id");
    var i = targetid.indexOf('_');
    if (i >= 0) { destinationCtrlID = destinationCtrlID + '_' + rowid; }
    var x = '';
    $('#' + targetid + ' option:selected').each(function () {
        x = x + '_' + $(this).val();
    });
    datasourceURL = datasourceURL + x;
    GetDataFromAjax(datasourceURL).done(function(data) {
        refreshMultiselect(data, destinationCtrlID, false);
        EnableSubmitBtn();
    });
    //alert(datasourceURL);
    //(async function () {
    //    const r1 = await getMultiselectData(destinationCtrlID, datasourceURL);
    //})();
    if (targetCtrl.val().length > 0) { targetCtrl.isValidCtrl(); } else { targetCtrl.isInvalidCtrl(); }
};

/////////////////////////////////
function EnableAddBtnInCloneRowIfOnlyLastV2(tblRow, addBtnBaseID) {
    //If The Add Button Is Exist In The Last Row Then Only Enable 
    var mTodate = $('#TodateStr').val();
    var tDateCtrl = $('#ToDate');
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id');
    if (rowid != 0) {
        addBtnBaseID = addBtnBaseID + '_' + rowid;
        tDateCtrl = $('#ToDate_' + rowid);
    }
    var addBtnctrl = $('#' + addBtnBaseID);
    if (tblrow.is(":last-child")) {
        if (tblrow.find('.is-invalid').length > 0) {
            addBtnctrl.makeSLUDisable();
        } else {
            if (mTodate == tDateCtrl.val()) {
                addBtnctrl.makeSLUDisable();
            } else { addBtnctrl.makeSLUEnable(); }
        }
    }
    else { addBtnctrl.makeSLUDisable(); }

    //alert(tblrow.find('.is-invalid').length);
};
function RemoveBtnClicked() {
    var tblRow = RemoveBtnClicked.caller.arguments[0].target.closest('.add-row');
    removeBtnClickFromCloneRow(tblRow, 'tbody2');
    EnableSubmitBtn();
};
function addCloneBtnClick() {
    var insrow = addCloneBtnClick.caller.arguments[0].target.closest('.add-row');
    var insrowid = $(insrow).attr('id');
    var addbtn = $('#AddBtn');
    if (insrowid > 0) { addbtn = $('#AddBtn_' + insrowid); }
    var clonerowid = CloneRowReturningID('tbody1', 'tbody2', $(insrow).attr('id') * 1, false, false);
    //alert(clonerowid);
    var preToDate = $(insrow).find('.todt').val();
    var curFromDate = CustomDateChange(preToDate, 1, '/');
    $('#FromDateLbl_' + clonerowid).html(curFromDate);
    $('#btnSubmit').makeDisable();
    //$('#CenterCode_' + clonerowid).isInvalidCtrl();
    $('#ToDate_' + clonerowid).isInvalidCtrl();
    $('#ToDate_' + clonerowid).on('change', function () {
        $(this).ApplyCustomDateFormat();
    });
    var mCentreCode = $('#CenterCode_' + clonerowid);
    mCentreCode.empty();
    mCentreCode.multiselect('destroy');
    mCentreCode.removeAttr('multiple');
    mCentreCode.multiselect('refresh');
    mCentreCode.isInvalidCtrl();
    addbtn.tooltip('hide');
    addbtn.makeDisable();
    //UnLockSLUContainer($('#' + clonerowid));
};
function ValidateCloneRowCtrl() {
    var target = ValidateCloneRowCtrl.caller.arguments[0].target;
    var tblRow = target.closest('.add-row');
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    if (targetid.indexOf('_') >= 0) { targetid = targetid.split('_')[0] }
    var isvalid = validatectrl(targetid, targetCtrl.val(), $(tblRow).attr('id'));
    if (isvalid) { targetCtrl.isValidCtrl(); } else { targetCtrl.isInvalidCtrl(); }    
    $('#DWBackBtnActive').val(1);
    if (targetid == 'ToDate') {
        RestRowsDeleted('table1', $(tblRow).attr('id'));
        var todate = new Date($('#TodateStr').val());
        var preToDate = $(tblRow).find('.todt').val();
        var calculatedFromdate = new Date(ChangeDateFormat(CustomDateChange(preToDate, 1, '-')));
        if (todate <= calculatedFromdate) {
            $(tblRow).find('.addBtn').makeSLUDisable();
        }
    }
    EnableAddBtnInCloneRowIfOnlyLastV2(tblRow, 'AddBtn');
    EnableSubmitBtn();
};
function validatectrl(targetid, value,rowid) {
    var isvalid = false;
    switch (targetid) {
        case "ToDate":
            if (value != '') {
                var fromdateCtrl = $('#FromDateLbl');
                if (rowid > 0) { fromdateCtrl = $('#FromDateLbl_' + rowid); }
                if (CompareDate(fromdateCtrl.html(), 0, value, 1)) {
                    isvalid = true;
                }
                else {
                    MyAlert(4, 'To Date Must Be Greater Or Equal To From Date.');
                    //Swal.fire({
                    //    title: 'Invalid Date Range!',
                    //    text: 'To Date Must Be Greater Or Equal To From Date.',
                    //    icon: 'error',
                    //    customClass: 'swal-wide',
                    //    buttons: {
                    //        confirm: 'Ok'
                    //    },
                    //    confirmButtonColor: '#2527a2',
                    //});
                    isvalid = false;
                }
            }
            break;        
        case "CenterCode":
            if (value != '') {
                if ($('#ehgHeader_CenterCode').val() == value) {
                    MyAlert(4, 'Cannot Use Screen Initiated Centre Code');
                    //Swal.fire({
                    //    title: 'Invalid Centre Code!',
                    //    text: 'Cannot Use Screen Initiated Centre Code',
                    //    icon: 'error',
                    //    customClass: 'swal-wide',
                    //    buttons: {
                    //        confirm: 'Ok'
                    //    },
                    //    confirmButtonColor: '#2527a2',
                    //});
                }
                else {
                    isvalid = true;
                    var ccDiv = $('#CentreCodeOrder_' + rowid);
                    ccDiv.append(value);
                }
            }
            break;
        case "PurposeOfVisitFoeMang":
            if (value != '') { isvalid = true; }
            break;
    }
    return isvalid;
};
async function getInitialData() {
    var notenumber = $('#ehgHeader_NoteNumber').val();
    var rowid;    
    var fromdateCtrl = $('#FromDateLbl');
    var todateCtrl = $('#ToDate');
    var lbltodateCtrl = $('#lblToDate');
    var tourcatCtrl = $('#TourCategory');
    var centrecodeCtrl = $('#CenterCode');
    var addbtnCtrl = $('#AddBtn');
    $.ajax({
        url: '/EHG/GetDWTDetails',
        method: 'GET',
        data: { NoteNumber: notenumber, isActive:0 },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                if (index > 0) {
                    rowid = CloneRowReturningID('tbody1', 'tbody2', index - 1,false, false);
                    fromdateCtrl = $('#FromDateLbl_' + rowid);
                    todateCtrl = $('#ToDate_' + rowid);
                    lbltodateCtrl = $('#lblToDate_' + rowid);
                    tourcatCtrl = $('#TourCategory_' + rowid);
                    centrecodeCtrl = $('#CenterCode_' + rowid);
                    addbtnCtrl = $('#AddBtn_' + rowid) ;
                }
                fromdateCtrl.html(item.FromDateStrDisplay);
                todateCtrl.val(item.ToDateStr).isValidCtrl();
                lbltodateCtrl.html(item.ToDateStrDisplay);
                if (item.TourCatCodes.indexOf(',') > 0) {
                    tourcatCtrl.val(item.TourCatCodes.split(',')).multiselect('refresh');
                }
                else {
                    tourcatCtrl.val(item.TourCatCodes).multiselect('refresh');
                }
                tourcatCtrl.isValidCtrl();
                //alert(item.CenterCodes);
                (async function () {
                    const r1 = await getMultiselectDataWithSelectedValues(centrecodeCtrl.attr('id'), '/Security/EHG/GetTourLocations?CategoryIDs=' + item.TourCatCodes, item.CenterCodes);
                })();                
                centrecodeCtrl.isValidCtrl();
                addbtnCtrl.makeDisable();
            });
        }
    });
};
function EnableSubmitBtn() {
    var mEnable = false;
    var todate = $('#TodateStr').val();
    var SubmitBtn = $('#btnSubmit');
    var x = getDivInvalidCount('HdrDiv');
    $('.todt').each(function () {
        if ($(this).val() == todate) { mEnable = true; }
    });    
    if (x <= 0) {       
        if (mEnable) {
            SubmitBtn.makeSLUEnable();
        }
        else {
            SubmitBtn.makeSLUDisable();
        }
    }
    else { SubmitBtn.makeSLUDisable(); }
};
$(document).ready(function () {
    $('#btnBack').click(function () {
        var backbtnactive = $('#DWBackBtnActive').val();
        var backurl = "/Security/EHG/Create";
        if (backbtnactive == 1) {
            Swal.fire({
                title: 'Confirmation',
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
                    window.location.href = backurl;
                }
            }
        }
        else {
            window.location.href = backurl;
        }
    });
});

$(document).ready(function () {
    $('#FromDateLbl').html($('#FromdateStrForDisplay').val());
    (async function () {
        const r1 = await getInitialData();
    })();
    
});
