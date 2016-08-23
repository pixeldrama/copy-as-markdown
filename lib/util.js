var SDK = {
  Clipboard: require("sdk/clipboard"),
  SimplePrefs: require("sdk/simple-prefs")
};

var preferences = SDK.SimplePrefs.prefs;

var copyToClipboard = function(string) {
  SDK.Clipboard.set(string, "text");
};


const ESCAPE_CHARS = /([\\`*_\[\]<>])/g;

function chomp(string) {
  // string chomp!
  return string.replace(/^\s+/, '').replace(/\s+$/, '');
}

function removeNewlines(string) {
  // remove any new-line chars
  return string.replace("\n", '');
}

function escapeLinkText(string) {
  return string.replace(ESCAPE_CHARS, "\\$1");
}

function formatList(texts) {
  // new line chars are appended at the end of each line
  // to make sure that we'll have a new line char at the very end.
  return texts.map(function(text) {
    return "- " + text + "\n";
  }).join("");
};

exports.determineTitle = function(title, options={ escape: true }) {
  title = removeNewlines(chomp(title));

  if (options.escape) {
    title = escapeLinkText(title);
  }

  if (title === '') {
    title = "(No Title)";
  }

  return title;
};

exports.link = function(url, title, formatFn, options={ needEscape: true }) {
  title = title || url;

  var escape = options.needEscape && preferences.escape;

  var string = formatFn(url, title, { escape });

  copyToClipboard(string);
};

exports.image = function(url, title, formatImageFn) {
  title = title || url;

  var string = formatImageFn(url, title);

  copyToClipboard(string);
}

exports.tab = function(tab, formatFn) {
    this.link(tab.url, tab.title, formatFn);
};

exports.tabs = function(tabs, formatLinkFn) {
  var escape = preferences.escape;

  var formattedTabs = new Array(tabs.length);

  for (var i = 0; i < tabs.length; i++) {
    var tab = tabs[i];
    formattedTabs[i] = formatList(tab.url, tab.title, { escape });
  }

  var string = formatListFn(formattedTabs);

  copyToClipboard(string);
};
