/*
 * grunt-import-js
 * https://github.com/dev113/grunt-import-js
 *
 * Copyright (c) 2015 Robbie Robke
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');
const findFile = require('find-file-in-folders')

module.exports = function(grunt) {

    grunt.registerMultiTask('import_js', 'Import JS files within JS files by @import instruction.', function() {
        let count = 0;

        if (this.files.length > 0) {
            const includePaths = [this.files[0].orig.cwd, ...this.data.options.includePaths || []];
            this.files.forEach(function (file) {
                file.src.map(function (filepath) {
                    grunt.file.write(file.dest, getReplacedFileContent(filepath, includePaths));
                    count++;
                });
            });
            grunt.log.ok(count + ' files created.');
        }

        function getReplacedFileContent(filepath, includePaths) {
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
                        const fileToReplace = findFile(p3, false, includePaths);
                        if (!fileToReplace) {
                          grunt.log.error(grunt.log.wordlist(['@import file not found: ', p3], {separator: '', color: 'red'}));
                          return '';
                        } else {
                          output += getReplacedFileContent(fileToReplace, includePaths) + "\n";
                        }
                    }
                    return output;
                });
            }
        }
    });
};
