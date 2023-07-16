$.fn.setValueToOne = function () {
    var that = this;
    that.val('1');
};
$.fn.setValueToZero = function () {
    var that = this;
    that.val('0');
};
async function ChangeFromLocationType(index, locationtypeid, locationid) {
    var locationcombo = $('#' + index + '_FromL');
    const response = await $.ajax({
        url: '/CTV/GetLocationsFromType',
        method: 'GET',
        data: { TypeID: locationtypeid },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            locationcombo.val(locationid).removeClass('is-invalid').addClass('is-valid');
            //alert(locationid);
        }
    });
    return response;
}
async function ChangeToLocationType(index, locationtypeid, locationid) {
    var i = locationid.indexOf(',');
    //alert(i);
    var locationcombo = $('#' + index + '_ToL');
    const response = await $.ajax({
        url: '/CTV/GetToLocationsFromType',
        method: 'GET',
        data: { TypeIDs: locationtypeid },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            locationcombo.attr('multiple', 'multiple');
            locationcombo.find('.btn-group').remove();
            locationcombo.multiselect({
                templates: {
                    button: '<button id="BL' + index + '" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                }, enableFiltering: true,
            });
            locationcombo.multiselect();
            locationcombo.multiselect('clearSelection');
            if (i > 0) {
                locationcombo.val(locationid.split(','));
            } else {
                locationcombo.val(locationid);
            }

            locationcombo.multiselect('refresh');


            //editlocationctrl.val(locationcombo.find('option:selected').text());
        }
    });

    return response;
}
function getInitialData() {    
    var notenumber = $('#NoteNumber').val();
    var drivercnn = $('#DriverCode').val() + ' / ' + $('#DriverName').val();
    $.ajax({
        url: '/CTV/getOTVSChDetailData',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#TripPurpose').val(item.TripPurpose);
                if (index > 0) { cloneEditRows(index); }
                $('#' + index + '_FromDate2').val(item.FromDateStr);
                $('#' + index + '_FromTime2').val(item.FromTime);
                $('#' + index + '_FromLT2').val(item.FromCenterTypeCode + ' / ' + item.FromCenterTypeName);
                $('#' + index + '_FromL2').val(item.FromCentreCode + ' / ' + item.FromCenterName);
                $('#' + index + '_ToLT2').val(item.ToCenterTypeName);
                $('#' + index + '_ToDate2').val(item.ToDateStr);
                $('#' + index + '_Driver2').val(drivercnn);
                $('#' + index + '_ToL2X').val(item.ToCenterName);
                if (index >= 1) { AddBtnVirtualClick3(index); }

                var fromdtctrl = $('#' + index + '_FromDt');
                var fromtimectrl = $('#' + index + '_Fromtime');
                var fromltctrl = $('#' + index + '_FromLT');
                var toltctrl = $('#' + index + '_ToLT');
                var fromlctrl = $('#' + index + '_FromL');
                var tolctrl = $('#' + index + '_ToL');
                var drivercombo = $('#' + index + '_DriverCmb');
                var drivercombotxt = $('#' + index + '_DriverCmbtxt');
                var addbtn = $('#' + index + '_AddBtn');
                var deletebtn = $('#' + index + '_DeleteBtn');

                fromdtctrl.val(item.FromDateStrYMD);
                fromtimectrl.val(item.FromTime).removeClass('is-invalid').addClass('is-valid');
                fromltctrl.val(item.FromCenterTypeCode).removeClass('is-invalid').addClass('is-valid');
                toltctrl.val(item.ToCentreTypeCodes.split(',')).removeClass('is-invalid').addClass('is-valid').multiselect('refresh');
                $('#' + index + '_ToDt').val(item.ToDateStr)
                    .removeClass('is-invalid').addClass('is-valid');

                (async function () {
                    const r1 = await ChangeFromLocationType(index, item.FromCenterTypeCode, item.FromCentreCode);
                    const r2 = await ChangeToLocationType(index, item.ToCentreTypeCodes, item.ToCentreCodes);
                    //const r3 = await ChangeDriverCombo(index, item.EditDriverNo, item.EditDriverName);
                })();

                //alert(item.IsActivetoEdit);
                if (item.IsActivetoEdit == 0) {
                    fromdtctrl.attr('disabled', 'disabled');
                    fromtimectrl.attr('disabled', 'disabled');
                    fromltctrl.attr('disabled', 'disabled');
                    toltctrl.attr('disabled', 'disabled');
                    fromlctrl.attr('disabled', 'disabled');
                    tolctrl.attr('disabled', 'disabled');
                    drivercombo.attr('disabled', 'disabled');
                    drivercombotxt.attr('disabled', 'disabled');
                    addbtn.attr('disabled', 'disabled');
                    deletebtn.attr('disabled', 'disabled');
                }
                else {
                    fromdtctrl.removeAttr('disabled', 'disabled');
                    fromtimectrl.removeAttr('disabled', 'disabled');
                    fromltctrl.removeAttr('disabled', 'disabled');
                    toltctrl.removeAttr('disabled', 'disabled');
                    fromlctrl.removeAttr('disabled', 'disabled');
                    tolctrl.removeAttr('disabled', 'disabled');
                    drivercombo.removeAttr('disabled', 'disabled');
                    drivercombotxt.removeAttr('disabled', 'disabled');
                    addbtn.removeAttr('disabled', 'disabled');
                    deletebtn.removeAttr('disabled', 'disabled');
                }

            });
        }
    });

};
function getInitialData2() {
    //alert("ok");
    var notenumber = $('#NoteNumber').val();
    var drivercnn = $('#DriverCode').val() + ' / ' + $('#DriverName').val();
    $.ajax({
        url: '/CTV/getOTVSChDetailData',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#TripPurpose').val(item.TripPurpose);
                AddBtnVirtualClick(index - 1);
                var fromdatectrl = $('#' + index + '_FromDt');
                var fromtimectrl = $('#' + index + '_Fromtime');
                var fromltctrl = $('#' + index + '_FromLT');
                var toltctrl = $('#' + index + '_ToLT');
                var todtctrl = $('#' + index + '_ToDt');
                var fromlctrl = $('#' + index + '_FromL');

                fromdatectrl.val(item.FromDateStrYMD);
                fromtimectrl.val(item.FromTime).removeClass('is-invalid').addClass('is-valid');
                fromltctrl.val(item.FromCenterTypeCode).removeClass('is-invalid').addClass('is-valid');
                toltctrl.val(item.ToCentreTypeCodes).removeClass('is-invalid').addClass('is-valid');
                todtctrl.val(item.ToDateStr).removeClass('is-invalid').addClass('is-valid');
                toltctrl.multiselect('refresh');

                //alert(item.ToCentreTypeCodes);
                //// Second Table cloaning
                if (index > 0) { cloneEditRows(index); }
                $('#' + index +'_FromDate2').val(item.FromDateStr);
                $('#' + index +'_FromTime2').val(fromtimectrl.val());
                $('#' + index +'_FromLT2').val(fromltctrl.find('option:selected').text());
                $('#' + index + '_ToLT2').val(item.ToCenterTypeName);
                $('#' + index + '_ToDate2').val(item.ToDateStr);
                $('#' + index + '_Driver2').val(drivercnn);
                $('#' + index + '_ToL2X').val(item.ToCenterName);
                //alert(item.ToCenterName);
                //second table cloaning end
                FillLocationComboVirtually(item.FromCenterTypeCode, index + '_FromL', item.FromCentreCode, index+'_FromL2');
                FillLocationComboVirtually(item.ToCentreTypeCode, index + '_ToL', item.ToCentreCode, index+'_ToL2');

                fromlctrl.removeClass('is-invalid').addClass('is-valid');
                $('#' + index + '_ToL').removeClass('is-invalid').addClass('is-valid');

                FillToLocationComboVirtually(item.ToCentreTypeCode, index + '_ToL', item.ToCentreCode)
            });
        }
    });

};
function cloneEditRows(index) {    
    var cloneready = $('#tbody3').find('tr').clone();
    cloneready.find('#0_FromDate2').attr('id', index + '_FromDate2');
    cloneready.find('#0_FromTime2').attr('id', index + '_FromTime2');
    cloneready.find('#0_FromLT2').attr('id', index + '_FromLT2');
    cloneready.find('#0_ToLT2').attr('id', index + '_ToLT2');
    cloneready.find('#0_FromL2').attr('id', index + '_FromL2');
    cloneready.find('#0_ToL2').attr('id', index + '_ToL2');
    cloneready.find('#0_ToDate2').attr('id', index + '_ToDate2');
    cloneready.find('#0_Driver2').attr('id', index + '_Driver2');
    $('#tbody4').append(cloneready);
}
function ClearBtnClick() {
    $('#BackBtnMsg').setValueToOne();
    //$('#TripPurpose').val('');
    $('#tbody2').empty();
    $('.canclear').each(function () {
        $(this).val('').removeClass('is-valid').addClass('is-invalid');
    });
    $('.canclear2').each(function () {
        var that = $(this);
        that.find('.btn-group').remove();
        that.multiselect("clearSelection");
        //that.multiselect("destroy");
        that.multiselect("refresh");
        that.removeClass('is-valid').addClass('is-invalid');
    });
    $('#M_ToL').addClass('inVisible');
};
function BackButtonClicked() {
    if ($('#BackBtnMsg').val() == 1) {
        Swal.fire({
                    title: 'Confirmation',
                    text: 'Are you sure to go back?',
                    icon: 'question',
                    customClass: 'swal-wide',
                    //buttons: {
                    //    confirm: 'Ok'
                    //},
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonClass: 'btn-cancel',
            confirmButtonColor: '#2527a2',
            showCancelButton: true,
                }).then(callback);
                function callback(result) {
                    if (result.value) {
                        var url = "/Security/CTV/Create";
                        window.location.href = url;
                    }
                }
    } else {
        var url = "/Security/CTV/Create";
        window.location.href = url;
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
    activateSubmitBtn();

};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "TripPurpose":
            var words = $.trim(value).split(" ");
            if (value.length > 1 && words.length<=100) { isvalid = true; }
            break;
        case "CCOth":
            if (value == 1) { isvalid = true; }
            break;
        case "DIC":
            if (value == 1) {
                isvalid = true;
            } else {
                Swal.fire({
                    title: 'Confirmation',
                    text: 'Should select Yes',
                    icon: 'warning',
                    customClass: 'swal-wide',
                    buttons: {
                        //cancel: 'Cancel',
                        confirm: 'Ok'
                    },
                    //cancelButtonClass: 'btn-cancel',
                    confirmButtonColor: '#2527a2',
                });
            };
            break;
        
    }
    return isvalid;
};
function SaveData() {
    var trippurpose = $('#TripPurpose').val();
    var vehicleno = $('#VehicleNo').val();
    var notenumber = $('#NoteNumber').val();
    var schrecords = getSchRecords();
    //var mjson=JSON.stringify({
    //    VehicleNumber: vehicleno,
    //    TripPurpose: trippurpose,
    //    NoteNumber: notenumber,
    //    OTSchList: schrecords
    //})
    //alert(mjson);
    $.ajax({
        method: 'POST',
        url: '/CTV/setOTVSchData',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            VehicleNumber: vehicleno,
            TripPurpose: trippurpose,
            NoteNumber: notenumber,
            OTSchList: schrecords
        }),
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    var url = "/Security/CTV/Create";
                    window.location.href = url;
                    $('#BackBtnMsg').setValueToZero();
                    //Swal.fire({
                    //    title: 'Confirmation',
                    //    text: 'Data saved successfully.',
                    //    icon: 'success',
                    //    customClass: 'swal-wide',
                    //    buttons: {
                    //        confirm: 'Ok'
                    //    },
                    //    confirmButtonColor: '#2527a2',
                    //}).then(callback);
                    //function callback(result) {
                    //    if (result.value) {
                    //        var url = "/Security/CTV/Create";
                    //        window.location.href = url;
                    //    }
                    //}
                }
                else {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Failed to save data.',
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
function getSchRecords() {
    var schrecords = [];
    $('.add-row').each(function () {
        var rowid = $(this).attr('id');
        var x = '';
        $('#' + rowid + '_ToLT option:selected').each(function () {
            x = x + '_' + $(this).val();
        });
        var xstr = '';
        $('#' + rowid + '_ToLT option:selected').each(function () {
            xstr = xstr + '_' + $(this).text();
        });
        var y = '';
        $('#' + rowid + '_ToL option:selected').each(function () {
            y = y + '_' + $(this).val();
        });
        var ystr = '';
        $('#' + rowid + '_ToL option:selected').each(function () {
            ystr = ystr + '_' + $(this).text();
        });
        schrecords.push({
            'VehicleNo': $('#VehicleNo').val(),
            'FromDate': $('#' + rowid + '_FromDt').val(),
            'FromTime': $('#' + rowid + '_Fromtime').val(),
            'FromCentreTypeCode': $('#' + rowid + '_FromLT').val(),
            'FromCentreCode': $('#' + rowid + '_FromL').val(),
            'ToCentreTypeCode': 0,
            'ToCentreCode': 0,
            'ToDate': $('#' + rowid + '_ToDt').val(),
            'DriverCode': $('#DriverCode').val(),
            'DriverName': $('#DriverName').val(),
            'ToCentreTypeCodes': x,
            'ToCentreCodes': y,
            'ToCentreTypeCodesStr': xstr,
            'ToCentreCodesStr': ystr
        });
    });
    return schrecords;
};
function isOtherPlaceButtonEnabled() {
    var isenable = true;
    //alert('ok');
    var btn = $('#CCOth');
    $('.othplace').each(function () {
        var mval = $(this).val();
        if (mval != '' && mval != null) {
            if (mval.indexOf('Other Place') > 0) {
                isenable = false;
            }
        }        
    });
    
    if (isenable) {
        btn.removeAttr('disabled').removeClass('is-valid').addClass('is-invalid').val('-1');
    } else {
        btn.val('-1').removeClass('is-invalid').attr('disabled', 'disabled');
    }
};
function activateSubmitBtn() {
    //alert($('.is-invalid').length);
    //isOtherPlaceButtonEnabled();    
    var btnSubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnSubmit.attr('disabled', 'disabled');
    } else {
        btnSubmit.removeAttr('disabled');
    }
};
function AddBtnVirtualClick(insrowid) {
    var maxrows = 0;
    $('#tbody2 tr').each(function () {
        var maxr = $(this).attr('id')
        if (maxr > maxrows) { maxrows = maxr; }
    });
    //alert(maxrows);
    //var rows = $('#tbody2 tr').length + 1;
    //var r = parseInt($('#tbody2 tr:last').attr("id"));
    var r = 0;
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }

    var cloneready = $('#tbody1').find('tr').clone();
    cloneready.attr("id", r);
    //var fromdatectrl = cloneready.find('#0_FromDt');
    var curdt = $('#CurDate').val();
    cloneready.find('#0_FromDt')
        .attr('id', r + '_FromDt')
        .val(curdt)
        .removeClass('is-invalid')
        .addClass('is-valid');
    cloneready.find('#0_FromDtlbl').attr('id', r + '_FromDtlbl');


    var firstOpen = true;
    var time;

    cloneready.find('#0_Fromtime').datetimepicker({
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

    cloneready.find('#0_Fromtime').attr('id', r + '_Fromtime').val('')
        .removeClass('is-valid').addClass('is-invalid').addClass('timePicker');

    cloneready.find('#0_FromLT').attr('id', r + '_FromLT').removeClass('is-valid').addClass('is-invalid');
    cloneready.find('#0_FromL').attr('id', r + '_FromL').removeClass('is-valid').addClass('is-invalid');
    cloneready.find('#0_ToLT').attr('id', r + '_ToLT').removeClass('is-valid').addClass('is-invalid');
    cloneready.find('#B0').remove();
    cloneready.find('.btn-group').remove();
    cloneready.find('#BL0').remove(); 
    cloneready.find('#0_ToL').removeClass('is-invalid').addClass('inVisible');
    cloneready.find('#M_ToL').attr('id', r + '_ToL')
        .removeClass('is-valid inVisible').addClass('is-invalid');
    cloneready.find('#0_ToDt').attr('id', r + '_ToDt').val('').removeClass('is-valid').addClass('is-invalid');
    //cloanready.find('#0_FromtimeDiv').attr('id', r + '_FromtimeDiv')
    var ftime = cloneready.find('#' + r + '_Fromtime');
    //var firstOpen = true;
    //var time;
    //ftime.datetimepicker({
    //    useCurrent: false,
    //    format: "hh:mm A"
    //}).on('dp.show', function () {
    //    if (firstOpen) {
    //        time = moment().startOf('day');
    //        firstOpen = false;
    //    } else {
    //        time = "01:00 PM"
    //    }
    //    $(this).data('DateTimePicker').date(time);
    //});

    //var dtctrl = $('#' + r + '_FromDt');
    
    var addbtn = cloneready.find('#0_AddBtn');
    addbtn.attr('id', r + '_AddBtn').attr('disabled','disabled');
    addbtn.on('mouseenter', function () {
        $(this).tooltip('show');
    });
    addbtn.on('mouseleave click', function () {
        $(this).tooltip('hide');
    });

    var deletebtn = cloneready.find('#0_DeleteBtn');
    deletebtn.attr('id', r + '_DeleteBtn').removeClass("inVisible");
    deletebtn.on('mouseenter', function () {
        $(this).tooltip('show');
    });
    deletebtn.on('mouseleave click', function () {
        $(this).tooltip('hide');
    });

    if (insrowid == 0) {
        if (maxrows == 0) {
            $('#tbody2').append(cloneready);
        } else {
            $(cloneready).insertBefore('#tbody2 tr:first');
        }
    } else {
        $(cloneready).insertAfter('#' + insrowid);
    }
    
    $('#0_AddBtn').on('mouseleave click', function () {
        $(this).tooltip('hide');
    });

    var sl = 2;
    $('#tbody2 th').each(function () {
        $(this).html(sl);
        sl += 1;
    });

    var ltm = $('#' + r + '_ToLT');
    ltm.multiselect({
        templates: {
            button: '<button id="B' + r+'" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
    
    activateSubmitBtn();
};
function addBtnClick() {
    var insrow = addBtnClick.caller.arguments[0].target.closest('.add-row');
    $('#BackBtnMsg').setValueToOne();
    AddBtnVirtualClick($(insrow).attr('id'));

};
function removeBtnClick() {
    var r = removeBtnClick.caller.arguments[0].target.closest('.add-row');
    $('#BackBtnMsg').setValueToOne();
    if ($(r).attr("id") == 0) {
    } else {
        r.remove();
    };
    var sl = 2;
    $('#tbody2 th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    activateSubmitBtn();
    return false;
};
function ChangeLocation() {
    var target = ChangeLocation.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var targetvalue = $(target).val();
    var rowid = $(target.closest('.add-row')).attr("id");
    
    if (targetvalue >= 0) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    getToDate(rowid);
    //activateSubmitBtn();
};
function ChangeLocationTo() {
    var target = ChangeLocationTo.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var targetvalue = $(target).val();
    var rowid = $(target.closest('.add-row')).attr("id");

    if (targetvalue != '') {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    getToDate(rowid);
    //activateSubmitBtn();
};
function SchTimeChanged() {
    var target = SchTimeChanged.caller.arguments[0].target;
    var rowid = $(target.closest('.add-row')).attr("id");
    var targetvalue = $(target).val();
    if (targetvalue == null || targetvalue=='') {
        $(target).removeClass('is-valid').addClass('is-invalid');
    } else {
        $(target).removeClass('is-invalid').addClass('is-valid');
    }

    getToDate(rowid);
};
$.fn.CustomDateFormat = function () {
    var that = this;
    var parentid = that.attr('id');
    var lblid = parentid + 'lbl';
    var dt = this.val();
    var e = dt;
    if (dt.indexOf('/') != -1) {
        var e = dt.split('/').reverse().join('-');
    }
    else {
        var e = dt.split('-').reverse().join('-');
    }
    //alert(e);
    $('#' + lblid).html(e);
    //that.addClass('is-valid').removeClass('is-invalid')
};
function SchDateChanged() {
    var target = SchDateChanged.caller.arguments[0].target;
    $(target).CustomDateFormat();
    var rowid = $(target.closest('.add-row')).attr("id");
    var datevalue = $(target).val();
    var vehicleno = $('#VehicleNo').val();
    
    if (datevalue == null) {
        $(target).removeClass('is-valid').addClass('is-invalid');
    } else {
        $.ajax({
            url: '/CTV/CheckSchDateAvl',
            method: 'GET',
            data: {
                VehicleNo: vehicleno,
                ScheduleDate: datevalue
            },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool) {
                        $(target).removeClass('is-invalid').addClass('is-valid');
                    }
                    else {
                        $(target).removeClass('is-valid').addClass('is-invalid');
                        Swal.fire({
                            title: 'Date Availability',
                            text: item.sResponseString,
                            icon: 'warning',
                            customClass: 'swal-wide',
                            buttons: {
                                //cancel: 'Cancel',
                                confirm: 'Ok'
                            },
                            //cancelButtonClass: 'btn-cancel',
                            confirmButtonColor: '#2527a2',
                        });
                    }
                });
                getToDate(rowid);
            }
        });
    }    
};
function FillToLocationComboVirtually(locationtypeid, locationcomboid, locationid, ) {
    var locationcombo = $('#' + locationcomboid);
    //var editlocationctrl = $('#' + editlocationctrlid);
    $.ajax({
        url: '/CTV/GetLocationsFromType',
        method: 'GET',
        data: { TypeID: locationtypeid },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            locationcombo.val(locationid);
            //editlocationctrl.val(locationcombo.find('option:selected').text());
        }
    });
}
function FillLocationComboVirtually(locationtypeid, locationcomboid, locationid, editlocationctrlid){
    var locationcombo = $('#' + locationcomboid);
    var editlocationctrl = $('#' + editlocationctrlid);
    $.ajax({
        url: '/CTV/GetLocationsFromType',
        method: 'GET',
        data: { TypeID: locationtypeid },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            locationcombo.val(locationid);
            editlocationctrl.val(locationcombo.find('option:selected').text());
        }
    });
}
function ChangeLocationType() {
    var target = ChangeLocationType.caller.arguments[0].target;
    var rowid = $(target.closest('.add-row')).attr("id");
    //alert(rowid);
    //var locationctrl
    //var targetid = $(target).attr('id').split("_").pop();
    var targetid = $(target).attr('id');
    targetid = targetid.slice(0, - 1);
    var locationtypeid = $(target).val();
    var locationcombo = $('#' + targetid);
    locationcombo.removeClass('is-valid').addClass('is-invalid');
    //Validations
    if (locationtypeid >= 0) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }
    $.ajax({
        url: '/CTV/GetLocationsFromType',
        method: 'GET',
        data: { TypeID: locationtypeid },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
        }
    });
    var todateCtrl = $('#' + rowid + '_ToDt');
    todateCtrl.val('');
    todateCtrl.removeClass('is-valid').addClass('is-invalid');

    OtherConfirmation();
    //getToDate(rowid);
    //activateSubmitBtn();
};
function ChangeLocationToType() {
    var target = ChangeLocationToType.caller.arguments[0].target;
    var rowid = $(target.closest('.add-row')).attr("id");
    var x = '';
    $('#' + rowid+'_ToLT option:selected').each(function () {
        x = x + '_' + $(this).val();
    });
    //alert(x);
    //var targetid = $(target).attr('id').split("_").pop();
    var targetid = $(target).attr('id');
    targetid = targetid.slice(0, - 1);
    var locationtypeid = $(target).val();
    
    //fillLocationMulti(x, targetid);
    var locationcombo = $('#' + targetid);
    locationcombo.removeClass('is-valid').addClass('is-invalid');
    //Validations
    if (x == '' || x == null || x == '_-1') {
        $(target).removeClass('is-valid').addClass('is-invalid');
    } else {
        $(target).removeClass('is-invalid').addClass('is-valid');
    }
    $.ajax({
        url: '/CTV/GetToLocationsFromType',
        method: 'GET',
        data: { TypeIDs: x },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.multiselect('destroy');
            $('#BL' + rowid).remove();
            //locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            locationcombo.attr('multiple', 'multiple');
            locationcombo.find('.btn-group').remove();
            locationcombo.multiselect({
                templates: {
                    button: '<button id="BL' + rowid + '" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                }, enableFiltering: true,
            });
            //locationcombo.multiselect();
            locationcombo.multiselect('clearSelection');
            locationcombo.multiselect('refresh');
        }
    });
    var todateCtrl = $('#' + rowid + '_ToDt');
    todateCtrl.val('');
    todateCtrl.removeClass('is-valid').addClass('is-invalid');
    OtherConfirmation();
    
};
function OtherConfirmation() {
    var othCtrl = $('#CCOth');
    var isOther = false;
    $('.ltype').each(function () {
        if ($(this).val().indexOf('99') >= 0) { isOther = true;}
    });
    if (isOther) {
        othCtrl.removeAttr('disabled');
        othCtrl.addClass('is-invalid').removeClass('is-valid');
    }
    else {
        othCtrl.val(-1);
        othCtrl.removeClass('is-invalid').removeClass('is-valid');
        othCtrl.attr('disabled', 'disabled');
    }
};
function fillLocationMulti(x, target, targetid) {
    //alert(ok);
    var locationcombo = $('#' + targetid);
    locationcombo.removeClass('is-valid').addClass('is-invalid');
    //Validations
    if (x == '' || x == null || x == '_-1') {
        $(target).removeClass('is-valid').addClass('is-invalid');
    } else {
        $(target).removeClass('is-invalid').addClass('is-valid');
    }
    $.ajax({
        url: '/CTV/GetToLocationsFromType',
        method: 'GET',
        data: { TypeIDs: x },
        dataType: 'json',
        success: function (data) {
            locationcombo.empty();
            locationcombo.multiselect('destroy');
            $('#BL' + rowid).remove();
            //locationcombo.append($('<option/>', { value: "-1", text: "Select location" }));
            $(data).each(function (index, item) {
                locationcombo.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            locationcombo.attr('multiple', 'multiple');
            locationcombo.find('.btn-group').remove();
            locationcombo.multiselect({
                templates: {
                    button: '<button id="BL' + rowid + '" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                }, enableFiltering: true,
            });
            //locationcombo.multiselect();
            locationcombo.multiselect('clearSelection');
            locationcombo.multiselect('refresh');
        }
    });
    var todateCtrl = $('#' + rowid + '_ToDt');
    todateCtrl.val('');
    todateCtrl.removeClass('is-valid').addClass('is-invalid');
};
function getToDate(rowid) {
    //var todate = '';
    $('#BackBtnMsg').setValueToOne();
    var duprec = 0; var mduprec = 0;
    var vehicleno = $('#VehicleNo').val();
    var addbtn = $('#' + rowid + '_AddBtn');
    var fromlocationtype = $('#' + rowid + '_FromLT').val();
    var fromlocation = $('#' + rowid + '_FromL').val();
    var tolocationtype = $('#' + rowid + '_ToLT').val();
    var tolocation = $('#' + rowid + '_ToL').val();
    var fromDate = $('#' + rowid + '_FromDt').val();
    var fromTime = $('#' + rowid + '_Fromtime').val();
    var todateCtrl = $('#' + rowid + '_ToDt');
    var fromlocationname = $('#' + rowid + '_FromL option:selected').text();
    var tolocationname = $('#' + rowid + '_ToL option:selected').toArray().map(item => item.text).join();

    //var tolocationname = $('#' + rowid + '_ToL').attr('text');
    //addbtn.removeAttr('disabled').Attr('disabled', 'disabled');
    //alert('ok');
    //--converting comma separeted to _ separated.
    var x = '';
    $('#' + rowid + '_ToLT option:selected').each(function () {
        x = x + '_' + $(this).val();
    });
    var y = '';
    $('#' + rowid + '_ToL option:selected').each(function () {
        y = y + '_' + $(this).val();
    });    
    todateCtrl.val('').removeClass('is-valid').addClass('is-invalid');
    if (fromDate != '') {
        if (fromTime != '') {
            if (fromlocation > 0) {
                if (tolocationtype != '') {                    
                    if (tolocation != '') {
                        var isx = tolocationname.indexOf(fromlocationname);
                        //alert(isx);
                        if (fromlocation == tolocation || isx>=0) {
                            Swal.fire({
                                title: 'Warning!',
                                text: 'Source And Destination Must Be Different.',
                                icon: 'warning',
                                customClass: 'swal-wide',
                                buttons: {
                                    //cancel: 'Cancel',
                                    confirm: 'Ok'
                                },
                                //cancelButtonClass: 'btn-cancel',
                                confirmButtonColor: '#2527a2',
                            });
                            todateCtrl.removeClass('is-valid').addClass('is-invalid');
                            $('#' + rowid + '_ToL').removeClass('is-valid').addClass('is-invalid');
                        }
                        else {
                            $('.add-row').each(function () {
                                var row = $(this);
                                var rid = row.attr('id');
                                //alert(rid + ' - ' + rowid);
                                if (rowid != rid) {
                                    if ($('#' + rid + '_FromDt').val() == fromDate) {
                                        if ($('#' + rid + '_Fromtime').val() == fromTime) {
                                            mduprec = 1;
                                            if ($('#' + rid + '_FromL').val() == fromlocation) {
                                                if ($('#' + rid + '_ToL').val() == tolocation) {
                                                    duprec = 1;
                                                }
                                            }
                                        }
                                    }
                                };
                            });
                            if (mduprec == 0) {
                                if (duprec == 0) {                                    
                                    $.ajax({
                                        url: '/CTV/GetSchToDate',
                                        method: 'GET',
                                        data: {
                                            Fromdate: fromDate,
                                            FromTime: fromTime,
                                            FromLocation: fromlocation,
                                            ToLocationType: x,
                                            ToLocation: y,
                                            VehicleNo: vehicleno
                                        },
                                        dataType: 'json',
                                        success: function (data) {
                                            $(data).each(function (index, item) {
                                                todateCtrl.val(item.sResponseString);
                                                if (item.bResponseBool == true) {
                                                    todateCtrl.removeClass('is-invalid').addClass('is-valid');
                                                    addbtn.removeAttr('disabled');
                                                }
                                                else {
                                                    todateCtrl.removeClass('is-valid').addClass('is-invalid');
                                                    Swal.fire({
                                                        title: 'Can not schedule to the destination',
                                                        text: 'The calculated schedule to date is not falling in available slots.',
                                                        icon: 'warning',
                                                        customClass: 'swal-wide',
                                                        buttons: {
                                                            //cancel: 'Cancel',
                                                            confirm: 'Ok'
                                                        },
                                                        //cancelButtonClass: 'btn-cancel',
                                                        confirmButtonColor: '#2527a2',
                                                    });
                                                }
                                            });
                                            activateSubmitBtn();
                                        }
                                    });
                                }
                                else {
                                    todateCtrl.removeClass('is-valid').addClass('is-invalid');
                                    Swal.fire({
                                        title: 'Warning!',
                                        text: 'Duplicate record found.',
                                        icon: 'warning',
                                        customClass: 'swal-wide',
                                        buttons: {
                                            //cancel: 'Cancel',
                                            confirm: 'Ok'
                                        },
                                        //cancelButtonClass: 'btn-cancel',
                                        confirmButtonColor: '#2527a2',
                                    });
                                }
                            }
                            else {
                                todateCtrl.removeClass('is-valid').addClass('is-invalid');
                                Swal.fire({
                                    title: 'Warning!',
                                    text: 'Vehicle cannot be scheduled twice in a particular time.',
                                    icon: 'warning',
                                    customClass: 'swal-wide',
                                    buttons: {
                                        //cancel: 'Cancel',
                                        confirm: 'Ok'
                                    },
                                    //cancelButtonClass: 'btn-cancel',
                                    confirmButtonColor: '#2527a2',
                                });
                            }
                            
                        }
                        
                    }
                }
            }
        }
    }
    addbtn.attr('disabled', 'disabled');
    activateSubmitBtn();
    
};
function DisableCombo() {
    $('#CCOth').val(0).removeClass('is-valid').addClass('is-invalid');
    $('#DIC').val(0).removeClass('is-valid').addClass('is-invalid');

};
$(document).ready(function () {
    var maxdt = $('#MaxDate').val();
    var mindt = $('#MinDate').val();
    $('#0_FromDt').attr('max', maxdt).attr('min', mindt).CustomDateFormat();
    var FromLT = $('#0_FromLT');
    var ToLT = $('#0_ToLT');
    var mmtctrl = $('#mmt');
    $.ajax({
        url: '/CTV/GetLocationTypes',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            ToLT.empty();
            ToLT.multiselect('destroy');
            FromLT.append($('<option/>', { value: "-1", text: "Select location type" }));
            //ToLT.append($('<option/>', { value: "-1", text: "Select location type" }));
            $(data).each(function (index, item) {
                FromLT.append($('<option/>', { value: item.ID, text: item.DisplayText }));
                ToLT.append($('<option/>', { value: item.ID, text: item.DisplayText }));
                //$("#0_ToLT").append("<option value='" + item.ID + "'>" + item.DisplayText + "</option>");
            });
            $("#0_ToLT").attr('multiple', 'multiple');
            $("#0_ToLT").multiselect({
                templates: {
                    button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
            $("#0_ToLT").multiselect('clearSelection');
            //ToLT.multiselect('refresh');
            //$("#0_ToLT").multiselect('refresh');
            //getInitialData();
        }
    });    
});
$(document).ready(function () {
    $('.CustomDateFormat').each(function () {
        $(this).CustomDateFormat();
    });

});
//$(function () {
//    $('.datepicker2').datepicker({
//        changeMonth: true,
//        changeYear: true,
//        dateFormat: 'dd-M-yy',
//        minDate: new Date(),
//        maxDate: "+1m",
//        autoclose: true
//    });
//});