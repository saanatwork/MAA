function validatecontrol() {
            var target = validatecontrol.caller.arguments[0].target;
            var targetid = $(target).attr('ID');
            var isvalid = validatectrl(targetid, $(target).val());
    if (isvalid) {
                $('#IsBtn').val("1");
                $(target).removeClass('is-invalid').addClass('is-valid');
            } else {
                $(target).removeClass('is-valid').addClass('is-invalid');
                $('#btnSubmit').attr("disabled", "disabled");
            }
    validateallcontrol();
    if (targetid == 'EffectiveDate') { $('#btnTransDetail').attr("disabled", "disabled") }
        };
        function validatectrl(targetid, value) {
            var isvalid = false;
            switch (targetid) {
                case "MinHoursForHalfDA":
                    isvalid = validateMinHoursForHalfDA(value);
                    //mytooltipmsg($('#tt_MinHoursForHalfDA'), isvalid);
                    break;
                case "MinKmsForDA":
                    isvalid = validateTextbox("MinKmsForDA");
                    //mytooltipmsg($('#tt_MinKmsForDA'), isvalid);
                    break;
                case "LodgingExpOnCompAcco":
                    isvalid = YesNoValidator(value);
                    break;
                case "LocalConvEligibility":
                    isvalid = YesNoValidator(value);
                    break;
                case "DepuStaffDAEligibility":
                    isvalid = YesNoValidator(value);
                    break;
                case "ExtraDAApplicability":
                    isvalid = OnlyYesValidator(value);
                    break;
                case "EffectiveDate":
                    isvalid = validateTextbox("EffectiveDate");
                    break;
            }
            return isvalid;
        };
function validateallcontrol() {
    var parambtn = $('#IsParamBtn').val();
    var submitbtn = $('#IsSubmitBtn').val();
    var btn = $('#IsBtn').val();
            var btnsubmit = $('#btnSubmit');
            var btntrans = $('#btnTransDetail');
            var btnparam = $('#btntadaParam');
            if ($('.is-invalid').length > 0 || btn==0) {
                btnsubmit.attr("disabled", "disabled");
                btntrans.attr("disabled", "disabled");
                //btnparam.attr("disabled", "disabled");
            } else {
                btntrans.removeAttr("disabled");                 
                if (submitbtn == 1) {
                    btnsubmit.removeAttr("disabled");
                } else {
                    btnsubmit.attr("disabled", "disabled");
                }
                if (parambtn == 1) {
                    btnparam.removeAttr("disabled");
                } else {
                    btnparam.attr("disabled", "disabled");
                }
            }
        };
 
        function validateMinHoursForHalfDA(ctrlvalue) {
            if (ctrlvalue > 0 && ctrlvalue < 10) { return true; } else { return false; }
        };
        function validateTextbox(controlid) {
            var result = false;
            var ctrlvalue = $('#' + controlid).val();
            switch (controlid) {
                case "MinHoursForHalfDA":
                    if (ctrlvalue > 0 && ctrlvalue < 10) { result = true; }
                    break;
                case "MinKmsForDA":
                    if (ctrlvalue > 0 && ctrlvalue < 100) { result = true; }
                    break;
                case "EffectiveDate":
                    if (ctrlvalue == '') { result = false; }
                    else {
                        if (ctrlvalue == '0001-01-01') { result = false; } else { result = true;}                        
                    }
                    break;
            }
            return result;
        };
        function YesNoValidator(value) {
            if (value == "true" || value == "false") { return true; } else { return false; }
        };
        function OnlyYesValidator(value) {
            if (value == "true") { return true; } else { return false; }
        };
        function btnClearClicked() {
            $('.isvalidate').each(function () {
                $(this).removeClass('is-valid').addClass('is-invalid').val('');
            });
            $('.isvalidate2').each(function () {
                $(this).removeClass('is-valid').addClass('is-invalid').val('');
            });
            $("#SelectedCategoryIds").multiselect("clearSelection");
            $("#SelectedCategoryIds").multiselect('refresh');
            validateallcontrol();
        }; 
$(document).ready(() => {

            $('#SelectedCategoryIds').change(function () {
                var selectedValues = $(this).val();
                if (selectedValues == '') {
                    $(this).removeClass('is-valid').addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid').addClass('is-valid');
                }
                $('#IsBtn').val("1");
                validateallcontrol();
            });            
            var isvalid = false;
            $('.isvalidate').each(function () {
                isvalid = validatectrl($(this).attr("id"), $(this).val());
                if (isvalid) {
                    $(this).removeClass('is-invalid').addClass('is-valid');
                } else {
                    $(this).removeClass('is-valid').addClass('is-invalid');
                }
            });
            validateallcontrol();
        });
    //</script>
    //<script>
        
    //</script>
    //<script>
        $(window).scroll(function (e) {
            var $el = $('.fixedElement');
            var isPositionFixed = ($el.css('position') == 'fixed');
            if ($(this).scrollTop() > 200 && !isPositionFixed) {
                $el.css({ 'position': 'sticky', 'top': '0px' });
            }
            if ($(this).scrollTop() < 200 && isPositionFixed) {
                $el.css({ 'position': 'static', 'top': '0px' });
            }
        });
    //</script>
//function mytooltipmsg(tooltipControl, isvalid) {
//    if (isvalid) {
//        tooltipControl.addClass('inVisible');
//    } else {
//        tooltipControl.removeClass('inVisible');
//    }
//};