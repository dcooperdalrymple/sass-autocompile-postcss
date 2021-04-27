'use babel';

import { CompositeDisposable } from 'atom';

SassAutocompilePostcssOptions = require('./options');

// Force package installation
var apd = require('atom-package-dependencies');
apd.install();

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

export default {

    config: SassAutocompilePostcssOptions.config,

    sassAutocompile: null,
    subscriptions: null,
    editorSubscriptions: null,
    isProcessing: false,
    timestamp: 0,

    activate(state) {
        // Initialize Options
        SassAutocompilePostcssOptions.initialize();

        this.sassAutocompile = apd.require('sass-autocompile');

        this.subscriptions = new CompositeDisposable();
        this.editorSubscriptions = new CompositeDisposable();

        //this.registerCommands();
        this.registerSaveCallback();
    },

    registerCommands() {
        // Register commands
        /* this.subscriptions.add(atom.commands.add('atom-workspace', {
            'sass-autocompile-postcss:toggle': () => this.toggle(),
        })); */
    },

    registerSaveCallback() {
        var __this = this;
        // Hook into text editor save
        this.editorSubscriptions.add(atom.workspace.observeTextEditors(function (editor) {
            __this.subscriptions.add(editor.onDidSave(function () {
                setTimeout(function () {
                    __this.maybeProcess(editor);
                }, 10);
            }));
        }));
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {
            isProcessing: this.isProcessing,
            timestamp: this.timestamp
        };
    },

    maybeProcess(editor) {
        if (this.isProcessing) return false;

        if (!this.sassAutocompile.isProcessing || !editor || !(editor.getURI) || !this.sassAutocompile.isSassFile(editor.getURI()) || this.isPartial(editor.getURI())) return false;

        console.log('Sass Autocompile PostCSS: Waiting for sass-autocompile to finish compilation');

        this.timestamp = new Date().getTime();
        this._maybeProcess(editor.getURI());
    },
    _maybeProcess(filename) {
        if (this.sassAutocompile.isProcessing && (new Date().getTime() - this.timestamp) < SassAutocompilePostcssOptions.get('sassTimeout')) {
            setTimeout((editor) => this._maybeProcess(editor), SassAutocompilePostcssOptions.get('processInterval'));
            return false;
        }

        if ((new Date().getTime() - this.timestamp) >= SassAutocompilePostcssOptions.get('sassTimeout')) {
            console.log('Sass Autocompile PostCSS: Timed out while waiting for sass-autocompile.');
            return false;
        }

        var files = this.getOutputFiles(filename);
        if (files.length == 0) {
            console.log('Sass Autocompile PostCSS: No compiled files to prefix for this sass file.');
            return false;
        }

        for (var i = 0; i < files.length; i++) {
            this.process(files[i]);
        }

        return true;
    },

    process(filename) {
        var __this = this;

        console.log('Sass Autocompile PostCSS: Processing ' + path.basename(filename));

        try {

            execParameters = this.prepareExecParameters(filename);
            this.timestamp = new Date().getTime();

            child = exec(execParameters.command, {
                env: execParameters.environment,
                timeout: execParameters.timeout
            }, function (error, stdout, stderr) {
                if (child.exitCode > 0) {
                    console.log('Sass Autocompile PostCSS: Error!');
                    console.log(error);
                    __this.onProcessed(filename, error, stdout, stderr, child.killed);
                } else {
                    console.log('Sass Autocompile PostCSS: Successfully prefixed CSS file after Sass compilation.');
                    __this.onProcessed(filename, error, stdout, stderr, child.killed);
                }
            });

        } catch (error) {
            console.log(error);
        }
    },

    onProcessed(filename, error, stdout, stderr, killed) {
        statistics = {
            duration: new Date().getTime() - this.timestamp,
        };
        this.isProcessing = false;

        console.log('Sass Autocompile PostCSS: Took ' + (statistics.duration / 1000) + 's to complete.');
    },

    prepareExecParameters(filename) {
        parameters = [
            filename,
            '--replace',
            '--use autoprefixer'
        ];
        command = 'postcss ' +  parameters.join(' ');

        environment = JSON.parse(JSON.stringify(process.env));

        return {
            command: command,
            environment: environment,
            parameters: parameters,
            timeout: SassAutocompilePostcssOptions.get('postcssTimeout')
        };
    },

    getOutputFiles(filename) {
        var outputFiles = [
            '$1.css',
            '$1.min.css',
            '$1.compact.css',
            '$1.nested.css'
        ];

        var basename = path.basename(filename);
        var fileExtension = path.extname(basename).replace('.', '');
        var outputPath = path.dirname(filename);

        for (var i = 0; i < outputFiles.length; i++) {
            outputFiles[i] = basename.replace(new RegExp('^(.*?)\.(' + fileExtension + ')$', 'gi'), outputFiles[i]);
            outputFiles[i] = path.join(outputPath, outputFiles[i]);
        }

        outputFiles = outputFiles.filter(function (path) {
            try {
                return fs.existsSync(path);
            } catch (err) {
                return false;
            }
        });

        return outputFiles;
    },

    isPartial(filename) {
        return path.basename(filename)[0] == '_';
    }

};
