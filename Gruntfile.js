module.exports = function (grunt){
    var css_build_src_path = "app/style/",
        css_build_target_path = "static/style/",
        js_build_src_path = "app/js/",
        js_transport_target_path = "tmp/transport_js/",
        js_concat_target_path = "tmp/concat_js/",
        js_build_target_path = "sea-modules/lvmama/";

    var is_type = function (type){
        return function (obj){
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    }
    var is_string = is_type("String");
    var get_target_file_info = function (src_path, step){
        if(!is_string(src_path)){
            throw new Error("data type error");
        }
        var split_ext,
            ext,
            target_path,
            path,
            real_path;
        split_ext = src_path.split(".");
        switch(split_ext[(split_ext.length - 1)]){
            case "scss":
                // replace path and ext
                path = src_path.replace(css_build_src_path, css_build_target_path);
                real_path = path.replace(/scss$/, "css");
                break;
            case "js":
                switch(step){
                    case "transport":
                        real_path = src_path.replace(js_build_src_path, js_transport_target_path);
                        break;
                    case "concat":
                        real_path = src_path.replace(js_transport_target_path, js_concat_target_path);
                        break;
                    case "uglify":
                        real_path = src_path.replace(js_concat_target_path, js_build_target_path);
                        break;
                    default :
                        throw new Error("unavailable js build step");
                }
                break;
            default :
                throw new Error("unavailable file type");

        }
        return real_path;
    }
    grunt.initConfig({
        // load config from package.json
        // pkg : grunt.file.readJSON("package.json"),
        transport : {
            options : {
                paths : ["sea-modules"],
                // config sea-module alias
                alias : {
                    "$" : "jquery/jquery/1.10.1/jquery.js"
                }
            },
            // target
            js : {
                options : {
                    idleading : "lvmama/"
                },
                files : [
                    {
                        expand : true, // visit {{http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically}} for more information
                        cwd : js_build_src_path, // change work directory
                        src : ["*.js", "*/*.js"], // cmd source file
                        dest : js_transport_target_path // transport cmd module to this directory
                    }
                ]
            }
        },
        // concatenate cmd file
        concat : {
            options : {
                paths : ["."],
                include : "relative" // visit {{http://blog.csdn.net/kyfxbl/article/details/15502005}} to get more information
            },
            // target
            js : {
                files : [
                    {
                        expand : true,
                        cwd : js_transport_target_path,
                        src : ["*.js", "*/*.js"],
                        dest : js_concat_target_path,
                        ext : ".js"
                    }
                ]
            }
        },
        // compile sass to css
        sass : {
            options : {
                style : "compressed"
            },
            dist : {
                files : [{
                    expand : true,
                    cwd : css_build_src_path,
                    src : ["*.scss", "*/*.scss"],
                    dest : css_build_target_path,
                    ext : ".css"
                }]

            }
        },
        // minify files
        uglify : {
            js : {
                files : [
                    {
                        expand : true,
                        cwd : js_concat_target_path,
                        src : ["*.js", "*/*.js"],
                        dest : js_build_target_path,
                        ext : ".js"
                    }
                ]
            }
        },
        // clean file and folders
        clean : {
            spm : ["tmp"]
        },
        // jshint, check js code quality
        jshint : {
            options: {
                // load config from .jshintrc
                // jshintrc : ".jshintrc"
            },
            all : [
                "app/js/*.js",
                "app/js/*/*.js"
            ]
        },
        // run task when file changed
        watch : {
            sass : {
                files : ["app/style/*.scss", "app/style/*/*.scss"],
                tasks : ["sass"],
                options : {
                    spawn : false // set this value false, so we can dynamic set task config when grunt trigger event
                }
            },
            js : {
                files : ["app/js/*.js", "app/js/*/*.js"],
                tasks : ['transport', 'concat', 'uglify'],
                options : {
                    spawn : false
                }
            }
        }
    });

    // small && smart
    grunt.event.on("watch", function (action, filepath, target){
        var sass_config = {},
            transport_config = {},
            concat_config = {},
            uglify_config = {};

        // update config
        switch (target){
            case "sass":
                sass_config[get_target_file_info(filepath)] = filepath;
                grunt.config("sass.dist.files", sass_config);
                break;
            case "js":
                // target file : source file
                // get file name
                var file_name = filepath.match(/[^\\/]+\.[^\\/]+$/)[0];
                var _temp = [
                    {
                        expand : true, // visit {{http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically}} for more information
                        cwd : js_build_src_path, // change work directory
                        src : [file_name], // cmd source file
                        dest : js_transport_target_path // transport cmd module to this directory
                    }
                ]
                grunt.config("transport.js.files", _temp);

                concat_config[get_target_file_info(get_target_file_info(filepath, "transport"), "concat")] = get_target_file_info(filepath, "transport");
                grunt.config("concat.js.files", concat_config);

                uglify_config[get_target_file_info(get_target_file_info(get_target_file_info(filepath, "transport"), "concat"), "uglify")] = get_target_file_info(get_target_file_info(filepath, "transport"), "concat");
                grunt.config("uglify.js.files", uglify_config);
                //grunt.config("sass.dist.files", temp_config);
                break;
            default :
                return;
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js_build', ['transport', 'concat', 'uglify']);
    grunt.registerTask('css_build', ['sass']);
    grunt.registerTask('js_hint', ['jshint']);
    grunt.registerTask('css_watch', ['watch:sass']);
    grunt.registerTask('js_watch', ['watch:js']);
};
