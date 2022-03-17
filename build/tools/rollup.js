const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs') // Solve problems of node modules import
const resolve = require('rollup-plugin-node-resolve') // Solve problems of node modules import
const eslint = require('rollup-plugin-eslint')
const colors = require('colors')
const showError = require('./showError')

module.exports = opts => {
    rollup.rollup({
        input: opts.entry,
        plugins: [
            eslint.eslint({
                configFile: opts.eslint,
                exclude: ['node_modules/**', '**/R.js']
            }),
            babel({
                babelrc: false,
                presets: [['@babel/preset-env', { 'modules': false }]],
                plugins: [
                  '@babel/plugin-external-helpers',
                  ["@babel/plugin-proposal-class-properties", { "loose": true }]
                ],
                externalHelpers: true
            }),
            resolve(),
            commonjs({
                include: ['node_modules/**', '**/R.js']
            })
        ]
    }).then(bundle => {
        bundle.write({
            intro: 'window.Copper={};',
            file: opts.dest,
            format: 'iife'
        })
    }).then(() => {
        opts.callback()
    }).catch(error => {
        showError(error)
    })
}
