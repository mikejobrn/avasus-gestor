var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var paths = {
  sass: ['scss/**/*.scss'],
  app: ['app/**/*.module.js', 'app/**/*.js'],
  libsJs: [
    // Bundle minimificado contendo AngularJS e componentes do Ionic
    'lib/ionic/js/ionic.bundle.min.js',
    // Tradução dos componentes do Angular para pt-BR
    'lib/angular-i18n/angular-locale_pt-br.js',
    // Biblioteca para gráficos e mapas
    'lib/highcharts/highcharts.js',
    'lib/highcharts/modules/map.js',
    // Mapa do Brasil
    'lib/highmaps-br/index.js',
    // Tema utilizado pelos gráficos e mapas
    'www/js/highcharts-theme.js',
    // Diretivas Angular para o Highcharts
    'lib/highcharts-ng/dist/highcharts-ng.min.js',
    // Biblioteca para manipular datas
    'lib/moment/min/moment.min.js',
    'lib/moment/locale/pt-br.js'
  ],
  libsFonts: [
    {
      src: 'lib/google-open-sans/open-sans/regular.*',
      dest: 'www/lib/google-open-sans/open-sans'
    },
    {
      src: 'lib/ionic/fonts/**/*',
      dest: 'www/lib/ionic/fonts'
    }
  ]
};

gulp.task('default', ['app', 'libs', 'sass']);

gulp.task('app', function() {
  gulp.src(paths.app)
    .pipe(concat('all.min.js'))
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('www/js/'));

  gulp.src('app/**/*.html')
    .pipe(gulp.dest('www/js/templates/'));
});

gulp.task('libs', function() {
  gulp.src(paths.libsJs)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest('www/js/'));

  paths.libsFonts.forEach(function(font) {
    gulp.src(font.src)
      .pipe(gulp.dest(font.dest));
  });
});

gulp.task('sass', function(done) {
  gulp.src('scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('www/css/'))
    .on('end', done);
});

gulp.task('compress', function() {
  gulp.src('www/js/all.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('www/js/'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.app, ['app']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
