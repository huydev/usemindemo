//Wrapper函数
module.exports = function(grunt) {
	var path = {
		dev : 'dev',
		build : 'build',
		tmp : '.tmp'
	}
	// 加载任务
	require('load-grunt-tasks')(grunt);
	// 配置项目
	grunt.initConfig({
		
		path : path,

		// 配置任务
		useminPrepare : {
			html : ['<%= path.dev %>/*.html'],
			options : {
				/*
				** 用来指定html中，build块寻找资源的根路径（默认root为 *.html 所在目录）
				** eg: 
				** <!-- build:css css/a.min.css -->
				** <link rel="stylesheet" href="css/a.css">
				** <!-- endbuild -->
				** 如果指定了root 则会在 root/css/a.min.css 找，否则在 *.html 目录下
				** 找 css/a.css 。
				*/
				root: '<%= path.dev %>',
				dest: '<%= path.build %>'	//产出路径
				/*flow: {
					steps:{
						js: ['concat', 'uglifyjs'],
						css: ['concat', 'cssmin']
					},
					post:{
						js: [{
							name: 'concat',
							createConfig: function(context, block){
								var generated = context.options.generated;//context.options就是concat tast
								generated.options = {
									banner : '// js banner'
								};
							}
						}],
						css: [{
							name: 'concat',
							createConfig: function(context, block){
								var generated = context.options.generated;//context.options就是concat tast
								generated.options = {
									banner : '// css banner'
								};
							}
						}]
					}
				}*/
			}
		},
		/* useminPrepare 的配置会寻找 *.html 的 build 块注释，生成类似于下面的配置。(因此不用在配置 concat cssmin uglify)
		concat:
		{
			'.tmp/concat/css/a.min.css': [
				'dev/css/a.css'
			],
			'.tmp/concat/css/b.min.css': [
				'dev/css/bb.css',
				'dev/css/bbb.css'
			],
			'.tmp/concat/js/x.min.js': [
				'dev/js/x.js'
			],
			'.tmp/concat/js/y.min.js': [
				'dev/js/yy.js',
				'dev/js/yyy.js'
			]
		},
		cssmin:{
			'build/css/a.min.css' : ['.tmp/concat/css/a.min.css'],
			'build/css/b.min.css' : ['.tmp/concat/css/b.min.css']
		},
		uglify:
		{
			'build/js/x.min.js': ['.tmp/concat/js/x.min.js'],
			'build/js/y.min.js': ['.tmp/concat/js/y.min.js']
		}
		*/
		usemin : {
			html : ['<%= path.build %>/*.html'],
			options : {
				assetsDirs : ['<%= path.build %>']	//和 useminPrepare 的 root 同理，只是这个是build后的目录。
			}
		},
		copy : {
			html : {
				expand : true,
				cwd : '<%= path.dev %>',
				src : ['*.html', 'img/**'],
				dest : '<%= path.build %>'
			}
		},
		clean : ['<%= path.build %>', '<%= path.tmp %>']
	});

	// 默认任务.
	grunt.registerTask('default', [
		'clean',
		'copy:html',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'usemin'
	]);

};