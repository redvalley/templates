module.exports = function(grunt) {
	
	
	function adjustTemplateName(name) {
		var startPattern = /app\/client\/view\//,
		      endPattern = /\.hbs$/
                      templateName = '';
		
		templateName = name.replace(startPattern, '');
		templateName = templateName.replace(endPattern, '');
		console.log('Using template name: <' + templateName + '> for file: ' + name);

		return templateName;
	};

	grunt.initConfig({
		emberTemplates: {
		    compile:{
				options:{
					namespace: 'Ember.TEMPLATES',
					templateName: adjustTemplateName
				},
				files: {'dist/templates.js': 'app/client/**/*.hbs'}
			}

		},
		
		
		concat: {
		    dist: {
			src:['app/client/**/*.js', '!app/client/bower_components/**/*.js'],
			dest:'dist/app.js',
			filter: 'isFile'
		    }
		},
		
		copy: {
			options: {
				force: true
			},
			main:{
				files: [
					{expand:true, cwd: 'app/client/bower_components/bootstrap/dist', src: ['fonts/*.*'], dest: 'dist/', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/bootstrap/dist/js', src: ['bootstrap.js'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/bootstrap/dist/css', src: ['bootstrap-theme.css'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/bootstrap/dist/css', src: ['bootstrap.css'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/bootstrap/dist/css', src: ['bootstrap-theme.css.map'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/bootstrap/dist/css', src: ['bootstrap.css.map'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/amplify/lib', src: ['amplify.js'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/handlebars', src: ['handlebars.js'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/jquery/dist', src: ['jquery.js'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client/bower_components/ember', src: ['ember.js'], dest: 'dist/lib', filter: 'isFile'},
					{expand:true, cwd: 'app/client', src: ['index.html'], dest: 'dist/', filter: 'isFile'},
					{expand:true, cwd: 'app/client', src: ['app.css'], dest: 'dist/', filter: 'isFile'},
				],
			}
            	},
		
		watch: {
		    scripts: {
			files:['app/client/**/*.*', 'app/server/**/*.*' ],
			tasks:['concat',  'emberTemplates', 'copy'],
			options: {
			    livereload: true
			}
		    }
		}
	
	});
	
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.registerTask('default', ['emberTemplates', 'concat', 'copy', 'watch']);
	
}
