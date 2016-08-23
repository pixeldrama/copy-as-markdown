const Markdown = require("../lib/copy-as-markdown");

exports["test link"] = function(assert) {
  var actual;

  actual = Markdown.link("http://example.com", "text");
  assert.equal(actual, "[text](http://example.com)", "normal input");

  actual = Markdown.link("http://example.com", "");
  assert.equal(actual, "[(No Title)](http://example.com)", "empty title");

  actual = Markdown.link("http://example.com", '[Shin_Bangumi] Anime \\ Yuruyuri <S> San * High');
  assert.equal(actual, '[[Shin_Bangumi] Anime \\ Yuruyuri <S> San * High](http://example.com)', "no escape by default");

  actual = Markdown.link("http://example.com", '[Shin_Bangumi] Anime \\ Yuruyuri <S> San * High', { escape: true });
  assert.equal(actual, '[\\\[Shin\\\_Bangumi\\\] Anime \\\\ Yuruyuri \\\<S\\\> San \\\* High](http://example.com)', "escapes when explicitly requested");

  actual = Markdown.link("http://example.com",
    '![test](https://media.giphy.com/media/ACQ6dBWweIEIU/giphy.gif)',
    { escape: false }
  );
  assert.equal(actual, '[![test](https://media.giphy.com/media/ACQ6dBWweIEIU/giphy.gif)](http://example.com)', "disabled escape");
};

exports["test image"] = function(assert) {
  var actual;

  actual = Markdown.image("https://media.giphy.com/media/ACQ6dBWweIEIU/giphy.gif", "coin jump");
  assert.equal(actual, "![coin jump](https://media.giphy.com/media/ACQ6dBWweIEIU/giphy.gif)", "normal input");
};

require("sdk/test").run(exports);
