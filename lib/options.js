'use babel';

export default {

    prefix: 'sass-autocompile-postcss.',

    config: {
        sassTimeout: {
            'title': 'Sass-Autocompile Timeout',
            'description': 'Maximal execution time of \'sass-autocompile\' compilation.',
            'type': 'integer',
            'default': 10000,
            'order': 10
        },
        postcssTimeout: {
            'title': 'PostCSS Timeout',
            'description': 'Maximal execution time of \'postcss\' autoprefixing.',
            'type': 'integer',
            'default': 10000,
            'order': 11
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
    }

};
