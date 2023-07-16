function validateallcontrol2() {
    var btnsubmit = $('#btnSubmit');

    if ($('.is-invalid').length > 0) {
        btnsubmit.attr("disabled", "disabled");

    } else {
        btnsubmit.removeAttr("disabled");

    }
};
function validatecontrol() {
    var target = validatecontrol.caller.arguments[0].target;
    var targetid = $(target).attr('id');
    ValidateCtrl(targetid, $(target).val());
    //ActivateSaveBtn();
};
function ActivateSaveBtn() {
    var a = $('.is-invalid').length;
    var btnSaveCtrl = $('#btnSave');
    if (a <= 0) { btnSaveCtrl.makeEnabled(); } else { btnSaveCtrl.makeDisable(); }
};
function ValidateCtrl(CtrlID, value)
{    
    var mCtrl = $('#' + CtrlID);
    switch (CtrlID) {
        case "PublicTranDelay_HalfDA":
        case "PublicTranDelay_FullDA":
        case "OtherTranDelay_FullDA":
            mCtrl.val(value);
            if (value > 0 && value < 1000) {
                mCtrl.isValid();
            } else { mCtrl.isInvalid(); }
            break;
        case "OtherTranDelay_HalfDA":
        case "MaxDayAllowed":
        case "MaxTraveltime_ComVeh_50km":
        case "MaxTraveltime_PubTran_50km":
        case "GracePeriod_200km":
            mCtrl.val(value);
            if (value > 0 && value < 100) { mCtrl.isValid(); } else { mCtrl.isInvalid(); }
            break;
        case "NightPunch_From":
        case "NightPunch_To":
            mCtrl.val(value);
            if (value > '00:00' && value < '13:61') {
                var fromtimeCtrl = $('#NightPunch_From');
                var totimeCtrl = $('#NightPunch_To');
                var fromtime = fromtimeCtrl.val();
                var totime = totimeCtrl.val();
                if (fromtime > '00:00' && fromtime < '13:61') {
                    if (totime > '00:00' && totime < '13:61') {
                        if (!CompareTime(fromtime, totime)) {
                            fromtimeCtrl.isInvalid();
                            fromtimeCtrl.prop('title', 'Invalid Time Range');
                            totimeCtrl.isInvalid();
                            totimeCtrl.prop('title', 'Invalid Time Range');                                                       
                        }
                        else {
                            fromtimeCtrl.isValid();
                            fromtimeCtrl.prop('title', 'Enter Time');
                            totimeCtrl.isValid();
                            totimeCtrl.prop('title', 'Enter Time');
                        }
                    }
                }
            } else { mCtrl.isInvalid(); }            
            break;
        case "EarlyMorningPunch_From":
        case "EarlyMorningPunch_To":
            mCtrl.val(value);
            if (value > '00:00' && value < '13:61') {
                var fromtimeCtrl = $('#EarlyMorningPunch_From');
                var totimeCtrl = $('#EarlyMorningPunch_To');
                var fromtime = fromtimeCtrl.val();
                var totime = totimeCtrl.val();
                if (fromtime > '00:00' && fromtime < '13:61') {
                    if (totime > '00:00' && totime < '13:61') {
                        if (!CompareTime(fromtime, totime)) {
                            fromtimeCtrl.isInvalid();
                            fromtimeCtrl.prop('title', 'Invalid Time Range');
                            totimeCtrl.isInvalid();
                            totimeCtrl.prop('title', 'Invalid Time Range');
                        }
                        else {
                            fromtimeCtrl.isValid();
                            fromtimeCtrl.prop('title', 'Enter Time');
                            totimeCtrl.isValid();
                            totimeCtrl.prop('title', 'Enter Time');
                        }
                    }
                }
            } else { mCtrl.isInvalid(); mCtrl.title = "Enter Time"; }
            break;
        case "MinutesGracePeriodAllowed":
            if (value >=0) {
                mCtrl.isValid();
            } else {
                mCtrl.isInvalid();
            }
            mCtrl.val(value);
            break;
        case "ReadRule1":
        case "ReadRule2":
        case "ReadRule3":
        case "ReadRule4":
        case "ReadRule5":
        case "LICAllowTour":
            if (value == 1) {
                mCtrl.isValid();
            } else {
                mCtrl.isInvalid();
            }
            mCtrl.val(value);
            break;
    }
    ActivateSaveBtn();
}
function DeleteBtnClicked() {
    var effectiveDate = $('#EffectiveDate').val();
    var STCodes = $('#ServiceTypeCodes').val();
    var STTypes = $('#ServiceTypeCodes option:selected').toArray().map(item => item.text).join();
    var x = '{"EffectiveDate":"' + effectiveDate
        + '","ServiceTypeCodes":"' + STCodes + '"}';
    if (STCodes == '') {
        Swal.fire({
            title: 'Error',
            text: 'Select Service Type To Delete Rule.',
            icon: 'question',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
    } else {
        $.ajax({
            method: 'POST',
            url: '/Security/TourRule/RemoveToursRuleV2',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: x,
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool == true) {
                        Swal.fire({
                            title: 'Confirmation Message',
                            text: "Rule Has Been Deleted For Service Type - " + STTypes + ". Are You Sure Want To Go Back To List Page?",
                            icon: 'warning',
                            customClass: 'swal-wide',
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                            cancelButtonClass: 'btn-cancel',
                            confirmButtonColor: '#2527a2',
                            showCancelButton: true,
                        }).then(callback);
                        function callback(result) {
                            if (result.value) {
                                var url = "/Security/TourRule/Index";
                                window.location.href = url;
                            } else {
                                var url = "/Security/TourRule/ViewRuleV2?EffectiveDate=" + effectiveDate + "&isDelete=true";
                                window.location.href = url;
                            }
                        }
                    }
                    else {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed To Delete Rule.',
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
};
function DeleteAllBtnClicked() {
    Swal.fire({
        title: 'Confirmation Message',
        text: "Are You Sure Want To Delete The Rule For All Service Types?",
        icon: 'warning',
        customClass: 'swal-wide',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(callback);
    function callback(result) {
        if (result.value) {
            var effectiveDate = $('#EffectiveDate').val();
            var x = '{"EffectiveDate":"' + effectiveDate
                + '","ServiceTypeCodes":"ALL"}';
            $.ajax({
                method: 'POST',
                url: '/Security/TourRule/RemoveToursRuleV2',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            Swal.fire({
                                title: 'Confirmation Message',
                                text: "Rule Has Been Deleted For All Service Types Of Effective Date - ." + effectiveDate,
                                icon: 'warning',
                                customClass: 'swal-wide',
                                confirmButtonText: "OK",
                                confirmButtonColor: '#2527a2',
                            }).then(callback);
                            function callback(result) {
                                if (result.value) {
                                    var url = "/Security/TourRule/Index";
                                    window.location.href = url;
                                } 
                            }
                        }
                        else {
                            Swal.fire({
                                title: 'Error',
                                text: 'Failed To Delete Rule.',
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
        } else {
            //var url = "/Security/TourRule/ViewRuleV2?EffectiveDate=" + effectiveDate + "&isDelete=true";
            //window.location.href = url;
        }
    }
};
function ServiceTypeChanged() {
    var target = $(ServiceTypeChanged.caller.arguments[0].target);
    STChanged(target.val(),0);
    $('#BodyDiv').removeClass('sectionB');
    $('.myctrl').each(function () {
        $(this).makeDisable();
    });
};
function ServiceTypeChangedFromView() {
    var target = $(ServiceTypeChangedFromView.caller.arguments[0].target);
    STChanged(target.val(),1);
    $('#BodyDiv').removeClass('sectionB');
    $('.myctrl').each(function () {
        $(this).makeDisable();
    });
};
function STChanged(value, IsView) {
    var effDt = $('#EffectiveDate').val();
    $.ajax({
        url: '/Security/TourRule/getLastTourInfoFromServiceTypeCodes?serviceTypeCodes=' + value + '&IsView=' + IsView + '&EffectiveDate=' + effDt,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                ValidateCtrl('PublicTranDelay_HalfDA', item.PublicTranDelay_HalfDA);
                ValidateCtrl('OtherTranDelay_HalfDA', item.OtherTranDelay_HalfDA);
                ValidateCtrl('PublicTranDelay_FullDA', item.PublicTranDelay_FullDA);
                ValidateCtrl('OtherTranDelay_FullDA', item.OtherTranDelay_FullDA);
                ValidateCtrl('MaxDayAllowed', item.MaxDayAllowed);
                ValidateCtrl('OtherTranDelay_FullDA', item.OtherTranDelay_FullDA);
                ValidateCtrl('MaxTraveltime_ComVeh_50km', item.MaxTraveltime_ComVeh_50km);
                ValidateCtrl('MaxTraveltime_PubTran_50km', item.MaxTraveltime_PubTran_50km);
                ValidateCtrl('GracePeriod_200km', item.GracePeriod_200km);

                ValidateCtrl('NightPunch_From', item.NightPunch_From);
                ValidateCtrl('NightPunch_To', item.NightPunch_To);
                ValidateCtrl('EarlyMorningPunch_From', item.EarlyMorningPunch_From);
                ValidateCtrl('EarlyMorningPunch_To', item.EarlyMorningPunch_To);

                ValidateCtrl('MinutesGracePeriodAllowed', item.MinutesGracePeriodAllowed);

                if (item.PublicTranDelay_HalfDA > 0) {
                    $('#ReadRule1').val(1).isValid();
                    $('#ReadRule2').val(1).isValid();
                    $('#ReadRule3').val(1).isValid();
                    $('#ReadRule4').val(1).isValid();
                    $('#LICAllowTour').val(1).isValid();
                } else {
                    $('#ReadRule1').val(-1).isInvalid();
                    $('#ReadRule2').val(-1).isInvalid();
                    $('#ReadRule3').val(-1).isInvalid();
                    $('#ReadRule4').val(-1).isInvalid();
                    $('#LICAllowTour').val(-1).isInvalid();
                    $('#MinutesGracePeriodAllowed').val(-1).isInvalid();
                }
                $('#mEntryDate').val(item.EntryDateDisplay);
                $('#mEntryTime').val(item.EntryTime);
                //$('#ReadRule5').val('true').isValid();
            });
        }
    });
};
function FillServiceType(effDate) {
    var multiselectCtrl = $('#ServiceTypeDD');
    var isActive = false;
    $.ajax({
        url: '/Security/TourRule/getServiceTypeList?EffectiveDate='+effDate,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var aitemsCount = 0;
            var btnsubmitCtrl = $('#btnSubmit');
            multiselectCtrl.empty();
            multiselectCtrl.multiselect('destroy');
            //ToLT.append($('<option/>', { value: "-1", text: "Select location type" }));
            $(data).each(function (index, item) {
                if (item.IsSelected) {
                    multiselectCtrl.append('<option value="' + item.ID + '" disabled>' + item.DisplayText + '</option>');
                }
                else {
                    aitemsCount = aitemsCount + 1;
                    multiselectCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
                }
                if (item.IsActive) { isActive = true; }
            });
            multiselectCtrl.attr('multiple', 'multiple');
            multiselectCtrl.multiselect({
                templates: {
                    button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
            multiselectCtrl.multiselect('clearSelection');
            multiselectCtrl.multiselect('refresh');
            if (aitemsCount > 0) {
                btnsubmitCtrl.makeDisable();
            }
            else {
                if (isActive) { btnsubmitCtrl.makeDisable();} else { btnsubmitCtrl.makeEnabled(); }
            
            }

        }
    });
};
function ChangeEffectiveDate() {
    var that = $('#mEffectiveDate');
    that.CustomDateFormatCloneRow();
    if (that.val() != '') {
        $('#ServiceTypeDiv').removeClass('sectionB');
        $('#ServiceTypeDD').makeEnabled();
        FillServiceType(that.val());
        $('#EffectiveDate').val(that.val());
        $('#EffectiveDateOfLastPartiallyFilledRule').val('');
        that.isValid();
    } else { that.isInvalid(); }
};
function MakeBodyDisable() {
    $('#BodyDiv').addClass('sectionB');
    $('.myctrl').each(function () {
        $(this).val('').isInvalid();
        $(this).makeDisable();
    });
}
$(document).ready(function () {
    $('#mEffectiveDate').change(function () {
        ChangeEffectiveDate();
        
    });
    $('#ServiceTypeDD').change(function () {
        that = $(this);
        if (that.val() != '') {
            $('#BodyDiv').removeClass('sectionB');
            $('.myctrl').each(function () {
                $(this).val('').makeEnabled();
            });
            STChanged(that.val());
            $('#ServiceTypeCodes').val($('#ServiceTypeDD').val());
            $('#ServiceTypeTexts').val($('#ServiceTypeDD option:selected').toArray().map(item => item.text).join());
            that.isValid();
        } else {
            $('#BodyDiv').addClass('sectionB');
            $('.myctrl').each(function () {
                $(this).val('').isInvalid();
                $(this).makeDisable();
            });
            that.isInvalid();
        }
    });
    //Disableing all controls
    MakeBodyDisable();
    var lasteffdt = $('#EffectiveDateOfLastPartiallyFilledRule').val();
    if (lasteffdt != '') {
        $('#mEffectiveDate').val(lasteffdt).attr('disabled','disabled');
        $('#lblmEffectiveDate').html(ChangeDateFormat(lasteffdt));
        ChangeEffectiveDate();
    }
});
$(document).ready(function () {
    $('#btnClear').click(function () {
        var url = "/Security/TourRule/AddRule"
        window.location.href = url;
    });
    //$("#btnClear").click(function () {
    //    //$('#lblmEffectiveDate').html('Select Date');
    //    //$('#mEffectiveDate').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#PublicTranDelay_HalfDA').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#OtherTranDelay_HalfDA').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#PublicTranDelay_FullDA').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#OtherTranDelay_FullDA').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#NightPunch_From').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#NightPunch_To').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#EarlyMorningPunch_From').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#EarlyMorningPunch_To').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#MaxDayAllowed').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#MaxTraveltime_ComVeh_50km').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#MaxTraveltime_PubTran_50km').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#GracePeriod_200km').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#ReadRule1').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#ReadRule2').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#ReadRule3').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#ReadRule4').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#ReadRule5').removeClass('is-valid').addClass('is-invalid').val('');
    //    $('#LICAllowTour').removeClass('is-valid').addClass('is-invalid').val(-1);
    //    $('#MinutesGracePeriodAllowed').removeClass('is-valid').addClass('is-invalid').val(-1);
    //    $('#ServiceTypeDD').multiselect('clearSelection').addClass('is-invalid');
    //    $('#ServiceTypeDD').multiselect('refresh').addClass('is-invalid');
    //    $('#btnSave').makeDisable();        
    //    MakeBodyDisable();
    //});
    $('#btnBackOnView').click(function () {
        $.ajax({
            url: "/Security/TourRule/BackButtonClicked",
            success: function (result) { window.location.href = result; }
        });

    });
});