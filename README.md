# Sass Autocompile PostCSS

Adds PostCSS prefixing processing to css files compiled by the `sass-autocompile` package.

## Requirements

The required packages are as follows:
- node.js CLI
- `node-sass` Node package
- `sass-autocompile` Atom package
- `postcss-cli` and `autoprefixer` Node packages

To install these, use the following commands (may need to add sudo or run as root user):
- [Install Node.js via package manager](https://nodejs.org/en/download/package-manager/)
- `npm install -g node-sass`
- `apm install sass-autocompile`
- `npm install -g postcss-cli autoprefixer`

Then navigate to the root folder of this repository and install dependencies and add to atom using the following commands:
- `cd .../sass-autocompile-postcss` _(... to wherever it is installed)_
- `npm install`
- `apm install`
