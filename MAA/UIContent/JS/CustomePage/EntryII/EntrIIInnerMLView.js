function VisiblePersonRow(personid) {
    $('#TPDtlTable tbody tr').each(function () {
        $(this).addClass('inVisible');
    });
    $('#M_' + personid).each(function () {
        $(this).removeClass('inVisible');
    });
    $('#TPTable tbody tr').each(function () {
        $(this).removeClass('selected-row');
    });
    $('#tr_' + personid).each(function () {
        $(this).addClass('selected-row');
    });
};
function TPSelected() {
    var targetCtrl = $(TPSelected.caller.arguments[0].target);
    VisiblePersonRow(targetCtrl.attr('id'));
};
$(document).ready(function () {
    var defPerson = $('#DefaultPersonID').val();
    $('#' + defPerson).attr('checked', true);
    VisiblePersonRow(defPerson);
});