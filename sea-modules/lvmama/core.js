define("lvmama/core",["gallery/backbone/1.1.2/backbone.js","gallery/underscore/1.6.0/underscore","jquery/jquery/1.10.1/jquery","willkan/backbone-localStorage/1.1.6/backbone.localStorage.js","gallery/backbone/1.1.2/backbone"],function(a){var b=a("gallery/backbone/1.1.2/backbone.js");a("willkan/backbone-localStorage/1.1.6/backbone.localStorage.js");var c={};return c.localStrorageCollection=b.Collection.extend({localStorage:new b.LocalStorage("restaurants")}),{Collections:c}});