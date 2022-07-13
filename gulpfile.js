var gulp = require('gulp');
var plumber = require('gulp-plumber');
const babel = require('gulp-babel');;
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const wait = require('gulp-wait');
const sass = require('gulp-sass')(require('sass'));

// Create minified javascript file for scripts
gulp.task('scripts', function() {
    return gulp.src('./js/scripts.js') // Source
        .pipe(plumber())               // Handle any errors
        .pipe(babel({                  // Convert javascript using babel
          presets: [['@babel/env', {modules: false}]]
        })) 
        .pipe(uglify({                 // Minify javascript file
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'})) // Rename extension
        .pipe(gulp.dest('./js'));           // Destination folder
});

// Create css file from scss
gulp.task('styles', function () {
    return gulp.src('./scss/styles.scss')                                   // Source
        .pipe(wait(300))                                                    // Wait in between calling scripts and styles task
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Convert sass into css with compressed style
        .pipe(gulp.dest('./css'));                                          // Destination folder
});

// Check for changes in scripts and styling
gulp.task('watch', function() {
    gulp.watch('./js/scripts.js', gulp.series('scripts'));   // Call scripts task
    gulp.watch('./scss/styles.scss', gulp.series('styles')); // Call styles task
});