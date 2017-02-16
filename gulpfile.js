let gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    pref = require('gulp-autoprefixer'),
    bs = require('browser-sync').create(),
    reload = bs.reload;

let src = {
    root: './019/',
    sass: 'dev/*.scss',
    pug: 'dev/*.pug',
    css: 'css/',
};

gulp.task('pug', function() {
    return gulp.src(src.root + src.pug)
      .pipe(pug({pretty: true}))
      .pipe(gulp.dest(src.root));
});

gulp.task('styles', function() {
    return gulp.src(src.root + src.sass)
      .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
      .pipe(pref({browsers: 'last 5 versions', cascade: true}))
      .pipe(gulp.dest(src.root + src.css))
      .pipe(reload({stream: true}));
});

gulp.task('watch', ['pug', 'styles'], function() {
    gulp.watch(src.root + src.pug, ['pug']);
    gulp.watch(src.root + src.sass, ['styles']);
    gulp.watch(src.root + '*.html', reload);
});

gulp.task('default', ['watch'], function() {
    bs.init({server: src.root});
});
