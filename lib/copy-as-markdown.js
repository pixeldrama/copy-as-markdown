var Util = require("./util");

function formatLink(url, title, options={ escape: false }) {
    return "[" + Util.determineTitle(title, options) + "](" + url + ")";
};

function formatImage(url, title) {
  return "![" + Util.determineTitle(title) + "](" + url + ")";
};

exports.link = function(url, title, options){
    return Util.link(url, title, formatLink, options);
}

exports.image = function(url, title){
    return Util.image(url, title, formatImage);
}

exports.tab = function(tab){
    return Util.tab(tab, formatLink);
}

exports.tabs = function(tabs){
    return Util.tabs(tabs, formatLink);
}

