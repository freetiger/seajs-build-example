define(function(require) {
    var Backbone = require("Backbone");
    require("localStorage");

    var Collections = {};

    Collections.localStrorageCollection = Backbone.Collection.extend({
        localStorage : new Backbone.LocalStorage("restaurants"),
    });

    return {
        Collections : Collections
    }
})
