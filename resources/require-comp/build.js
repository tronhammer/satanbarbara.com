({
    baseUrl: "../../www/components/",
    name: "app/app",
    out: "main-built.js",
	
	"paths": {
		"lib": "../lib",
	
		"bower": "../lib/bower_components",
		"require-plugin": "../lib/bower_components/requirejs-plugins/src",
		"require-plugin-lib": "../lib/bower_components/requirejs-plugins/lib",
		"jquery-mobile": "../lib/bower_components/jquery-mobile-requirejs/js/jquery.mobile-1.3.2",
	
		"text": "../lib/bower_components/requirejs-plugins/lib/text",
		"json": "../lib/bower_components/requirejs-plugins/src/json",
		"hb": "../lib/bower_components/requirejs-handlebars/hb",
		"css": "../lib/bower_components/require-css/css",
		"less": "../lib/bower_components/require-less/less",
		"lessc": "../lib/bower_components/require-less/lessc",
		"normalize": "../lib/bower_components/require-less/normalize"
	},

	"map": {
		"*": {
			"jquery": "bower/jquery/jquery",
			"handlebars": "bower/handlebars/handlebars",
			"ember": "bower/ember/ember"
		}
	}
})