'use babel';

export default {

    prefix: 'sass-autocompile-postcss.',

    config: {
        enabled: {
            'title': 'Enabled',
            'description': 'Whether or not to process auto-compiled sass css files with \'postcss\'.',
            'type': 'boolean',
            'default': true,
            'order': 1,
        },
        sassTimeout: {
            'title': 'Sass-Autocompile Timeout',
            'description': 'Maximal execution time of \'sass-autocompile\' compilation (in milliseconds).',
            'type': 'integer',
            'default': 10000,
            'order': 10
        },
        postcssTimeout: {
            'title': 'PostCSS Timeout',
            'description': 'Maximal execution time of \'postcss\' autoprefixing (in milliseconds).',
            'type': 'integer',
            'default': 10000,
            'order': 11
        },
        processInterval: {
            'title': 'Sass-Autocompile Check Interval',
            'description': 'Duration between each \'sass-autocompile\' status check after a sass file is saved (in milliseconds).',
            'type': 'integer',
            'default': 100,
            'order': 20
        },
        processDelay: {
            'title': 'Autoprefixing Delay',
            'description': 'Delay (in milliseconds) before beginning \'postcss\' autoprefixing after \'sass-autocompile\' is complete. Useful for fixing issues with automatic FTP transfers.',
            'type': 'integer',
            'default': 0,
            'order': 21
        }
    },

    get(name) {
        return atom.config.get(SassAutocompilePostcssOptions.prefix + name);
    },
    set(name, value) {
        atom.config.set(SassAutocompilePostcssOptions.prefix + name, value);
    },
    unset(name) {
        atom.config.unset(SassAutocompilePostcssOptions.prefix + name);
    },

    initialize() {
        this.enabled = SassAutocompilePostcssOptions.get('enabled');
        this.sassTimeout = SassAutocompilePostcssOptions.get('sassTimeout');
        this.postcssTimeout = SassAutocompilePostcssOptions.get('postcssTimeout');
        this.processInterval = SassAutocompilePostcssOptions.get('processInterval');
        this.processDelay = SassAutocompilePostcssOptions.get('processDelay');
    }

};
