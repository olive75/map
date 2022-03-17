module.exports = {
    js: {
        entry: 'assets/js/app.js',
        dest: 'public/app.js',
        watch: [
            './assets/js/**/*.js',
            './assets/js/*.js'
        ],
        eslint: 'build/config/.eslintrc'
    },
    css: {
        entry: 'assets/css/main.css',
        dest: 'public/app.css',
        watch: [
            './assets/css/*.css',
            './assets/css/**/*.css'
        ],
        autoprefixer: ['last 2 versions']
    },
    app: {
        watch: [
            './index.html',
            './src/**/*.php',
            './templates/*.twig',
            './public/index.php'
        ]
    }
}
