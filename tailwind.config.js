/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    daisyui: {
        themes: ['dark'],
    },
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                ///////////////////////////
                // CUSTOM /////////////////
                ///////////////////////////

                // Colors
                bgColor: '#2B2A2A',
                bgDarkColor: '#1E1E1E',
                bgLight: '#424242',
                placeholderColor: '#858585',
                separatorColor: '#393939',
                sideBarIconColor: '#555555',
                sideBarTitleColor: '#DADADA',
                highlightedColor: '#E59904',
                highlightedHover: '#D28B00',
                smallInfoColor: '#808080',

                ///////////////////////////
                // CUSTOM /////////////////
                ///////////////////////////
            },
        },
    },
    plugins: [require('daisyui')],
}
