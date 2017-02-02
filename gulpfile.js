var gulp = require("gulp");
var uglifyCss = require('gulp-uglifycss');
var watch = require("gulp-watch");
var minifyCss = require("gulp-minify-css");
var sass = require("gulp-sass");
 

gulp.task('sass', function () {
  	gulp.src("./src/*.scss")
  	.pipe(sass().on('error', sass.logError))
  	.pipe(uglifyCss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(minifyCss())	
    .pipe(gulp.dest('./dist/')) 
})

gulp.task('default', function() {
	gulp.watch('./src/*.scss', ['sass']);
})

 