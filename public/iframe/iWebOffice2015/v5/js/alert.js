function success(type) {
    $("body").append('<div class="forceVisualMessageQueue"><div style="top: 90px" class="toastContainer"><div class="forceToastMessage success"><span class="leftIcon"><svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info" class="svgIcon"><g lwc-gj6nt2jq8l=""><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z" lwc-gj6nt2jq8l=""></path></g></svg></span><div class="forceActionsText">'+type+'</div><span class="closeIcon"><svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-3bq099ugqsh="" data-key="close" class="svgIcon"><g lwc-3bq099ugqsh=""><path d="M310 254l130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 01-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0114 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 010-14z" lwc-3bq099ugqsh=""></path></g></svg></span></div></div></div>');
    setTimeout(function () {
        $(".success").remove();
    }, 2000);
}
function error(type) {
    $("body").append('<div class="forceVisualMessageQueue"><div style="top: 90px" class="toastContainer"><div class="forceToastMessage error"><span class="leftIcon"><svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-gj6nt2jq8l="" data-key="info" class="svgIcon"><g lwc-gj6nt2jq8l=""><path d="M260 20a240 240 0 100 480 240 240 0 100-480zm0 121c17 0 30 13 30 30s-13 30-30 30-30-13-30-30 13-30 30-30zm50 210c0 5-4 9-10 9h-80c-5 0-10-3-10-9v-20c0-5 4-11 10-11 5 0 10-3 10-9v-40c0-5-4-11-10-11-5 0-10-3-10-9v-20c0-5 4-11 10-11h60c5 0 10 5 10 11v80c0 5 4 9 10 9 5 0 10 5 10 11z" lwc-gj6nt2jq8l=""></path></g></svg></span><div class="forceActionsText">'+type+'</div><span class="closeIcon"><svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon" lwc-3bq099ugqsh="" data-key="close" class="svgIcon"><g lwc-3bq099ugqsh=""><path d="M310 254l130-131c6-6 6-15 0-21l-20-21c-6-6-15-6-21 0L268 212a10 10 0 01-14 0L123 80c-6-6-15-6-21 0l-21 21c-6 6-6 15 0 21l131 131c4 4 4 10 0 14L80 399c-6 6-6 15 0 21l21 21c6 6 15 6 21 0l131-131a10 10 0 0114 0l131 131c6 6 15 6 21 0l21-21c6-6 6-15 0-21L310 268a10 10 0 010-14z" lwc-3bq099ugqsh=""></path></g></svg></span></div></div></div>');
    setTimeout(function () {
        $(".error").remove();
    }, 2000);
}
// 判断是否是ie
function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');
    if (msie > 0 || trident > 0) {
        return true;
    } else {
        return false;
    }
}