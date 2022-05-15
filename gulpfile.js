const gulp = require('gulp')
const del = require('del')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

const path ={
    src:{
        style: 'src/*.css',
        script: 'src/*js'
    },
    dist:{
        style: 'dist/style/',
        script: 'dist/script/'
    }  
}
function clean(){
    return del(['dist/*'])
}
function style(){
    return gulp.src(path.src.style)
    .pipe(cleanCSS())
    .pipe(rename({
        basename: 'main',
        suffix: '.min'
    }))
    .pipe(gulp.dest(path.dist.style))
}
function script(){
    return gulp.src(path.src.script,{ sourcemaps: true})
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(path.dist.script))
}
function watch(){
    gulp.watch(path.src.style, style)
    gulp.watch(path.src.script, script)

}

const build = gulp.series(clean, gulp.parallel(style, script), watch)

exports.clean = clean
exports.style = style 
exports.watch = watch
exports.build = build
exports.script = script
exports.default = build