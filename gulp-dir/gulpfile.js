const {src, dest, watch, parallel, series} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const concatCSS = require('gulp-concat-css');
const browserSync = require('browser-sync').create();
const autoprefixerOptions = {
    overrideBrowserslist: ['last 3 versions', 'ie >= 10'],
    cascade: false,
}
const stylesPaths = {
    mainScss: '../assets/scss/pages/main.scss',
    mainCss: 'main.css',
    deliveryScss: '../assets/scss/pages/delivery.scss',
    deliveryCss: 'delivery.css',
    returnsScss: '../assets/scss/pages/returns.scss',
    returnsCss: 'returns.css',
    aboutScss: '../assets/scss/pages/about.scss',
    aboutCss: 'about.css',
    contactsScss: '../assets/scss/pages/contacts.scss',
    contactsCss: 'contacts.css',
    catalogScss: '../assets/scss/pages/catalog.scss',
    catalogCss: 'catalog.css',
}
const funcArr = [compileStylesMain, compileStylesDelivery, compileStylesReturns, compileStylesAbout, compileStylesContacts, compileStylesCatalog];

function compileStylesMain() {
    return src(stylesPaths.mainScss)
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concatCSS(stylesPaths.mainCss))
        .pipe(dest('../assets/css/'))
        .pipe(browserSync.stream());
}

function compileStylesDelivery() {
    return src(stylesPaths.deliveryScss)
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concatCSS(stylesPaths.deliveryCss))
        .pipe(dest('../assets/css/'))
        .pipe(browserSync.stream());
}

function compileStylesReturns() {
    return src(stylesPaths.returnsScss)
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concatCSS(stylesPaths.returnsCss))
        .pipe(dest('../assets/css/'))
        .pipe(browserSync.stream());
}

function compileStylesAbout() {
    return src(stylesPaths.aboutScss)
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concatCSS(stylesPaths.aboutCss))
        .pipe(dest('../assets/css/'))
        .pipe(browserSync.stream());
}

function compileStylesContacts() {
    return src(stylesPaths.contactsScss)
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concatCSS(stylesPaths.contactsCss))
        .pipe(dest('../assets/css/'))
        .pipe(browserSync.stream());
}

function compileStylesCatalog() {
    return src(stylesPaths.catalogScss)
        .pipe(scss().on('error', scss.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concatCSS(stylesPaths.catalogCss))
        .pipe(dest('../assets/css/'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['../*.html']).on('change', browserSync.reload)
    watch(['../assets/scss/**/*.scss'], series(funcArr))
    watch(['../assets/js/**/*.js']).on('change', browserSync.reload)
}

function sync() {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });
}

exports.default = parallel(series(funcArr), watching, sync);
