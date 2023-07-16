function btnClearClicked() {
    $('.PickDriver').each(function () {
        var that = $(this);
        if (that.is(":disabled")) { } else { that.val(-1); }        
    });
    $('.canClear').each(function () {
        var that = $(this);
        if (that.is(":disabled")) { } else { that.addClass('inVisible').val(''); }
    });
    $('#IsSaveVisible').val(1);
}
function SaveData() {
    var notenumber = $('#NoteNo').val();
    var schrecords = getSchRecords();
    $.ajax({
        method: 'POST',
        url: '/CTV/setLVSDriverChange',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            NoteNo: notenumber,
            DriverList: schrecords
        }),
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    var url = "/Security/CTV/EditNote?NoteNumber=" + notenumber;
                    window.location.href = url;
                    //$('#BackBtnMsg').setValueToZero();
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
function DriverChanged() {
    var target = DriverChanged.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    var txtid = targetid + "txt";
    var txtbox = $('#' + txtid);
    var ddbox = $('#' + targetid);
    $('#IsSaveVisible').val(1);
    $('#btnSubmit').removeAttr('disabled')
    //alert(targetid.val());
    if (ddbox.val() == 0) { txtbox.removeClass('inVisible'); } else { txtbox.addClass('inVisible');}
}
function getSchRecords() {
    var schrecords = [];
    var noteno = $('#NoteNo').val();
    var vehicleno = $('#VehicleNo').val();
    $('.add-row').each(function () {
        var rowid = $(this).attr('id');
        var x = '';
        var driverID=$('#' + rowid + '_DriverCmb').val();
        var exDriver = $('#' + rowid + '_DriverDiv').html();
        var fromdt = $('#' + rowid + '_FromDateDiv').html();
        var exDrivername = '';
        if (driverID == 0) {
            exDrivername = driverID+'/'+ $('#' + rowid + '_DriverCmbtxt').val();
        } else {
            exDrivername = $('#' + rowid + '_DriverCmb option:selected').text();
        }
        if (driverID >= 0)
        {
            schrecords.push({
                'NoteNo': noteno,
                'VehicleNo': vehicleno,
                'SchDate': fromdt,
                'DriverNo': driverID,
                'DriverName': exDrivername,
                'DriverNonName': exDrivername,
            });
        }
        
    });
    return schrecords;
};
$(document).ready(function () {
    $('.cmbEditDriver').each(function () {
        var id = $(this).attr('id');
        var editdrivercode = $(this).html();
        var editDrivername = $('#' + id + 'Name').html();
        var drivercombo = $('#' + id + 'Cmb');
        var drivercombotxt = $('#' + id + 'Cmbtxt');
        if (editdrivercode > 0) {
            drivercombo.val(editdrivercode);
        } else {
            if (editdrivercode == 0) {
                if (editDrivername.length > 1) {
                    drivercombotxt.removeClass('inVisible').val(editDrivername);
                    drivercombo.val(editdrivercode);
                }                
            }
        }
        
    });
    $('#btnBack').click(function () {
        var noteno = $('#NoteNo').val();
        var url = "/Security/CTV/EditNote?NoteNumber=" + noteno;
        if ($('#IsSaveVisible').val() == 1) {
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
                    //alert(result.value);
                    //DeleteNote();
                    //alert(url);
                    window.location.href = url;
                } else {
                    // second variant
                }
            }
        }
        else {
            window.location.href = url;
            //$.ajax({
            //    url: "/Security/CTV/BackButtonClicked",
            //    success: function (result) { window.location.href = result; }
            //});            
        }
    });
});