function btnClearClicked() {
    var url ="/Security/TADARules/AddRule"
    window.location.href = url;
};
function SubmitConfChanged() {
    var mCtrl = $('#submitConfirmation');
    var mValue = mCtrl.val();
    var mDiv = $('#Div3');
    if (mValue == 1) {
        mCtrl.isValid();
        mDiv.isGreen();
    }
    else {
        mCtrl.isInvalid();
        mDiv.isRed();
    }
    SaveBtnStat();
};
function enableOptionBtn() {
    var btnstat = $('#submitConfirmation');
    if ($('#TADARule_CategoryIds').val() == '' || $('#IsTransBtn').val() == 0 || $('#IsParamBtn').val() == 0) {
        btnstat.makeDisable();
    } else {
        btnstat.makeEnabled();
    }
};
function SubmitBtnStat() {
    var btn = $('#btnSubmit2');
    var effDate = $('#TADARule_EffectiveDate').val();
    $.ajax({
        url: "/Security/TADARules/GetCategoryAvblCount?EffectiveDate=" + effDate,
        success: function (result) {
            if (result > 0) {
                btn.makeDisable();
            } else { btn.makeEnabled(); }
        }
    });

    
    //if ($('#IsSubmitActive').val() == 1) {
        
    //}
    //else {
        
    //}
};
function SaveBtnStat() {
    var btn = $('#btnSave');
    var x = $('.is-invalid').length;
    if (x > 0) {
        btn.makeDisable();
    }
    else {
        if ($('#IsParamBtn').val() == 1 && $('#IsTransBtn').val() == 1) {
            btn.makeEnabled();
        } else {
            btn.makeDisable();
        }
    }
};
function CategoryChanged() {
    var catCtrl = $('#CategoryDD');
    var cats = catCtrl.val();
    //alert(catCtrl.val());
    if (cats != '' && cats!=null ) {
        catCtrl.isValid();
        $('#btnTransDetail').makeEnabled();
        $('#TADARule_CategoryIds').val(cats);
        $('#TADARule_CategoryText').val(GetSelectedTextOfaMultiSelect('CategoryDD'));
        //GetMultiSelectDataInClickedSequence('CategoryDD');
    }
    else {
        catCtrl.isInvalid();
        $('#btnTransDetail').makeDisable();
    }
    $('#submitConfirmation').val('').isInvalid();
    $('#IsParamBtn').val(0);
    $('#IsTransBtn').val(0);
    SaveBtnStat();
    SubmitBtnStat();
};
function validatecontrol() {
    var target = $(validatecontrol.caller.arguments[0].target);
    var isvalid = validatectrl(target.attr('id'), target.val());
    
    if (getDivInvalidCount('Div1') <= 0) {
        EnableDiv('Div2');
        $('#CategoryDD').makeEnabled();
        FillCategoryIDs($('#mEffectiveDate').val(),'');
    }
    else {
        multiselectCtrl = $('#CategoryDD');
        multiselectCtrl.empty();
        multiselectCtrl.multiselect('destroy');
        multiselectCtrl.attr('multiple', false);
        multiselectCtrl.makeDisable();
        $('#Div2').addClass('sectionB');        
    }
    CategoryChanged();
    $('#IsParamBtn').val(0);
    $('#IsTransBtn').val(0);
    SaveBtnStat();
    //SubmitBtnStat();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "TADARule_MinHoursForHalfDA":
            if (value >= 1 && value <= 9) { isvalid = true;}
            break;
        case "TADARule_MinKmsForDA":
            if (value >= 1 && value <= 99) { isvalid = true; }
            break;
        case "TADARule_LodgingExpOnCompAcco":
            if (value == 'false') { isvalid = true; }
            break;
        case "TADARule_DepuStaffDAEligibility":
        case "TADARule_LocalConvEligibility":
            if (value != '') { isvalid = true; }
            break;
        case "TADARule_ExtraDAApplicability":
            if (value == 'true') { isvalid = true; }
            break;
        case "submitConfirmation":
            if (value == 1) { isvalid = true; }
            break;
    }
    var target = $('#' + targetid);
    if (isvalid) {
        target.removeClass('is-invalid').addClass('is-valid');
    }
    else {
        target.removeClass('is-valid').addClass('is-invalid');       
    }
    return isvalid;
};
function MakeBodyDisable() {
    $('#Div1').addClass('sectionB');
    $('#Div2').addClass('sectionB');
    $('#Div3').addClass('sectionB');
    $('#Div4').addClass('sectionB');
    $('.myctrl').each(function () {
        $(this).val('').isInvalid();
        $(this).makeDisable();
    });
};
function EnableDiv(divid) {
    if (divid == 'Div1') {
        $('#Div1').removeClass('sectionB');        
    } else if (divid == 'Div2') {
        $('#Div1').removeClass('sectionB');
        $('#Div2').removeClass('sectionB');
    } else if (divid == 'Div3') {
        $('#Div1').removeClass('sectionB');
        $('#Div2').removeClass('sectionB');
        $('#Div3').removeClass('sectionB');
    } else if (divid == 'Div4') {
        $('#Div1').removeClass('sectionB');
        $('#Div2').removeClass('sectionB');
        $('#Div3').removeClass('sectionB');
        $('#Div4').removeClass('sectionB');
    }
    $('#' + divid).find('.myctrl').each(function () {
        $(this).makeEnabled();
    });
};
function ChangeEffectiveDate() {
    //alert("1");
    var that = $('#mEffectiveDate');
    that.CustomDateFormatCloneRow();
    var effDate = that.val();
    if (effDate != '') {
        FillCategoryIDs(that.val(),"");
        EnableDiv('Div1');
        EnableDiv('Div2');
        $('#TADARule_EffectiveDate').val(effDate);
        that.isValid();
        $.ajax({
            url: '/Security/TADARules/GetRuleData?EffectiveDate=' + effDate,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#TADARule_MinHoursForHalfDA').val(item.MinHoursForHalfDA).isValid();
                    $('#TADARule_MinKmsForDA').val(item.MinKmsForDA).isValid();
                    $('#TADARule_LodgingExpOnCompAcco').val(item.LodgingExpOnCompAcco.toString()).isValid();
                    $('#TADARule_LocalConvEligibility').val(item.LocalConvEligibility.toString()).isValid();
                    $('#TADARule_DepuStaffDAEligibility').val(item.DepuStaffDAEligibility.toString()).isValid();
                    $('#TADARule_ExtraDAApplicability').val(item.ExtraDAApplicability.toString()).isValid();
                    $('#TADARule_EffectiveDateDisplay').val(item.EffectiveDateDisplay.toString());
                });

                if (getDivInvalidCount('Div1') <= 0) {
                    EnableDiv('Div2');
                    $('#CategoryDD').makeEnabled();
                    FillCategoryIDs($('#mEffectiveDate').val(),'');
                }
                else {
                    multiselectCtrl = $('#CategoryDD');
                    multiselectCtrl.empty();
                    multiselectCtrl.multiselect('destroy');
                    multiselectCtrl.attr('multiple', false);
                    multiselectCtrl.makeDisable();
                    $('#Div2').addClass('sectionB');
                }
            }
        });
    } else { that.isInvalid(); }
    SubmitBtnStat();
};
function ChangeEffectiveDate2() {
    //alert("2");
    var that = $('#mEffectiveDate');
    that.CustomDateFormatCloneRow();
    var effDate = that.val();
    if (effDate != '') {
        EnableDiv('Div1');
        EnableDiv('Div2');
        FillCategoryIDs($('#mEffectiveDate').val(), $('#TADARule_CategoryIds').val());
        //$('#CategoryDD').val($('#TADARule_CategoryIds').val());
        that.isValid();
        
    } else { that.isInvalid(); }
};
function FillCategoryIDs(effDate, commaSeparatedSelectedValues) {
    var multiselectCtrl = $('#CategoryDD');
    $.ajax({
        url: '/Security/TADARules/GetCategories?EffectiveDate=' + effDate,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var aitemsCount = 0;
            var btnsubmitCtrl = $('#btnSubmit');
            multiselectCtrl.empty();
            multiselectCtrl.multiselect('destroy');
            $(data).each(function (index, item) {
                if (item.IsSelected) {
                    multiselectCtrl.append('<option value="' + item.ID + '" disabled>' + item.DisplayText + '</option>');
                }
                else {
                    aitemsCount = aitemsCount + 1;
                    multiselectCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
                }
            });
            multiselectCtrl.attr('multiple', 'multiple');
            multiselectCtrl.multiselect({
                templates: {
                    button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
            multiselectCtrl.multiselect('clearSelection');
            if (commaSeparatedSelectedValues != '') {
                var i = commaSeparatedSelectedValues.indexOf(',');
                if (i > 0) {
                    multiselectCtrl.val(commaSeparatedSelectedValues.split(','));
                } else {
                    multiselectCtrl.val(commaSeparatedSelectedValues);
                }
            }            
            multiselectCtrl.multiselect('refresh');
            if (aitemsCount > 0) { btnsubmitCtrl.makeDisable(); } else { btnsubmitCtrl.makeEnabled(); }
        }
    });
    SubmitBtnStat();
};
$(document).ready(function () {
    $('#mEffectiveDate').change(function () {
        ChangeEffectiveDate();

    });
    $('#btnBack').click(function () {
        var backurl = "/Security/TADARules/Index";
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
    });    
});
$(document).ready(function () {
    if ($('#TADARule_EffectiveDateDisplay').val() != '') {
        $('#mEffectiveDate').val($('#TADARule_EffectiveDateDisplay').val());
        ChangeEffectiveDate2();
        if ($('#TADARule_CategoryIds').val() != '') {
            $('#btnTransDetail').makeEnabled();
        } else { $('#btnTransDetail').makeDisable() }
        if ($('#IsTransBtn').val() == 1) {
            $('#btntadaParam').makeEnabled();
        } else { $('#btntadaParam').makeDisable()}
        enableOptionBtn();
        SubmitBtnStat();
    }
    else {
        MakeBodyDisable();
    }
    
    
});