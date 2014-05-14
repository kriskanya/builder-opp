(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username: username});
  }

  function ajax(url, type, data = {}, success=r=>console.log(r), dataType='html'){  //=set some defaults; success=r=>console.log(r) <-defaulting the success function to log out your response
    $.ajax({url:url,
      type:type,
      dataType:dataType,
      data:data,
      success:success
    });
  }

})();