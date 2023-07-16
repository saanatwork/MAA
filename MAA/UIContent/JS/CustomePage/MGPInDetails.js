$(document).ready(function () {
    var _val = $("#NoteNumber").val();
    $.ajax({
        url: '/MaterialGatePass/GetcurentInDetails',
        method: 'GET',
        data: { Notenumber: _val },
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {

                if (index > 0) {
                    var cloneready = $('#tbody1').find('tr').clone();
                    cloneready.attr("id", index);
                    cloneready.find('td').find('#0_NoteNumber').attr('id', index + '_NoteNumber');
                    cloneready.find('td').find('#0_ID').attr('id', index + '_ID');
                    cloneready.find('td').find('#0_VehicleNo').attr('id', index + '_VehicleNo');
                    cloneready.find('td').find('#0_DriverName').attr('id', index + '_DriverName');//Display only
                    cloneready.find('td').find('#0_DriverNo').attr('id', index + '_DriverNo');
                    cloneready.find('td').find('#0_DesigCN').attr('id', index + '_DesigCN');
                    cloneready.find('td').find('#0_TripType').attr('id', index + '_TripType');
                    cloneready.find('td').find('#0_LocationCN').attr('id', index + '_LocationCN');
                    cloneready.find('td').find('#0_locname').attr('id', index + '_locname');
                    cloneready.find('td').find('#0_loccode').attr('id', index + '_loccode');
                    cloneready.find('td').find('#0_locatype').attr('id', index + '_locatype');

                    cloneready.find('td').find('#0_CarryIn').attr('id', index + '_CarryIn');//Display only
                    cloneready.find('td').find('#0_carrmat').attr('id', index + '_carrmat');
                    cloneready.find('td').find('#0_LoadedIn').attr('id', index + '_LoadedIn');
                    cloneready.find('td').find('#0_Loaded').attr('id', index + '_Loaded');
                    cloneready.find('td').find('#0_RFIDNo').attr('id', index + '_RFIDNo');
                    cloneready.find('td').find('#0_Schdate').attr('id', index + '_Schdate');//Display only
                    cloneready.find('td').find('#0_ActualDate').attr('id', index + '_ActualDate');
                    cloneready.find('td').find('#0_ActualTime').attr('id', index + '_ActualTime');
                    cloneready.find('td').find('#0_ReqKMIn').attr('id', index + '_ReqKMIn');//Display only
                    cloneready.find('td').find('#0_RKMIn').attr('id', index + '_RKMIn');
                    cloneready.find('td').find('#0_KMout').attr('id', index + '_KMout');

                    cloneready.find('td').find('#0_ActualKMIns').attr('id', index + '_ActualKMIns');
                    cloneready.find('td').find('#0_RunInTrip').attr('id', index + '_RunInTrip')
                    cloneready.find('td').find('#0_Remark').attr('id', index + '_Remark');
                    cloneready.find('td').find('#0_ActionIn').attr('id', index + '_ActionIn');

                    $('#tbody2').append(cloneready);

                }

                $("#" + index + "_NoteNumber").val(_val);
                $("#" + index + "_ID").val(item.ID);
                $("#" + index + "_VehicleNo").val(item.VehicleNo);
                $("#" + index + "_DriverNo").val(item.DriverNo);
                $("#" + index + "_DriverName").html(item.DriverNo + " / " + item.DriverName);//Display Only
                $("#" + index + "_DesigCN").html(item.DesignationCode + " / " + item.DesignationText);//Display only
                $("#" + index + "_TripType").html(item.TripTypeStr);//Display only
                $("#" + index + "_LocationCN").html(item.FromLocationName);
                $("#" + index + "_locname").val(item.FromLocationName);
                $("#" + index + "_loccode").val(item.FromLocationCode);
                $("#" + index + "_locatype").val(item.FromLocationType);
                $("#" + index + "_carrmat").val(item.CarryingInMaterial);
                if (item.CarryingInMaterial == true) {
                    $("#" + index + "_CarryIn").html("Yes");//Display only
                } else {
                    $("#" + index + "_CarryIn").html("No");//Display only
                }
                $("#" + index + "_LoadedIn").html(item.LoadPercentageIn + " %");
                $("#" + index + "_Loaded").val(item.LoadPercentageIn);
                $("#" + index + "_RFIDNo").val(item.RFIDCard).html('<select id="' + index + '_RFID" class="form-select pointer is-invalid" style="width: 154px;" onchange="SelectedRFIDValid();ValidateControls();"  aria-label="Default select example"></select>');
                $("#" + index + "_Schdate").html(item.FromschDates);
                $("#" + index + "_ActualDate").val(item.ActualTripInDate).html('<input id="' + index + '_ActualTripDate" type="text" readonly style="width: 154px;" placeholder="dd/mm/yyyy" class="form-control pointer is-invalid ActualTripDates" onchange="ValidateControls()">');
                $("#" + index + "_ActualTime").val(item.ActualTripInTime);//.html('<input id="' + index + '_ActualTripTime"  type="text" style="width: 154px;" class="form-control pointer is-invalid" onchange="ValidateControls()" placeholder="08:00PM">').addClass('timePicker');
                $("#" + index + "_ReqKMIn").html(item.RequiredKmIn);//Display Only
                $("#" + index + "_RKMIn").val(item.RequiredKmIn);
                $("#" + index + "_KMout").val(item.KMSOut);
                $("#" + index + "_ActualKMIns").val(item.ActualKmIn).html('<input id="' + index + '_ActualKmIn" value="' + item.ActKmIn + '" type="number" style="width: 154px;" min="0" onchange="ValidateControls();" class="form-control pointer is-invalid">');
                $("#" + index + "_RunInTrip").val(item.KMRunInTrip).html('<input id="' + index + '_KMRunInTrip" value="' + item.RunningKm + '"  type="text" style="width: 154px;" class="form-control" readonly="readonly">');
                $("#" + index + "_Remark").val(item.InRemark).html('<input id="' + index + '_InRemarks" type="text" style="width: 154px;" class="form-control">');
                //$("#" + index + "_ActionIn").html('<span class="actionBtn d-block"><button type="button" onclick="OnclickNewDCDetails(this)"  id="' + item.VehicleNo + '" data-value="' + item.FromschDates + '"   class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details" data-placement="top" title="" data-bs-original-title="Pending"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1=12 y1=9 x2=12 y2=13></line><line x1=12 y1=17 x2=12.01 y2=17></line></svg></button>');

                if (item.CarryingInMaterial == true) {
                    $("#" + index + "_ActionIn").html('<span class="actionBtn d-block"><button type="button" onclick="OnclickNewDCDetails(this)"  id="' + item.VehicleNo + '" data-value="' + item.FromschDates + '"   class="btn btn-secondary primaryLink" data-toggle="tooltip" data-placement="top" title="Details" data-placement="top" title="" data-bs-original-title="Pending"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1=12 y1=9 x2=12 y2=13></line><line x1=12 y1=17 x2=12.01 y2=17></line></svg></button>');
                } else {
                    $("#" + index + "_ActionIn").html('<span class="actionBtn d-block"><button type="button" onclick="DataNotAvailbles(this)"  id="' + item.VehicleNo + '" data-value="' + item.FromschDates + '"   class="btn btn-secondary primaryLink" data-toggle="tooltip" data-placement="top" title="Details" data-placement="top" title="" data-bs-original-title="Pending"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-alert-triangle"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1=12 y1=9 x2=12 y2=13></line><line x1=12 y1=17 x2=12.01 y2=17></line></svg></button>');
                }
                GetRFIDCardNos(index);
               // MaterialPercent(item.VehicleNo, index);
            })


        }
    });

});
function GetRFIDCardNos(index) {
    var FRIDData = $('#' + index + '_RFID');
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
function DataNotAvailbles(ctrl) {

    $("#savebtndisables").removeClass('is-valid').addClass('is-invalid');
    $("#savebtndisables").removeClass('is-invalid').addClass('is-valid');
    // var target = DataNotAvailble.caller.arguments[0].target;
    //var targetval = target.attr('data-value');
    $('#tbody4').empty();
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

    ValidateControls();
};
//for new Dc details
function OnclickNewDCDetails(ctrl) {
    $("#savebtndisables").removeClass('is-valid').addClass('is-invalid');
    $("#savebtndisables").removeClass('is-invalid').addClass('is-valid');
    var targetid = $(ctrl).attr("id");
    var targetval = $(ctrl).attr('data-value');

    $.ajax({
        url: '/Security/MaterialGatePass/GetRefInDCDetails?VehicleNo=' + targetid + '&FromDT=' + targetval,
        method: 'GET',
        // data: { VehicleNo: targetid, FromDT: targetval },
        dataType: 'json',
        success: function (data) {

            $('#tbody4').empty();
            $(data).each(function (index, item) {
                if (index > 0) {
                    var cloneready = $('#tbody3').find('tr').clone();
                    cloneready.attr("id", index);
                    cloneready.find('td').find('#0_NotNo').attr('id', index + '_NotNo');
                    cloneready.find('td').find('#0_NotNumber').attr('id', index + '_NotNumber');
                    cloneready.find('td').find('#0_NotesDate').attr('id', index + '_NotesDate');
                    cloneready.find('td').find('#0_fromloc').attr('id', index + '_fromloc');
                    cloneready.find('td').find('#0_tonloc').attr('id', index + '_tonloc');
                    cloneready.find('td').find('#0_fokdiv').attr('id', index + '_fokdiv');
                    cloneready.find('td').find('#0_ActionItem').attr('id', index + '_ActionItem');
                    $('#tbody4').append(cloneready);
                }
                $("#" + index + "_NotNumber").val(item.NoteNumber).html('<input id="' + index + '_NotNo" value="' + item.NoteNumber + '" type="text" disabled="disabled"class="form-control">');
                $("#" + index + "_NotesDate").val(item.NoteDatestr).html('<input id="' + index + '_Date" value="' + item.NoteDatestr + '" type="text" disabled="disabled" class="form-control">');
                $("#" + index + "_fromloc").val(item.ToLocationText).html('<input id="' + index + '_Frmloc" value="' + item.ToLocationCode + '/' + item.ToLocationText + '" type="text" disabled="disabled" class="form-control">');
                $("#" + index + "_tonloc").val(item.FromLocationText).html('<input id="' + index + '_Tolocation" value="' + item.FromLocationCode + '/' + item.FromLocationText + '" type="text" disabled="disabled"  class="form-control">');
                $("#" + index + "_fokdiv").val(item.FindOk).html('<select id="' + index + '_fok"  value="' + item.FindOk + '" class="form-select pointer is-invalid" onchange="ValidateControls()" aria-label="Default select example"><option value="NA">-</option><option value="Yes">Yes</option><option value="No">No</option></select>');

                //$("#" + index + "_Action").html('<button type="button" onclick="Detailsclick()"  id="' + index + '_btn" value="' + item.NoteNumber + '"  class="btn primaryLink" data-toggle="tooltip" data-placement="top"title="Details">Details</button>');
                $("#" + index + "_ActionItem").html('<button type="button" onclick="GetItemWiseInDetails(this)"  id="' + index + '_btn" data-value="' + item.NoteNumber + '"   class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>');
            })
            ValidateControl();
        }
    });
};
//for ItemWise Data display
function GetItemWiseInDetails(ctrl) {
    var target = GetItemWiseInDetails.caller.arguments[0].target;
    //var targetval = $(target).attr("value");
    var targetval = $(ctrl).attr('data-value');
    $.ajax({
        url: '/MaterialGatePass/GetItemWiseInDetails',
        method: 'GET',
        data: { Notenumber: targetval },
        dataType: 'json',
        success: function (data) {
            $('#tbody6').empty();
            $(data).each(function (index, item) {

                if (index > 0) {
                    var cloneready = $('#tbody5').find('tr').clone();
                    cloneready.find('#0_itemtype').attr('id', index + '_itemtype');
                    cloneready.find('#0_itemcodename').attr('id', index + '_itemcodename');
                    cloneready.find('#0_uom').attr('id', index + '_uom');
                    cloneready.find('#0_bags').attr('id', index + '_bags');
                    cloneready.find('#0_kgs').attr('id', index + '_kgs');
                    $('#tbody6').append(cloneready);
                }
                $("#" + index + "_itemtype").html(item.ItemTypeText);
                $("#" + index + "_itemcodename").html(item.ItemCode + "/" + item.ItemText);
                $("#" + index + "_uom").html(item.UOMText);
                $("#" + index + "_bags").html(item.QuantityBag);
                $("#" + index + "_kgs").html(item.QuantityKg);
            })
        }
    });

};
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
function getVechCurrentInRecords() {
    var Currrecords = [];
    $('.add-row').each(function () {
        var rowid = $(this).attr('id');
        if (rowid >= 0) {
            Currrecords.push({
                'ID': $('#' + rowid + '_ID').val(),
                'NoteNumber': $('#' + rowid + '_NoteNumber').val(),
                'RFIDCardIn': $('#' + rowid + '_RFID').val(),
                'FromLocationType': $('#' + rowid + '_locatype').val(),
                'FromLocationCode': $('#' + rowid + '_loccode').val(),
                'FromLocationName': $('#' + rowid + '_locname').val(),
                'CarryingInMaterial': $('#' + rowid + '_carrmat').val(),
                'LoadPercentageIn': $('#' + rowid + '_Loaded').val(),
                'ActualTripInDate': $('#' + rowid + '_ActualTripDate').val(),
                'ActualTripInTime': $('#' + rowid + '_ActualTime').val() != '' ? $('#' + rowid + '_ActualTime').val() : '0',
                'RequiredKmIn': $('#' + rowid + '_RKMIn').val(),
                'ActualKmIn': $('#' + rowid + '_ActualKmIn').val(),
                'KMRunInTrip': $('#' + rowid + '_KMRunInTrip').val(),
                'RemarkIn': $('#' + rowid + '_InRemarks').val()

            });
        }
    });
    return Currrecords;
};
function SaveData() {
    //if()
    var dcrecords = getDCRecords();
    var currentOutrecord = getVechCurrentInRecords();
    //alert(JSON.stringify(currentOutrecord));
    // alert(JSON.stringify(dcrecords));
    $.ajax({
        method: 'POST',
        url: '/MaterialGatePass/SaveVehicleMaterialInDCDetails',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            ListCurrentInData: currentOutrecord,
            ListofMGPReferenceInDCData: dcrecords
        }),
        success: function (data) {
            // alert("data");
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
function activateSubmitBtn() {

    var btnSubmit = $('#btnSubmit');
    if ($('.is-invalid').length > 0) {
        btnSubmit.attr('disabled', 'disabled');
    } else {
        btnSubmit.removeAttr('disabled');
    }
};
function ValidateControls() {
    var target = ValidateControls.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var isvalid = validatectrl(targetid, $(target).val());
    var index = targetid.split('_')[0];
    var xx = index + '_ActualKmIn';

    if (targetid == xx) {
        var rk = $('#' + index + '_RKMIn').val();
        var kmintrip = $('#' + index + '_KMRunInTrip');
        var kmout = $('#' + index + '_KMout').val() * 1;
        var actualkm = $(target).val() * 1;
        kmintrip.val(actualkm - kmout);
        //var rkp = rk * 1.15;
        //var rkwithp = rkp + rk;
        //var cal;
        //if (actualkm > rkwithp) {
        //    cal = actualkm - rkwithp;
        //} else if (rk <= actualkm) { cal = actualkm - rk; }
        //else { cal = actualkm; }

        ////if (actualkm > rk * 1.15 || actualkm < rk) { isvalid = false; kmintrip.val(0) }
        //if (actualkm > rkwithp || actualkm < rk) {
        //    isvalid = false;
        //    //kmintrip.val(0);
        //}
        //else {
        //    isvalid = true;
        //    //kmintrip.val(cal);
        //}
    }

    if (isvalid) {
        $(target).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(target).removeClass('is-valid').addClass('is-invalid');
    }

    activateSubmitBtn();
};

function validatectrl(targetid, value) {
    var isvalid = false;
    if (value == "" || value == null) {
        isvalid = false;
    } else {
        if (targetid == '0_ActualTime') {
            var time = formatAMPM(new Date);
            if (CompareTime(time, value)) {
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
        }

    }
    return isvalid;
};
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
function OnclickHistoryDCDetails(ctrl) {
    $("#savebtndisables").removeClass('is-invalid').addClass('is-valid');
    $("#savebtndisables").removeClass('is-valid').addClass('is-invalid');
    $('#tbody3').removeClass('inVisible');
    $('#tbody4').empty();
    var target = OnclickHistoryDCDetails.caller.arguments[0].target;
    var targetval = $(ctrl).attr('data-value');
    $.ajax({
        url: '/MaterialGatePass/GetHistoryInDCDetails',
        method: 'GET',
        data: { ID: targetval },
        dataType: 'json',
        success: function (data) {
            if (data != "") {
                $(data).each(function (index, item) {

                    if (index > 0) {
                        var cloneready = $('#tbody3').find('tr').clone();
                        cloneready.find('td').find('#0_NotNumber').attr('id', index + '_NotNumber');
                        cloneready.find('td').find('#0_NotesDate').attr('id', index + '_NotesDate');
                        cloneready.find('td').find('#0_fromloc').attr('id', index + '_fromloc');
                        cloneready.find('td').find('#0_tonloc').attr('id', index + '_tonloc');
                        cloneready.find('td').find('#0_fokdiv').attr('id', index + '_fokdiv');
                        cloneready.find('td').find('#0_ActionItem').attr('id', index + '_ActionItem');
                        $('#tbody4').append(cloneready);
                    }
                    $("#" + index + "_NotNumber").html(item.NoteNumber);
                    $("#" + index + "_NotesDate").html(item.NoteDatestr);
                    $("#" + index + "_fromloc").html(item.FromLocationText);
                    $("#" + index + "_tonloc").html(item.ToLocationText);
                    $("#" + index + "_fokdiv").html(item.CheckFound);

                    //$("#" + index + "_Action").html('<button type="button" onclick="Detailsclick()"  id="' + index + '_btn" value="' + item.NoteNumber + '"  class="btn primaryLink" data-toggle="tooltip" data-placement="top"title="Details">Details</button>');
                    $("#" + index + "_ActionItem").html('<button type="button" onclick="GetItemWiseInDetails(this)"  id="' + index + '_btn" data-value="' + item.NoteNumber + '"   class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"><svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>');
                })
            } else {
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
                $('#tbody3').addClass('inVisible');
            }
            ValidateControl();
        }
    });

}
function SelectedRFIDValid() {
    var target = SelectedRFIDValid.caller.arguments[0].target;
    var rowid = $(target.closest('.add-row')).attr("id");
    var RFId = $('#' + rowid + '_RFID option:selected').val();
    DatePicker(RFId);
    var dt = new Date();
    var dateString = (dt.getFullYear() + '-'
        + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + (dt.getDate())).slice(-2));
    RFId = RFId == 'NA' ? 0 : RFId;
    RFIDInChanged(RFId, dateString)
};
function DatePicker(val) {
    var minDate = new Date();
    var maxDate = new Date();
    $('.ActualTripDates').datepicker({
        dateFormat: 'dd/mm/yy',
        autoclose: true,
        todayHighlight: true,
        minDate: minDate,
        maxDate: maxDate
    });

}

function RFIDInChanged(RFId, TripDate) {
    if (RFId != '' || RFId != '-1') {
        var RFIDval = null;
        var IsDriver;
        if (RFId == '0') {
            RFIDval = $('#0_DriverNo').val();//'2002563';//
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
                        if (item.PunchInStr == '-' || item.PunchInStr == null) {
                            PunchTimeEnable();
                        } else {
                            $('#0_ActualTime').val(item.PunchInStr);
                            $('#0_ActualTime').removeClass('timePicker');
                            $('#0_ActualTime').attr('readonly', 'readonly');
                            $('#0_ActualTime').isValid();
                        }

                    } else {

                        if (item.PunchInStr == '-' || item.PunchInStr == null) {
                            MyAlert(5, 'Punching Time Not Available..!!');
                            TimeDateValueClear();
                        }
                        else {
                            if (item.PunchInStr < GetAddMinInCurrentTime(10)) {
                                $('#0_ActualTime').val(GetCurrentTime());
                                $('#0_ActualTime').removeClass('timePicker');
                                $('#0_ActualTime').attr('readonly', 'readonly');
                                $('#0_ActualTime').isValid();
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
    $('#0_ActualTime').removeAttr('readonly', 'readonly');
    $('#0_ActualTime').addClass('timePicker');
    $('#0_ActualTime').isInvalid();
}

function TimeDateValueClear() {
    $('#0_ActualTime').val('');
    $('#0_ActualTime').removeClass('timePicker');
    $('#0_ActualTime').attr('readonly', 'readonly');
    $('#0_ActualTime').removeClass('is-valid').addClass('is-invalid');
    $('#0_ActualDate').val('');
    $('#0_ActualDate').removeClass('is-valid').addClass('is-invalid');
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
//function MaterialPercent(VehicleNo, index) {
//    var dt = new Date();
//    var dateString = (dt.getFullYear() + '-'
//        + ('0' + (dt.getMonth() + 1)).slice(-2)
//        + '-' + ('0' + (dt.getDate())).slice(-2));

//    var FRIDData = $('#' + index + '_RFID');
//        $.ajax({
//            url: '/MaterialGatePass/getMaterialPercent',
//            method: 'GET',
//            data: { VehicleNo: VehicleNo, FromDT: dateString, status: 2 },
//            dataType: 'json',
//            success: function (data) {
//                $(data).each(function (index, item) {

                   
//                });
//            }
//        });
//};
