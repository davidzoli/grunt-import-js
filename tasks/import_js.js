/*
 * grunt-import-js
 * https://github.com/dev113/grunt-import-js
 *
 * Copyright (c) 2015 Robbie Robke
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

    grunt.registerMultiTask('import_js', 'Import JS files within JS files by @import instruction.', function() {
        var count = 0;

        if (this.files.length > 0) {

            var options = this.options({
                importDir: this.files[0].orig.cwd
            });

            this.files.forEach(function (file) {
                file.src.map(function (filepath) {
                    grunt.file.write(file.dest, getReplacedFileContent(filepath));
                    count++;
                });
            });

            grunt.log.ok(count + ' files created.');
        }

        function getReplacedFileContent(filepath) {
            filepath = path.resolve(filepath);

            if (!grunt.file.exists(filepath)) {
                grunt.log.error(grunt.log.wordlist(['@import file not found: ', filepath], {separator: '', color: 'red'}));
                return '';
            } else {
                var regex = /(?:\/\/)?\s*@(import|skip)\s*(['"])(.*?\.js)\2\s*;/gi;
                var str = grunt.file.read(filepath);
                
                return str.replace(regex, function (str, p1, p2, p3, offset) {
                    var output = "\n";
                    if (p1 === 'import') {
                        output += getReplacedFileContent(options.importDir + p3) + "\n";
                    }
                    return output;
                });
            }
        }
    });
};
