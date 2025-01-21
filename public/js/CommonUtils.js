var elementNotice
$('body').append('<div id="elementnotice"></div>')
$('head').append('<style>.el-loading-mask{z-index:99999 !important;}</style>')
setTimeout(function () {
    if (typeof Vue != 'undefined' && $('#elementnotice').length>0) {
        elementNotice = new Vue({
            el: '#elementnotice',
            data: {
                loading: ''
            },
            methods: {
                openloading: function () {
                    this.loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                },
                closeDialog: function () {
                    if (this.loading.close) {
                        this.loading.close()
                    }
                }
            }
        })
    } else {
        elementNotice = {}
    }
}, 0)


var commonUtils =
{
    IS_IE: (navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER' && !(navigator.userAgent.indexOf('MSIE 8') >= 0 || navigator.userAgent.indexOf('MSIE 9') >= 0)),
    IS_IE7: navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER' && navigator.userAgent.indexOf('MSIE 7') >= 0,
    IS_IE8: navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER' && navigator.userAgent.indexOf('MSIE 8') >= 0,
    IS_NS: navigator.appName == 'Netscape1',
    IS_FF2: navigator.userAgent.indexOf('Firefox/2') >= 0 || navigator.userAgent.indexOf('Iceweasel/2') >= 0,
    IS_FF3: navigator.userAgent.indexOf('Firefox/3') >= 0 || navigator.userAgent.indexOf('Iceweasel/3') >= 0 || navigator.userAgent.indexOf('Firefox') >= 0,
    IS_FF5: navigator.userAgent.indexOf('Mozilla') >= 0,
    IS_H5: navigator.userAgent.indexOf('Mozilla/5') >= 0,
    IS_Chrome: navigator.userAgent.indexOf('Chrome') >= 0,
    OS_WIN7: navigator.userAgent.indexOf('Windows NT 6') >= 0,
    OS_WIN10: navigator.userAgent.indexOf('Windows NT 10') >= 0,
    isBrowserSupported: function () {
        if (commonUtils.IS_IE8 || commonUtils.IS_IE7)
            return false;
        return commonUtils.IS_Chrome || commonUtils.IS_GC || commonUtils.IS_H5 || commonUtils.IS_FF5 || commonUtils.IS_IE11 || commonUtils.IS_AppleWebKit;
    }
    //Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0
}
function debuggerLog(d) {
    console.log(d);
}
function isNumeric(input) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}
function isDate(input) {
    var str = input;
    if (str.length != 0) {
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        var r = str.match(reg);
        if (r == null)
            return false;//请将“日期”改成你需要验证的属性名称!
        else {
            var d = new Date(r[1], r[3] - 1, r[4]);
            return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        }
    }
    return true;
}
function openWindow(url, title) {
    window.open(url, title, 'titlebar=yes,fullscreen=yes,top=0,left=0,resizable=yes,scrollbars=yes,menubar=yes');
}
function openWindowWithPost(url, data) {

    var form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    
    //var srch = $("#srchText").val();
    var srch = $('#srchText', parent.document).val()
    if (search) { url += "&search=" + search; } else {
        var search = $('.slds-input.search').val()
        if (search) {
            url += "&search=" + search;
        }
    }
    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2])); return null;
}
var dialogs = {};
function showDialog(url, dialogName, dialogTitle, width, height) {
    var c = b = null;
    c = dialogName;// "notifyInstance";
    //debugger;
    b = url;
    var dialog = null;
    //var dialog = new CollaborationAccessibleDialog(c, '催办', b, 450, 530);

    if (!dialogs[c]) {
        dialog = new NonaccessibleDialog(c, dialogTitle, b, height, width); //CollaborationAccessibleDialog
        dialogs[c] = dialog;
    }
    else {
        dialog = dialogs[c];
        dialog.url = b;
    }

    dialog.display();
}
function closeDialog(refresh) {
    window.parent.document.getElementById("changeDiv").style.display = "none";
}
function closeLayerDialog(refreshParent) {
    if (window.opener) {
        window.opener.closeDialog(refreshParent);
    } else {
        window.parent.closeDialog(refreshParent);
    }
}
function getCookie(c_name) {
    //debugger;
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            //return unescape(y);
            return decodeURIComponent(y);
        }
    }
}
function getClientHeight() {
    var x = 0, y = 0;
    if (self.innerHeight) // all except Explorer
    {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) // Explorer 6 Strict Mode
    {
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) // other Explorers
    {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    return y;
}
function getClientWidth() {
    var x = 0, y = 0;
    if (self.innerHeight) // all except Explorer
    {
        x = self.innerWidth;
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) // Explorer 6 Strict Mode
    {
        x = document.documentElement.clientWidth;
        y = document.documentElement.clientHeight;
    }
    else if (document.body) // other Explorers
    {
        x = document.body.clientWidth;
        y = document.body.clientHeight;
    }
    return x;
}
function getFilterCondition() {
    var b = "", c = "", g = "", h = "";

    jQuery("input[searchColumn^='true']").each(function (index, value) {
        var fullId = jQuery(this).attr("id");
        //debugger;
        //var fieldName = fullId.substr(7);
        c = jQuery(this).attr("datafield");//column name
        g = jQuery(this).attr("dataope");//operator
        h = jQuery(this).val();          //value

        function encodeForSearch(a) {
            return window.encodeURIComponent ? encodeURIComponent(a) : escape(a);
        }

        "" != c && "" != g && (b = b + "\n" + encodeForSearch(c), b = b + "\t" + encodeForSearch(g), b = b + "\t" + h)
    });
    // debugger;
    jQuery("select[searchColumn^='true']").each(function (index, value) {
        //jQuery("select").each(function (index, value) {
        var fullId = jQuery(this).attr("id");

        //var fieldName = fullId.substr(7);
        c = jQuery(this).attr("datafield");//column name
        //c = fullId;
        //g = jQuery(this).attr("dataope");//operator
        g = "eq";
        h = jQuery(this).val();          //value
        //alert(c+" "+g+" "+h);
        function encodeForSearch(a) {
            return window.encodeURIComponent ? encodeURIComponent(a) : escape(a);
        }

        "" != c && "" != g && (b = b + "\n" + encodeForSearch(c), b = b + "\t" + encodeForSearch(g), b = b + "\t" + h)
    });

    return b;
}
function initDatePicker() {
    var date = new Date();
    var curYear = date.getFullYear();
    var startYear = curYear - 10;
    var endYear = curYear + 10;
    var eleSelect = document.getElementById("calYearPicker");
    //debugger;
    for (var y = startYear; y <= endYear; y++) {
        var opt = new Option(y, y);
        if (y == curYear) {
            opt.selected = true;
        }
        if (eleSelect && eleSelect.options) {
            eleSelect.options.add(opt);
        }
    }
}
function initDatePicker1() {
    var date = new Date();
    var curYear = date.getFullYear();
    var startYear = curYear - 8;
    var endYear = curYear + 1;
    var eleSelect = $("#SelectedYear").parent('.rili_rili_a').next('ul');
    var YearNumberSelected = $('#YearNumberSelected').parent('.rili_rili_a').next('ul');
    if (eleSelect && eleSelect.length) {
        eleSelect.html('');
        for (var y = startYear; y <= endYear; y++) {
            eleSelect.append('<li>' + y + '</li>');
        }
        $(".rili_rili ul li").off('click');
        if (typeof timechoose != 'undefined') {
            timechoose();
        }
        else if (typeof timeChange != 'undefined') {
            timeChange();
            deptChange();
        }
        else {
            $(".rili_rili ul li").click(function () {
                $(this).parent().prev().find("span").html($(this).html()).attr('value', $(this).attr('value'))
                $(this).parent().hide()
                return false;
            })
        }
    }
    if (YearNumberSelected && YearNumberSelected.length) {
        YearNumberSelected.html('');
        for (var y = startYear; y <= endYear; y++) {
            YearNumberSelected.append('<li>' + y + '</li>');
        }
        if (typeof initChange != 'undefined') {
            initChange();
        }
        else {
            $(".rili_rili ul li").off('click');
            $(".rili_rili ul li").click(function () {
                $(this).parent().prev().find("span").html($(this).html()).attr('value', $(this).attr('value'))
                $(this).parent().hide()
                return false;
            })
        }        
    }
    
}
$(document).ready(function () {
    $('body').on('click', '.datagrid-cell-c1-Name a', function (e) {
        e.target.target = '_blank';
        $(function () {
            $('body td a').each(function () {
                $(this).attr('target', '_blank');
            });
        });
    });
    setTimeout(function () {
        initDatePicker()
        initDatePicker1()
    },2000)
})
// var rootUrl = "/apps/CommandProcessor.ashx?c=1";
var rootUrl = '';
function ajaxMethodPostLoadingData(method, d, callback, errorcallback) {
    if (elementNotice.openloading) {
        elementNotice.openloading()
    }
    setTimeout(function () {
        ajaxMethodPostData(method, d, callback, errorcallback);
    }, 200)
}
function ajaxMethodGetData(method, d, callback, errorcallback) {
    ajaxMethodGetAsyncData(method, d, true, callback, errorcallback);
}
function ajaxMethodGetAsyncData(method, d, async, callback, errorcallback) {
    if (!method) return;
    var url = method;
             //url += queryString;
         if (d) { 
        d.Mathfloorrandom = Math.floor(Math.random() * 10000)
         }
             jQuery.ajax({
    async: async, cache: false, dataType: "json",
    data: d,
    beforeSend: function () {
                 
             },
    error: function (request, textStatus, errorThrown) {
        if (elementNotice) {
            if (elementNotice.closeDialog) {
                elementNotice.closeDialog()
            }
        }
            
            if (errorcallback)
                errorcallback();
                //errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                },
                success: function (data, textStatus) {
                if (callback) {
                    if (elementNotice) {
                        if (elementNotice.closeDialog) {
                            elementNotice.closeDialog()
                        }
                    }
                callback(data);

            }
                },
                    type: "GET",
            url: url
    });
   
}
function ajaxMethodPostData(method, d, callback, errorcallback) {
    
    // var url = rootUrl + "&cmd=" + method;
    var url = method;
    //url += queryString;
    let headers = {};
    let token = localStorage.getItem('token');
    if(token){
        headers.Authorization = token;
    }
    jQuery.ajax({
    async: false, cache: false, dataType: "json",
    headers: headers,
    data: d,
    beforeSend: function () {
        
            },
    error: function (request, textStatus, errorThrown) {
        if (elementNotice) {
            if (elementNotice.closeDialog) {
                elementNotice.closeDialog()
            }
        }
        if (errorcallback)
            errorcallback();
        errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    success: function (data, textStatus) {
        if(callback) {
            if (elementNotice) {
                if (elementNotice.closeDialog) {
                    elementNotice.closeDialog()
                }
            }
            callback(data);
        }
    },
    type: "post",
    url: url
    });
}

function ajaxMethodFormPostData(method, formId, callback) {
    var url = rootUrl + "&cmd=" + method;
    //url += queryString;
    jQuery.ajax({
        async: false, cache: false, dataType: "json",
        data: jQuery("#" + formId).serialize(),
        error: function (request, textStatus, errorThrown) {
            errorcallback()
            errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        success: function (data, textStatus) {
            if (callback)
                callback(data);
        },
        type: "post",
        url: url
    });
}
function ajaxMethodGetData2(method, d, callback, errorcallback) {
    var url = rootUrl + "&cmd=" + method;
    //debugger
    //url += queryString;
    jQuery.ajax({
        async: false, cache: false,
        data: d,
        error: function (request, textStatus, errorThrown) {
            if (errorcallback)
                errorcallback();
            errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        success: function (data, textStatus) {
            //debugger
            if (callback)
                callback(data);
        },
        type: "GET",
        url: url
    });
}

function ajaxMethodurlGetData(method, d, callback, errorcallback) {
    var url = method;
    //url += queryString;
    jQuery.ajax({
        async: false, cache: false, dataType: "json",
        data: d,
        error: function (request, textStatus, errorThrown) {
            if (errorcallback)
                errorcallback();
            errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        success: function (data, textStatus) {
            if (callback)
                callback(data);
        },
        type: "GET",
        url: url
    });
}

function renameDialog(objectTypeCode, id, name) {
    //debugger;
    showDialog("/alert/common/rename.aspx?objectTypeCode=" + objectTypeCode + "&id=" + id + "&name=" + encodeURIComponent(name), "reName", "修改名称", 500, 300);
}
function getInputCheckedValue(eleName) {
    return $("input[name='" + eleName + "']:checked");
}
function getChecklistValues(name) {
    var valIds = "";
    jQuery("input[name='" + name + "']:checked").each(function (index, value) {
        if (index > 0)
            valIds += ",";
        var fullId = jQuery(this).val();
        valIds += fullId;
    });

    return valIds;
}
function BindCostomDatagrid2(gridId, colUrl, colParams, dataUrl, dataParams, isEditCol, firstcol) {
    if (typeof (colUrl) == "undefined") {
        alert("请传入表头数据url");
    }
    if (typeof (dataUrl) == "undefined") {
        alert("请传入获取数据url");
    }
    if (typeof (gridId) == "undefined") {
        alert("请传入gridId");
    }
    if (typeof (isEditCol) == "undefined") {
        isEditCol = false;
    }

    if (typeof (colParams) == "undefined") {
        colParams = {};
    }
    if (typeof (dataParams) == "undefined") {
        dataParams = {};
    }
    var cols = GetTableColumns(colUrl, colParams, isEditCol, firstcol, gridId);
    console.log(cols);
    var url = rootUrl + "&cmd=" + dataUrl;
    $("#" + gridId).datagrid({
        url: url,
        method: 'POST',
        queryParams: dataParams,
        columns: cols,
        //frozenColumns: [fcols],
        idField: "EmployeeId",
        fit: true,
        autoWidth: true,
        //heckOnSelect: true,
        //striped: true,
        rownumbers: true,
        pageNumber: 1,
        pagination: true,
        rownumbers: true,
        pageSize: 100,
        pageList: [100],
        onLoadSuccess: function (data) {
            console.log(data);
            $("#" + gridId).datagrid('resize')
            if (data && data.rowsRule && data.rowsRule.length > 0) {
                data.rowsRule.forEach(function (item, index, array) {
                    for (var i = 0; i < item.RuleList.length; i++)
                        $("#" + gridId).datagrid('mergeCells', {
                            index: item.RuleList[i].Index,
                            field: item.FieldName,
                            rowspan: item.RuleList[i].RowSpan,
                            colspan: item.RuleList[i].ColSpan
                        });
                });
            }
        }
    });
}
function BindCostomDatagrid(gridId, colUrl, colParams, dataUrl, dataParams, isEditCol, firstcol) {
    if (typeof (colUrl) == "undefined") {
        alert("请传入表头数据url");
    }
    if (typeof (dataUrl) == "undefined") {
        alert("请传入获取数据url");
    }
    if (typeof (gridId) == "undefined") {
        alert("请传入gridId");
    }
    if (typeof (isEditCol) == "undefined") {
        isEditCol = false;
    }

    if (typeof (colParams) == "undefined") {
        colParams = {};
    }
    if (typeof (dataParams) == "undefined") {
        dataParams = {};
    }
    var cols = GetTableColumns(colUrl, colParams, isEditCol, firstcol, gridId);
    console.log(cols);
    var url = rootUrl + "&cmd=" + dataUrl;
    $("#" + gridId).datagrid({
        url: url,
        method: 'POST',
        queryParams: dataParams,
        columns: cols,
        //frozenColumns: [fcols],
        idField: "EmployeeId",
        fit: true,
        autoWidth: true,
        //heckOnSelect: true,
        //striped: true,
        pageNumber: 1,
        pagination: true,
        rownumbers: true,
        pageSize: 20,
        pageList: [10, 15, 20, 25, 30, 50, 100],
        onLoadSuccess: function (data) {
            console.log(data);
            $("#" + gridId).datagrid('resize')
            if (data && data.rowsRule && data.rowsRule.length > 0) {
                data.rowsRule.forEach(function (item, index, array) {
                    for (var i = 0; i < item.RuleList.length; i++)
                        $("#" + gridId).datagrid('mergeCells', {
                            index: item.RuleList[i].Index,
                            field: item.FieldName,
                            rowspan: item.RuleList[i].RowSpan,
                            colspan: item.RuleList[i].ColSpan
                        });
                });
            }
        }
    });
}
//列处理
function GetTableColumns(url, data, isEdit, firstcol, gridId) {
    if (typeof (isEdit) == "undefined") {
        isEdit = false;
    }
    var col = [];

    //同步获取动态列
    ajaxMethodPostData(url, data, function (data) {
        var reg = data.actions[0];
        //console.log(reg,'123');
        if (reg.state == "SUCCESS") {
            col = GetColumnSrecursion(reg.returnValue, isEdit, gridId);
            //for (var i = 1; i <= reg.returnValue[0].RowSpan; i++) {
            //    var coli = [];
            //    recursionTableColumns(reg.returnValue, 1, i, coli, isEdit, gridId);

            //    col.push(coli);
            //}r
        }
    });
    return col;
}
//列处理
function GetColumnSrecursion(data, isEdit, gridId) {
    var col = [];
    for (var i = 1; i <= data[0].RowSpan; i++) {
        var coli = [];
        recursionTableColumns(data, 1, i, coli, isEdit, gridId);
        col.push(coli);
    }
    return col;
}
function BindPublicDatagrid(gridId, filterQuery, entityCode) {
    var data = {
        filterQuery: filterQuery,
        entityType: entityCode,
        EntityCode: entityCode
    };
    var columns = GetTableColumns('entity.columns.get', data);//30024
    var url = "/apps/CommandProcessor.ashx?cmd=entitygrid.list";
    $("#" + gridId).datagrid({
        url: url,
        method: 'POST',
        queryParams: data,
        columns: columns,
        //frozenColumns: [fcols],
        idField: "ValueId",
        fit: true,
        autoWidth: true,
        //heckOnSelect: true,
        //striped: true,
        pageNumber: 1,
        pagination: true,
        rownumbers: true,
        pageSize: 20,
        pageList: [10, 15, 20, 25, 30, 50, 100],
        onLoadSuccess: function (data) {
            $("#" + gridId).datagrid('resize')
            if (data && data.rowsRule && data.rowsRule.length > 0) {
                data.rowsRule.forEach(function (item, index, array) {
                    for (var i = 0; i < item.RuleList.length; i++)
                        $("#" + gridId).datagrid('mergeCells', {
                            index: item.RuleList[i].Index,
                            field: item.FieldName,
                            rowspan: item.RuleList[i].RowSpan,
                            colspan: item.RuleList[i].ColSpan
                        });
                });
            }
        }
    });
}

//递归获取显示列
function recursionTableColumns(data, indexCurrRow, indexRow, col1, isEdit, gridId) {
    data.forEach(function (item, index, array) {
        if (item.IsRadio) //单选
        {
            if (typeof (gridId) != "undefined") {
                $("#" + gridId).datagrid({ singleSelect: true })
            }
            col1.push({ field: item.FieldName, title: item.DisplayName, checkbox: true, "rowspan": item.RowSpan, "colspan": item.ColSpan, editor: (isEdit && item["IsEdit"]) ? 'text' : '', frozenColumns: item.FixColumn
        });
            return;
        }
        if (item.IsCheckBox) //多选
        {
            if (typeof (gridId) != "undefined") {
                $("#" + gridId).datagrid({ singleSelect: false })
            }
            col1.push({ field: item.FieldName, title: item.DisplayName, checkbox: true, "rowspan": item.RowSpan, "colspan": item.ColSpan, editor: (isEdit && item["IsEdit"]) ? 'text' : '', frozenColumns: item.FixColumn
        });
            return;
        }
        if (!item.IsShow)
            return;
        if (indexCurrRow == indexRow) {
            console.log(item.FixColumn)

            col1.push({ field: item.FieldName, title: item.DisplayName, "rowspan": item.RowSpan, "colspan": item.ColSpan, editor: (isEdit && item["IsEdit"]) ? 'text' : '', frozenColumns: item.FixColumn });
            } else {

            if (item.ColSpan > 1) {
                var rowIndex = indexCurrRow + 1;
                recursionTableColumns(item.Items, rowIndex, indexRow, col1, isEdit);
            } else if (item.Items != null && item.Items.length > 0) {
                var rowIndex = indexCurrRow + 1;
                recursionTableColumns(item.Items, rowIndex, indexRow, col1, isEdit);
            }
        }
    });
}

function PublicExportToExcel(method, data) {
    var url = "/apps/CommandProcessor.ashx?c=1&cmd=" + method;

    PublicOpenWindowWithPost(url, data);
}
function PublicOpenWindowWithPost(url, data) {
    var form = document.createElement("form");
    form.target = "_blank";
    form.method = "POST";
    form.action = url;
    form.style.display = "none";

    for (var key in data) {
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;

        if (typeof data[key] == 'object') {
            input.value = JSON.stringify(data[key]);
        } else {
            input.value = data[key];
        }
        form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function ajaxMethodGetDatajp(method, data, callback) {
    var url = 'http://localhost:31927' + method;

    //url += queryString;
    jQuery.ajax({
        async: false, cache: false, dataType: "json",
        data: data,
        error: function (request, textStatus, errorThrown) {
            errorcallback()
            errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        success: function (data, textStatus) {
            if (callback)
                callback(data);
        },
        type: "get",
        url: url
    });
}
function ajaxMethodPostDatajp(method, data, callback) {
    var url = 'http://localhost:31927' + method;

    //url += queryString;
    jQuery.ajax({
        async: false, cache: false, dataType: "json",
        data: data,
        error: function (request, textStatus, errorThrown) {
            errorcallback()
            errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        success: function (data, textStatus) {
            if (callback)
                callback(data);
        },
        type: "post",
        url: url
    });
}
//获取单个星期名称
function getWeekSingleName(dd) {
    var week_day = new Array('日', '一', '二', '三', '四', '五', '六');
    var date = new Date(dd);
    var day = date.getDay();
    return week_day[day];
}

//获取星期几名称
function getWeekName(dd) {
    var week_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var date = new Date(dd);
    var day = date.getDay();
    return week_day[day];
}

//日期格式化 yyyy-MM-dd
function dateFormat(dd) {
    var date = new Date(dd);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function queryUnit(queryString, cb, value) {
    var a = [{ value: value }];
    cb(a);
}

function BindEasyUIDatagrid(gridId, dataUrl, dataParams) {
    if (typeof (dataUrl) == "undefined") {
        alert("请传入获取数据url");
    }
    if (typeof (gridId) == "undefined") {
        alert("请传入gridId");
    }
    if (typeof (dataParams) == "undefined") {
        dataParams = {};
    }
    dataParams.rows = 20;
    dataParams.page = 1;
    BindEasyUIDatagridData(gridId, dataUrl, dataParams);
}
function BindEasyUIDatagridData(gridId, dataUrl, dataParams) {
    ajaxMethodGetAsyncData(dataUrl, dataParams, false,function (res) {
        var cols = GetColumnSrecursion(res.columns, false, gridId);
        console.log(cols);
        $("#" + gridId).datagrid({
            //url: url,
            method: 'POST',
            //queryParams: dataParams,
            columns: cols,
            data: res,
            //frozenColumns: [fcols],
            idField: "EmployeeId",
            fit: true,
            autoWidth: true,
            //heckOnSelect: true,
            //striped: true,
            pageNumber: 1,
            pagination: true,
            rownumbers: true,
            pageSize: 20,
            pageList: [10, 15, 20, 25, 30, 50, 100],
            onLoadSuccess: function (data) {
                $("#" + gridId).datagrid('resize')
                if ($('#gridcontent .easyui-menubutton').length > 0) {
                    setTimeout(function () {
                        $('#datagrid').datagrid('clearChecked')
                        $('#datagrid').datagrid('resize')
                        $('.menu-top.menu').remove()
                        $('#gridcontent .easyui-menubutton').each(function (index) {
                            $(this).click(function () {
                                $(this).menubutton({
                                    menu: '#mm' + index
                                });
                                return false;
                            })
                            $(this).menubutton({
                                menu: '#mm' + index
                            });
                        })
                    }, 100)
                }
                
            }
        });
        var pg = $('#' + gridId).datagrid("getPager");
        if (pg) {
            $(pg).pagination({
                total: res.total,
                pageSize: dataParams.rows,
                pageNumber: dataParams.page,
                onSelectPage: function (pageNumber, pageSize) {
                    dataParams.rows = pageSize;
                    dataParams.page = pageNumber;
                    BindEasyUIDatagridData(gridId, dataUrl, dataParams);
                }
            });
        }
        //$('#' + gridId).pagination({
        //    total: res.total,
        //    pageSize: dataParams.rows,
        //    onSelectPage: function (pageNumber, pageSize) {
        //        alert(pageNumber);
        //        dataParams.rows = pageSize;
        //        dataParams.page = pageNumber;
        //        BindEasyUIDatagridData(gridId, dataUrl, dataParams);
        //    }
        //});
        $("#" + gridId).datagrid('resize')
        if (res.rowsRule.length > 0) {
            res.rowsRule.forEach(function (item, index, array) {
                for (var i = 0; i < item.RuleList.length; i++)
                    $("#" + gridId).datagrid('mergeCells', {
                        index: item.RuleList[i].Index,
                        field: item.FieldName,
                        rowspan: item.RuleList[i].RowSpan,
                        colspan: item.RuleList[i].ColSpan
                    });
            });
        }
    });

}
function notifyUnfinishedPeople(sryId, callbak) {

    var url = "/apps/CommandProcessor.ashx?cmd=survey.unfinished.notify&id=" + sryId;
    jQuery.ajax({
        async: false, cache: false, dataType: "json",
        error: function (request, textStatus, errorThrown) {
            errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            //messageOptions_handleAjaxErrors([errorThrown ? errorThrown : textStatus]);
            // alert("0");
        },
        success: function (data, textStatus) {
            if (callbak)
                callbak(data);
        },
        type: "POST",
        url: url
    });
}
    
function ajaxData(method, d, callback, async, cache) {
    var url = method;

    if (!async) async = true;
    if (!cache) cache = true;
    //url += queryString;
    let token = localStorage.getItem('token');
    let headers = {};
    if(token){
        headers.Authorization = token;
    }
    jQuery.ajax({
        async: false, cache: cache, dataType: "json",
        data: d,
        headers: headers,
        error: function (request, textStatus, errorThrown) {
            // errorThrown = String(errorThrown).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        success: function (data, textStatus) {
            //debugger;
            if (callback)
                callback(data);
        },
        type: "GET",
        url: url
    });
}
function compareDate(start, end) {
    //if (isDate(start) && isDate(end)) {
    var a = new Date(start.replace(/\-/g, "\/")).getTime()
    var b = new Date(end.replace(/\-/g, "\/")).getTime()
    if (a < b) {
        return 1
    }
    else if (a > b) {
        return -1
    }
    else {
        return 0
    }
    //}
}
function isDate(dateString) {
    if (dateString.trim() == "") {
        return true;
    }
    var r = dateString.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {

        alert("请输入格式正确的日期格式：yyyy-mm-dd 例如：2021-08-08");

        return false;

    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    if (num == 0) {
        alert("请输入格式正确的日期格式：yyyy-mm-dd 例如：2021-08-08");
        return false;
    }
    return (num != 0);
}

//console.log(compareDate('a','2021-01-01'), 'compareDate')

function opencenterwindow(url, name, iWidth, iHeight) {
    // url 转向网页的地址
    // name 网页名称，可为空
    // iWidth 弹出窗口的宽度
    // iHeight 弹出窗口的高度
    //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
    var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}

function openprints(ids, url) {
    var page = window.open()
    for (var i = 0; i < ids.length; i++) {
        page.document.write('<div><iframe frameborder="0" id="iframe' + ids[i] + '" style="width:100%;" src="' + url + ids[i] + '"></iframe></div>')
    }
    setTimeout(function () {
        for (var i = 0; i < ids.length; i++) {
            $(page.document.getElementById('iframe' + ids[i])).ready(function () {
                $(page.document.getElementById('iframe' + ids[i])).height(page[i].outerHeight)
                if (i == ids.length - 1) {
                    page.document.write('<script>window.print()</script>')
                }
            })
        }
    }, 0)
}

// 中间区域内容滚动
function bdScrollDom(headerClass, centerClass, footerHeight) {
    $('body').css('overflow', 'hidden');
    var elHeight = document.documentElement.clientHeight;
    var headerHeight = $(headerClass).height();
    footerHeight = footerHeight || 0;
    var bdHeight = elHeight - headerHeight - footerHeight;
    $(centerClass).css({
        "height": bdHeight + "px",
        "overflowY": "auto",
        "margin-top": headerHeight + "px",
    });
    $('.center').css('margin-top', '0')
    this.init = function () {
        window.onresize = function () {
            bdScrollDom(headerClass, centerClass);
        };
    };
}

//window.onload = function () {
//    // 设置页面不被缓存
//    var meta = document.createElement('meta');
//    meta.setAttribute('http-equiv', 'Cache-Control');
//    meta.setAttribute('content', 'no-cache, no-store, must-revalidate');
//    document.head.appendChild(meta);

//    meta = document.createElement('meta');
//    meta.setAttribute('http-equiv', 'Pragma');
//    meta.setAttribute('content', 'no-cache');
//    document.head.appendChild(meta);

//    meta = document.createElement('meta');
//    meta.setAttribute('http-equiv', 'Expires');
//    meta.setAttribute('content', '0');
//    document.head.appendChild(meta);
//};