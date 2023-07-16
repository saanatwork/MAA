function ActivateSubmitButton() {
    var btnSubmit = $('#SubmitBtn');
    var isenabled = false;
    if ($('#btnIndividualEdit').val() == 1 || $('#btnTourEdit').val() == 1)
    {
        if ($('#MainDiv').find('.is-invalid').length <= 0) { isenabled = true; }
    }
    if (isenabled) { btnSubmit.makeSLUEnable(); } else { btnSubmit.makeSLUDisable();}
};
function AsPerPolicyOptionChanged() {
    var targetCtrl = $(AsPerPolicyOptionChanged.caller.arguments[0].target);
    var policyDiv = $('#PolicyDiv');
    var notenumberCtrl = $('#NoteNumber');
    var TEBtn = $('#TourEditBtn');
    var IEBtn = $('#IndEditBtn');
    if (targetCtrl.val() == 1) {
        targetCtrl.isValid();
        policyDiv.isGreen();
        notenumberCtrl.makeSLUDisable();
        TEBtn.makeSLUDisable();
        IEBtn.makeSLUDisable();
    } else {
        targetCtrl.isInvalid();
        policyDiv.isRed();
        //notenumberCtrl.makeSLUEnable();
        //TEBtn.makeSLUEnable();
        //IEBtn.makeSLUEnable();
    }
    ActivateSubmitButton();
};
function EnablePolicySection() {
    $('#PolicyDiv').removeClass('sectionB');
    $('#PolicyCtrl').removeAttr('disabled').val('').addClass('is-invalid').removeClass('is-valid');
};
function DisablePolicySection() {
    $('#PolicyDiv').addClass('sectionB');
    $('#PolicyCtrl').attr('disabled','disabled').val('').addClass('is-invalid').removeClass('is-valid');
};
function NotenumberChanged() {
    var TEBtn = $('#TourEditBtn');
    var IEBtn = $('#IndEditBtn');
    var notenumberCtrl = $('#NoteNumber');
    var notenumber = notenumberCtrl.val();
    var lblNoteDesc = $('#lblNoteDesc');
    var notetype = notenumber.substring(7, 10);
    if (notetype == 'EHG') {
        lblNoteDesc.html('Ref. Employee’s Travelling  Details & Vehicle Allotment (By HG)  –  ENTRY Note No.');
    }
    else if (notetype == 'EZB') {
        lblNoteDesc.html('Ref. Employees Travelling  Schedule Details – ENTRY (FOR NZB STAFF) Note No.');
    }
    else if (notetype == 'EMN') {
        lblNoteDesc.html('Ref. Employees Travelling  Schedule Details – ENTRY (FOR MFG. CENTERS RECORDED AT NZB) Note No.');
    }
    else if (notetype == 'EMC') {
        lblNoteDesc.html('Ref. Employees Travelling  Schedule Details – ENTRY (FOR MFG. CENTERS) Note No.');
    }
    else {
        lblNoteDesc.html('Select Ref. Employees Travelling  Schedule Details – ENTRY Note No.');
    }
    DisablePolicySection();
    if (notenumber != '') {
        $('#NoteNumber2').val(notenumber);
        notenumberCtrl.isValid();
        $.ajax({
            url: '/ETSEdit/GetNoteInfo',
            method: 'GET',
            data: { NoteNumber: notenumber },
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#NoteEntryDate').val(item.EntryDateDisplay);
                    $('#NoteEntryTime').val(item.EntryTime);
                    $('#CentreCodenName').val(item.CenterName);
                    $('#TripPurpose').val(item.POAText);
                    $('#EPTourStatus').val(item.EPTourText);
                    $('#AppStat').val(item.IsApprovedDisplay);
                    $('#AppDateTime').val(item.AppDateTimeDisplay);
                    $('#AppReason').val(item.NotAppReason);
                    $('#ratStat').val(item.IsRatifiedDisplay);
                    $('#RatDT').val(item.RetDateTimeDisplay);
                    $('#ratReason').val(item.RetReason);
                    $('#IndEditDiv').html(item.IsIndividualEdit);
                    $('#IsCancelled').val(item.IsCancelled);
                    $('#POA').val(item.POA);
                    $('#EPTour').val(item.EPTour);
                    var ratDivCtrl = $('#mratDiv');
                    if (item.IsRatifiedDisplay == '-') {
                        ratDivCtrl.addClass('alert-danger').removeClass('alert-success');
                    }
                    else {
                        ratDivCtrl.addClass('alert-success').removeClass('alert-danger');
                    }
                    var appDivCtrl = $('#mappDiv');
                    if (item.IsApprovedDisplay == '-') {
                        appDivCtrl.addClass('alert-danger').removeClass('alert-success');
                    }
                    else {
                        appDivCtrl.addClass('alert-success').removeClass('alert-danger');
                    }
                    if (item.POA == 1) {
                        TEBtn.makeSLUEnable();
                        IEBtn.makeSLUDisable();
                    }
                    else {
                        if (item.IsIndividualEdit == 1) {
                            TEBtn.makeSLUDisable();
                            IEBtn.makeSLUEnable();
                        }
                        else {
                            if ($('#btnIndividualEdit').val() == 1) {
                                TEBtn.makeSLUDisable();
                                IEBtn.makeSLUEnable();
                                EnablePolicySection();
                            }
                            else if ($('#btnTourEdit').val() == 1) {
                                TEBtn.makeSLUEnable();
                                IEBtn.makeSLUDisable();
                                EnablePolicySection();
                            }
                            else {
                                TEBtn.makeSLUEnable();
                                IEBtn.makeSLUEnable();
                            }
                        }
                    }
                });
            }
        });
    } else {
        notenumberCtrl.isInvalid();
        $('#NoteEntryDate').val('');
        $('#NoteEntryTime').val('');
        $('#CentreCodenName').val('');
        $('#TripPurpose').val('');
        $('#EPTourStatus').val('');
        $('#AppStat').val('-');
        $('#AppDateTime').val('-');
        $('#AppReason').val('-');
        $('#ratStat').val('-');
        $('#RatDT').val('-');
        $('#ratReason').val('-');
        $('#mappDiv').addClass('alert-danger').removeClass('alert-success');
        $('#mratDiv').addClass('alert-danger').removeClass('alert-success');
        TEBtn.makeSLUDisable();
        IEBtn.makeSLUDisable();
    }
    $('#backbtnactive').val(1);
    ActivateSubmitButton();
};
$(document).ready(function () {
    NotenumberChanged();
    $('#btnBack').click(function () {
        var backbtnactive = $('#BackBtnActive').val();
        var backurl = "/Security/ETSEdit/Index";
        if (backbtnactive == 1) {
            MyAlertWithRedirection(2, "Are You Sure Want to Go Back?", backurl);
            //Swal.fire({
            //    title: 'Confirmation',
            //    text: "Are You Sure Want to Go Back?",
            //    icon: 'question',
            //    customClass: 'swal-wide',
            //    confirmButtonText: "Yes",
            //    cancelButtonText: "No",
            //    cancelButtonClass: 'btn-cancel',
            //    confirmButtonColor: '#2527a2',
            //    showCancelButton: true,
            //}).then(callback);
            //function callback(result) {
            //    if (result.value) {
            //        window.location.href = backurl;
            //    }
            //}
        }
        else {
            window.location.href = backurl;
        }
    });
});