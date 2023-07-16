/**
 * js References
 * multiselect.js,
 * css References
 * style.css,bootstrap-multiselect.css,
 */
//-----------------------------------------------------
/**
 * Some Useful functions
 *
 */
function GetCommonValues(CommaSeparatedString1, CommaSeparatedString2) {
    var commonElements = [];
    var a1 = []; var a2 = [];
    if (CommaSeparatedString1.indexOf(',') >= 0) {
        a1 = CommaSeparatedString1.split(',');
    } else { a1.push(CommaSeparatedString1); }
    if (CommaSeparatedString2.indexOf(',') >= 0) {
        a2 = CommaSeparatedString2.split(',');
    } else { a2.push(CommaSeparatedString2); }
    $.each(a1, function (index, value) {
        if ($.inArray(value, a2) !== -1) {
            commonElements.push(value);
        }
    });
    return commonElements;
};
function GetCommonValuesFromArray(CommaSeparatedString1, CommaSeparatedString2) {
    var commonElements = [];
    $.each(CommaSeparatedString1, function (index, value) {
        if ($.inArray(value, CommaSeparatedString2) !== -1) {
            commonElements.push(value);
        }
    });
    return commonElements;
};
/**
 * Validations
 *
 */
function isOnlyDigits(value) {
    var regex = /^[0-9]+$/;
    return regex.test(value);
};
function isDecimalNumber(value) {
    var regex = /^\d+(\.\d+)?$/;
    return regex.test(value);
}
function isOnlyAlphabates(value) {
    var regex = /^[a-zA-Z]+$/;
    return regex.test(value);
}
function isOnlyAlphabatesWithSpace(value) {
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(value);
}
function isAlphaNumeric(value) {
    var regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
}
function isAlphaNumericWithSpace(value) {
    var regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(value);
}
function isValidEmailID(value) {
    var regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return regex.test(value);
}
function isValidContactNumber(value) {
    var regex = /^\d{10}$/;
    return regex.test(value);
}
function isAlphabateWithMaxLimit(value, maxLimitInteger) {
    if (value.length > maxLimitInteger) { return false; }
    else {
        return value.match(/^[a-zA-Z]+$/);
    }
};
function isAlphaNumericWithMaxLimit(value, maxLimitInteger) {
    if (value.length > maxLimitInteger) { return false; }
    else {
        return value.match(/^[a-zA-Z0-9]+$/);
    }
};
function isSpaceAlphabateWithMaxLimit(value, maxLimitInteger) {
    if (value.length > maxLimitInteger) { return false; }
    else {
        return value.match(/^[a-zA-Z\s]+$/);
    }
};
function isSpaceAlphaNumericWithMaxLimit(value, maxLimitInteger) {
    if (value.length > maxLimitInteger) { return false; }
    else {
        return value.match(/^[a-zA-Z0-9\s]+$/);
    }
};
function validatePassword(value) {
    //(?=.* [a - z]) Contains at least one lowercase letter
    //(?=.* [A - Z]) Contains at least one uppercase letter
    //(?=.*\d) Contains at least one digit
    //(?=.* [@$!%*?&]) Contains at least one special character
    //[A - Za - z\d@$!%*?&]{ 6,} Contains at least 6 characters and only includes uppercase

    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return regex.test(value);
}
function isValidMaxWordCount(value, MaxNoOfWordsRequired) {
    var wordcount = $.trim(value).split(" ").length;
    if (wordcount <= MaxNoOfWordsRequired) { return true; } else { return false; }
}
function CompareStringArrayForCommonValue(CommaSeparatedString1, CommaSeparatedString2) {
    var commonElements = [];
    $.each(CommaSeparatedString1, function (index, value) {
        if ($.inArray(value, CommaSeparatedString2) !== -1) {
            commonElements.push(value);
        }
    });
    if (commonElements.length > 0) {
        return true;
    } else { return false; }
};
function CompareStringForCommonValue(CommaSeparatedString1, CommaSeparatedString2) {
    var commonElements = [];
    var a1 = []; var a2 = [];
    if (CommaSeparatedString1.indexOf(',') >= 0) {
        a1 = CommaSeparatedString1.split(',');
    } else { a1.push(CommaSeparatedString1); }
    if (CommaSeparatedString2.indexOf(',') >= 0) {
        a2 = CommaSeparatedString2.split(',');
    } else { a2.push(CommaSeparatedString2); }
    $.each(a1, function (index, value) {
        if ($.inArray(value, a2) !== -1) {
            commonElements.push(value);
        }
    });
    if (commonElements.length > 0) {
        return true;
    } else { return false; }
};
/**
 * Date Time
 *
 */

/**
 * Auto Apply Classes
 * 1. For Multi Select: ApplyMultiSelect/ApplyMultiSelectWithSelectAll 
 */
$(document).ready(function () {    
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
    $('.indDate').on('change', function () {
        selectedDate=$(this).val();
        var formattedDate = new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        $('#Input1').val(formattedDate);
        $(this).val(formattedDate);

        var inputField = document.getElementById("Date1");
        var selectedDate = inputField.value;
        var formattedDate = new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        inputField.value = formattedDate;
    });
});