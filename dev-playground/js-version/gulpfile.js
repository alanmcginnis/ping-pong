function loadProjectConfig() {
	const fs = require('fs');

	try {
		return JSON.parse(fs.readFileSync('project_config.json'));
	} catch (e) {
		return false;
	}
}

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const changeCase = require('change-case');

var Paths = {
  HERE : './',
	CSS_SOURCE : 'assets/css/master.scss',
	CSS_DIST : 'assets/css/min',
}

gulp.task('default', ['scss-min'], function(){
	const projectConfig = loadProjectConfig();

	if (!projectConfig) {
		console.error('Unable to load "project_config.json" -- please use "project_config_example.json" as a template');
		process.exit();
	}
});

gulp.task('scss-min', function () {

	const projectConfig = loadProjectConfig();

	if (!projectConfig) {
		console.error('Unable to load "project_config.json" -- please use "project_config_example.json" as a template');
		process.exit();
	}

  return gulp.src(Paths.CSS_SOURCE)
		.pipe(plugins.sass())
		.on('error', plugins.sass.logError)
		.pipe(plugins.autoprefixer({
				browsers: ['last 2 versions', 'ie >= 11']
		}))
		.pipe(plugins.cleanCss({
				specialComments: 0
		}))
		.pipe(plugins.rename(function (path) {
			path.basename = changeCase.paramCase(projectConfig.cssOutputName);
			path.extname = ".min.css";
		}))
		.pipe(gulp.dest(Paths.CSS_DIST))
		.on('error', plugins.notify.onError({
				message: '<%= error.message %>',
				title: 'SCSS Error'
		}));
});
