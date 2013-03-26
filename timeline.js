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
    tagName: 'canvas',

    initialize: function () {
      _.bindAll(this,'render', 'renderCanvas');
      this.collection.on('reset', this.renderCanvas);

    },

    renderCanvas: function () {
      this.$el.attr('width', '960px');
      var context = this.el.getContext('2d');
      context.strokeStyle = '#444';
      context.moveTo(0, 20);
      context.lineTo(960, 20);
      context.stroke();

      context.font = "bold 10px sans-serif";

      var dates = this.collection.getDates();
      var numOfMonths = _.last(dates).diff(_.first(dates), 'months');
      var monthBlock = 960 / numOfMonths;
      var curPos = 0;
      var curDate = moment(_.last(dates));
      while(numOfMonths--) {
        if(curDate.month()===1) {
          context.fillText(curDate.year(), curPos, 8);
        }

        context.moveTo(curPos, 10);
        context.lineTo(curPos, 20);
        curPos = curPos + monthBlock;  
        curDate.subtract('months', 1);
      }
      context.stroke();
    },

    render: function () {
      return this;  
    }
  });

  var Tile = Backbone.Model.extend({

  });

  var TileList = Backbone.Collection.extend({
    model: Tile,

    getDates: function () {
      var datesSorted = this.pluck('date').map(function (date) {
        return moment(date, 'YYYY/MM/DD');
      }).sort(function (date) {
        return date.unix();
      });

      return datesSorted;
    },
  });

  var mainView = new MainView();
  mainView.render();
  $(document).tooltip();

})(jQuery);
