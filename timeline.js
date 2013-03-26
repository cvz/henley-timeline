(function ($) {
  var MainView = Backbone.View.extend({
    el: $('#app'),

    render: function () {
      var template = Handlebars.compile($('#mainTemplate').html());
      $(this.el).html(template)
    }
  });
  
  var mainView = new MainView();
  mainView.render();

})(jQuery);
