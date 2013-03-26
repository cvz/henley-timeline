(function ($) {
  var MainView = Backbone.View.extend({
    el: $('#app'),

    render: function () {
      var template = Handlebars.compile($('#mainTemplate').html());
      $(this.el).html(template);
      
      var tileCollection = new TileList();
      var tilesView = new TilesView({
        collection: tileCollection
      });
      this.$el.find("#tiles").html(tilesView.render().el);

      var timeLineView = new TimeLineView({
        collection: tileCollection
      });
      this.$el.find("#timeline").html(timeLineView.render().el);

      tileCollection.reset(timelineData);

      return this;
    }
  });

  var TilesView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function () {
      _.bindAll(this, 'render','addTile', 'addAllTiles');

      this.collection.bind('reset', this.addAllTiles);

    },

    addAllTiles: function () {
      this.collection.each(this.addTile);
    },

    addTile: function (tile) {
      var template = Handlebars.compile($('#tileTemplate').html());
      this.$el.append(template(tile.attributes));  
    },

    render: function () {
      return this;
    }
  });

  var TimeLineView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
      _.bindAll(this,'render');
    },

    render: function () {
      this.$el.append("<canvas id='timeLineCanvas'></canvas>");
      var canvas = this.$el.find('#timeLineCanvas');
      //var context = canvas.getContext('2d');
      //context.fillStyle('#FF0000');
      //context.fillRect('0,0,100,100');
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
  $(document).tooltip();

})(jQuery);
