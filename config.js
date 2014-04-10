seajs.config({
    base : "/sea-modules/",
    alias : {
        "$" : "jquery/jquery/1.10.1/jquery.js",
        "Backbone" : "gallery/backbone/1.1.2/backbone.js",
        "Mustache" : "gallery/mustache/0.8.1/mustache.js",
        "_" : "gallery/underscore/1.6.0/underscore.js",
        "localStorage" : "willkan/backbone-localStorage/1.1.6/backbone.localStorage.js"
    },
    map : [
        [ '.js', '.js?ver=' + "20140408"]
    ]

})
