define(function(require) {
    var $ = require("$");
    var core = require("./core/core");
    console.info(core);
    $("body").css("background", "red");
});
