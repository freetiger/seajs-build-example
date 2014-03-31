module.exports = function (grunt){
    grunt.initConfig({
        // load config from package.js
        pkg : grunt.file.readJSON("package.json"),
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
                        cwd : "app/js", // change work directory
                        src : ["*.js", "*/*.js"], // cmd source file
                        dest : "tmp/transport_js" // transport cmd module to this directory
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
                        cwd : "tmp/transport_js",
                        src : ["*.js", "*/*.js"],
                        dest : "tmp/concat_js",
                        ext : ".js"
                    }
                ]
            }
        },
        // minify files
        uglify : {
            js : {
                files : [
                    {
                        expand : true,
                        cwd : "tmp/concat_js",
                        src : ["*.js", "*/*.js"],
                        dest : "sea-modules/lvmama",
                        ext : ".js"
                    }
                ]
            }
        },
        // clear file and folders
        clean : {
            spm : ["tmp"]
        }
    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean']);
};
