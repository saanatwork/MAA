function btn1Clicked() {
    alert($('#TourCategory1').val());
    alert($('#TourCategory2').val());
    var result = GetCommonValuesFromArray($('#TourCategory1').val(), $('#TourCategory2').val());
    alert(result);
};