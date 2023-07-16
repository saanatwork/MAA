/* Sequential Lock Unlock Controlls Inside A Container - For CBBW New Requirement
 * Follow The Instruction
 * 1. Container Should Have "SLUContainer" Class
 * 2. Controlls Should Have "SLUCtrl/SLUCtrlP" Class
 * 3. Sections Should Have "SLUSection" Class
 * 4. "SLUBtn" Class For Buttons "SLUBtnOK" Class Is Used Dynamically Aftre Button Functionalities Done Successfully 
 * 5. "SLUStatement" Class For Div To Show Green Or Red Borders
 * 6. "approvalForm" Class For Div & "ApproveCtrl" For Approve Status To Show Approval Patern.
 * 7. "LUPS/LUPSP" Class Is Applicable To Controlls. (If Control Is Invald Then Unlock Previous Section )
 * 8. "SLUAddBtn" & "SLURemoveBtn" Class Is For Table Row Cloaning Buttons.
 * 9. "EC" Class Is Used In Table Row Controlls. By Changing The Value All Next Rows Will Be Deleted
 */
////////// These Functions may call from out side /////
function SLUValid(myCtrl) {
    SLUNextCtrl(myCtrl); //Unlock the next visible control.
    var mySection = myCtrl.closest('.SLUSection'); //Geting the section of the control.
    var nextSection = GetNextSLUSection(mySection); //Getting next section id of myCtrl
    if (nextSection != null) {
        if (IsValidSection(mySection)) { //Check Elligibility of current section to lock/unlock the next section
            UnLockSLUSection(nextSection);//unlock next section
        }
        else {
            //LockSLUSection(nextSection);//lock next section
            LockNextSections(myCtrl);
        }
    } else { IsValidSection(mySection); }
    if (myCtrl.hasClass('LUPS')) { LockPreviousSections(myCtrl); }
    if (myCtrl.hasClass('LUPSP')) { LockPreviousSections(myCtrl); }
    // For Container - Specially for Rows
    

};
function SLUInvalid(myCtrl) {
    LockNextCtrlsInContainer(myCtrl);
    var mySection = myCtrl.closest('.SLUSection');
    //LockSLUSection(GetNextSLUSection(mySection));//lock next section
    LockNextSections(myCtrl);
    IsValidSection(mySection);
    if (myCtrl.hasClass('LUPS')) { UnLockPreviousSections(myCtrl); }
};
function LockNextSections(myCtrl) {
    mySection = myCtrl.closest('.SLUSection');
    var allSections = $('.SLUSection');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex < allSections.length - 1) {
        for (var i = currentSecIndex + 1; i < allSections.length; i++) {
            if (allSections.eq(i).is(":visible")) { LockSLUSection(allSections.eq(i)); }
        }
    }
};
function UnLockNextSections(myCtrl) {
    mySection = myCtrl.closest('.SLUSection');
    var allSections = $('.SLUSection');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex < allSections.length - 1) {
        for (var i = currentSecIndex + 1; i < allSections.length; i++) {
            if (allSections.eq(i).is(":visible")) { UnLockSLUSection(allSections.eq(i)); }
        }
    }
};
function LockPreviousSections(myCtrl) {
    mySection = myCtrl.closest('.SLUSection');
    var allSections = $('.SLUSection');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex <= allSections.length - 1) {
        for (var i = 0; i < currentSecIndex; i++) {
            if (allSections.eq(i).is(":visible")) { LockSLUSectionV2(allSections.eq(i)); }
        }
    }
};
function UnLockPreviousSections(myCtrl) {
    mySection = myCtrl.closest('.SLUSection');
    var allSections = $('.SLUSection');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex <= allSections.length - 1) {
        for (var i = 0; i < currentSecIndex; i++) {
            if (allSections.eq(i).is(":visible")) { UnLockSLUSectionAllCtrlV2(allSections.eq(i)); }
        }
    }
};
function LockNextContainers(myCtrl) {
    mySection = myCtrl.closest('.SLUContainer');
    var allSections = $('.SLUContainer');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex < allSections.length - 1) {
        for (var i = currentSecIndex + 1; i < allSections.length; i++) {
            if (allSections.eq(i).is(":visible")) { LockSLUContainer(allSections.eq(i)); }
        }
    }
};
function UnLockNextContainers(myCtrl) {
    mySection = myCtrl.closest('.SLUContainer');
    var allSections = $('.SLUContainer');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex < allSections.length - 1) {
        for (var i = currentSecIndex + 1; i < allSections.length; i++) {
            if (allSections.eq(i).is(":visible")) { UnLockSLUContainer(allSections.eq(i)); }
        }
    }
};
function LockPreviousContainers(myCtrl) {
    mySection = myCtrl.closest('.SLUContainer');
    var allSections = $('.SLUContainer');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex < allSections.length - 1) {
        for (var i = 0; i < currentSecIndex; i++) {
            if (allSections.eq(i).is(":visible")) { LockSLUContainer(allSections.eq(i)); }
        }
    }
};
function UnLockPreviousContainers(myCtrl) {
    mySection = myCtrl.closest('.SLUContainer');
    var allSections = $('.SLUContainer');
    var currentSecIndex = allSections.index(mySection);
    if (currentSecIndex < allSections.length - 1) {
        for (var i = 0; i < currentSecIndex; i++) {
            if (allSections.eq(i).is(":visible")) { UnLockSLUContainerAllCtrl(allSections.eq(i)); }
        }
    }
};
///////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    $('.SLUCtrl').focus(function () {          
        if ($(this).hasClass('SLUCtrlP')) {
            LockNextCtrlsInContainerV2($(this));
            $(this).val('').isInvalidCtrl();
        }
        else {
            if ($(this).hasClass('is-valid')) {
                SLUNextCtrl($(this));
            }
            else {
                LockNextCtrlsInContainer($(this));
            }
        }
        $(this).tooltip('show');
    });
    $('.ApproveCtrl').each(function () {
        var that = $(this);
        var mDiv = that.closest('.approvalForm');
        var app = that.val().toUpperCase();
        if (app == "YES" || app == "NO" || app == "1") {
            mDiv.isApprovalDone();
        } else {
            mDiv.isApprovalNotDone();
        }
    });
    $('.SLUStatement').each(function () {
        StyleStatementSection($(this));
    });
    //Enable First section and disable the rest
    var i = 0;
    $('.SLUSection').each(function () {
        that = $(this);
        if (i == 0) {
            UnLockSLUSection(that);
        }
        if (IsValidSection(that)) {
            UnLockSLUSection(GetNextSLUSection(that));
        } else { LockSLUSection(GetNextSLUSection(that)); }
        i += 1;
    });
    //Table Row Cloaning
    $('.SLUAddBtn').click(function () {
        $(this).RowAddButtonClicked();
    });
    $('.SLURemoveBtn').click(function () {
        $(this).RowRemoveButtonClicked();
    });
    $('.EC').on('change', function () {
        $(this).RemoveAllNextRows();
    });
    $('.ApproveCtrl').on('change', function () {
        var that = $(this);
        var mDiv = that.closest('.approvalForm');
        var app = that.val().toUpperCase();
        if (app == "YES" || app == "NO" || app == "1") {
            mDiv.isApprovalDone();
        } else {
            mDiv.isApprovalNotDone();
        }
    });
    // Use The Below Code Only UI Design Not In Functional Developement
    //$('.SLUCtrl').on('change keyup', function () {
    //    var that = $(this);
    //    if (that.val() != '') {
    //        that.isValidCtrl();
    //    } else { that.isInvalidCtrl(); }
    //});
});
///////// Helper functions
$.fn.SLUEntrynDisabledForEntry = function () {
    var that = this;
    that.val('');
    that.attr('disabled', 'disabled')
        .addClass('bg-blue border-red nodrop is-invalid')
        .removeClass('is-valid');
};
$.fn.SLUEntrynEnableForEntry = function () {
    var that = this;
    that.removeAttr('disabled')
        .addClass('is-invalid')
        .removeClass('bg-blue border-blue is-valid nodrop');
    that.val('');
};
$.fn.isSLURed = function () {
    var that = this;
    that.addClass('border-red').removeClass('border-green');
};
$.fn.isSLUGreen = function () {
    var that = this;
    that.addClass('border-green').removeClass('border-red');
};
$.fn.isApprovalNotDone = function () {
    var that = this;
    that.addClass('alert-danger').removeClass('alert-success');
};
$.fn.isApprovalDone = function () {
    var that = this;
    that.addClass('alert-success').removeClass('alert-danger');
};
$.fn.actApprovalSection = function () {
    var that = this;
    var y = that.find('.is-invalid').length;
    if (y <= 0) {
        var app = that.find('.ApproveCtrl').eq(0).val().toUpperCase();
        if (app == "YES" || app == "NO" || app == "1" || app == "0") { that.isApprovalDone(); } else { that.isApprovalNotDone(); }
    }
    else { that.isApprovalNotDone(); }
};
$.fn.isInvalidCtrl = function () {
    var that = this;
    that.addClass('is-invalid valid').removeClass('is-valid');
    SLUInvalid(that);
};
$.fn.isValidCtrl = function () {
    var that = this;
    that.addClass('is-valid valid').removeClass('is-invalid');
    SLUValid(that);
};
$.fn.ButtonOk = function () {
    var that = this;
    //debugger;
    var x = that.attr('id');
    //alert(that.attr('id'));
    that.addClass('SLUBtnOK');
    var mySection = that.closest('.SLUSection');
    var myNextSection = GetNextSLUSection(mySection);
    if (IsValidSection(mySection)) {
        UnLockSLUSection(myNextSection);
    } else { LockSLUSection(myNextSection); }
    if (that.hasClass('LUPS')) { LockPreviousSections(that); }
    if (that.hasClass('LUPSP')) { LockPreviousSections(that); }
};
$.fn.ButtonNotOk = function () {
    var that = this;
    that.removeClass('SLUBtnOK');
    var mySection = that.closest('.SLUSection');
    var myNextSection = GetNextSLUSection(mySection);
    if (IsValidSection(mySection)) {
        UnLockSLUSection(myNextSection);
    } else { LockSLUSection(myNextSection); }
    if (that.hasClass('LUPS')) { UnLockPreviousSections(that); }
};
$.fn.RowAddButtonClicked = function () {
    var that = this;
    var myContainer = that.closest('.SLUContainer');
    LockSLUContainer(myContainer);
};
$.fn.RowRemoveButtonClicked = function () {
    var that = this;
    //alert(that.attr('id'));
    var myContainer = that.closest('.SLUContainer');
    var mySection = that.closest('.SLUSection');
    const allcontainers = mySection.find('.SLUContainer');
    const currentIndex = allcontainers.index(myContainer);
    if (currentIndex > 0) { UnLockSLUContainerAllCtrl(allcontainers.eq(currentIndex - 1)); }
    UnLockSLUSection(GetNextSLUSection(mySection));
};
$.fn.RemoveAllNextRows = function () {
    var that = this;
    var myContainer = that.closest('.SLUContainer');
    var mySection = that.closest('.SLUSection');
    const allcontainers = mySection.find('.SLUContainer');
    const currentIndex = allcontainers.index(myContainer);
    if (currentIndex < allcontainers.length - 1) {
        for (var i = currentSecIndex + 1; i < allcontainers.length; i++) {
            allcontainers.eq(i).remove();
        }
    }
};
$.fn.makeSLUEnable = function () {
    var that = this;
    that.removeAttr('disabled');
    that.removeClass('nodrop');
};
$.fn.makeSLUDisable = function () {
    var that = this;
    that.attr('disabled', 'disabled');
    that.addClass('nodrop');
};
function LockNextCtrlsInContainer(myCtrl) {
    var myDiv = myCtrl.closest('.SLUContainer');
    const inputControls = myDiv.find('.SLUCtrl');
    const currentIndex = inputControls.index(myCtrl);
    if (currentIndex < inputControls.length - 1) {
        if (inputControls.eq(currentIndex + 1).is(":visible") || inputControls.eq(currentIndex + 1).prop('multiple')) {
            LockSLUCtrl(inputControls.eq(currentIndex + 1));
        }
        LockNextCtrlsInContainer(inputControls.eq(currentIndex + 1));
    }
};
function LockNextCtrlsInContainerV2(myCtrl) {
    //debugger;    
    var myDiv = myCtrl.closest('.SLUContainer');
    const inputControls = myDiv.find('.SLUCtrl');
    const currentIndex = inputControls.index(myCtrl);
    if (currentIndex < inputControls.length - 1) {
        if (inputControls.eq(currentIndex + 1).is(":visible") || inputControls.eq(currentIndex + 1).prop('multiple')) {
            LockSLUCtrl(inputControls.eq(currentIndex + 1));
            inputControls.eq(currentIndex + 1).val('').isInvalidCtrl();
        }
        LockNextCtrlsInContainerV2(inputControls.eq(currentIndex + 1));
    }
};
function SLUNextCtrl(myCtrl) {
    //alert('SLUNextCtrl '+myCtrl.attr('id'));
    var myDiv = myCtrl.closest('.SLUContainer');
    const inputControls = myDiv.find('.SLUCtrl');
    const currentIndex = inputControls.index(myCtrl);
    if (currentIndex < inputControls.length - 1) {
        if (inputControls.eq(currentIndex + 1).is(":visible") || inputControls.eq(currentIndex + 1).prop('multiple')) {
            UnLockSLUCtrl(inputControls.eq(currentIndex + 1));
        }
        else {
            SLUNextCtrl(inputControls.eq(currentIndex + 1));
        }
    }
};
function GetNextSLUSection(mySection) {
    var nextSection = null;
    var allSections = $('.SLUSection');
    var currentSecIndex = allSections.index(mySection);
    var x = 0;
    if (currentSecIndex < allSections.length - 1) {
        for (var i = currentSecIndex + 1; i < allSections.length; i++) {
            if (allSections.eq(i).is(":visible")) { x = i; break; }
        }
        //nextSectionID = allSections.eq(x).attr('id');
        nextSection = allSections.eq(x);
    }
    return nextSection;
};
function IsValidSection(mySection) {
    //var mySection = $('#' + mySectionID);
    if (mySection.hasClass('SLUStatement')) { //if section is a statement section
        StyleStatementSection(mySection);
    }
    if (mySection.hasClass('approvalForm')) { //if section is a approval/ratification section
        mySection.actApprovalSection();
    }
    return IsEnabledSection(mySection);
};
function StyleStatementSection(myDiv) {
    var x = myDiv.find('.is-invalid').length;
    if (x > 0) { myDiv.isSLURed(); } else { myDiv.isSLUGreen(); }
};
function IsEnabledSection(mySection) {
    var isvalid = false;
    var x = mySection.find('.is-invalid').length;
    var btns = mySection.find('.SLUBtn').length;
    var okbtns = mySection.find('.SLUBtnOK').length;
    if (x <= 0 && btns == okbtns) { isvalid = true; }
    return isvalid;
};
// Locking Unlocking elements
function LockSLUContainer(myContainer) {
    if (myContainer != null) {
        myContainer.find('.SLUCtrl').each(function () {
            LockSLUCtrl($(this));
        });
        myContainer.find('.SLUAddBtn').each(function () {
            LockSLUCtrl($(this));
        });
        myContainer.find('.datelabel').each(function () {
            $(this).addClass('nodrop');
        });
    }
    //myContainer.addClass('sectionB');
};
function UnLockSLUContainer(myContainer) {
    if (myContainer != null) {
        var i = 0;
        myContainer.find('.SLUCtrl').each(function () {
            if (i == 0) { UnLockSLUCtrl($(this)); }
            else { LockSLUCtrl($(this)); }
            i += 1;
        });
        myContainer.find('.SLUAddBtn').each(function () {
            UnLockSLUCtrl($(this));
        });
        myContainer.find('.datelabel').each(function () {
            $(this).removeClass('nodrop');
        });
        //myContainer.removeClass('sectionB');
    }
};
function UnLockSLUContainerAllCtrl(myContainer) {
    if (myContainer != null) {
        //myContainer.removeClass('sectionB');
        myContainer.find('.SLUCtrl').each(function () {
            UnLockSLUCtrl($(this));
        });
        myContainer.find('.SLUAddBtn').each(function () {
            UnLockSLUCtrl($(this));
        });
        myContainer.find('.SLURemoveBtn').each(function () {
            UnLockSLUCtrl($(this));
        });
        myContainer.find('.datelabel').each(function () {
            $(this).removeClass('nodrop');
        });
    }
};
function LockSLUSection(mySection) {
    if (mySection != null) {
        mySection.find('.SLUCtrl').each(function () {
            LockSLUCtrl($(this));
        });
        mySection.find('.SLUBtn').each(function () {
            $(this).makeSLUDisable();
        });
        mySection.find('.datelabel').each(function () {
            $(this).addClass('nodrop');
        });
        mySection.addClass('sectionB');
    }
};
function LockSLUSectionV2(mySection) {
    if (mySection != null) {
        mySection.find('.SLUCtrl').each(function () {
            LockSLUCtrlV2($(this));
        });
        mySection.find('.SLUBtn').each(function () {
            $(this).makeSLUDisable();
        });
        mySection.find('.datelabel').each(function () {
            $(this).addClass('nodrop');
        });
        mySection.addClass('sectionB');
    }
};
function UnLockSLUSection(mySection) {    
    if (mySection != null) {
        mySection.removeClass('sectionB');
        var i = 0;
        mySection.find('.SLUCtrl').each(function () {
            if (i == 0) {
                UnLockSLUCtrl($(this));
            }
            else {
                if ($(this).hasClass('is-valid')) {
                    UnLockSLUCtrl($(this));
                } else {
                    LockSLUCtrl($(this));
                }                
            }
            i += 1;
        });
        mySection.find('.SLUBtn').each(function () {
            var x = $(this).attr('id');
            $(this).makeSLUEnable();
        });
        mySection.find('.datelabel').each(function () {
            $(this).removeClass('nodrop');
        });
    }
};
function UnLockSLUSectionV2(mySection) {
    if (mySection != null) {
        mySection.removeClass('sectionB');
        var i = 0;
        mySection.find('.SLUCtrl').each(function () {
            if (i == 0) { UnLockSLUCtrlV2($(this)); }
            else { LockSLUCtrlV2($(this)); }
            i += 1;
        });
        mySection.find('.SLUBtn').each(function () {
            var x = $(this).attr('id');
            $(this).makeSLUEnable();
        });
        mySection.find('.datelabel').each(function () {
            $(this).removeClass('nodrop');
        });
    }
};
function UnLockSLUSectionAllCtrl(mySection) {
    if (mySection != null) {
        mySection.removeClass('sectionB');
        mySection.find('.SLUCtrl').each(function () {
            UnLockSLUCtrl($(this));
        });
        mySection.find('.SLUBtn').each(function () {
            var x = $(this).attr('id');
            $(this).makeSLUEnable();
        });
        mySection.find('.datelabel').each(function () {
            $(this).removeClass('nodrop');
        });
    }
};
function UnLockSLUSectionAllCtrlV2(mySection) {
    if (mySection != null) {
        mySection.removeClass('sectionB');
        mySection.find('.SLUCtrl').each(function () {
            UnLockSLUCtrlV2($(this));
        });
        mySection.find('.SLUBtn').each(function () {
            var x = $(this).attr('id');
            $(this).makeSLUEnable();
        });
        mySection.find('.datelabel').each(function () {
            $(this).removeClass('nodrop');
        });
    }
};
function LockSLUCtrl(myCtrl) {
    if (myCtrl != null) {
        myCtrl.attr('disabled', 'disabled');
        myCtrl.addClass('nodrop');
        //For Multiselect
        if (myCtrl.prop('multiple')) {
            var closestDiv = myCtrl.closest("div");
            closestDiv.find('.btn-default').each(function () {
                $(this).addClass('nodrop disabled bg-blue');
            });
        }
        // For Custom CSS
        if (myCtrl.hasClass('EntrynDisabledForEntry')) { myCtrl.SLUEntrynDisabledForEntry(); }
    }
};
function LockSLUCtrlV2(myCtrl) {
    if (myCtrl != null) {
        myCtrl.attr('disabled', 'disabled');
        myCtrl.addClass('nodrop');
        //For Multiselect
        if (myCtrl.prop('multiple')) {
            var closestDiv = myCtrl.closest("div");
            closestDiv.find('.btn-default').each(function () {
                $(this).addClass('nodrop disabled bg-blue');
            });
        }
        // For Custom CSS
        //if (myCtrl.hasClass('EntrynDisabledForEntry')) { myCtrl.SLUEntrynDisabledForEntry(); }
    }
};
function UnLockSLUCtrl(myCtrl) {
    if (myCtrl != null) {
        myCtrl.removeAttr('disabled');
        myCtrl.removeClass('nodrop');
        //For Multiselect
        if (myCtrl.prop('multiple')) {
            var closestDiv = myCtrl.closest('div');
            closestDiv.find('.btn-default').each(function () {
                $(this).removeClass('nodrop disabled bg-blue');
                $(this).removeAttr('disabled');
            });
        }
        // For Custom CSS
        if (myCtrl.hasClass('EntrynDisabledForEntry')) { myCtrl.SLUEntrynEnableForEntry(); }
        myCtrl.closest('.SLUSection').removeClass('sectionB');
    }
};
function UnLockSLUCtrlV2(myCtrl) {
    if (myCtrl != null) {
        myCtrl.removeAttr('disabled');
        myCtrl.removeClass('nodrop');
        //For Multiselect
        if (myCtrl.prop('multiple')) {
            var closestDiv = myCtrl.closest('div');
            closestDiv.find('.btn-default').each(function () {
                $(this).removeClass('nodrop disabled bg-blue');
                $(this).removeAttr('disabled');
            });
        }
        // For Custom CSS
        //if (myCtrl.hasClass('EntrynDisabledForEntry')) { myCtrl.SLUEntrynEnableForEntry(); }
        myCtrl.closest('.SLUSection').removeClass('sectionB');
    }
};

