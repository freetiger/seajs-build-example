define(function(require, exports) {
    var $ = require("$"),
        _ = require("_"),
        Backbone = require("Backbone"),
        Mustache = require("Mustache"),
        Core = require("./core");

    var Views = {},
        Collections = {},
        resCollection;

    Collections.resCollection = Core.Collections.localStrorageCollection.extend({
        initialize : function (){
            this.fetch();
        }
    });

    resCollection = new Collections.resCollection();

    Views.inputView = Backbone.View.extend({
        el : $("#input-area"),
        collection : resCollection,
        initialize : function(){
            this.input = this.$("#input-text");
            this.verify();
        },
        events : {
            "keypress #input-text" : "add_res",
            "click #feel_lucky" : "feel_lucky"
        },
        feel_lucky : function (e){
            var currentTarget = $(e.currentTarget),
                self = this,
                random_time,
                interv_id;
            if(!this.collection.length || this.collection.length === 1){
                return;
            }
            currentTarget.prop("disabled", true);
            localStorage.generate_timestamp = Math.round(Date.now() / 1000);
            interv_id = setInterval(function (){
                self.random_effect.call(self);
            }, 500);
            random_time = this.get_random_int(5000, 10000);
            setTimeout(function (){
                clearInterval(interv_id);
                self.collection.trigger("generated");
            }, random_time);
        },
        random_effect : function (){
            var random_int = this.get_random_int(0, this.collection.length - 1);
            this.collection.map(function (model){
                model.set("selected", false);
            });
            this.collection.at(random_int).set("selected", true);
            this.collection.trigger("random");
        },
        get_random_int : function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        generate_id : function (){
            var text = "",
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ ){
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        },
        add_res : function (e){
            if(e.keyCode != 13 || !this.input.val()){
                return;
            }
            var create_data = {
                id : "res_" + this.generate_id(),
                restaurant : this.input.val()
            };
            this.input.val("");
            this.collection.create(create_data);
        },
        verify : function (){
            if(!localStorage.generate_timestamp){
                localStorage.generate_timestamp = 0;
                return;
            }
            if(Math.round(Date.now() / 1000) - localStorage.generate_timestamp < 3600){
                this.$("#feel_lucky").prop("disabled", true);
            }
        }
    });

    Views.resList = Backbone.View.extend({
        el : $("#restaurant"),
        template : $("#res-list-template").html(),
        collection : resCollection,
        initialize : function (){
            this.res_list = this.$("#restaurant-list");
            this.collection.on("add", this.add_res, this);
            this.collection.on("random", this.render, this);
            this.collection.on("generated", this.stop_random, this);
            this.render();
        },
        events : {
            "click button[action=delete]" : "delete_res"
        },
        delete_res : function (e){
            var self = this;
            var currentTarget = $(e.currentTarget);
            var res_id = currentTarget.attr("res_id");
            this.collection.each(function (model){
                if(model.get("id") === res_id){
                    model.destroy();
                    self.$("div[res_id=" + res_id + "]").hide(500, function (){
                        $(this).remove();
                    });
                }
            });
        },
        add_res : function (model){
            var item_template = $("#res-item-template").html();
            var append = Mustache.to_html(item_template, this.collection.last().toJSON());
            this.$("#restaurant-list").append(append);
            this.$("#restaurant-list .col-lg-6:last").show(500);
        },
        stop_random : function (){
            this.$("#bingo").html("Bingo:");
        },
        render : function (){
            var template_data = {
                res_list : this.collection.toJSON()
            };
            this.res_list.html(Mustache.to_html(this.template, template_data));
        }
    });

    new Views.inputView();
    new Views.resList();
})
