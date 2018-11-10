module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
	"plugins": [
			"react",
			"jsx-a11y",
			"import"
		],
	"parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error",2],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};
