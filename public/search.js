$(document).ready(function(){
    $.ajaxSetup({ cache: false });
    $('#search').keyup(function(){
     $('#result').html('');
     $('#state').val('');
     var searchField = $('#search').val();
     var expression = new RegExp(searchField, "i");
     $.getJSON('./data/locations.json', function(data) {
      $.each(data, function(key, value){
       if (value.name.search(expression) != -1 || value.location.search(expression) != -1 || value.attractions.search(expression) != -1)
       {
        $('#result').append('<li class="list-group-item link-class"><a style="text-decoration: none;" class="popup-with-move-anim" href="'+value.section+'"><img src="'+value.image+'" height="40" width="40" class="img-thumbnail" /> &nbsp <font color="#989696"> '+value.name+' </font></a>');
       }
      });   
     });
    });
    $('#result').on('click', 'li', function() {
    $("#result").html('');
    });
});
