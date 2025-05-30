function picklist(a, b, c, d, f, e, g, h) {
    if (a) {
       // debugger;
        if (!this.sanityCheck()) return null;
        this.setup(a, b, c, d, f, e, g, h);
        this.nonelabel = pl.noneLabel;
        this.nalabel = pl.naLabel
    }
}
picklist.prototype.sanityCheck = function () {
    if (picklist.loadFailure) return !1;
    if ("undefined" == typeof pl) {
        wait(1E3);
        if ("undefined" != typeof pl) return !0;
        picklist.loadFailure = !0;
        window.location.replace(UserContext.getUrl("/ex/errorduringprocessing.jsp?retURL\x3d") + escape(window.location.pathname + window.location.search));
        return !1
    }
    return !0
};
picklist.prototype.setup = function (a, b, c, d, f, e, g, h) {
    this.id = a;
    this.attributes = f;
    this.values = this.filterValues(b, h);
    this.initialValue = d;
    this.controller_id = c;
    this.mapping = null != c ? eval("pl.map_" + b) : {};
    this.firstRound = !0;
    this.nullable = e;
    this.isValid = g;
    this.loaded = !1;
    if (null == picklist.picklists) {
        picklist.picklists = {};
        var l = window.onload;
        window.onload = function () {
            picklist.initAll();
            l && l()
        }
    }
    picklist.picklists[this.id] = this;
    this.labelEl = null
};
picklist.prototype.filterValues = function (a, b) {
    var c = pl["vals_" + a];
    if (b) {
        for (var d = pl["filter_" + a], f = [], e = 0; e < c.length; e++) b == d[e] && (f.push(c[2 * e]), f.push(c[2 * e + 1]));
        return f
    }
    return c
};
picklist.prototype.onLoad = function () {
    if (!this.loaded) {
        this.loaded = !0;
        if (picklist.picklists[this.controller_id]) picklist.picklists[this.controller_id].onLoad();
        var a = getElementByIdCS(this.id);
        a && (this.container = a.parentNode, a = null, this.isDependent() && (a = getElementByIdCS(this.controller_id)), a ? (a.dependents ? a.dependents.push(this) : (a.dependents = [this], a.getControllingValue = picklist.getControllingValue, "checkbox" == a.type ? (a.dplOldHandler = a.onclick, a.onclick = picklist.onControllerChange) : (a.dplOldHandler = a.onchange, a.onchange = picklist.onControllerChange)), this.generate(a.getControllingValue())) : this.generate(null))
            
    }
};
picklist.prototype.isDependent = function () {
    return null != this.controller_id
};
picklist.prototype.condRequired = function (a, b) {
    if (a && !this.nullable) {
        for (var c = b ? /requiredInput/ : /condRequiredInput/, d = b ? "condRequiredInput" : "requiredInput"; a && !c.test(a.className) ;) a = a.parentNode;
        a && (a.className = a.className.replace(c, d))
    }
};
picklist.prototype.addOption = function (a, b, c, d) {
    b = new Option(c, b);
    try {
        a.add(b, a.options[d])
    } catch (f) {
        a.add(b, d)
    }
};
picklist.prototype.unescape = function (a) {
    a = a.replace(/\&quot;/g, '"');
    a = a.replace(/\&#39;/g, "'");
    return a = unescapeHTML(a)
};
picklist.prototype.generate = function (a) {
    var b = this.container.firstChild,
        c = b.value == picklistNAMarker ? "" : b.value,
        d = [];
    d.push("\x3cselect " + this.attributes + "\x3e");
    var f = new Bitset(this.mapping[a]),
        e = 0;
    a = !0;
    for (e = 0; e < this.values.length; e += 2)
        if (!this.isDependent() || f.testBit(e / 2)) a = !1, d.push('\x3coption value\x3d"', this.values[e], '"\x3e', this.values[e + 1]);
    d.push("\x3c/select\x3e");
    this.container.innerHTML = d.join("");
    d = this.container.firstChild;
    d.value = c;
    f = "" != c && d.value == c;
    this.firstRound && (!f && "" != this.initialValue[0] &&
        this.initialValue[0] != picklistNAMarker) && (c = this.unescape(this.initialValue[0]), this.addOption(d, c, this.unescape(this.initialValue[1]), 0), d.value = c, f = "" != c && d.value == c);
    this.isDependent() && a ? this.addOption(d, picklistNAMarker, this.nonelabel, 0) : (this.nullable || 1 != d.options.length && !f) && this.addOption(d, "", this.nonelabel, 0);
    this.isDependent() && (this.condRequired(d, a), this.condRequired(this.labelEl, a));
    d.selectedIndex = 0;
    d.value = c;
    if (d.value != c || "" == c) d.selectedIndex = 0;
    //debugger;
    d.dependents = b.dependents;
    d.onchange = b.onchange;
    d.onclick = b.onclick;
    d.getControllingValue = b.getControllingValue;
    d.dplOldHandler = b.dplOldHandler;
    if (!this.firstRound && ("" != c || "" == c && d.value != picklistNAMarker) && !f) d.dependents ? picklist.onControllerChange.apply(d) : d.dplOldHandler && d.dplOldHandler();
    a && 1 >= d.options.length && this.disable();
    this.firstRound = !1
};
picklist.prototype.disable = function () {
    this.container.firstChild.disabled = !0;
    var a = document.createElement("input");
    a.type = "hidden";
    a.name = this.id;
    a.value = this.isDependent() ? picklistNAMarker : "";
    this.container.appendChild(a)
};

function picklistForInlineEditing(a, b, c, d, f, e, g, h, l) {
    if (a) {
        if (!this.sanityCheck()) return null;
        this.onGenerate = l;
        this.setup(a, b, c, d, f, e, g, h);
        this.nonelabel = pl.noneLabel;
        this.nalabel = pl.naLabel
    }
}
picklistForInlineEditing.prototype = new picklist;
picklistForInlineEditing.prototype.generate = function (a) {
    picklist.prototype.generate.call(this, a);
    this.onGenerate && "function" === typeof this.onGenerate && this.onGenerate.apply(this, [this])
};

function multiPicklist(a, b, c, d, f, e, g, h, l, k) {
    if (!this.sanityCheck()) return null;
    this.setup(a, b, c, d, f, h, l, null);
    this.selectedLabel = pl.selectedLabel;
    this.availableLabel = pl.availableLabel;
    this.nalabel = pl.naLabel;
    this.size = g;
    4 > this.size && (-1 != navigator.userAgent.indexOf("Firefox/") && -1 != navigator.platform.indexOf("Mac")) && (this.size = 4);
    this.baseTabIndex = k;
    this.title = e
}
multiPicklist.prototype = new picklist;
multiPicklist.prototype.getSelectMap = function (a) {
    for (var b = {}, c = 0; c < a.length; c += 2) b[a[c]] = a[c + 1];
    return b
};
multiPicklist.prototype.getSelectedValue = function () {
    if (this.firstRound) return this.initialValue;
    for (var a = [], b = getElementByIdCS(this.id + "_selected").options, c = getElementByIdCS(this.id).options, d = 0; d < b.length; d++) a.push(Sfdc.String.escapeToHtml(c[parseInt(b[d].value)].value)), a.push(b[d].text);
    return a
};
multiPicklist.prototype.generate = function (a) {
    var b = [],
        c = this.getSelectedValue(),
        d = this.getSelectMap(c),
        c = this.getSelectMap(c);
    a = new Bitset(this.mapping[a]);
    b.push("\x3cselect ");
    b.push(this.attributes);
    b.push("\x3e");
    b.push("");
    for (var f = !0, e = 0; e < this.values.length; e += 2) {
        var g = this.values[e];
        if (!this.isDependent() || a.testBit(e / 2)) b.push('\x3coption value\x3d"' + g + '"'), f = !1, d[g] && (b.push(" selected"), delete c[g]), b.push("\x3e"), b.push(this.values[e + 1])
    }
    this.isDependent() && (f && this.initialValue[0] !=
        picklistNAMarker) && b.push("\x3coption value\x3d'" + picklistNAMarker + "' selected\x3e");
    b.push("\x3c/select\x3e");
    if (this.firstRound) {
        g = [];
        for (e in c) g.push('\x3coption value\x3d"' + e + '" selected\x3e'), g.push(c[e]);
        b[3] = g.join("")
    }
    var h = getElementByIdCS(this.id),
        e = h.value == picklistNAMarker ? "" : h.value,
        g = h.onchange,
        h = h.parentNode;
    h.innerHTML = b.join("");
    b = getElementByIdCS(this.id);
    g && (b.onchange = g);
    this.isDependent() && (this.condRequired(h.firstChild, f), this.condRequired(this.labelEl, f));
    this.displaySelectElement(a,
        d, c, !0, f, this.baseTabIndex + 2);
    this.displaySelectElement(a, d, c, !1, f, this.baseTabIndex);
    if (b.onchange && this.isDependent() && !this.firstRound && ("" != e || "" == e && newMe.value != picklistNAMarker) && b.value != e) b.onchange();
    this.firstRound = !1
};
multiPicklist.prototype.displaySelectElement = function (a, b, c, d, f, e) {
    var g = d ? "MultiSelectPicklist.handleMSPUnSelect" : "MultiSelectPicklist.handleMSPSelect",
        h = f ? this.nalabel : d ? this.selectedLabel : this.availableLabel;
    f = this.id + (d ? "_selected" : "_unselected");
    var l = !0;
    if (window.Sfdc && Sfdc.userAgent.isWebkit && !Sfdc.userAgent.isChrome) {
        var k = navigator.userAgent;
        if (-1 < k.indexOf("iPad") || -1 < k.indexOf("iPhone")) l = !1
    }
    k = [];
    k.push('\x3cselect multiple\x3d"multiple" size\x3d"' + this.size + '" id\x3d"' + f + '" '); -1 < this.baseTabIndex &&
        ("undefined" == typeof e && (e = this.baseTabIndex), k.push(' tabIndex\x3d"' + e + '" '));
    k.push('title\x3d"' + this.title + " - " + h + '" ');
    k.push('ondblclick\x3d"' + g + "('" + this.id + "');\" \x3e");
    l && (k.push('\x3coptgroup style\x3d"text-decoration:none;" label\x3d"' + h + '"\x3e'), isFirefox && k.push("\x3c/optgroup\x3e"));
    e = 0;
    if (this.firstRound)
        for (var m in c) d && c[m] != picklistNAMarker && "function" != typeof c[m] ? (k.push('\x3coption value\x3d"' + e++ + '"\x3e'), k.push(c[m])) : e++;
    m = 0;
    for (c = e - 1; m < this.values.length; m += 2)
        if (!this.isDependent() ||
            a.testBit(m / 2)) c++, void 0 != b[this.values[m]] == d && (k.push('\x3coption value\x3d"' + c + '"\x3e'), k.push(this.values[m + 1]));
    !isFirefox && l && k.push("\x3c/optgroup\x3e");
    k.push("\x3c/select\x3e");
    getElementByIdCS(f).parentNode.innerHTML = k.join("")
};
picklist.loadFailure = !1;
picklist.picklists = null;
picklist.initialized = !1;
picklist.initAll = function () {
    if (!(this.initialized || null == this.picklists)) {
        this.initialized = !0;
        for (var a = document.getElementsByTagName("label"), b = 0; b < a.length; b++) {
            var c = this.picklists[a[b].htmlFor];
            c && (c.labelEl = a[b])
        }
        for (b in this.picklists)
            if (null != this.picklists[b].onLoad) this.picklists[b].onLoad()
    }
};
picklist.getControllingValue = function () {
    return "checkbox" == this.type ? this.checked ? "1" : "0" : this.value
};
picklist.onControllerChange = function () {
    this.dplOldHandler && this.dplOldHandler.apply(this, arguments);
    for (var a = 0; a < this.dependents.length; a++) this.dependents[a].generate(this.getControllingValue())
};

function Bitset(a) {
    "string" != typeof a && (a = "");
    Bitset.init();
    this.data = a.split("");
    this.trim()
}
Bitset.prototype.testBit = function (a) {
    var b = Math.floor(a / 6);
    return b >= this.data.length ? !1 : 0 != (Bitset.codes[this.data[b]] & 32 >> a % 6)
};
Bitset.prototype.setBit = function (a) {
    var b = Math.floor(a / 6);
    this.pad(b);
    this.data[b] = Bitset.alphabet[Bitset.codes[this.data[b]] | 32 >> a % 6]
};
Bitset.prototype.clearBit = function (a) {
    var b = Math.floor(a / 6);
    b < this.data.length && (this.data[b] = Bitset.alphabet[Bitset.codes[this.data[b]] & (255 ^ 32 >> a % 6)], this.trim())
};
Bitset.prototype.toString = function () {
    return this.data.join("")
};
Bitset.prototype.trim = function () {
    for (var a = this.data.length - 1; 0 <= a && this.data[a] == Bitset.alphabet[0]; a--);
    this.data.splice(a + 1, this.data.length)
};
Bitset.prototype.pad = function (a) {
    for (var b = this.data.length, c = 0; c <= a - b; c++) this.data.push(Bitset.alphabet[0])
};
Bitset.prototype.length = function () {
    return this.data.length
};
Bitset.initialized = !1;
Bitset.init = function () {
    if (!Bitset.initialized) {
        Bitset.initialized = !0;
        Bitset.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
        Bitset.codes = [];
        for (var a = 0; a < Bitset.alphabet.length; a++) Bitset.codes[Bitset.alphabet[a]] = a
    }
};