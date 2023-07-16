$('#NoteNo').change(function () {
      //ExistingRecord($(this).val());
       Notenumberchanged($(this).val());
});
function ExistingRecord(notenumber) {
    var that = $('#NoteNo');
    $.ajax({
        url: '/GVMR/GetGVMRDetailsForView',
        method: 'GET',
        data: { Notenumber: notenumber },
        dataType: 'json',
        success: function (data) {
            
            $(data).each(function (index, item) {
                $('#tbody3').removeClass('inVisible');
                if (index > 0) {
                    var cloneready = $('#tbody3').find('tr').clone();
                    cloneready.attr("id", index);
                    cloneready.find('td').find('#0_LocationNameD').attr('id', index + '_LocationNameD');
                    cloneready.find('td').find('#0_ActualInRFIDCardD').attr('id', index + '_ActualInRFIDCardD');
                    cloneready.find('td').find('#0_ActualTripInDateD').attr('id', index + '_ActualTripInDateD');
                    cloneready.find('td').find('#0_ActualTripInTimeD').attr('id', index + '_ActualTripInTimeD');
                    cloneready.find('td').find('#0_ActualTripInKMD').attr('id', index + '_ActualTripInKMD');
                    cloneready.find('td').find('#0_ActualOutRFIDCardD').attr('id', index + '_ActualOutRFIDCardD');
                    cloneready.find('td').find('#0_ActualTripOutDateD').attr('id', index + '_ActualTripOutDateD');
                    cloneready.find('td').find('#0_ActualTripOutTimeD').attr('id', index + '_ActualTripOutTimeD');
                    cloneready.find('td').find('#0_ActualTripOutKMD').attr('id', index + '_ActualTripOutKMD');
                    cloneready.find('td').find('#0_RemarkD').attr('id', index + '_RemarkD');

                    $('#tbody4').append(cloneready);
                }
                $("#" + index + "_LocationNameD").html(item.LocationName);
                $("#" + index + "_ActualInRFIDCardD").html(item.ActualInRFIDCard);
                $("#" + index + "_ActualTripInDateD").html(item.ActualTripInDateDisplay);
                $("#" + index + "_ActualTripInTimeD").html(item.ActualTripInTime);
                $("#" + index + "_ActualTripInKMD").html(item.ActualTripInKM);
                $("#" + index + "_ActualOutRFIDCardD").html(item.ActualOutRFIDCard);
                $("#" + index + "_ActualTripOutDateD").html(item.ActualTripOutDateDisplay);
                $("#" + index + "_ActualTripOutTimeD").html(item.ActualTripOutTime);
                $("#" + index + "_ActualTripOutKMD").html(item.ActualTripOutKM);
                $("#" + index + "_RemarkD").html(item.Remark);

            });

        }
    });
};
function Notenumberchanged(notenumber) {
    var centercode = $('#CenterCode').val();
    var that = $('#NoteNo');
    $('#tbody2').empty();
    if (notenumber != "") {
        $.ajax({
            url: '/GVMR/GetGVMRDetails',
            method: 'GET',
            data: { Notenumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {

                    if (item.NoData == true) {
                        if (item.gvmrDetailslist != null) {
                            /* $('#CenterCode').val(item.LocationName);*/
                            $('#VehicleNo').val(item.VehicleNo);
                            $('#VehicleType').val(item.VehicleType);
                            $('#ModelName').val(item.ModelName);
                            /*$('#EntryDate').val(item.SchFromDateEntry);*/
                            var DriverNameCode = item.DriverNo + "/" + item.DriverName;
                            $('#DriverName').val(DriverNameCode);
                            $('#DriverCode').val(item.DriverNo);

                            $('#tbody1').removeClass('invisible');
                            var tripdtls = item.gvmrDetailslist;
                            $.each(tripdtls, function (dataindex, data) {
                                if (dataindex > 0) {
                                    var cloneready = $('#tbody1').find('tr').clone();
                                    cloneready.attr("id", dataindex);
                                    cloneready.find('td').find('#0_LocationName').attr('id', dataindex + '_LocationName');
                                    cloneready.find('td').find('#0_Gvmrid').attr('id', dataindex + '_Gvmrid');
                                    cloneready.find('td').find('#0_ActualInRFIDCard').attr('id', dataindex + '_ActualInRFIDCard');
                                    cloneready.find('td').find('#0_FromDateVal').attr('id', dataindex + '_FromDateVal');
                                    cloneready.find('td').find('#0_ToDateVal').attr('id', dataindex + '_ToDateVal');
                                    cloneready.find('td').find('#0_ActualTripInDate').attr('id', dataindex + '_ActualTripInDate');
                                    cloneready.find('td').find('#0_ActualTripInTime').attr('id', dataindex + '_ActualTripInTime');
                                    cloneready.find('td').find('#0_ActualTripInKM').attr('id', dataindex + '_ActualTripInKM');
                                    cloneready.find('td').find('#0_ActualOutRFIDCard').attr('id', dataindex + '_ActualOutRFIDCard');
                                    cloneready.find('td').find('#0_ActualTripOutDate').attr('id', dataindex + '_ActualTripOutDate');
                                    cloneready.find('td').find('#0_ActualTripOutTime').attr('id', dataindex + '_ActualTripOutTime');
                                    cloneready.find('td').find('#0_ActualTripOutKM').attr('id', dataindex + '_ActualTripOutKM');
                                    cloneready.find('td').find('#0_Remark').attr('id', dataindex + '_Remark');
                                    $('#tbody2').append(cloneready);
                                }
                                $("#" + dataindex + "_LocationName").val(data.LocationName);
                                $("#" + dataindex + "_Gvmrid").val(data.Gvmrid);

                                if (data.ActualInRFIDCard == 'NA') {
                                    $('#' + dataindex + '_ActualInRFIDCard').val('NA').isValid();
                                } else {
                                    if (data.ActualInRFIDCard != null) {
                                        $('#' + dataindex + '_ActualInRFIDCard').val(data.ActualInRFIDCard).isValid();
                                    } else {
                                        $('#' + dataindex + '_ActualInRFIDCard').val('').isInvalid();
                                    }
                                }

                                $("#" + dataindex + "_FromDateVal").val(data.SchFromDateDisplay);
                                $("#" + dataindex + "_ToDateVal").val(data.ToDateVal);

                                if (data.ActualTripInDateDisplay != null) {
                                    $("#" + dataindex + "_ActualTripInDate").val(data.ActualTripInDateDisplay).isValid();
                                } else {
                                    $("#" + dataindex + "_ActualTripInDate").val('').isInvalid();
                                }
                                if (data.ActualTripInTime != null) {
                                    $("#" + dataindex + "_ActualTripInTime").val(data.ActualTripInTime).isValid();
                                } else {
                                    $("#" + dataindex + "_ActualTripInTime").val('').isInvalid();
                                }


                                $("#" + dataindex + "_ActualTripInKM").val(data.ActualTripInKM);

                                if (data.ActualOutRFIDCard == 'NA') {
                                    $('#' + dataindex + '_ActualOutRFIDCard').val('NA').isValid();
                                } else {
                                    if (data.ActualOutRFIDCard != null) {
                                        $('#' + dataindex + '_ActualOutRFIDCard').val(data.ActualOutRFIDCard).isValid();
                                    } else {
                                        $('#' + dataindex + '_ActualOutRFIDCard').val('').isInvalid();
                                    }
                                }

                                if (data.ActualTripOutDateDisplay != null) {
                                    $("#" + dataindex + "_ActualTripOutDate").val(data.ActualTripOutDateDisplay).isValid();
                                } else {
                                    $("#" + dataindex + "_ActualTripOutDate").val('').isInvalid();
                                }

                                if (data.ActualTripOutTime != null) {
                                    $("#" + dataindex + "_ActualTripOutTime").val(data.ActualTripOutTime).isValid();
                                } else {
                                    $("#" + dataindex + "_ActualTripOutTime").val('').isInvalid();
                                }


                                $("#" + dataindex + "_ActualTripOutKM").val(data.ActualTripOutKM);
                                $("#" + dataindex + "_Remark").val();

                            });
                            $('#in_out_details').removeClass('invisible');
                        } else {
                            MyAlert(5, 'Data Not Available..!');
                        }
                    } else {
                        MyAlert(5, 'Punching Data Not Available..!');
                    }
               
                });
                activateSubmitBtn();
            }
        });
    } else {

        $('#CenterCode').val('');
        $('#VehicleNo').val('');
        $('#VehicleType').val('');
        $('#ModelName').val('');
        $('#DriverName').val('');
        $('#tbody2').empty();
        $('#tbody1').addClass('invisible');
        $('#in_out_details').addClass('invisible');
    }
};
/*Not Use currently start */
function NotenumberchangedCenterWise(notenumber) {
    var that = $('#NoteNo');
    if (notenumber != "") {
        $.ajax({
            url: '/GVMR/GetCenterWiseGVMRDetails',
            method: 'GET',
            data: { Notenumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#CenterCode').val(item.LocationName);
                    $('#VehicleNo').val(item.VehicleNo);
                    $('#VehicleType').val(item.VehicleType);
                    $('#ModelName').val(item.ModelName);
                    var DriverNameCode = item.DriverNo + "/" + item.DriverName;
                    $('#DriverName').val(DriverNameCode);
                    $('#tbody1').removeClass('invisible');
                    if (index > 0) {
                        var cloneready = $('#tbody1').find('tr').clone();
                        cloneready.attr("id", index);
                        cloneready.find('td').find('#0_LocationName').attr('id', index + '_LocationName');
                        cloneready.find('td').find('#0_Gvmrid').attr('id', index + '_Gvmrid');
                        cloneready.find('td').find('#0_InRfid').attr('id', index + '_InRfid');
                        cloneready.find('td').find('#0_ActualInRFIDCard').attr('id', index + '_ActualInRFIDCard');
                        cloneready.find('td').find('#0_FromDateVal').attr('id', index + '_FromDateVal');
                        cloneready.find('td').find('#0_ToDateVal').attr('id', index + '_ToDateVal');
                        cloneready.find('td').find('#0_ActualTripInDate').attr('id', index + '_ActualTripInDate');
                        cloneready.find('td').find('#0_ActualTripInTime').attr('id', index + '_ActualTripInTime');
                        cloneready.find('td').find('#0_ActualTripInKM').attr('id', index + '_ActualTripInKM');
                        cloneready.find('td').find('#0_ActualOutRFIDCard').attr('id', index + '_ActualOutRFIDCard');
                        cloneready.find('td').find('#0_ActualTripOutDate').attr('id', index + '_ActualTripOutDate');
                        cloneready.find('td').find('#0_ActualTripOutTime').attr('id', index + '_ActualTripOutTime');
                        cloneready.find('td').find('#0_ActualTripOutKM').attr('id', index + '_ActualTripOutKM');
                        cloneready.find('td').find('#0_Remark').attr('id', index + '_Remark');
                        $('#tbody2').append(cloneready);
                    }
                    $("#" + index + "_LocationName").val(item.LocationName);
                    $("#" + index + "_Gvmrid").val(item.Gvmrid);
                    $("#" + index + "_InRfid").html('<select data-name="ActualInRFIDCard" onchange="GetActualDate(); ValidateControls();" id="0_ActualInRFIDCard" class="form-select wid-130 canclear is-invalid" aria-label="Default select example"></select >');
                /*    $("#" + index + "_ActualInRFIDCard").val();*/
                    $("#" + index + "_FromDateVal").val(item.SchFromDateDisplay);
                    $("#" + index + "_ToDateVal").val(item.ToDateVal);
                    $("#" + index + "_ActualTripInDate").val();
                    $("#" + index + "_ActualTripInTime").val();
                    $("#" + index + "_ActualTripInKM").val(item.ActualTripInKM);
                    $("#" + index + "_ActualOutRFIDCard").val();
                    $("#" + index + "_ActualTripOutDate").val();
                    $("#" + index + "_ActualTripOutTime").val();
                    $("#" + index + "_ActualTripOutKM").val(item.ActualTripOutKM);
                    $("#" + index + "_Remark").val();
                    GetRFIDCardNos(index);
                });
                $('#in_out_details').removeClass('invisible');
            }
        });
    } else {

        $('#CenterCode').val('');
        $('#VehicleNo').val('');
        $('#VehicleType').val('');
        $('#ModelName').val('');
        $('#DriverName').val('');
        $('#tbody2').empty();
        $('#tbody1').addClass('invisible');
        $('#in_out_details').addClass('invisible');
    }
};
/*Not Use currently end*/
function GetRFIDCardNos(index) {
    var FRIDData = $('#' + index + '_ActualInRFIDCard');
    var FRIDDataout = $('#' + index + '_ActualOutRFIDCard');
    FRIDData.empty();
    FRIDDataout.empty();
    $.ajax({
        url: '/MaterialGatePass/GetRFIdCards',
        method: 'GET',
        dataType: 'json',
        success: function (data) {

            FRIDData.append($('<option/>', { value: "-1", text: "Select RFID" }));
            $(data).each(function (index, item) {
                FRIDData.append($('<option/>', { value: item.RFIDCardNo, text: item.RFIDCardNo }));
            });
            FRIDData.append($('<option/>', { value: "NA", text: "NA" }));

            FRIDDataout.append($('<option/>', { value: "-1", text: "Select RFID" }));
            $(data).each(function (index, item) {
                FRIDDataout.append($('<option/>', { value: item.RFIDCardNo, text: item.RFIDCardNo }));
            });
            FRIDDataout.append($('<option/>', { value: "NA", text: "NA" }));
            //DisplayData();
        }
    });

};
function NoRFID(index) {
    var FRIDData = $('#' + index + '_ActualInRFIDCard');
    var FRIDDataout = $('#' + index + '_ActualOutRFIDCard');
    FRIDData.empty();
    FRIDDataout.empty();
    FRIDData.append($('<option/>', { value: "NA", text: "NA" }));
    FRIDDataout.append($('<option/>', { value: "NA", text: "NA" }));
}
function GetActualDate() {
    var target = GetActualDate.caller.arguments[0].target;
    var rowid = $(target.closest('.add-row')).attr("id");
    var _val = $('#' + rowid + '_ActualInRFIDCard option:selected').val();
    var tripdatein = $('#' + rowid + '_ActualTripInDate');
    var fromDateVal = $('#' + rowid + '_FromDateVal').val();
    var toDateVals = $('#' + rowid + '_ToDateVal').val();
    var dt = new Date();
    var dateString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    var toDateVal = toDateVals != '0001-01-01' ? toDateVals : dateString;
    if (_val == 'NA') {

        tripdatein.datepicker("destroy");
        tripdatein.removeClass('ActualTripIDates').addClass('ActualInDates');
        tripdatein.val('');
        tripdatein.removeClass('is-valid').addClass('is-invalid');
        $('.ActualInDates').datepicker({
            dateFormat: 'dd/mm/yy',
            autoclose: true,
            todayHighlight: true,
            minDate: new Date(fromDateVal),
            maxDate: new Date(toDateVal)
        });
    } else {
        tripdatein.datepicker("destroy");
        tripdatein.removeClass('ActualInDates').addClass('ActualTripIDates');
        tripdatein.val('');
        tripdatein.removeClass('is-valid').addClass('is-invalid');

        DatePicker();
    }

    _val = _val == 'NA' || _val == '-1' ? 0 : _val;
    RFIDInChangedIN(_val, dateString, rowid)

};
function GetDateUsingRFID() {
    var target = GetDateUsingRFID.caller.arguments[0].target;
    var rowids = $(target.closest('.add-row')).attr("id");
    var _vals = $('#' + rowids + '_ActualOutRFIDCard option:selected').val();
    var tripdateout = $('#' + rowids + '_ActualTripOutDate');
    var fromDateVals = $('#' + rowids + '_FromDateVal').val();
    var toDateValue = $('#' + rowids + '_ToDateVal').val();
    var dt = new Date();
    var dateString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    var toDateVals = toDateValue != '0001-01-01' ? toDateValue : dateString;
    if (_vals == 'NA') {
        tripdateout.datepicker("destroy");
        tripdateout.removeClass('ActualTripIDates').addClass('ActualInDates');
        tripdateout.val('');
        tripdateout.removeClass('is-valid').addClass('is-invalid');
        $('.ActualInDates').datepicker({
            dateFormat: 'dd/mm/yy',
            autoclose: true,
            todayHighlight: true,
            minDate: new Date(fromDateVals),
            maxDate: new Date(toDateVals)
        });
    } else {
        tripdateout.datepicker("destroy");
        tripdateout.removeClass('ActualInDates').addClass('ActualTripIDates');
        tripdateout.val('');
        tripdateout.removeClass('is-valid').addClass('is-invalid');
        DatePicker();
    }


    _vals = _vals == 'NA' ? 0 : _vals;
    RFIDInChangedOUT(_vals, dateString, rowids)
};
function RFIDInChangedIN(RFId, TripDate, rowid) {
    if (RFId != '' || RFId != '-1') {

        var RFIDval = null;
        var IsDriver;
        if (RFId == 0) {
            RFIDval = $('#DriverCode').val();
            IsDriver = true;
        } else {
            RFIDval = RFId;
            IsDriver = false;
        }

        $.ajax({
            url: '/MaterialGatePass/GetRFIDPunchTime',
            method: 'GET',
            data: { RFIDNumber: RFId, PunchDate: TripDate, IsDriver: IsDriver },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    if (RFId == 0) {
                        if (item.PunchInStr == '-' || item.PunchInStr == null) {
                            PunchInTimeEnable(rowid);
                        } else {

                            $('#' + rowid + '_ActualTripInTime').val(item.PunchInStr);
                            $('#' + rowid + '_ActualTripInTime').removeClass('timePicker');
                            $('#' + rowid + '_ActualTripInTime').attr('readonly', 'readonly');
                            $('#' + rowid + '_ActualTripInTime').isValid();
                        }
                    } else {

                        $('#' + rowid + '_ActualTripInTime').val(item.PunchInStr);
                        $('#' + rowid + '_ActualTripInTime').removeClass('timePicker');
                        $('#' + rowid + '_ActualTripInTime').attr('readonly', 'readonly');
                        $('#' + rowid + '_ActualTripInTime').isValid();
                    }
                });
            }
        });
    }
    else {
        PunchInTimeEnable(rowid);
    }
};
function RFIDInChangedOUT(RFId, TripDate, rowid) {
    if (RFId != '' || RFId != '-1') {

        var RFIDval = null;
        var IsDriver;
        if (RFId == 0) {
            RFIDval = $('#DriverCode').val();
            IsDriver = true;
        } else {
            RFIDval = RFId;
            IsDriver = false;
        }
        $.ajax({
            url: '/MaterialGatePass/GetRFIDPunchTime',
            method: 'GET',
            data: { RFIDNumber: RFId, PunchDate: TripDate, IsDriver: IsDriver },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    if (RFId == 0) {
                        if (item.PunchInStr == '-' || item.PunchInStr == null) {
                            PunchOutTimeEnable(rowid);
                        } else {
                            $('#' + rowid + '_ActualTripOutTime').val(item.PunchInStr);
                            $('#' + rowid + '_ActualTripOutTime').removeClass('timePicker');
                            $('#' + rowid + '_ActualTripOutTime').attr('readonly', 'readonly');
                            $('#' + rowid + '_ActualTripOutTime').isValid();
                        }
                    } else {
                        $('#' + rowid + '_ActualTripOutTime').val(item.PunchInStr);
                        $('#' + rowid + '_ActualTripOutTime').removeClass('timePicker');
                        $('#' + rowid + '_ActualTripOutTime').attr('readonly', 'readonly');
                        $('#' + rowid + '_ActualTripOutTime').isValid();
                    }
                });
            }
        });
    }
    else {
        PunchOutTimeEnable(rowid);
    }
};
function DatePicker() {
    var minDate = new Date();
    var maxDate = new Date();
    $('.ActualTripIDates').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        todayHighlight: true,
        minDate: minDate,
        maxDate: maxDate
    });

};
function ValidateControls() {
    var target = ValidateControls.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    //    if (targetid == '0_ActualTripInDate') {
    //        if ($('#0_ActualInRFIDCard').val() == 'NA') {
    //            $('#0_ActualTripInTime').makeEnabled(); $('#0_ActualTripInTime').val('').isInvalid();
    //        }
    //    }

    //if (targetid == '0_ActualTripOutDate') {
    //    if ($('#0_ActualOutRFIDCard').val() == 'NA') {
    //        $('#0_ActualTripOutTime').makeEnabled(); $('#0_ActualTripOutTime').val('').isInvalid();
    //    }
    //    }

    activateSubmitBtn();

};
function validatectrl(targetid, value) {
    var isvalid = false;

    if (value == "" || value == null || value == "-1") {
        isvalid = false;
    } else {
        isvalid = true;
        //if (targetid == '0_ActualTripInTime') {
        //    debugger;
        //    if (CompareDatesIn()) {

        //        var time = formatAMPM(new Date);
        //        if (CompareTime(time, value)) {
        //            isvalid = true;
        //        } else {
        //            isvalid = false;
        //            AlertMessage();
        //        }
        //    } else {
        //        isvalid = true;
        //    }
        //} else if (targetid == '0_ActualTripOutTime') {
        //    if (CompareDatesOut()) {
        //        var time = formatAMPM(new Date);
        //        if (CompareTime(time, value)) {
        //            isvalid = true;
        //        } else {
        //            isvalid = false;
        //            AlertMessage();
        //        }
        //    } else {
        //        isvalid = true;
        //    }
        //}

        //else {
        //    isvalid = true;
        //}


    }

    return isvalid;

};
function CompareDatesIn() {
    var Val = false;
    var dt = new Date;
    var dateFString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    alert($('#0_ActualTripInDate').val());
    var To = new Date($('#0_ActualTripInDate').val());
    var dateTString = (To.getFullYear() + '-'
        + ('0' + (To.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (To.getDate())).slice(-2));
    if (dateFString == dateTString) { Val = true; }
    return Val;
}
function CompareDatesOut() {
    var Val = false;
    var dt = new Date;
    var dateFString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    var To = new Date($('#0_ActualTripOutDate').val());
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
function activateSubmitBtn() {

    var btnSubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnSubmit.attr('disabled', 'disabled');
    } else {
        btnSubmit.removeAttr('disabled');
    }
};
function getCurrentRecords() {
    var Currrecords = [];
    $('.add-row').each(function () {
        var rowid = $(this).attr('id');
        if (rowid >= 0) {
            Currrecords.push({
                'Gvmrid': $('#' + rowid + '_Gvmrid').val(),
                'NoteNo': $('#NoteNo').val(),
                'ActualInRFIDCard': $('#' + rowid + '_ActualInRFIDCard').val(),
                'ActualTripInDate': $('#' + rowid + '_ActualTripInDate').val(),
                'ActualTripInTime': $('#' + rowid + '_ActualTripInTime').val(),
                'ActualTripInKM': $('#' + rowid + '_ActualTripInKM').val(),
                'ActualOutRFIDCard': $('#' + rowid + '_ActualOutRFIDCard').val(),
                'ActualTripOutDate': $('#' + rowid + '_ActualTripOutDate').val(),
                'ActualTripOutTime': $('#' + rowid + '_ActualTripOutTime').val(),
                'ActualTripOutKM': $('#' + rowid + '_ActualTripOutKM').val(),
                'Remark': $('#' + rowid + '_Remark').val()
            });
        }
    });
    return Currrecords;
};
function SaveData() {
    var currentrecord = getCurrentRecords();
    $.ajax({
        method: 'POST',
        url: '/Security/GVMR/Create',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            gvmrdatasave: currentrecord
        }),
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Data saved successfully.',
                        icon: 'success',
                        setTimeout: 5000,
                        customClass: 'swal-wide',
                        buttons: {
                            confirm: 'Ok'
                        },
                        confirmButtonColor: '#2527a2',
                    }).then(callback);
                    function callback(result) {
                        if (result.value) {
                            var url = "/Security/GVMR/Index";
                            window.location.href = url;
                        }
                    };
                } else {
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
function SaveDataV2() {
    var currentrecord = getCurrentRecords();
    $.ajax({
        method: 'POST',
        url: '/Security/GVMR/CreateMainLocation',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            gvmrdatasave: currentrecord
        }),
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    Swal.fire({
                        title: 'Confirmation',
                        text: 'Data saved successfully.',
                        icon: 'success',
                        setTimeout: 5000,
                        customClass: 'swal-wide',
                        buttons: {
                            confirm: 'Ok'
                        },
                        confirmButtonColor: '#2527a2',
                    }).then(callback);
                    function callback(result) {
                        if (result.value) {
                            var url = "/Security/GVMR/Index";
                            window.location.href = url;
                        }
                    };
                } else {
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
function keypressCountWord(e) {
    var target = keypressCountWord.caller.arguments[0].target;
    var targetCtrl = $(target).val();
    if (WordCount(targetCtrl) > 50) {
        $(target).preventTypying();
    } else {
        $(target).off('keypress');
    }
}
function PunchInTimeEnable(rowid) {
    $('#' + rowid + '_ActualTripInTime').removeAttr('readonly', 'readonly');
    $('#' + rowid + '_ActualTripInTime').addClass('timePicker');
    $('#' + rowid + '_ActualTripInTime').isInvalid();
};
function PunchOutTimeEnable(rowid) {
    $('#' + rowid + '_ActualTripOutTime').removeAttr('readonly', 'readonly');
    $('#' + rowid + '_ActualTripOutTime').addClass('timePicker');
    $('#' + rowid + '_ActualTripOutTime').isInvalid();
};
function DateCheckInOut() {
    var targets = DateCheckInOut.caller.arguments[0].target;
    var rowids = $(targets.closest('.curr-row')).attr("id");
    var InDate = ChangeDateFormatV2($('#' + rowids + '_ActualTripInDate').val());
    var OutDate = ChangeDateFormatV2($('#' + rowids + '_ActualTripOutDate').val());
    if (!CompareDate(InDate, 1, OutDate, 1)) {
        MyWarningAlert('Wrong Date Enter..!');
        $('#' + rowids + '_ActualTripOutDate').val('');
        $('#' + rowids + '_ActualTripOutDate').isInvalid()
    }
}
function Timechanges() {
    var targets = Timechanges.caller.arguments[0].target;
    var rowids = $(targets.closest('.curr-row')).attr("id");
    var ActualTripInTime = $('#' + rowids + '_ActualTripInTime').val();
    var ActualTripOutTime = $('#' + rowids + '_ActualTripOutTime').val();
    var OutTime = $('#' + rowids + '_ActualTripOutTime');
    if (CompareDateCtr(rowids)) {
        if (!CompareTime(ActualTripInTime, ActualTripOutTime)) {
            MyWarningAlert('Wrong Time Enter..!');
            OutTime.val('');
            OutTime.isInvalid();
        }
    }
}
function CompareDateCtr(rowids) {
    var Val = false;
    var InDate = ChangeDateFormatV2($('#' + rowids + '_ActualTripInDate').val());
    var OutDate = ChangeDateFormatV2($('#' + rowids + '_ActualTripOutDate').val());
    if (InDate == OutDate) { Val = true; }
    return Val;
}



