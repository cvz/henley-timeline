(function ($) {
  var MainView = Backbone.View.extend({
    el: $('#app'),

    render: function () {
      var template = Handlebars.compile($('#mainTemplate').html());
      $(this.el).html(template);
      
      var tilesView = new TilesView();
      $(this.el.find("#tiles").html(tilesView.render().el));

      return this;
    }
  });

  var TilesView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function () {
      _.bindAll(this, 'render','addTile', 'addAllTiles');

      this.collection = new TileList();
      this.collection.bind('reset', this.addAllTiles);
    },

    addAllTiles: function () {
      this.collection.each(this.addTile);
    },

    addTile: function (tile) {
      var template = Handlebars.compile($('#tileTemplate'));
      this.el.append(template(tile.attributes));  
    },

    render: function () {
      return this;
    }
  });

  var Tile = Backbone.Model.extend({

  });

  var TileList = Backbone.Collection.extend({
    model: Tile
  });
  
  var mainView = new MainView();
  mainView.render();

})(jQuery);
