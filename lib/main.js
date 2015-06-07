var pageMod = require('sdk/page-mod');

pageMod.PageMod({
    include: '*.duolingo.com',
    contentScriptFile: './attach-sigil-replace.js'
});
