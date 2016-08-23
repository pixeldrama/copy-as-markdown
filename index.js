var SDK = {
  UI: {
    Button: {
      Toggle: require('sdk/ui/button/toggle')
    }
  },
  Tabs: require("sdk/tabs"),
  Windows: require("sdk/windows"),
  Panels: require("sdk/panel"),
  Self: require("sdk/self"),
  ContextMenu: require("sdk/context-menu")
};

var CopyAsMarkdown = require("./lib/copy-as-markdown");
var CopyAsOrgMode = require("./lib/copy-as-org-mode");
var CopyAsJira =  require("./lib/copy-as-jira");
var CopyAsTextile = require("./lib/copy-as-textile");

var anyContext = SDK.ContextMenu.PredicateContext(function() {
  return true;
});

var copySelectionScript = 'self.on("click", function(node, data) {' +
    '  self.postMessage({ url: window.location.href, title: window.getSelection().toString() });' +
    '});';

var copyPageLinkScript = 'self.on("click", function(node, data) {' +
    '  self.postMessage({ url: window.location.href, title: document.title });' +
    '});';

var contextMenuMarkDown = SDK.ContextMenu.Menu({
  label: "Copy as Markdown",
  context: anyContext,
  image: SDK.Self.data.url("images/icon-16.png")
});

// context menu for a link
var copyLinkAsMarkdownMenuItem = SDK.ContextMenu.Item({
  label: "[Link Title](url)",
  data: "copyLinkAsMarkdown",
  parentMenu: contextMenuMarkDown,
  context: SDK.ContextMenu.SelectorContext("a"),
  contentScript:  'self.on("click", function(node, data) {' +
                  '  self.postMessage({ url: node.href, title: node.textContent });' +
                  '});',
  onMessage: function(message) {
    CopyAsMarkdown.link(message.url, message.title);
  }
});

var copyLinkAsMarkdownSelectionItem = SDK.ContextMenu.Item({
  label: "[Selected text](url)",
  data: "copySelectionAsMarkdown",
  parentMenu: contextMenuMarkDown,
  context: SDK.ContextMenu.SelectionContext(),
  contentScript: copySelectionScript,
  onMessage: function(message) {
    CopyAsMarkdown.link(message.url, message.title);
  }
});

var copyCurrentPageAsMarkdownMenuItem = SDK.ContextMenu.Item({
  label: "[Page Title](url)",
  data: "copyCurrentPageAsMarkdown",
  parentMenu: contextMenuMarkDown,
  context: anyContext,
  contentScript: copyPageLinkScript,
  onMessage: function(message) {
    CopyAsMarkdown.link(message.url, message.title);
  }
});


var copyImageAsMarkdown = SDK.ContextMenu.Item({
  label: "![Image Alt](url)",
  data: "copyImageAsMarkdown",
  parentMenu: contextMenuMarkDown,
  context: SDK.ContextMenu.SelectorContext("img"),
  contentScript:  'self.on("click", function(node, data) {' +
                  '  self.postMessage({ url: node.src, title: node.alt });' +
                  '});',
  onMessage: function(message) {
    CopyAsMarkdown.image(message.url, message.title, { needEscape: false });
  }
});

var contextMenuOrgMode = SDK.ContextMenu.Menu({
  label: "Copy as org mode",
  context: anyContext,
});


var copyLinkAsOrgModeSelectionItem = SDK.ContextMenu.Item({
  label: "[[Selected text][url]]",
  data: "copySelectionAsOrgMode",
  parentMenu: contextMenuOrgMode,
  context: SDK.ContextMenu.SelectionContext(),
  contentScript: copySelectionScript,
  onMessage: function(message) {
    CopyAsOrgMode.link(message.url, message.title);
  }
});


var copyLinkAsOrgModeMenuItem = SDK.ContextMenu.Item({
  label: "[[url][Link Title]]",
  data: "copyLinkAsOrgMode",
  parentMenu: contextMenuOrgMode,
  context: SDK.ContextMenu.SelectorContext("a"),
  contentScript:  'self.on("click", function(node, data) {' +
        '  self.postMessage({ url: node.href, title: node.textContent });' +
        '});',
  onMessage: function(message) {
    CopyAsOrgMode.link(message.url, message.title);
  }
});

var copyCurrentPageAsOrgModeMenuItem = SDK.ContextMenu.Item({
  label: "[[url][Page Title]]",
  data: "copyCurrentPageAsOrgMode",
  parentMenu: contextMenuOrgMode,
  context: anyContext,
  contentScript: copyPageLinkScript,
  onMessage: function(message) {
    CopyAsOrgMode.link(message.url, message.title);
  }
});

var contextMenuJira = SDK.ContextMenu.Menu({
  label: "Copy as Jira Link",
  context: anyContext,
});


var copyLinkAsJiraSelectionItem = SDK.ContextMenu.Item({
  label: "[Selected Text|url]",
  data: "copySelectionAsJira",
  parentMenu: contextMenuJira,
  context: SDK.ContextMenu.SelectionContext(),
  contentScript: copySelectionScript,
  onMessage: function(message) {
    CopyAsJira.link(message.url, message.title);
  }
});


var copyLinkAsJiraMenuItem = SDK.ContextMenu.Item({
  label: "[Link Title|url]",
  data: "copyLinkAsJira",
  parentMenu: contextMenuJira,
  context: SDK.ContextMenu.SelectorContext("a"),
  contentScript:  'self.on("click", function(node, data) {' +
        '  self.postMessage({ url: node.href, title: node.textContent });' +
        '});',
  onMessage: function(message) {
    CopyAsJira.link(message.url, message.title);
  }
});

// context menu actions for page itself
var copyCurrentPageAsJiraMenuItem = SDK.ContextMenu.Item({
  label: "[Page Title|url]",
  data: "copyCurrentPageAsJira",
  parentMenu: contextMenuJira,
  context: anyContext,
  contentScript: copyPageLinkScript,
  onMessage: function(message) {
    CopyAsJira.link(message.url, message.title);
  }
});

var contextMenuTextile = SDK.ContextMenu.Menu({
  label: "Copy as Textile Link",
  context: anyContext,
});

var copyLinkAsTextileSelectionItem = SDK.ContextMenu.Item({
  label: "\"Selected Text\":url",
  data: "copySelectionAsTextile",
  parentMenu: contextMenuTextile,
  context: SDK.ContextMenu.SelectionContext(),
  contentScript: copySelectionScript,
  onMessage: function(message) {
    CopyAsTextile.link(message.url, message.title);
  }
});

var copyLinkAsTextileMenuItem = SDK.ContextMenu.Item({
  label: "\"Link Title\":url",
  data: "copyLinkAsTextile",
  parentMenu: contextMenuTextile,
  context: SDK.ContextMenu.SelectorContext("a"),
  contentScript:  'self.on("click", function(node, data) {' +
        '  self.postMessage({ url: node.href, title: node.textContent });' +
        '});',
  onMessage: function(message) {
    CopyAsTextile.link(message.url, message.title);
  }
});

// context menu actions for page itself
var copyCurrentPageAsTextileMenuItem = SDK.ContextMenu.Item({
  label: "\"Page Title\":url",
  data: "copyCurrentPageAsTextile",
  parentMenu: contextMenuTextile,
  context: anyContext,
  contentScript: copyPageLinkScript,
  onMessage: function(message) {
    CopyAsTextile.link(message.url, message.title);
  }
});
