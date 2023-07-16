function SaveData() {
    var notenumber = $('#NoteNumber').val();
    var trippurpose = $('#TripPurpose').val();
    var othStatement = $('#StatementOthLoc').val();
    if (othStatement !== 1) { othStatement = 0; }
    var schrecords = GetDataFromTable('myTable');
    var x = '{"NoteNumber":"' + notenumber
        + '","TripPurpose":"' + trippurpose
        + '","IsOtherPlaceStatement":"' + othStatement
        + '","TripDetails":' + schrecords + '}';
    //alert(x);
    $.ajax({
        method: 'POST',
        url: '/CTV2/SetData',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    var url = "/Security/CTV2/CreateNote";
                    MyAlertWithRedirection(1, "Data Saved Successfully.", url);
                }
                else {
                    MyAlert(3, "System Failed To Save Data.");
                }
            });
        },
    });
};
function IsIntervalChecking(mdate, mtime, rowid) {
    var result = true;
    //var combinedDateTime = moment(mdate + ' ' + mtime, 'YYYY-MM-DD h:mm A');
    //var newDate = combinedDateTime.toDate();
    var newDatetime = new Date(mdate + ' ' + mtime);
    $("#myTable tbody tr").each(function () {
        var mRow = $(this);
        var myRowID = mRow.attr('id');
        if (myRowID !== rowid) {
            var fromdate = $('#FromDate_' + myRowID).val();
            var fromtime = $('#time-FromDate_' + myRowID).val();
            var todate = $('#ToDate_' + myRowID).val();            
            var fromdatetime = new Date(fromdate + ' ' + fromtime);
            var todatetime = moment(todate + ' ' + '11:59 PM', 'DD/MM/YYYY h:mm A').toDate();
            //alert(fromdatetime + ' - ' + todatetime + ' Actual:' + newDatetime);
            if (newDatetime >= fromdatetime && newDatetime <= todatetime) { result = false;}
        }        
    });
    return result;
};
function IsDuplicateFromLocation(rowid) {
    var result = false;
    var mFromdate = $('#FromDate_' + rowid).val();
    var mFromLocType = $('#FromLocationType_' + rowid).val();
    var mFromLoc = $('#FromLocation_' + rowid).val();
    $("#myTable tbody tr").each(function () {
        var mRow = $(this);
        var myRowID = mRow.attr('id');
        if (myRowID !== rowid) {
            var fromdate = $('#FromDate_' + myRowID).val();
            var fromloctype = $('#FromLocationType_' + myRowID).val();
            var fromloc = $('#FromLocation_' + myRowID).val();            
            if (fromdate == mFromdate && fromloctype == mFromLocType && fromloc==mFromLoc) {
                result = true;
            }
        }
    });
    return result;
};
function IsOtherPlaceSelected() {
    var IsOthLoc = false;
    $('.toloc').each(function () {
        if ($(this).html().indexOf("99-") >= 0) { IsOthLoc = true; }
    });
    $('.fromloctype').each(function () {
        if($(this).val()==99) { IsOthLoc = true; }
    });
    return IsOthLoc;
};
function RowAddButtonStatus(btnID) {
    var myCtrl = $('#' + btnID);
    var row = $('#' + btnID.split('_')[1]);
    var invalidcount = row.find('.is-invalid').length;
    //alert(row+' - '+invalidcount);
    if (invalidcount > 0) {
        myCtrl.makeDisable();
        LockSection('tblOTVStatement');
    } else {
        myCtrl.makeEnable();
        UnLockSection('tblOTVStatement');
        var myosCtrl = $('#StatementOthLoc');
        if (IsOtherPlaceSelected()) {
            myosCtrl.EntrynEnableForEntry();
            $('#StatementDIC').EntrynDisabledForEntry();
        } else {
            myosCtrl.val('').removeClass('is-valid is-invalid');
            myosCtrl.makeDisable();
        }
    }
};
function GetUserClickSequence(mvalue, ctrlID) {
    var string1 = $('#' + ctrlID).html();
    var arr1 = [];
    if (string1.indexOf(",") >= 0) {
        arr1 = string1.split(",");
    } else { arr1.push(string1); }    
    $.each(mvalue, function (index, value) {
        if ($.inArray(value, arr1) == -1) { arr1.push(value); }
    });
    arr1 = $.grep(arr1, function (value, index) {
        return $.inArray(value, mvalue) !== -1;
    });
    $('#' + ctrlID).html(arr1.join(','));
};
function GetUserClickSequenceValuenText(ctrlID) {    
    var myMultiCtrl = $('#' + ctrlID);
    var myMultiValCtrl = $('#UCS' + ctrlID);
    var myMultiTextCtrl = $('#TUCS' + ctrlID);
    var string1 = myMultiValCtrl.html();
    var string2 = myMultiTextCtrl.html();
    var mText = $("#" + ctrlID+" option:selected").map(function () {
        return $(this).text();
    }).get();
    var mVal = myMultiCtrl.val();

    var arr1 = [];
    if (string1.indexOf(",") >= 0) {arr1 = string1.split(",");} else { arr1.push(string1); }
    $.each(mVal, function (index, value) {
        if ($.inArray(value, arr1) == -1) { arr1.push(value); }
    });
    arr1 = $.grep(arr1, function (value, index) {
        return $.inArray(value, mVal) !== -1;
    });

    var arr2 = [];
    if (string2.indexOf(",") >= 0) {arr2 = string2.split(",");} else { arr2.push(string2); }
    $.each(mText, function (index, value) {
        if ($.inArray(value, arr2) == -1) { arr2.push(value); }
    });
    arr2 = $.grep(arr2, function (value, index) {
        return $.inArray(value, mText) !== -1;
    });
    var finaltext = arr2.join(',');
    myMultiValCtrl.html(arr1.join(','));
    myMultiTextCtrl.html(finaltext);    
};
function SetUserClickSequenceText() {
    var myCtrl = $(SetUserClickSequenceText.caller.arguments[0].target);
    ctrlID = myCtrl.attr('id');
    var myMultiContainer = $('#Con' + ctrlID);
    var myMultiTextCtrl = $('#TUCS' + ctrlID);
    myMultiContainer.find('.multiselect-selected-text').each(function () {
        $(this).html(myMultiTextCtrl.html());
    });
};
function GetAvaialbleSlots() {
    var x = $('#Slots_AvailableSlots').val();
    var datesArray = x.split(",");
    var twoDimensionalArray = [];
    for (var i = 0; i < datesArray.length; i += 2) {
        var subArray = [datesArray[i], datesArray[i + 1]];
        twoDimensionalArray.push(subArray);
    }
    return twoDimensionalArray;
};
function CheckDatesAvailableOrNot(FromDate,ToDate) {
    var isBetween = false;
    date1 = new Date(FromDate);
    date2 = new Date(ToDate);    
    twoDimensionalArray = GetAvaialbleSlots();
    //alert(date1 + ' - ' + date2+' TD : ' + twoDimensionalArray);
    $.each(twoDimensionalArray, function (index, row) {
        var min = new Date(row[0]);
        var max = new Date(row[1]);
        if (date1 >= min && date1 <= max && date2 >= min && date2 <= max) {
            isBetween = true;
            return false; // Exit the loop early if found
        }
    });
    return isBetween;
};
function GetToDate(ID) {
    var rowid = ID.split('_')[1];
    //var mybtnCtrl = $('#' + ID);
    var myToDateCtrl = $('#ToDate_' + rowid);
    var addBtnID = 'AddBtn_' + rowid;
    var row = $('#' + rowid);
    var fromDate = row.find('.disableDates').val();
    var fromloctype = row.find('.fromloctype').val();
    var fromloc = row.find('.fromloc').val();
    var toloc = row.find('.toloc').html();    
    if (toloc !== 'x' && toloc !== '' && toloc !== null && fromDate !== '' && fromloc !== '' && fromloctype !== '') {
        // checking Source and Destination Duplicacy
        var fromlocation = fromloctype + '-' + fromloc;
        var tolocation = toloc + ',';
        if ($.inArray(fromlocation, tolocation.split(",")) !== -1) {
            myToDateCtrl.val('').isInvalid();
            MyAlert(4, 'Source And Destination Locations Must Be Different.');
        }
        else {
            $.ajax({
                url: '/CTV2/GetToDate?FromDate=' + fromDate + '&FromLocationType=' + fromloctype + '&FromLocation=' + fromloc + '&ToLocation=' + toloc,
                method: 'GET',
                dataType: 'json',
                success: function (data) {
                    $(data).each(function (index, item) {
                        myToDateCtrl.val(item.sResponseString);
                        if (item.bResponseBool == true) {
                            if (CheckDatesAvailableOrNot(fromDate, item.sResponseString2)) {
                                myToDateCtrl.isValid();
                                RowAddButtonStatus(addBtnID);
                            }
                            else {
                                myToDateCtrl.isInvalid();
                                RowAddButtonStatus(addBtnID);
                                MyAlert(4, 'Calculated Schedule To Date Is Falling Under Occupied Slots Of Local Vehicle Trip Schedule.');
                            }
                        }
                        else {
                            myToDateCtrl.isInvalid();
                            RowAddButtonStatus(addBtnID);
                            MyAlert(3, 'Error Calculating Schedule To Date.');
                        }                        
                    });                    
                }
            });
        }        
    }
    
};
function SettingSlotForFromDate() {
    var CtrlID = 'FromDate_0';
    DisableDatesInCalendar(GetDisableDates(), CtrlID);
};
function ChangeToLocationType() {
    var myCtrl = $(ChangeToLocationType.caller.arguments[0].target);
    ChangeToLocationTypeVirtually(myCtrl, '');
    //var loclabel = $('#UCSToLocation_' + myCtrl.attr('id').split('_')[1]);
    //var myCashcadingID = 'ToLocation_' + myCtrl.attr('id').split('_')[1];
    //var myCashcadingCtrl = $('#' + myCashcadingID);    
    //if (myCtrl.val() != '') {        
    //    var url = '/CTV2/GetToLocationsFromTypes?TypeIDs=' + myCtrl.val();
    //    FillCashCadingMultiSelect(myCashcadingID, url,true);
    //    myCtrl.isValid();
    //    myCashcadingCtrl.EntrynEnableForEntry();        
    //} else { myCtrl.isInvalid(); myCashcadingCtrl.EntrynDisabledForEntry(); }
    //loclabel.html('x');
    //var addBtnID = 'AddBtn_' + myCtrl.attr('id').split('_')[1];
    //GetToDate(myCtrl.attr('id'));
    //RowAddButtonStatus(addBtnID);
    //SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function ChangeFromLocationType() {
    var myCtrl = $(ChangeFromLocationType.caller.arguments[0].target);
    ChangeFromLocationTypeVirtually(myCtrl,'');
    //var rowid = myCtrl.attr('id').split('_')[1];
    //var myCashcadingID = 'FromLocation_' + rowid;
    ////var myNextCtrl = $('#ToLocationType_' + rowid );
    //var myCashcadingCtrl = $('#' + myCashcadingID);
    //if (myCtrl.val() != '') {        
    //    var url = '/CTV2/GetToLocationsFromTypes?TypeIDs=' + myCtrl.val();
    //    FillCashCadingDropDown(myCashcadingID, url, false,'Select Location');
    //    myCtrl.isValid();
    //    myCashcadingCtrl.EntrynEnableForEntry();
    //    LockMultiSelect('ConToLocationType_' + rowid);
    //    LockMultiSelect('ConToLocation_' + rowid);
    //}
    //else { myCtrl.isInvalid(); myCashcadingCtrl.EntrynDisabledForEntry(); }    
    //var addBtnID = 'AddBtn_' + rowid;
    //RowAddButtonStatus(addBtnID);
    //SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function ChangeFromLocation() {
    var myCtrl = $(ChangeFromLocation.caller.arguments[0].target);
    ChangeFromLocationVirtually(myCtrl, '');
    //var rowid = myCtrl.attr('id').split('_')[1];
    //var addBtnID = 'AddBtn_' + rowid;
    //if (myCtrl.val() != '') {
    //    if (IsDuplicateFromLocation(rowid)) {
    //        MyAlert(4, "This Location Is Already Scheduled On The Same Date You Are Providing.")
    //        myCtrl.isInvalid();
    //    }
    //    else {
    //        myCtrl.isValid();
    //        UnLockMultiSelect('ConToLocationType_' + rowid);
    //        //UnLockMultiSelect('ConToLocation_' + rowid);
    //    }     
    //}
    //else { myCtrl.isInvalid(); }
    //var xCtrl = $('#ToLocationType_' + rowid);
    //xCtrl.multiselect('clearSelection');
    //xCtrl.multiselect('refresh');
    //xCtrl.isInvalid();
    //$('#ToLocation_' + rowid).isInvalid();
    //LockMultiSelect('ConToLocation_' + rowid);
    //$('#UCSToLocation_' + rowid).html('');
    //GetToDate(myCtrl.attr('id'));    
    //RowAddButtonStatus(addBtnID);
};
function ChangeToLocation() {
    var myCtrl = $(ChangeToLocation.caller.arguments[0].target);
    if (myCtrl.val() != '') { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    var addBtnID = 'AddBtn_' + myCtrl.attr('id').split('_')[1];
    //GetUserClickSequence(myCtrl.val(), 'UCS' + myCtrl.attr('id'));
    GetUserClickSequenceValuenText(myCtrl.attr('id'));
    GetToDate(myCtrl.attr('id'));
    RowAddButtonStatus(addBtnID);    
};
function ValidateTripPurpose() {
    var myCtrl = $(ValidateTripPurpose.caller.arguments[0].target);
    LockSection('tblOTVAdd');
    if (myCtrl.val() != '') {
        if (isValidMaxWordCount(myCtrl.val(), 100)) {
            myCtrl.isValid();
            UnLockSection('tblOTVAdd');
            LockAllRowExceptLast('myTable');
            var x = DivInvalidCount('myTable');
            if (x > 0) { LockSection('tblOTVStatement'); }
            else {
                UnLockSection('tblOTVStatement');
                if (IsOtherPlaceSelected()) {
                    $('#StatementOthLoc').makeEnable();
                } else { $('#StatementOthLoc').makeDisable(); }
            }
        } else { myCtrl.isInvalid(); LockSection('tblOTVStatement'); }
    } else { myCtrl.isInvalid(); LockSection('tblOTVStatement'); }    
    SubmitBtnStatus('btnSubmit','HdrDiv');
};
function ValidateStatementDIC() {
    var myCtrl = $(ValidateStatementDIC.caller.arguments[0].target);
    var xCtrl = $('#StatementOthLoc');
    if (myCtrl.val() ==1) {
        $('#TripPurpose').makeDisable();
        LockSection('tblOTVAdd');
        myCtrl.isValid();
    }
    else {
        if (xCtrl.val() != 1) {
            $('#TripPurpose').makeEnable();
            UnLockSection('tblOTVAdd');
            LockAllRowExceptLast('myTable');
        }        
        myCtrl.isInvalid();
    }
    MakeDivGreen('tblOTVStatement');
    SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function ValidateStatementOthLoc() {
    var myCtrl = $(ValidateStatementOthLoc.caller.arguments[0].target);
    var xCtrl = $('#StatementDIC');
    if (myCtrl.val() == 1) {
        $('#TripPurpose').makeDisable();
        LockSection('tblOTVAdd');
        myCtrl.isValid();
        xCtrl.EntrynEnableForEntry();
    }
    else {
        $('#TripPurpose').makeEnable();
        UnLockSection('tblOTVAdd');
        LockAllRowExceptLast('myTable');
        myCtrl.isInvalid();
        xCtrl.EntrynDisabledForEntry();
    }
    MakeDivGreen('tblOTVStatement');
    SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function FromDateChanged() {
    var myCtrl = $(FromDateChanged.caller.arguments[0].target);
    FromDateChangedVirtually(myCtrl);
    //var myNextCtrl = $('#FromLocationType_' + myCtrl.attr('id').split('_')[1]);
    //myCtrl.ApplyCustomDateFormat();
    //var myTimeCtrl = $('#' + 'time-' + myCtrl.attr('id'));    
    //if (myCtrl.val() != '') {
    //    myCtrl.isValid();
    //    myTimeCtrl.EntrynEnableForEntry();        
    //}
    //else { myCtrl.isInvalid(); myTimeCtrl.EntrynDisabledForEntry(); }
    //myNextCtrl.EntrynDisabledForEntry();
    //var addBtnID = 'AddBtn_' + myCtrl.attr('id').split('_')[1];
    //GetToDate(myCtrl.attr('id'));
    //RowAddButtonStatus(addBtnID);
    ////SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function FromDateChangedVirtually(myCtrl) {
    var myNextCtrl = $('#FromLocationType_' + myCtrl.attr('id').split('_')[1]);
    myCtrl.ApplyCustomDateFormat();
    var myTimeCtrl = $('#' + 'time-' + myCtrl.attr('id'));
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        myTimeCtrl.EntrynEnableForEntry();
    }
    else { myCtrl.isInvalid(); myTimeCtrl.EntrynDisabledForEntry(); }
    myNextCtrl.EntrynDisabledForEntry();
    var addBtnID = 'AddBtn_' + myCtrl.attr('id').split('_')[1];
    GetToDate(myCtrl.attr('id'));
    RowAddButtonStatus(addBtnID);
    //SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function ChangeFromLocationTypeVirtually(myCtrl,myNextCtrlValue) {
    //var myCtrl = $(ChangeFromLocationType.caller.arguments[0].target);
    var rowid = myCtrl.attr('id').split('_')[1];
    var myCashcadingID = 'FromLocation_' + rowid;
    var myCashcadingCtrl = $('#' + myCashcadingID);
    if (myCtrl.val() != '') {
        var url = '/CTV2/GetToLocationsFromTypes?TypeIDs=' + myCtrl.val();
        GetDataFromAjax(url).done(function (data) {
            refreshDropdown(data, myCashcadingID, false, 'Select Location');
            myCashcadingCtrl.EntrynEnableForEntry();
            if (myNextCtrlValue != '') {
                assignValueToDropdown(myCashcadingID, myNextCtrlValue);
            }
        });
        myCtrl.isValid();        
        LockMultiSelect('ConToLocationType_' + rowid);
        LockMultiSelect('ConToLocation_' + rowid);
    }
    else { myCtrl.isInvalid(); myCashcadingCtrl.EntrynDisabledForEntry(); }
    var addBtnID = 'AddBtn_' + rowid;
    RowAddButtonStatus(addBtnID);
    //SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function ChangeFromLocationVirtually(myCtrl, myNextCtrlValue) {
    //var myCtrl = $(ChangeFromLocation.caller.arguments[0].target);
    var rowid = myCtrl.attr('id').split('_')[1];
    var addBtnID = 'AddBtn_' + rowid;
    if (myCtrl.val() != '') {
        if (IsDuplicateFromLocation(rowid)) {
            if (myNextCtrlValue == '') {
                MyAlert(4, "This Location Is Already Scheduled On The Same Date You Are Providing.");
            }            
            myCtrl.isInvalid();
        }
        else {
            myCtrl.isValid();
            UnLockMultiSelect('ConToLocationType_' + rowid);
            //$('#ToLocationType_' + rowid).val(myNextCtrlValue);
            //UnLockMultiSelect('ConToLocation_' + rowid);
        }
    }
    else { myCtrl.isInvalid(); }
    var xCtrl = $('#ToLocationType_' + rowid);
    xCtrl.multiselect('clearSelection');
    xCtrl.multiselect('refresh');
    if (myNextCtrlValue != '') {
        var i = myNextCtrlValue.indexOf(',');
        if (i >= 0) {
            xCtrl.val(myNextCtrlValue.split(','));
        } else {
            xCtrl.val(myNextCtrlValue);
        }
        xCtrl.multiselect('refresh');
        myCtrl.isValid();
    } else { xCtrl.isInvalid(); } 
    
    $('#ToLocation_' + rowid).isInvalid();
    LockMultiSelect('ConToLocation_' + rowid);
    $('#UCSToLocation_' + rowid).html('');
    GetToDate(myCtrl.attr('id'));
    RowAddButtonStatus(addBtnID);
};
function ChangeToLocationTypeVirtually(myCtrl, myNextCtrlValue) {
    //var myCtrl = $(ChangeToLocationType.caller.arguments[0].target);
    var rowid = myCtrl.attr('id').split('_')[1];
    var loclabel = $('#UCSToLocation_' + rowid);
    var myCashcadingID = 'ToLocation_' + rowid;
    var myCashcadingCtrl = $('#' + myCashcadingID);
    if (myCtrl.val() != '') {
        var url = '/CTV2/GetToLocationsFromTypes?TypeIDs=' + myCtrl.val();
        GetDataFromAjax(url).done(function (data) {
            refreshMultiselect(data, myCashcadingID, true);
            myCashcadingCtrl.EntrynEnableForEntry();
            UnLockMultiSelect('ConToLocation_' + rowid);
            if (myNextCtrlValue != '') {
                assignValueToMultiSelect(myCashcadingID, myNextCtrlValue);
                //LockAllRowExceptLast('myTable');
                $('#TripPurpose').makeDisable();
                LockSection('tblOTVAdd');
            }
        });
        myCtrl.isValid();
        //myCashcadingCtrl.EntrynEnableForEntry();
    } else {
        myCtrl.isInvalid();
        myCashcadingCtrl.EntrynDisabledForEntry();
    }
    loclabel.html('x');
    var addBtnID = 'AddBtn_' + rowid;
    GetToDate(myCtrl.attr('id'));
    RowAddButtonStatus(addBtnID);
    //SubmitBtnStatus('btnSubmit', 'HdrDiv');
};
function RemoveBtnClicked(destinationTBody, SubmitBtnID, CtrlContainerID, TableID) {
    var r = $(RemoveBtnClicked.caller.arguments[0].target.closest('.add-row'));
    r.find('.cloneBtn').tooltip('hide');
    if (r.attr("id") == 0) {
    } else {
        r.remove();
    };
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    var lastRow = $('#' + TableID + ' tr:last');
    UnLockRow(lastRow.attr('id'));
    var x = DivInvalidCount(TableID);
    if (x > 0) { LockSection('tblOTVStatement'); }
    else {
        UnLockSection('tblOTVStatement');
        if (IsOtherPlaceSelected()) {
            $('#StatementOthLoc').makeEnable();
        } else { $('#StatementOthLoc').makeDisable(); }
    }
    SubmitBtnStatus(SubmitBtnID, CtrlContainerID);
    
};
function AddBtnClicked(sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn, IsAddBtnEnable, SubmitBtnID, CtrlContainerID) {
    var insrowid = $(AddBtnClicked.caller.arguments[0].target.closest('.add-row')).attr('id');
    AddBtnClickedVirtually(insrowid,sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn, IsAddBtnEnable, SubmitBtnID, CtrlContainerID)
    //var r = TableRowCloaning(sourceTBody, destinationTBody, insrowid, IsRemoveBtn, IsAddBtn, IsAddBtnEnable);
    //if (r > 0) { SubmitBtnStatus(SubmitBtnID, CtrlContainerID); }
    //var disableDates = GetDisableDates();
    //$('.disableDates').each(function () {
    //    DisableDatesInCalendar(disableDates, $(this).attr('id'));
    //});
    //$('.timePickerPreDateCtrlV2').each(function () {
    //    var myDtCtrl = $('#' + $(this).attr('id').split('-')[1]);
    //    var myNextCtrl = $('#FromLocationType_' + $(this).attr('id').split('_')[1]);
    //    $(this).datetimepicker({
    //        format: "hh:mm A"
    //    }).on("dp.show", function (e) {
    //        time = "01:00 PM"
    //    }).on("dp.change", function (e) {
    //        var myDate = myDtCtrl.val();
    //        $(this).isValid();
    //        myNextCtrl.EntrynEnableForEntry();
    //        if (myDate != '') {
    //            if (!IsValidTimeSelected(myDate, $(this).val())) {
    //                $(this).isInvalid();
    //                myNextCtrl.EntrynDisabledForEntry();
    //                MyAlert(4, "Selected Time Should Be Greater Than The Current Time.");
    //            }
    //            //If Want to restrict user for from-todate range validation.
    //            //if (!IsIntervalChecking(myDate, $(this).val(), $(this).attr('id').split('_')[1])) {
    //            //    $(this).isInvalid();
    //            //    myNextCtrl.EntrynDisabledForEntry();
    //            //    MyAlert(4, "Vehicle Already Scheduled For The Selected Interval.");
    //            //}
    //        }
    //    });
    //});
    //$('.addBtn').each(function () { $(this).makeDisable(); });    
    //LockRow(insrowid);
    //UnLockRow(r);
    //$('#' + r).find('.btn-default').each(function () {
    //    $(this).addClass('nodrop disabled bg-blue');
    //});
    //LockSection('tblOTVStatement');
};
function AddBtnClickedVirtually(insrowid,sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn, IsAddBtnEnable, SubmitBtnID, CtrlContainerID) {
    //var insrowid = $(AddBtnClicked.caller.arguments[0].target.closest('.add-row')).attr('id');
    var r = TableRowCloaning(sourceTBody, destinationTBody, insrowid, IsRemoveBtn, IsAddBtn, IsAddBtnEnable);
    if (r > 0) { SubmitBtnStatus(SubmitBtnID, CtrlContainerID); }
    var disableDates = GetDisableDates();
    $('.disableDates').each(function () {
        DisableDatesInCalendar(disableDates, $(this).attr('id'));
    });
    $('.timePickerPreDateCtrlV2').each(function () {
        var myDtCtrl = $('#' + $(this).attr('id').split('-')[1]);
        var myNextCtrl = $('#FromLocationType_' + $(this).attr('id').split('_')[1]);
        $(this).datetimepicker({
            format: "hh:mm A"
        }).on("dp.show", function (e) {
            time = "01:00 PM"
        }).on("dp.change", function (e) {
            var myDate = myDtCtrl.val();
            $(this).isValid();
            myNextCtrl.EntrynEnableForEntry();
            if (myDate != '') {
                if (!IsValidTimeSelected(myDate, $(this).val())) {
                    $(this).isInvalid();
                    myNextCtrl.EntrynDisabledForEntry();
                    MyAlert(4, "Selected Time Should Be Greater Than The Current Time.");
                }
                //If Want to restrict user for from-todate range validation.
                //if (!IsIntervalChecking(myDate, $(this).val(), $(this).attr('id').split('_')[1])) {
                //    $(this).isInvalid();
                //    myNextCtrl.EntrynDisabledForEntry();
                //    MyAlert(4, "Vehicle Already Scheduled For The Selected Interval.");
                //}
            }
        });
    });
    $('.addBtn').each(function () { $(this).makeDisable(); });
    LockRow(insrowid);
    UnLockRow(r);
    $('#' + r).find('.btn-default').each(function () {
        $(this).addClass('nodrop disabled bg-blue');
    });
    LockSection('tblOTVStatement');
};
function GetInitialData() {
    var notenumber = $('#NoteNumber').val();
    //alert(notenumber);
    $.ajax({
        url: '/CTV2/GetOtheEntryData',
        method: 'GET',
        data: { NoteNumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.TripPurpose != '' && item.TripPurpose !=null) {
                    $('#TripPurpose').val(item.TripPurpose).isValid();
                    UnLockSection('tblOTVAdd');
                    //LockAllRowExceptLast('myTable');
                    var tripdtls = item.TripDetails;
                    $.each(tripdtls, function (dataindex, data) {
                        if (dataindex > 0) {
                            AddBtnClickedVirtually(dataindex - 1, 'tbody1', 'tbody2', true, true, true, 'btnSubmit', 'HdrDiv');
                            
                        }
                        var fromDTCtrl = $('#FromDate_' + dataindex);
                        var fromloctypeCtrl = $('#FromLocationType_' + dataindex);
                        var fromlocCtrl = $('#FromLocation_' + dataindex);
                        var toloctypeCtrl = $('#ToLocationType_' + dataindex);
                        var tolocCtrllbl = $('#UCSToLocation_' + dataindex);
                        var todateCtrl= $('#ToDate_' + dataindex);
                        fromDTCtrl.val(data.FromDate);
                        FromDateChangedVirtually(fromDTCtrl);
                        $('#time-FromDate_' + dataindex).val(data.FromTime).isValid();
                        
                        fromloctypeCtrl.EntrynEnableForEntry();
                        fromloctypeCtrl.val(data.FromLocationTypeCode);
                        ChangeFromLocationTypeVirtually(fromloctypeCtrl, data.FromLocationCode);
                        
                        ChangeFromLocationVirtually(fromlocCtrl, data.ToLocationTypeCodes);
                        ChangeToLocationTypeVirtually(toloctypeCtrl, data.ToLocationCodes);
                        tolocCtrllbl.html(data.ToLocationCodes);
                        todateCtrl.val(data.ToDateDisplay).isValid();
                        fromloctypeCtrl.isValid();
                        fromlocCtrl.isValid();
                        toloctypeCtrl.isValid();
                        
                    });

                    var othstCtrl = $('#StatementOthLoc');
                    var disstCtrl = $('#StatementDIC');
                    var section3 = $('#tblOTVStatement');
                    UnLockSection('tblOTVStatement');
                    if (item.IsOtherPlaceStatement) {
                        othstCtrl.val(1).isValid();
                    } else { othstCtrl.val('').attr('disabled','disabled') }
                    disstCtrl.val(1).isValid();
                    section3.isGreen();                    
                }               
                
            });
            
        }
    });
};
$(document).ready(function () {
    SettingSlotForFromDate();
    GetInitialData();
    LockSection('tblOTVAdd');
    LockSection('tblOTVStatement');
    $('.timePickerPreDateCtrlV2').each(function () {
        var myDtCtrl = $('#' + $(this).attr('id').split('-')[1]);
        var myNextCtrl = $('#FromLocationType_' + $(this).attr('id').split('_')[1]);
        $(this).datetimepicker({
            format: "hh:mm A"
        }).on("dp.show", function (e) {
            time = "01:00 PM"
        }).on("dp.change", function (e) {
            var myDate = myDtCtrl.val();
            $(this).isValid();
            myNextCtrl.EntrynEnableForEntry();
            if (myDate != '') {
                if (!IsValidTimeSelected(myDate, $(this).val())) {
                    $(this).isInvalid();
                    myNextCtrl.EntrynDisabledForEntry();
                    MyAlert(4, "Selected Time Should Be Greater Than The Current Time.");
                }
                //IsIntervalChecking(myDate, $(this).val(), $(this).attr('id').split('_')[1]);
            }

        });
    });    
});
//Dummy Functions

