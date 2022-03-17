console.log('hello')
//Config
const config = require('./config/config.js')
const ip = 'dev.sillo.com' //'192.168.1.90' //require('./config/ip.js')

//Tools
const browserSync = require('browser-sync').create()
const rollup = require('./tools/rollup.js')
const postcss = require('./tools/postcss.js')

//Init

const isWindows = /^win/.test(process.platform)
const browserSyncConfig = {
    win: {
        open: 'external',
        host: ip,
        //proxy: ip,
        port: 80,
        notify: false,
        server: {
            baseDir: "public",
            index: "index.html"
        }
    },
    mac: {
        open: 'external',
        //proxy: 'http://localhost/',
        port: 80,
        notify: false,
        server: {
            baseDir: "public",
            index: "index.html"
        }
    }
}
const browserSyncConfigObj = isWindows ? browserSyncConfig.win : browserSyncConfig.mac

compileJs()
compileCss()

browserSync.init(browserSyncConfigObj)

browserSync.watch(config.app.watch).on('change', browserSync.reload)
browserSync.watch(config.js.watch).on('change', compileJs)
browserSync.watch(config.css.watch).on('change', compileCss)

function compileJs () {
    rollup({
        entry: config.js.entry,
        dest: config.js.dest,
        eslint: config.js.eslint,
        callback: reloadJs
    })
}

function compileCss () {
    postcss({
        entry: config.css.entry,
        dest: config.css.dest,
        autoprefixer: config.css.autoprefixer,
        callback: reloadCss
    })
}

function reloadJs () {
    browserSync.reload(config.js.dest)
}

function reloadCss () {
    browserSync.reload(config.css.dest)
}
