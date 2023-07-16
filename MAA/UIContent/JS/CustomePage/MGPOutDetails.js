$(document).ready(function () {
    var _val = $("#NoteNumber").val();
    $.ajax({
        url: '/MaterialGatePass/GetcurentOutDetails',
        method: 'GET',
        data: { Notenumber: _val },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {

                if (index > 0) {
                    var cloneready = $('#tbody5').find('tr').clone();
                    cloneready.attr("id", index);
                    cloneready.find('td').find('#0_NotNos').attr('id', index + '_NotNos');
                    cloneready.find('td').find('#0_DrivernNo').attr('id', index + '_DrivernNo');//Display only
                    cloneready.find('td').find('#0_DriverName').attr('id', index + '_DriverName');
                    cloneready.find('td').find('#0_DriverNo').attr('id', index + '_DriverNo');
                    cloneready.find('td').find('#0_VehicleNo').attr('id', index + '_VehicleNo');
                    cloneready.find('td').find('#0_DesgCodeName').attr('id', index + '_DesgCodeName');//Display only
                    cloneready.find('td').find('#0_DesgCode').attr('id', index + '_DesgCode');
                    cloneready.find('td').find('#0_DesgName').attr('id', index + '_DesgName');
                    cloneready.find('td').find('#0_TripTC').attr('id', index + '_TripTC');//Display only
                    cloneready.find('td').find('#0_TripType').attr('id', index + '_TripType');
                    cloneready.find('td').find('#0_TripCode').attr('id', index + '_TripCode');
                    cloneready.find('td').find('#0_Toloc').attr('id', index + '_Toloc');//Display only
                    cloneready.find('td').find('#0_TolocName').attr('id', index + '_TolocName');
                    cloneready.find('td').find('#0_TolocCode').attr('id', index + '_TolocCode')
                    cloneready.find('td').find('#0_LocationType').attr('id', index + '_LocationType');
                    cloneready.find('td').find('#0_FromLocation').attr('id', index + '_FromLocation');
                    cloneready.find('td').find('#0_CarOut').attr('id', index + '_CarOut');//Display only
                    cloneready.find('td').find('#0_CarryOut').attr('id', index + '_CarryOut');
                    cloneready.find('td').find('#0_LoadMat').attr('id', index + '_LoadMat');
                    cloneready.find('td').find('#0_LoadM').attr('id', index + '_LoadM');  //Display only                           
                    cloneready.find('td').find('#0_RFIDs').attr('id', index + '_RFIDs');
                    cloneready.find('td').find('#0_SchTripDate').attr('id', index + '_SchTripDate');//Display only
                    cloneready.find('td').find('#0_SchTrip').attr('id', index + '_SchTrip');
                    cloneready.find('td').find('#0_SchToDate').attr('id', index + '_SchToDate');
                    cloneready.find('td').find('#0_SchTripdatetext').attr('id', index + '_SchTripdatetext');
                    cloneready.find('td').find('#0_ActualTripDates').attr('id', index + '_ActualTripDates');
                    
                    cloneready.find('td').find('#0_ActualTripTime').attr('id', index + '_ActualTripTime');
                    cloneready.find('td').find('#0_KM').attr('id', index + '_KM');//Display Only
                    cloneready.find('td').find('#0_KMOut').attr('id', index + '_KMOut');
                    cloneready.find('td').find('#0_OutRemarks').attr('id', index + '_OutRemarks');
                    cloneready.find('td').find('#0_ActionDCNew').attr('id', index + '_ActionDCNew');
                
                    $('#tbody6').append(cloneready);
                   
                }
                
                $("#" + index + "_NotNos").val(item.NoteNumber);
                $("#" + index + "_DrivernNo").html(item.DriverNo + " / " + item.Drivername );//Display Only
                $("#" + index + "_DriverName").val(item.Drivername);
                $("#" + index + "_DriverNo").val(item.DriverNo);
                $("#" + index + "_VehicleNo").val(item.VehicleNumber);
               
                $("#" + index + "_DesgCodeName").html(item.DesignationCode + " / " + item.DesignationName);//Display only          
                $("#" + index + "_DesgCode").val(item.DesignationCode);
                $("#" + index + "_DesgName").val(item.DesignationName);
                $("#" + index + "_TripTC").html(item.TripTypeStr);//Display only
                $("#" + index + "_TripType").val(item.TripType);
                $("#" + index + "_TripCode").val(item.TripTypeStr);
                $("#" + index + "_Toloc").html(item.ToLocationCodeName);//Display Only
                $("#" + index + "_TolocName").val(item.ToLocationCodeName);
                $("#" + index + "_TolocCode").val(item.ToLocationCode);
                $("#" + index + "_LocationType").val(item.LocationType);
                $("#" + index + "_FromLocation").val(item.FromLocation);
                if (item.CarryingOutMat == true) {
                    $("#" + index + "_CarOut").html("Yes");//Display only
                } else {
                    $("#" + index + "_CarOut").html("No");//Display only
                }
                $("#" + index + "_CarryOut").val(item.CarryingOutMat);
                $("#" + index + "_LoadM").html(item.LoadPercentage+" %");//Display only
                $("#" + index + "_LoadMat").val(item.LoadPercentage);
                $("#" + index + "_RFIDs").val(item.RFIDCard).html('<select id="' + index + '_RFID" class="form-select pointer is-invalid" onchange="SelectedRFIDValid();ValidateControl()"  aria-label="Default select example"></select>');
                $("#" + index + "_SchTripDate").html(item.SchFromDatestr);//display only
                $("#" + index + "_SchTripdatetext").val(item.SchFromDatestr);
                $("#" + index + "_SchTrip").val(item.SchFromDate);
                $("#" + index + "_SchToDate").val(item.SchToDatestr);
                $("#" + index + "_ActualTripDates").val(item.ActualTripOutDate).html('<input id="' + index + '_ActualTripDate" type="text" placeholder="dd/mm/yyyy" disabled class="form-control pointer is-invalid ActualTripDates" readonly onchange="ValidateControl()">');
                $("#" + index + "_ActualTripTime").val(item.ActualTripOutTime);//.html('<input id="' + index + '_ActualTripTime"  type="text" class="form-control pointer is-invalid" onblur="ValidateControl()" placeholder="08:00PM">').addClass('timePicker');
                $("#" + index + "_KM").html(item.KMOUT);//Display Only
                $("#" + index + "_KMOut").val(item.KMOUT);
                $("#" + index + "_OutRemarks").val(item.OutRemark).html('<input id="' + index + '_OutRemark" type="text" class="form-control">');
               // $("#" + index + "_ActionDCNew").html('<span class="actionBtn d-block"><button type="button" onclick="OnclickNewDCDetails(this)"  id="' + item.VehicleNumber + '" data-value="' + item.SchFromDatestr + '"   class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details" data-placement="top" title="" data-bs-original-title="Pending"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1=12 y1=9 x2=12 y2=13></line><line x1=12 y1=17 x2=12.01 y2=17></line></svg></button>');
                if (item.CarryingOutMat == true) {
                   
                    $("#" + index + "_ActionDCNew").html('<span class="actionBtn d-block"><button type="button" onclick="OnclickNewDCDetails(this)"  id="' + item.VehicleNumber + '" data-value="' + item.SchFromDatestr + '"   class="btn btn-secondary primaryLink" data-toggle="tooltip" data-placement="top" title="Details" data-placement="top" title="" data-bs-original-title="Pending"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1=12 y1=9 x2=12 y2=13></line><line x1=12 y1=17 x2=12.01 y2=17></line></svg></button>');
                } else
                {
                  
                    $("#" + index + "_ActionDCNew").html('<span class="actionBtn d-block"><button type="button" onclick="DataNotAvailble(this)"  id="' + item.VehicleNumber + '" data-value="' + item.SchFromDatestr + '"   class="btn btn-secondary primaryLink" data-toggle="tooltip" data-placement="top" title="Details" data-placement="top" title="" data-bs-original-title="Pending"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1=12 y1=9 x2=12 y2=13></line><line x1=12 y1=17 x2=12.01 y2=17></line></svg></button>');
                }
                GetRFIDCardNos(index);
            })
           
           
        }
    });
});
function DataNotAvailble(ctrl) {
    $('#tbody2').empty();
    
    $("#savebtndisable").removeClass('is-invalid').addClass('is-valid');
   // var target = DataNotAvailble.caller.arguments[0].target;
    //var targetval = target.attr('data-value');
    Swal.fire({
        title: 'Confirmation',
        text: 'DC Details Not Availble For This Note Number.',
        icon: 'success',
        customClass: 'swal-wide',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    })
    $('#tbody1').addClass('inVisible');
    ValidateControl();
};
function GetRFIDCardNos(index) {
    var FRIDData = $('#'+ index +'_RFID');
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
        }
    });

};
//for new Dc details
function OnclickNewDCDetails(ctrl) {
    $("#savebtndisable").removeClass('is-valid').addClass('is-invalid');
    $("#savebtndisable").removeClass('is-invalid').addClass('is-valid');
    $('#tbody1').removeClass('inVisible');
    $('#tbody2').empty();
    var targetid = $(ctrl).attr("id");
    var targetval = $(ctrl).attr('data-value');


    $.ajax({
        url: '/Security/MaterialGatePass/GetReferenceDCDetails?VehicleNo=' + targetid + '&FromDT=' + targetval,
        method: 'GET',
        // data: { VehicleNo: targetid, FromDT: targetval },
        dataType: 'json',
        success: function (data) {
         
            $('#tbody2').empty();
            $(data).each(function (index, item) {
                if (index > 0) {
                    var cloneready = $('#tbody1').find('tr').clone();
                    cloneready.attr("id", index);
                    //cloneready.find('td').find('#0_NotNo').attr('id', index + '_NotNo');
                    cloneready.find('td').find('#0_NotNumber').attr('id', index + '_NotNumber');
                    cloneready.find('td').find('#0_NotesDate').attr('id', index + '_NotesDate');
                    cloneready.find('td').find('#0_fromloc').attr('id', index + '_fromloc');
                    cloneready.find('td').find('#0_tonloc').attr('id', index + '_tonloc');
                    cloneready.find('td').find('#0_fokdiv').attr('id', index + '_fokdiv');
                    cloneready.find('td').find('#0_ActionItem').attr('id', index + '_ActionItem');
                  
                    $('#tbody2').append(cloneready);
                }
                $("#" + index + "_NotNumber").val(item.NoteNumber).html('<input id="' + index + '_NotNo" value="' + item.NoteNumber+'" type="text" disabled="disabled"class="form-control">');
                $("#" + index + "_NotesDate").val(item.NoteDatestr).html('<input id="' + index + '_Date" value="' + item.NoteDatestr +'" type="text" disabled="disabled" class="form-control">');
                $("#" + index + "_fromloc").val(item.FromLocationText).html('<input id="' + index + '_Frmloc" value="' + item.FromLocationCode + '/' +item.FromLocationText +'" type="text" disabled="disabled" class="form-control">');
                $("#" + index + "_tonloc").val(item.ToLocationText).html('<input id="' + index + '_Tolocation" value="' + item.ToLocationCode + '/' +item.ToLocationText +'" type="text" disabled="disabled"  class="form-control">');
                $("#" + index + "_fokdiv").val(item.FindOk).html('<select id="' + index + '_fok"  value="' + item.FindOk + '" class="form-select pointer is-invalid" onchange="ValidateControl()" aria-label="Default select example"><option value="NA">-</option><option value="Yes">Yes</option><option value="No">No</option></select>');
                $("#" + index + "_ActionItem").html('<button type="button" onclick="Detailsclick(this)"  id="' + index + '_btn" data-value="' + item.NoteNumber + '"   class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"><svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>');
            })
            ValidateControl();
        }
    });
}
//for Existing Dc details
function OnclickHistoryDCDetails(ctrl) {
    $("#savebtndisable").removeClass('is-invalid').addClass('is-valid');
    $("#savebtndisable").removeClass('is-valid').addClass('is-invalid');
    $('#tbody1').removeClass('inVisible');
    $('#tbody2').empty();
    var target = OnclickHistoryDCDetails.caller.arguments[0].target;
    var targetval = $(ctrl).attr('data-value');
    $.ajax({
        url: '/MaterialGatePass/GetHistoryDCDetails',
        method: 'GET',
        data: { ID: targetval },
        dataType: 'json',
        success: function (data) {
            if (data != "") {
                $(data).each(function (index, item) {

                    if (index > 0) {
                        var cloneready = $('#tbody1').find('tr').clone();
                        cloneready.find('td').find('#0_NotNumber').attr('id', index + '_NotNumber');
                        cloneready.find('td').find('#0_NotesDate').attr('id', index + '_NotesDate');
                        cloneready.find('td').find('#0_fromloc').attr('id', index + '_fromloc');
                        cloneready.find('td').find('#0_tonloc').attr('id', index + '_tonloc');
                        cloneready.find('td').find('#0_fokdiv').attr('id', index + '_fokdiv');
                        cloneready.find('td').find('#0_ActionItem').attr('id', index + '_ActionItem');
                        $('#tbody2').append(cloneready);
                    }
                    $("#" + index + "_NotNumber").html(item.NoteNumber);
                    $("#" + index + "_NotesDate").html(item.NoteDatestr);
                    $("#" + index + "_fromloc").html(item.FromLocationText);
                    $("#" + index + "_tonloc").html(item.ToLocationText);
                    $("#" + index + "_fokdiv").html(item.CheckFound);

                    
                    $("#" + index + "_ActionItem").html('<button type="button" onclick="Detailsclick(this)"  id="' + index + '_btn" data-value="' + item.NoteNumber + '"   class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"><svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>');
                })
            } else {
                Swal.fire({
                    title: 'Confirmation',
                    text: 'DC Details Not availble for this Note Number.',
                    icon: 'success',
                    customClass: 'swal-wide',
                    buttons: {
                        confirm: 'Ok'
                    },
                    confirmButtonColor: '#2527a2',

                })
                $('#tbody1').addClass('inVisible');
            }
            ValidateControl();
        }
    });

}
//for ItemWise Data display
function Detailsclick(ctrl) {
    var target = Detailsclick.caller.arguments[0].target;
   // var targetval = $(target).attr("value");
    var targetval = $(ctrl).attr('data-value');
   
    $.ajax({
        url: '/MaterialGatePass/GetItemWiseDetails',
        method: 'GET',
        data: { Notenumber: targetval },
        dataType: 'json',
        success: function (data) {
            $('#tbody4').empty();
            $(data).each(function (index, item) {

                if (index > 0) {
                    var cloneready = $('#tbody3').find('tr').clone();
                    cloneready.find('#0_itemtype').attr('id', index + '_itemtype');
                    cloneready.find('#0_itemcodename').attr('id', index + '_itemcodename');
                    cloneready.find('#0_uom').attr('id', index + '_uom');
                    cloneready.find('#0_bags').attr('id', index + '_bags');
                    cloneready.find('#0_kgs').attr('id', index + '_kgs');
                    $('#tbody4').append(cloneready);
                }
                $("#" + index + "_itemtype").html(item.ItemTypeText);
                $("#" + index + "_itemcodename").html(item.ItemCode + "/" + item.ItemText);
                $("#" + index + "_uom").html(item.UOMText);
                $("#" + index + "_bags").html(item.QuantityBag);
                $("#" + index + "_kgs").html(item.QuantityKg);
            })
        }
    });

}
//for Add new record in Dc details
function getDCRecords() {
    var schrecords = [];
    $('.add-rows').each(function () {
        var rowid = $(this).attr('id');
        schrecords.push({
            'NoteNumber': $('#' + rowid + '_NotNo').val(),
            'NoteDate': $('#' + rowid + '_Date').val(),
            'FromLocationText': $('#' + rowid + '_Frmloc').val(),
            'ToLocationText': $('#' + rowid + '_Tolocation').val(),
            'FindOk': $('#' + rowid + '_fok').val()
        });
    });
    return schrecords;
};
//get current out record
function getVechCurrentOutRecords() {
    var Currrecords = [];
    $('.add-row').each(function () {
        var rowid = $(this).attr('id');
        if (rowid >= 0) {
            Currrecords.push({
                'NoteNumber': $('#' + rowid + '_NotNos').val(),
                'DriverNo': $('#' + rowid + '_DriverNo').val(),
                'Drivername': $('#' + rowid + '_DriverName').val(),
                'DesignationCode': $('#' + rowid + '_DesgCode').val(),
                'DesignationName': $('#' + rowid + '_DesgName').val(),
                'TripType': $('#' + rowid + '_TripType').val(),
                'TripTypeStr': $('#' + rowid + '_TripCode').val(),
                'ToLocationCodeName': $('#' + rowid + '_TolocName').val(), 
                'CarryingOutMat': $('#' + rowid + '_CarryOut').val(),
                'LoadPercentage': $('#' + rowid + '_LoadMat').val(),
                'SchFromDate': $('#' + rowid + '_SchTripdatetext').val(),
                'SchToDate': $('#' + rowid + '_SchToDate').val(),
                'LocationType': $('#' + rowid + '_LocationType').val(),
                'FromLocation': $('#' + rowid + '_FromLocation').val(),
                'KMOUT': $('#' + rowid + '_KMOut').val(),
                'VehicleNumber': $('#' + rowid + '_VehicleNo').val(),
                'RFIDCard': $('#' + rowid + '_RFID').val(),
                'ActualTripOutDate': $('#' + rowid + '_ActualTripDate').val(),
                'ActualTripOutTime': $('#' + rowid + '_ActualTripTime').val() != '' ? $('#' + rowid + '_ActualTripTime').val().toLocaleString():'0',
                'OutRemarks': $('#' + rowid + '_OutRemark').val()

            });
        }
    });
    return Currrecords;
};
//Get DC details on save click
function SaveData() {
    //if()
     var dcrecords = getDCRecords();
    var currentOutrecord = getVechCurrentOutRecords();
   //alert(JSON.stringify(currentOutrecord));
    // alert(JSON.stringify(dcrecords));
    $.ajax({
        method: 'POST',
        url: '/MaterialGatePass/SaveVehicleMaterialOutDCDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            ListCurrentOutData: currentOutrecord,
           ListofMGPReferenceDCData: dcrecords
        }),
        success: function (data) {
            //var statusobj=false;
            $(data).each(function (index, item) {
               // statusobj = item.bResponseBool;
                if (item.bResponseBool == true) {
                    var url = "/Security/MaterialGatePass/Create";
                    window.location.href = url;
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
                    function callback(result) {
                        if (result.value) {
                            var url = "/Security/MaterialGatePass/Create";
                            window.location.href = url;
                        }
                    }
                } else {
                    //Swal.fire({
                    //    title: 'Confirmation',
                    //    text: 'Failed to save data.',
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
function SelectedRFIDValid() {
    var target = SelectedRFIDValid.caller.arguments[0].target;
    var rowid = $(target.closest('.add-row')).attr("id");
    var RFId = $('#' + rowid + '_RFID option:selected').val();
    var dt = new Date();
    var dateString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    DatePicker(RFId);
    RFId = RFId == 'NA' ? 0 : RFId;

    RFIDOutChanged(RFId, dateString);
};
function activateSubmitBtn() {

    var btnSubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnSubmit.attr('disabled', 'disabled');
    } else {
        btnSubmit.removeAttr('disabled');
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
        if (value == "" || value == null)
        {
            isvalid = false;
        } else {
            if (targetid == '0_ActualTripTime') {
                 var time = formatAMPM(new Date);
                if (CompareTime(time,value)) {
                    isvalid = true;
                } else {
                    isvalid = false;
                    AlertMessage();
                }
            } else {
                var index = targetid.split('_')[0];
                var xx = index + '_fok';
                if (targetid == xx) {
                    if (value == 'No') {
                        isvalid = false;
                        FindOkAlertMessage();
                    } else {
                        isvalid = true;
                    }
                } else {
                    isvalid = true;
                }

                isvalid = true;
            }
           
        }
    
    return isvalid;

};
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
function FindOkAlertMessage() {
    Swal.fire({
        title: 'Error',
        text: 'Please Material Details!',
        icon: 'question',
        customClass: 'swal-wide',
        buttons: {
            confirm: 'Ok'
        },
        confirmButtonColor: '#2527a2',
    });
}
function DatePicker(val) {
        var minDate = new Date();
    var maxDate = new Date();
    $('.ActualTripDates').makeEnabled();
    $('.ActualTripDates').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        todayHighlight: true,
        minDate: minDate,
        maxDate: maxDate
    });
   
}
function RFIDOutChanged(RFId, TripDate) {
    if (RFId != '' || RFId != '') {
        var RFIDval = null;
        var IsDriver;
        if (RFId == '0') {
            RFIDval = $('#0_DriverNo').val();
            IsDriver = true;
        } else {
            RFIDval = RFId;
            IsDriver = false;
        }
        $.ajax({
            url: '/MaterialGatePass/GetRFIDPunchTime',
            method: 'GET',
            data: { RFIDNumber: RFIDval, PunchDate: TripDate, IsDriver: IsDriver},
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    debugger;
                    if (RFId == '0') {
                        if (item.PunchOutStr == '-' || item.PunchOutStr == null) {
                            PunchTimeEnable();
                        } else {
                            $('#0_ActualTripTime').val(item.PunchOutStr);
                            $('#0_ActualTripTime').removeClass('timePicker');
                            $('#0_ActualTripTime').attr('readonly', 'readonly');
                            $('#0_ActualTripTime').removeClass('is-invalid').addClass('is-valid');
                        }

                    } else {
                        if (item.PunchOutStr == '-' || item.PunchOutStr == null) {
                            MyAlert(5, 'Punching Time Not Available..!!');
                            TimeDateValueClear();
                        }
                        else {
                            if (item.PunchOutStr < GetAddMinInCurrentTime(10)) {
                                $('#0_ActualTripTime').val(GetCurrentTime())
                                //$('#0_ActualTripTime').val(item.PunchOutStr);
                                $('#0_ActualTripTime').removeClass('timePicker');
                                $('#0_ActualTripTime').attr('readonly', 'readonly');
                                $('#0_ActualTripTime').removeClass('is-invalid').addClass('is-valid');
                            } else {
                                MyAlert(5, 'Please Check Time..!!');
                                TimeDateValueClear();
                            }
                        }
                        
                        
                       
                    }
                });
            }
        });
    }
    else {
        PunchTimeEnable();
    }
};
function PunchTimeEnable() {
    $('#0_ActualTripTime').val('');
    $('#0_ActualTripTime').removeAttr('readonly', 'readonly');
    $('#0_ActualTripTime').addClass('timePicker');
    $('#0_ActualTripTime').removeClass('is-valid').addClass('is-invalid');
};
function TimeDateValueClear() {
    $('#0_ActualTripTime').val('');
    $('#0_ActualTripTime').removeClass('timePicker');
    $('#0_ActualTripTime').attr('readonly', 'readonly');
    $('#0_ActualTripTime').removeClass('is-valid').addClass('is-invalid');
    $('#0_ActualTripDate').val('');
    $('#0_ActualTripDate').removeClass('is-valid').addClass('is-invalid');
}
function GetCurrentTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var newformat = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var CurrTime = hours + ":" + minutes + " " + newformat;
    return CurrTime;
}

function GetAddMinInCurrentTime(AddMin) {
    return moment.utc(GetCurrentTime(), 'hh:mm').add(AddMin, 'minutes').format('hh:mm');
}