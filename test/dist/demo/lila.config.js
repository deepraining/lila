module.exports = {
  localOptions: {
    packCssSeparately: {
      packCssSeparately: !0,
    },
    min: {
      packCssSeparately: !0,
      minJs: !0,
      minCss: !0,
      minHtml: !0,
    },
    recordFileChanges: {
      recordFileChanges: !1,
    },
    html: {
      recordFileChanges: !1,
      htmlReplace: {
        'Hello World!': 'Hello Lila!',
      },
      htmlInsert: {
        start: '<!-- start -->',
        end: '<!-- end -->',
      },
      htmlExtension: 'php',
    },
  },
};
