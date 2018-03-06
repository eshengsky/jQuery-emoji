module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: 'src/js/jquery.emoji.js',
                dest: 'dist/js/jquery.emoji.min.js'
            }
        },

        copy: {
            files: {
                expand: true,
                cwd: 'src/',
                src: ['css/**', 'img/**'],
                dest: 'dist/'
            }
        },

        watch: {
            build: {
                files: ['src/**'],
                tasks: ['uglify', 'copy'],
                options: {spawn: false}
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'copy', 'watch']);
};