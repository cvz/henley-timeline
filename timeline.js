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
      this.$el.find('li').draggable({revert: "invalid", snap: "#map"});
    },

    addTile: function (tile) {
      var template = Handlebars.compile($('#tileTemplate').html());
      this.$el.append(template(tile.attributes));  
    },

    render: function () {
      this.$el.tooltip();
      return this;
    }
  });

  var TimeLineView = Backbone.View.extend({
    tagName: 'canvas',

    initialize: function () {
      _.bindAll(this,'render', 'renderCanvas', 'renderTarget');
      this.collection.on('reset', this.renderCanvas);
    },


    renderCanvas: function () {
      this.$el.attr('width', '960px');
      var context = this.el.getContext('2d');
      context.strokeStyle = '#444';
      context.moveTo(0, 20);
      context.lineTo(960, 20);

      context.font = "bold 10px sans-serif";

      var startMonth = this.collection.first().mDate;
      var numOfMonths = this.collection.last().mDate.diff(startMonth, 'months');
      var monthBlock = 960 / numOfMonths;
      var curPos = 960;
      var curDate = this.collection.last().mDate;
      while(numOfMonths--) {
        if(curDate.month()===1) {
          context.fillText(curDate.year(), curPos, 8);
        }

        context.moveTo(curPos, 10);
        context.lineTo(curPos, 20);
        curPos = curPos - monthBlock;  
        curDate.subtract('months', 1);
      }
      context.stroke();

      this.collection.each(function(tile) {
        this.renderTarget(tile, startMonth, monthBlock);
      }, this);
    },

    renderTarget: function (tile, startMonth, monthBlock) {
      var offset = tile.mDate.diff(startMonth, 'months') * monthBlock;

      var template = Handlebars.compile($('#targetTemplate').html());
      var html = template({
        date: tile.mDate.format("D/M/YYYY")
      })

      var el = $("<div></div>")
        .html(html)
        .offset({
          top: -120,
          left: offset
        });
      this.$el.after(el);  
    },


    render: function () {
      return this;  
    }
  });

  var Tile = Backbone.Model.extend({
    initialize : function () {
      this.mDate = moment(this.get('date'), 'YYYY/MM/DD');    
    }
  });

  var TileList = Backbone.Collection.extend({
    model: Tile,

    comparator: function(tile) {
      return moment(tile.get('date'), 'YYYY/MM/DD').unix();
    },

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
  $('#map').droppable();

})(jQuery);
