module.exports = {
  name: "bee-devtools",
  version: "0.0.1",
  description: "Bee web采集系统 chrome调试工具",
  author: "clew <623056206@qq.com>",
  manifest_version: 2,
  icons: {
    '16': 'icons/main.png',
    '48': 'icons/main.png',
    '128': 'icons/main.png'
  },
  permissions: [
    "tabs",
    "*://*/",
    "*://clew.fun/",
    "activeTab",
    "webRequest",
    "webRequestBlocking"
  ],
  browser_action: {
    default_icon: {
      '19': 'icons/main.png',
      '38': 'icons/main.png',
      '128': 'icons/main.png'
    },
    default_title: "Bee调试工具",
    default_popup: "pages/popup.html"
  },
  background: {
    persistent: true,
    scripts: ['js/background.js']
  },
  devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [{
    js: ['js/inject.js'],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: false,
    run_at: "document_end"
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: ['js/content.js']
}
