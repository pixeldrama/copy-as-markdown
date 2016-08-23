var Util = require("./util");

function formatLink(url, title, options={ escape: true }) {
    return "\"" + Util.determineTitle(title, options) + "\":" + url;
};

exports.link = function(url, title, options){
    return Util.link(url, title, formatLink, options);
}

exports.tab = function(tab){
    return Util.tab(tab, formatLink);
}

exports.tabs = function(tabs){
    return Util.tabs(tabs, formatLink);
}
