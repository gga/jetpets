var routie = require('../../3rdparty/routie.min');

module.exports = function() {
  
  var source   = $("#tmpl-join").html();
  var template = Handlebars.compile(source);
  $('#page').html(template());
  $('#join').on('click', function() {
    routie.navigate('/gamepad');
  });
  
};
