import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import sass from 'gulp-sass';
import exorcist from 'exorcist';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import autoprefixer from 'gulp-autoprefixer';

const sync = browserSync.create();

// Input file.
watchify.args.debug = true;
const bundler = browserify('src/app.js', watchify.args);

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    return bundler.bundle()
        .on('error', function(error) {
            console.error( '\nError: ', error.message, '\n');
            this.emit('end');
        })
        .pipe(exorcist('dist/assets/js/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
        .pipe(gulp.dest('dist/assets/js'));
}

gulp.task('default', ['transpile']);

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js', 'gulpfile.babel.js'])
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('transpile', ['lint'], () => bundle());

gulp.task('css', () => {
    return gulp.src('src/style/**/*.scss')
        .pipe(sass({ includePaths: [ 'node_modules/spinkit/scss'] }).on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'], cascasde: false }))
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['transpile', 'html', 'css'], () => sync.init({
    server: 'dist',
    port: process.env.PORT || 8000,
    host: process.env.IP || 'localhost'
}));

gulp.task('gh-pages', ['transpile', 'html', 'css'], () => {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('.'));
});

gulp.task('js-watch', ['transpile'], () => sync.reload());
gulp.task('css-watch', ['css'], () => sync.reload());
gulp.task('html-watch', ['html'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
    gulp.watch('src/**/*.html', ['html-watch']);
    gulp.watch('src/**/*.js', ['js-watch']);
    gulp.watch('./src/**/*.scss', ['css-watch']);
});
