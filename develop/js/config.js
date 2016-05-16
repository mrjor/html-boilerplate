require.config({
    paths: {
        greensock: "vendor/greensock/src/uncompressed/TweenMax"
    },
    packages: [

    ],
    shim: {

    }
});


require([
    'greensock',
    'main'
], function() {

});