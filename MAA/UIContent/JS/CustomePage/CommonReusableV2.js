// File Uploading
var cW;
function OpenFileInNewTab(filepath) {
    if (filepath == null || filepath == '') {
        MyAlert(3, 'Unable To Find Uploaded File.');
    } else {
        if (cW === undefined || (cW != undefined && cW.closed)) {
            cW = window.open(filepath);
        }
        else {
            MyAlertWithCallBack(5,'File Is Already Opened.', FocusTab)            
        }
    }    
};
function FocusTab() {
    cW.focus();
};
//Bhushan Add for file and Rules links
function OpenWindow(filepath) {
    if (filepath == null || filepath == '') {
        MyAlert(3, 'Unable To Find Uploaded File.');
    } else {
        if (cW === undefined || (cW != undefined && cW.closed)) {
            cW = window.open(filepath);
        }
        else {
            MyAlertWithCallBack(5, 'File Is Already Opened.', FocusTab)
        }
    }
};
var cWRule;
function OpenWindowRule(filepath) {
    if (filepath == null || filepath == '') {
        MyAlert(3, 'Unable To Find Tour Rule.');
    } else {
        if (cWRule === undefined || (cWRule != undefined && cWRule.closed)) {
            cWRule = window.open(filepath);
        }
        else {
            MyAlertWithCallBack(5, 'Tour Rule Is Already Opened.', FocusTabRule)
        }
    }
};
function FocusTabRule() {
    cWRule.focus();
};
var cWTRule;
function OpenWindowTRule(filepath) {
    if (filepath == null || filepath == '') {
        MyAlert(3, 'Unable To Find TA & DA Rules.');
    } else {
        if (cWTRule === undefined || (cWRule != undefined && cWTRule.closed)) {
            cWTRule = window.open(filepath);
        }
        else {
            MyAlertWithCallBack(5, 'TA & DA Rules Is Already Opened.', FocusTabTRule)
        }
    }
};
function FocusTabTRule() {
    cWTRule.focus();
};

// Section - Data Picking
function GetDataFromTable(tableName) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    var schrecords = '';
    var dataname;
    var datavalue;
    var mrecord = '';
    $('#' + tableName + ' tbody tr').each(function () {
        mRow = $(this);
        mRow.find('[data-name]').each(function () {
            that = $(this);
            dataname = that.attr('data-name');
            if (that.hasClass('htmlVal')) {
                datavalue = that.html();
            }
            else { datavalue = that.val(); }
            mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
        });
        mRow.find('[data-name-text]').each(function () {
            that = $(this);
            dataname = that.attr('data-name-text');
            thatid = that.attr('id');
            datavalue = $('#' + thatid + ' option:selected').toArray().map(item => item.text).join();
            mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
        });
        mrecord = mrecord.replace(/,\s*$/, "");
        schrecords = schrecords + '{' + mrecord + '},';
        mrecord = '';
    });
    schrecords = schrecords.replace(/,\s*$/, "");
    schrecords = '[' + schrecords + ']';
    //alert(schrecords);
    return schrecords;
};
//Section - Input Controll Functionalities
function PostDataInAjax(url, BodyParamInJson) {    
    return $.ajax({
        method: 'POST',
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: BodyParamInJson
    });
};
function HandleResponseOfPostRequest(data,AfterSucessRedirectUrl) {
    //REsponse should come in "CustomAjaxResponse" object.
    $(data).each(function (index, item) {
        if (item.bResponseBool == true) {
            if (AfterSucessRedirectUrl == '') {
                MyAlert(1, "Data Saved Successfully.");
            } else { MyAlertWithRedirection(1, "Data Saved Successfully.", AfterSucessRedirectUrl); }
        }
        else {
            MyAlert(3, item.sResponseString);
        }
    });
};
function GetDataFromAjax(url) {
    //alert(url);
    return $.ajax({
        url: url,
        method: "GET",
        dataType: "json"
    });
};
function refreshDropdown(data, myCtrlID, IsIDString, DefaultText) {
    var myCtrl = $("#" + myCtrlID);
    myCtrl.empty(); // Clear existing options
    myCtrl.append($('<option/>', { value: "", text: DefaultText })); // Adding Default Text
    $.each(data, function (index, item) {
        if (IsIDString) {
            myCtrl.append($('<option/>', { value: item.IDStr, text: item.DisplayText }));
        } else {
            myCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
        }
    });
    myCtrl.isInvalidCtrl();
}
function assignValueToDropdown(myCtrlID,value) {
    // Assign the specified value to the dropdown    
    if (value != '') { $("#" + myCtrlID).val(value).isValid(); }
}
function refreshMultiselect(data, myCtrlID, IsIDString) {
    var myCtrl = $("#" + myCtrlID);
    myCtrl.empty();
    myCtrl.multiselect('destroy');
    //myCtrl.append($('<option/>', { value: "", text: DefaultText })); // Adding Default Text
    $.each(data, function (index, item) {
        if (IsIDString) {
            myCtrl.append($('<option/>', { value: item.IDStr, text: item.DisplayText }));
        }
        else { myCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText })); }
    });
    myCtrl.attr('multiple', 'multiple');
    myCtrl.multiselect({
        templates: {
            button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
    myCtrl.multiselect('clearSelection');
    myCtrl.multiselect('refresh');
    myCtrl.isInvalidCtrl();
}
function assignValueToMultiSelect(myCtrlID, value) {
    if (value != '') {
        xCtrl=$("#" + myCtrlID);
        var i = value.indexOf(',');
        if (i >= 0) {
            xCtrl.val(value.split(','));
        } else {
            xCtrl.val(value);
        }

        xCtrl.multiselect('refresh');
        xCtrl.isValid();
    }
}
function FillCashCadingDropDown(myCtrlID, url, IsIDString,DefaultText) {
    var myCtrl = $('#' + myCtrlID);
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            myCtrl.empty();
            myCtrl.append($('<option/>', { value: "-1", text: DefaultText }));
            $(data).each(function (index, item) {
                if (IsIDString) {
                    myCtrl.append($('<option/>', { value: item.IDStr, text: item.DisplayText}));
                } else {
                    myCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
                }
            });
        }
    });
};
function FillCashCadingMultiSelect(myCtrlID, url,IsIDString) {
    var myCtrl = $('#' + myCtrlID);
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            myCtrl.empty();
            myCtrl.multiselect('destroy');
            $(data).each(function (index, item) {
                if (IsIDString) {
                    myCtrl.append($('<option/>', { value: item.IDStr, text: item.DisplayText }));}
                else { myCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText })); }
            });
            myCtrl.attr('multiple', 'multiple');
            myCtrl.multiselect({
                templates: {
                    button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
            myCtrl.multiselect('clearSelection');
            myCtrl.multiselect('refresh');
        }
    });
};
//Section - Common Button Functionality
function ClearBtnClicked(pageurl) {
    if ($('#IsBackDenied').val() == 1) {
        MyAlertWithRedirection(5, 'All Recently Unsaved Data Will Be Lost.', pageurl);
    }
    else {
        window.location.href = pageurl;
    }
};
function SubmitBtnStatus(SubmitBtnID, ControlDivID) {
    var SubmitBtn = $('#' + SubmitBtnID);
    var x = DivInvalidCount(ControlDivID);
    if (x == 0) { SubmitBtn.makeEnable(); } else { SubmitBtn.makeDisable() }
    $('#IsBackDenied').val(1);
};
function BackBtnClicked() {
    $.ajax({
        url: "/Security/Common/BackButtonClicked",
        success: function (result) { window.location.href = result; }
    });
};
function NormalBackBtnClicked(pageurl) {
    if ($('#IsBackDenied').val() == 1) {
        MyAlertWithRedirection(2, 'Are You Sure Want to Go Back?', pageurl)
    }
    else {
        window.location.href = pageurl;
    }
};
//Section - Table Row Cloaning
function RowSpanRemoveBtnClicked() {
    var $row = $(RowSpanRemoveBtnClicked.caller.arguments[0].target.closest('.add-row'));
    var nextrow = $row.next();
    var ind = 0;
    $row.find('td').each(function (index, element) {
        var $cell = $(element);
        var rowspan = $cell.attr('rowspan');
        if (rowspan > 1) {
            $cell.attr('rowspan', rowspan - 1);
            var $secondCell = nextrow.find('td:eq(' + ind + ')');
            $secondCell.before($cell);
            ind += 1;
            $row.remove();
        } else {
            $cell.remove();
        }
    });
};
function RowRemoveBtnClicked(destinationTBody) {
    var r = $(RowRemoveBtnClicked.caller.arguments[0].target.closest('.add-row'));
    r.find('.btn').tooltip('hide');
    if (r.attr("id") == 0) {
    } else {
        r.remove();
    };
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });    
};
function RowRemoveBtnWithEffectSubmitClicked(destinationTBody, SubmitBtnID, CtrlContainerID) {
    var r = $(RowRemoveBtnWithEffectSubmitClicked.caller.arguments[0].target.closest('.add-row'));
    r.find('.btn').tooltip('hide');
    if (r.attr("id") == 0) {
    } else {
        r.remove();
    };
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    SubmitBtnStatus(SubmitBtnID, CtrlContainerID);
};
function RowRemoveBtnWithEnablePreRow(destinationTBody, SubmitBtnID, CtrlContainerID, TableID) {
    var r = $(RowRemoveBtnWithEnablePreRow.caller.arguments[0].target.closest('.add-row'));
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
    SubmitBtnStatus(SubmitBtnID, CtrlContainerID);
};
function RowAddBtnClick(sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn, IsAddBtnEnable) {
    var insrow = $(RowAddBtnClick.caller.arguments[0].target.closest('.add-row'));
    var insrowid = insrow.attr('id');
    var clonerowid = TableRowCloaning(sourceTBody, destinationTBody, insrowid, IsRemoveBtn, IsAddBtn, IsAddBtnEnable);
    return clonerowid;
};
function RowAddBtnWithEffectSubmitClicked(sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn, IsAddBtnEnable, SubmitBtnID, CtrlContainerID) {
    var insrowid = $(RowAddBtnWithEffectSubmitClicked.caller.arguments[0].target.closest('.add-row')).attr('id');
    var r = TableRowCloaning(sourceTBody, destinationTBody, insrowid, IsRemoveBtn, IsAddBtn, IsAddBtnEnable);
    if (r > 0) { SubmitBtnStatus(SubmitBtnID, CtrlContainerID);}
};
function TableRowCloaning(sourceTBody, destinationTBody, rowid, IsRemoveBtn, IsAddBtn, IsAddBtnEnable) {
    //New - 1. Checkbox Label for attribute functionality autogenerated 2. InvisibleTag introduced
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
    // buttons should have class "cloneBtn" - For tooltip functionalities
    //"addBtn" and removeBtn are also used for corrosponding buttons of a row
    //"CustomDateFormatCloneRow" - This class is used for customdatepicker. 
    //If multiselects are in a row then use the class "clonemultiselect" and remove multiple attribute and the classes which are responsible for multiselect creations.
    //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    // "inVisibleTag" & "inValidTag" use this class to make a controll invalid or invisible when cloaning.
    //alert('CloneRow');
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody + ' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
        //that.val('').isInvalid();
    });
    cloneready.find('.form-check-label').each(function () {
        that = $(this);
        var mID = that.attr('id');
        that.attr('for', 'opt' + mID)
    });
    cloneready.find('.inValidTag').each(function () {
        that = $(this);
        that.val('');
        that.isInvalid();
    });
    cloneready.find('.inValidCtrlTag').each(function () {
        that = $(this);
        that.val('');
        that.isInvalidCtrl();
    });
    cloneready.find('.inVisibleTag').each(function () {
        that = $(this);
        //that.val('');
        that.addClass('inVisible');
    });
    cloneready.find('.btn-group').remove();
    cloneready.find('.ApplyMultiSelectWithSelectAll').each(function () {
        that = $(this);
        that.prop('multiple', 'multiple');
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
            includeSelectAllOption: true,
            selectAllName: 'select-all-name'
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
    cloneready.find('.ApplyMultiSelect').each(function () {
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
    cloneready.find('input[type="date"]').each(function () {
        $(this).ApplyCustomDateFormat();
    });
    cloneready.find('.CustomTimeFormatCloneRow').each(function () {
        var firstOpen = true;
        var time;
        $(this).datetimepicker({
            useCurrent: false,
            format: "hh:mm A"
        }).on('dp.show', function () {
            if (firstOpen) {
                time = moment().startOf('day');
                firstOpen = false;
            } else {
                time = "01:00 PM"
            }

            $(this).data('DateTimePicker').date(time);
        });
    });
    cloneready.find('.CustomDateFormatCloneRow').each(function () {
        $(this).change(function () {
            $(this).CustomDateFormatCloneRow();
        });
    });
    cloneready.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('click mouseleave', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.datelabel').each(function () {
        $(this).html('Select Date');
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    cloneready.find('.addBtn').each(function () {
        var that = $(this);
        if (IsAddBtn) {
            that.removeClass('inVisible');
            if (IsAddBtnEnable) { that.removeAttr('disabled'); } else { that.attr('disabled', 'disabled'); }
        } else {
            that.addClass('inVisible');
        }
    });
    cloneready.find('.removeBtn').each(function () {
        var that = $(this);
        if (IsRemoveBtn) {
            that.removeClass('inVisible');
        } else { that.addClass('inVisible'); }
    });
    sourcebody.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.form-control').each(function () {
        $(this).focus(function () {
            $(this).tooltip('show');
        });
    });
    cloneready.find('.EntrynDisabledForEntry').each(function () {
        $(this).EntrynDisabledForEntry();
    });
    cloneready.find('.btn-default').each(function () {
        $(this).removeClass('nodrop disabled');
    });
    if (rowid == 0) {
        if (maxrows == 0) {
            destinationbody.append(cloneready);
        } else {
            $(cloneready).insertBefore('#' + destinationTBody + ' tr:first');
        }
    } else {
        $(cloneready).insertAfter('#' + rowid);
    }
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    //sourcebody.find('.addBtn')
    return r;
};
//Section - Date Time Functions
function GetCurrentDate(formatindex) {
    // 0. 'dd/MM/yyyy'
    // 1. 'dd-MM-yyyy'
    // 2. 'yyyy-MM-dd'    
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based
    var day = ('0' + currentDate.getDate()).slice(-2);
    if (formatindex == 1) {
        return  day + '-' + month + '-' + year;
    } else if (formatindex == 2) {
        return year + '-' + month + '-' + day;
    }else {
        return day + '/' + month + '/' + year;
    }
    
};
function GetCurrentTime() {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    alert(('0' + currentHour).slice(-2) + ':' + ('0' + currentMinute).slice(-2));
    return ('0' + currentHour).slice(-2) + ':' + ('0' + currentMinute).slice(-2);
}
function IsValidTimeSelected(InputDate, InputTime) {
    //InputDate='2023-05-22' InputTime='20:22'
    var targetDateTime = new Date(InputDate + ' ' + InputTime);
    var currentDateTime = new Date().getTime() - 59000;
    //alert('Target : ' + targetDateTime.getTime() + ' Current: ' + currentDateTime );
    if (targetDateTime.getTime() >= currentDateTime) {
        return true;
    } else {
        return false;
    }
};
function IsCurrentDate(InputDate) {
    //InputDate='2023-05-22'
    var targetDate = new Date(InputDate);
    var currentDate = new Date();
    if (targetDate.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
};
$.fn.ApplyCustomDateFormat = function () {
    var that = this;
    var parentid = that.attr('id');
    var lblid = 'lbl' + parentid;
    var dt = this.val();
    var e = dt;
    if (dt.indexOf('/') != -1) {
        var e = dt.split('/').reverse().join('/');
    }
    else {
        var e = dt.split('-').reverse().join('/');
    }
    if (dt != '') { $('#' + lblid).html(e); } else { $('#' + lblid).html('Select A Date'); }
    
    //that.addClass('is-valid').removeClass('is-invalid')
};
$.fn.DisableDates = function () {
    var that = this;
    var disabledDates = ["2023-05-21", "2023-05-25", "2023-05-29"];
    that.datepicker({
        beforeShowDay: function (date) {
            var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
            return [disabledDates.indexOf(formattedDate) === -1];
        }
    });
};
function DisableDatesInCalendar(disabledDates, CtrlID) {
    var dateInput = document.getElementById(CtrlID);
    dateInput.addEventListener("input", function () {
        var selectedDate = this.value;
        // Check if the selected date is in the array of disabled dates
        if (disabledDates.includes(selectedDate)) {
            this.value = ""; // Clear the input value
            MyAlert(4, 'Local Trip Schedule Is Done On This Date. Please Select Another Date.')
            //alert("This date is disabled. Please select another date.");
        }
    });
};
function GetDisableDates() {    
    return $('#Slots_OccupiedSlots').val().split(',');
    //$.each(slots, function (index, value) {
    //    dates.push(value);
    //});

    //var dates = [];
    //dates.push("2023-05-25");
    //dates.push("2023-05-28");
    //dates.push("2023-05-31");
    //return dates;
};
//Section - Helper Functions
function DivInvalidCount(mdivID) {
    var x = 0;
    var mDiv = $('#' + mdivID);
    x = mDiv.find('.is-invalid').length;
    return x;
};
function WordCount(value) {
    return $.trim(value).split(" ").length;
};
//Section - Style Function

function LockRow(id) {
    var myCtrl = $('#' + id);
    myCtrl.find('.rowlock').each(function () {
        $(this).attr('disabled', 'disabled')
            .addClass('nodrop').tooltip('hide');
    });
    myCtrl.find('.SLUCtrl').each(function () {
        $(this).attr('disabled', 'disabled')
            .addClass('nodrop').tooltip('hide');
    });
    myCtrl.find('.btn-default').each(function () {
        $(this).addClass('nodrop disabled');
    });
};
function UnLockRow(id) {    
    var myCtrl = $('#' + id);
    myCtrl.find('.rowlock').each(function () {
        var that = $(this);
        that.removeAttr('disabled').removeClass('nodrop');
    });
    myCtrl.find('.SLUCtrl').each(function () {
        var that = $(this);
        that.removeAttr('disabled').removeClass('nodrop');
    });
    myCtrl.find('.btn-default').each(function () {
        $(this).removeClass('nodrop disabled bg-blue');
    });
    myCtrl.find('.addBtn').each(function () {
        var x = myCtrl.find('.is-invalid').length;
        var that = $(this);
        if (x == 0) { that.removeAttr('disabled').removeClass('nodrop'); }
        else { that.attr('disabled', 'disabled'); }
    });
    myCtrl.removeClass('nodrop sectionB');
};
function LockAllRowExceptLast(tableID) {
    var lastRow = $('#' + tableID + ' tr:last').attr('id');
    $("#" + tableID + " tbody tr").each(function () {
        var that = $(this);
        if (lastRow !== that.attr('id')) {
            LockRow(that.attr('id'));
        } else {
            UnLockRow(that.attr('id'));
            //if (that.find('.is-invalid').length == 0) {
            //    that.find('.addBtn').removeAttr('disabled');
            //}
        }
    });
};
function UnlockNextCtrl(myCtrlID) {
    var myCtrl = $('#' + myCtrlID);
    var myDiv = myCtrl.closest('.inputDiv');
    const inputControls = myDiv.find('.inputCtrl');
    const currentIndex = inputControls.index(myCtrl);
    if (currentIndex < inputControls.length - 1) {
        if (inputControls.eq(currentIndex + 1).is(":visible")) {
            UnLockControl(inputControls.eq(currentIndex + 1).attr('id'));           
        } else {
            UnlockNextCtrl(inputControls.eq(currentIndex + 1).attr('id'));
        }        
    }
};
function LockNextCtrls(myCtrlID) {
    var myCtrl = $('#' + myCtrlID);
    var myDiv = myCtrl.closest('.inputDiv');
    const inputControls = myDiv.find('.inputCtrl');
    const currentIndex = inputControls.index(myCtrl);
    if (currentIndex < inputControls.length - 1) {
        if (inputControls.eq(currentIndex + 1).is(":visible")) {
            LockControl(inputControls.eq(currentIndex + 1).attr('id'));
        }
        LockNextCtrls(inputControls.eq(currentIndex + 1).attr('id'));
    }
};
function LockSection(id) {
    var myCtrl = $('#' + id);
    myCtrl.find('input').each(function () {
        $(this).attr('disabled', 'disabled').addClass('nodrop');
    });
    myCtrl.find('select').each(function () {
        $(this).attr('disabled', 'disabled').addClass('nodrop');
    });
    myCtrl.find('textarea').each(function () {
        $(this).attr('disabled', 'disabled');
    });
    myCtrl.find('button').each(function () {
        $(this).attr('disabled', 'disabled');
    });
    //myCtrl.find('.EntrynDisabledForEntry').each(function () {
    //    $(this).EntrynDisabledForEntry();
    //});
    //myCtrl.find('.EntryDoneDisableMode').each(function () {
    //    $(this).EntryDoneDisableMode();
    //});
    myCtrl.addClass('sectionB');
};
function UnLockSection(id) {
    var myCtrl = $('#' + id);
    myCtrl.find('input').each(function () {
        $(this).removeAttr('disabled').removeClass('nodrop');
    });
    myCtrl.find('select').each(function () {
        $(this).removeAttr('disabled').removeClass('nodrop');;
    });
    myCtrl.find('textarea').each(function () {
        $(this).removeAttr('disabled');
    });
    myCtrl.find('button').each(function () {
        if ($(this).hasClass('addBtn')) {  }
        else { $(this).removeAttr('disabled'); }        
    });
    //myCtrl.find('.addBtn').each(function () {
    //    $(this).attr('disabled', 'disabled');
    //});
    myCtrl.find('.EntrynDisabledForEntry').each(function () {
        $(this).attr('disabled', 'disabled').addClass('nodrop');
    });
    myCtrl.find('.ApplyMultiSelect').each(function () {
        if ($(this).val() == '') {
            LockMultiSelect('Con' + $(this).attr('id'));
            $(this).isInvalid();
        } else {
            UnLockMultiSelect('Con' + $(this).attr('id'));
            $(this).isValid();
        }
    });
    myCtrl.find('.AlwaysLock').each(function () {
        $(this).attr('disabled', 'disabled').addClass('nodrop');
    });
    myCtrl.removeClass('sectionB');
};
function LockControl(id) {
    var myCtrl = $('#' + id);
    myCtrl.attr('disabled', 'disabled');
    if (myCtrl.hasClass('EntrynDisabledForEntry')) { myCtrl.EntrynDisabledForEntry(); }
};
function UnLockControl(id) {
    var myCtrl = $('#' + id);
    myCtrl.removeAttr('disabled');
    if (myCtrl.hasClass('EntrynDisabledForEntry')) { myCtrl.EntrynEnableForEntry(); }
};
function LockMultiSelect(id) {
    var myCtrl = $('#' + id);
    myCtrl.find('.btn-default').each(function () {
        $(this).addClass('nodrop disabled bg-blue');
    });    
};
function UnLockMultiSelect(id) {
    var myCtrl = $('#' + id);
    myCtrl.find('.btn-default').each(function () {
        $(this).removeClass('nodrop disabled bg-blue');
        $(this).removeAttr('disabled');
    });
};
$.fn.EntrynDisabledForEntry = function () {
    var that = this;
    that.val('');
    that.attr('disabled', 'disabled')
        .addClass('bg-blue border-red nodrop is-invalid')
        .removeClass('is-valid');
};
$.fn.EntrynEnableForEntry = function () {
    var that = this;
    that.removeAttr('disabled')
        .addClass('is-invalid')
        .removeClass('bg-blue border-blue is-valid nodrop');
    that.val('');
};
$.fn.EntryDoneDisableMode = function () {
    var that = this;
    that.attr('disabled', 'disabled').addClass('bg-blue border-green');
};
$.fn.BtnDisableAfterEntry = function () {
    var that = this;
    that.attr('disabled', 'disabled').addClass('border-green');
};
$.fn.CustomDateFormatCloneRow = function () {
    var that = this;
    var parentid = that.attr('id');
    var lblid = 'lbl' + parentid;
    var dt = this.val();
    var e = dt;
    if (that.val() != '') {
        if (dt.indexOf('/') != -1) {
            var e = dt.split('/').reverse().join('/');
        }
        else {
            var e = dt.split('-').reverse().join('/');
        }
        $('#' + lblid).html(e);
    } else { $('#' + lblid).html('Select Date'); }
    
    //that.addClass('is-valid').removeClass('is-invalid')
};
//Section Start - Validations
function validatePassword(password) {
    //(?=.* [a - z]) Contains at least one lowercase letter
    //(?=.* [A - Z]) Contains at least one uppercase letter
    //(?=.*\d) Contains at least one digit
    //(?=.* [@$!%*?&]) Contains at least one special character
    //[A - Za - z\d@$!%*?&]{ 6,} Contains at least 6 characters and only includes uppercase

    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return regex.test(password);
}
function isAlphanumeric(input) {
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(input);
}
function isAlphanumericWithSpace(input) {
    var regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(input);
}
function isValidContactNumber(contact) {
    var regex = /^\d{10}$/;
    return regex.test(contact);
}
function isValidMaxWordCount(value, MaxNoOfWordsRequired) {
    var wordcount = $.trim(value).split(" ").length;
    if (wordcount <= MaxNoOfWordsRequired) { return true; } else { return false;}
}
function isDecimalNumber(input) {
    var regex = /^\d+(\.\d+)?$/;
    return regex.test(input);
}
function isNumeric(input) {
    var regex = /^[0-9]+$/;
    return regex.test(input);
}
function isAlphabateWithMaxLimit(input, maxLimit) {
    if (input.length > maxLimit) { return false; }
    else {
        return input.match(/^[a-zA-Z]+$/);
        //var regex = /^[a-zA-Z]+$/;
        //return regex.test(input);
    }    
};
function isAlphabateWithSpace(input, maxLimit) {
    if (input.length > maxLimit) { return false; }
    else {
        return input.match(/^[a-zA-Z\s]+$/);
        //var regex = /^[a-zA-Z]+$/;
        //return regex.test(input);
    }
};
function ValidateEmployeeForTour(Employees,FromDate,Todate) {
    var url = '/EHG/GetEmployeeValidationForTour?Employees=' + Employees + '&FromDate=' + FromDate + '&ToDate=' + Todate;
    GetDataFromAjax(url).done(function (data) {
        if (data.bResponseBool == true) {
            //MyAlert(1, 'Validation Successful');
            return true;
        }
        else {
            MyAlert(3, data.sResponseString);
            return false;
        }
    });
};
function CompareStringsForCommonValue(CommaSeparatedString1, CommaSeparatedString2) {
    debugger;
    //var xSet = new Set(CommaSeparatedString1.split(','));
    //var ySet = new Set(CommaSeparatedString2.split(','));
    var commonElements = [];

    $.each(CommaSeparatedString1, function (index, value) {
        if ($.inArray(value, CommaSeparatedString2) !== -1) {
            commonElements.push(value);
        }
    });
    if (commonElements.length > 0) {
        return true;
    } else { return false;}
};
//Section Start - Runtime Classess
$.fn.isInvalid = function () {
    var that = this;
    that.addClass('is-invalid valid').removeClass('is-valid');
    that.isInvalidCtrl();
};
$.fn.isValid = function () {
    var that = this;
    that.addClass('is-valid valid').removeClass('is-invalid');
    that.isValidCtrl();
};
$.fn.isSInvalid = function () {
    var that = this;
    that.addClass('is-invalid valid').removeClass('is-valid');
};
$.fn.isSValid = function () {
    var that = this;
    that.addClass('is-valid valid').removeClass('is-invalid');
};
$.fn.makeEnable = function () {
    var that = this;
    that.removeAttr('disabled');
    that.removeClass('nodrop');
};
$.fn.makeDisable = function () {
    var that = this;
    that.attr('disabled', 'disabled');
    that.addClass('nodrop');
};
$.fn.makeVisible = function () {
    var that = this;
    that.removeClass('inVisible');
};
$.fn.makeInvisible = function () {
    var that = this;
    that.AddClass('inVisible');
};
$.fn.isRed = function () {
    var that = this;
    that.addClass('border-red').removeClass('border-green');
};
$.fn.isGreen = function () {
    var that = this;
    that.addClass('border-green').removeClass('border-red');
};
function MakeDivGreen(divID) {
    var mDiv = $('#' + divID);
    x = mDiv.find('.is-invalid').length;
    if (x > 0) { mDiv.isRed(); } else { mDiv.isGreen(); }
};
//Section Start- SweetAlert Templates
function MyAlert(MessageType, MessageText) {
    //MessageType 0-Information Alert, 1-Success Alert,2-Confirmation Alert,
    //MessageType  3- Eror Alert. 4- Validation Failed Alert,5-Warning Alert,
   
    switch (MessageType) {
        case 1:
            MySuccessAlert(MessageText,'');
            break;
        case 2:
            MyConfirmationAlert(MessageText,'');
            break;
        case 3:
            MyErrorAlert(MessageText,'');
            break;
        case 4:
            MyValidationFailedAlert(MessageText,'');
            break;
        case 5:
            MyWarningAlert(MessageText,'');
            break;
        case 6:
            MyConfirmationAlertV2(MessageText,'');
            break;
        default:
            MyInformationAlert(MessageText, '');
            break;
    }
};
function MyAlertWithCallBack(MessageType, MessageText, callBackFunctionName) {
    //MessageType 0-Information Alert, 1-Success Alert,2-Confirmation Alert,
    //MessageType  3- Eror Alert. 4- Validation Failed Alert,5-Warning Alert,
    //debugger;
    switch (MessageType) {
        case 1:
            MySuccessAlert(MessageText, callBackFunctionName);
            break;
        case 2:
            MyConfirmationAlert(MessageText, callBackFunctionName);
            break;
        case 3:
            MyErrorAlert(MessageText, callBackFunctionName);
            break;
        case 4:
            MyValidationFailedAlert(MessageText, callBackFunctionName);
            break;
        case 5:
            MyWarningAlert(MessageText, callBackFunctionName);
            break;
        case 6:
            MyConfirmationAlertV2(MessageText, callBackFunctionName);
            break;
        case 7:
            MyConfirmationCancelAlert(MessageText, callBackFunctionName);
            break;
        default:
            MyInformationAlert(MessageText, callBackFunctionName);
            break;
    }
};
function MyAlertWithRedirection(MessageType, MessageText, RedirectUrl) {
    //MessageType 0-Information Alert, 1-Success Alert,2-Confirmation Alert,
    //MessageType  3- Eror Alert. 4- Validation Failed Alert,5-Warning Alert,
    switch (MessageType) {
        case 1:
            MySuccessAlertWithRedirection(MessageText, RedirectUrl);
            break;
        case 2:
            MyConfirmationAlertWithRedirection(MessageText, RedirectUrl);
            break;
        case 3:
            MyErrorAlertWithRedirection(MessageText, RedirectUrl);
            break;
        case 4:
            MyValidationFailedAlertWithRedirection(MessageText, RedirectUrl);
            break;
        case 5:
            MyWarningAlertWithRedirection(MessageText, RedirectUrl);
            break;
        case 7:
            MyConfirmationAlertWithRedirectionOnCancel(MessageText, RedirectUrl);
            break;
        default:
            MyInformationAlertWithRedirection(MessageText, RedirectUrl);
            break;
    }
};

function MySuccessAlert(MessageText, callback) {
    Swal.fire({
        title: 'Success',
        text: MessageText,
        icon: 'success',
        customClass: 'swal-wide my-success',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback!='' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MyInformationAlert(MessageText, callback) {
    Swal.fire({
        title: 'Information',
        text: MessageText,
        icon: 'info',
        customClass: 'swal-wide my-info',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback != '' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MyValidationFailedAlert(MessageText, callback) {
    Swal.fire({
        title: 'Validation Failed',
        text: MessageText,
        icon: 'error',
        customClass: 'swal-wide my-error',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback != '' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MyErrorAlert(MessageText, callback) {
    Swal.fire({
        title: 'Error Occurred',
        text: MessageText,
        icon: 'error',
        customClass: 'swal-wide my-error',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback != '' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MyConfirmationAlert(MessageText, callback) {
    Swal.fire({
        title: 'Confirmation',
        text: MessageText,
        icon: 'question',
        customClass: 'swal-wide',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback != '' && callback != 'NA' && typeof callback === 'function') {
                callback();
            }
        }       
    });
};
function MyConfirmationAlertV2(MessageText, callback) {
    Swal.fire({
        title: 'Confirmation',
        text: MessageText,
        icon: 'question',
        customClass: 'swal-wide',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: false,
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback != '' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MyConfirmationCancelAlert(MessageText, callback) {
    Swal.fire({
        title: 'Confirmation',
        text: MessageText,
        icon: 'question',
        customClass: 'swal-wide',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: false,
    }).then(function (result) {
        if (!result.isConfirmed) {
            if (callback != '' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MyWarningAlert(MessageText, callback) {
    Swal.fire({
        title: 'Warning',
        text: MessageText,
        icon: 'warning',
        customClass: 'swal-wide my-warning',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(function (result) {
        if (result.isConfirmed) {
            if (callback != '' && typeof callback === 'function') {
                callback();
            }
        }
    });
};
function MySuccessAlertWithRedirection(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Success',
        text: MessageText,
        icon: 'success',
        customClass: 'swal-wide my-success',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(callback);
    function callback(result) {
        if (result.value) {
            window.location.href = RedirectUrl;
        }
    }
};
function MyInformationAlertWithRedirection(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Information',
        text: MessageText,
        icon: 'info',
        customClass: 'swal-wide my-info',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(callback);
    function callback(result) {
        if (result.value) {
            window.location.href = RedirectUrl;
        }
    }
};
function MyValidationFailedAlertWithRedirection(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Validation Failed',
        text: MessageText,
        icon: 'error',
        customClass: 'swal-wide my-error',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(callback);
    function callback(result) {
        if (result.value) {
            window.location.href = RedirectUrl;
        }
    }
};
function MyErrorAlertWithRedirection(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Error Occurred',
        text: MessageText,
        icon: 'error',
        customClass: 'swal-wide my-error',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    }).then(callback);
    function callback(result) {
        if (result.value) {
            window.location.href = RedirectUrl;
        }
    }
};
function MyConfirmationAlertWithRedirection(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Confirmation',
        text: MessageText,
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
            window.location.href = RedirectUrl;
        }
    }
};
function MyConfirmationAlertWithRedirectionOnCancel(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Confirmation',
        text: MessageText,
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

        }
        else {
            window.location.href = RedirectUrl;
        }        
    }
};
function MyWarningAlertWithRedirection(MessageText, RedirectUrl) {
    Swal.fire({
        title: 'Warning',
        text: MessageText,
        icon: 'warning',
        customClass: 'swal-wide my-warning',
        confirmButtonText: "Proceed",
        cancelButtonText: "Stop",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,                
    }).then(callback);
    function callback(result) {
        if (result.value) {
            window.location.href = RedirectUrl;
        }
    }
};
function MyConfirmationAlert(MessageText, OkCallback, CancelCallback) {
    Swal.fire({
        title: 'Confirmation',
        text: MessageText,
        icon: 'question',
        customClass: 'swal-wide',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(function (result) {
        if (result.isConfirmed) {
            if (OkCallback != '' && OkCallback != 'NA' && typeof OkCallback === 'function') {
                OkCallback();
            }
        } else {
            if (CancelCallback != '' && CancelCallback != 'NA' && typeof CancelCallback === 'function') {
                CancelCallback();
            }
        }
    });
};
//Section End- SweetAlert Templates
$(document).ready(function () {
    $('.form-control').focus(function () {
        $(this).tooltip('show');
    });
    $('input[type="date"]').each(function () {
        $(this).on("change", function () {
            $(this).ApplyCustomDateFormat();
        });        
    });
    $('.ApplyMultiSelectWithSelectAll').each(function () {
        that = $(this);
        that.prop('multiple', 'multiple');
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
            includeSelectAllOption: true,
            selectAllName: 'select-all-name'
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
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
    $('.timePickerPreDateCtrl').each(function () {
        var myDtCtrl = $('#' + $(this).attr('id').split('-')[1]);
        $(this).datetimepicker({
            format: "hh:mm A"
        }).on("dp.show", function (e) {
            time = "01:00 PM"
        }).on("dp.change", function (e) {
            var myDate = myDtCtrl.val();
            $(this).isValid();
            if (myDate != '') {
                if (!IsValidTimeSelected(myDate, $(this).val())) {
                    $(this).isInvalid();
                    MyAlert(4, "Selected Time Should Be Greater Than The Current Time.");
                }                
            }
        });
    });
    $('.EntrynDisabledForEntry').each(function () {
        $(this).EntrynDisabledForEntry();
    });
    
});
//dummy functions

var setMin = function (currentDateTime) {
    this.setOptions({
        minDate: '-1970/01/02'
    });
    this.setOptions({
        minTime: 0
    });
};

//Bhushan 
$(".txtOnly").keypress(function (e) {
    var key = e.keyCode;
    if (key >= 48 && key <= 57) {
        e.preventDefault();
    }
});
$('.OnlyAlphNumber').keypress(function (e) {
    var keyCode = e.which;
    if (!(keyCode >= 48 && keyCode <= 57) && // numbers 0-9
        !(keyCode >= 65 && keyCode <= 90) && // uppercase letters A-Z
        !(keyCode >= 97 && keyCode <= 122) &&
        !(keyCode === 32)) { // lowercase letters a-z
        e.preventDefault();
    }
});
$('.OnlyAlphNumberV2').keyup(function () {
    if (this.value.match(/[^a-zA-Z0-9 ]/g)) {
        this.value = this.value.replace(/[^a-zA-Z0-9 ]/g, '');
    }
});

$('.OnlyAlphNumberV2').focusout(function () {
    this.value = this.value.trim();
});
function GetCurrentTimeWithAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
