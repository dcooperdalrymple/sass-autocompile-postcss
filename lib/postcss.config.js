module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                "ie 10",
                "> 0.3%",
                "last 7 versions",
                "Android >= 4",
                "Firefox >= 20",
                "iOS >= 8"
            ],
            flexbox: true
        }
    }
}
