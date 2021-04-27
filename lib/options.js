'use babel';

export default {

    prefix: 'sass-autocompile-postcss.',

    config: {
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
        this.sassTimeout = SassAutocompilePostcssOptions.get('sassTimeout');
        this.postcssTimeout = SassAutocompilePostcssOptions.get('postcssTimeout');
        this.processInterval = SassAutocompilePostcssOptions.get('processInterval');
    }

};
