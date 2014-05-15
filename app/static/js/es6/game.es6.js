/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
  }

  function chop(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/chop`, 'put', null, h=>{
      tree.replaceWith(h);
    });
  }

  // function dashboard(){
  //   //this is where you update the dashboard on the page
  // }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h=>{
      tree.replaceWith(h);
    });
  }

  function forest(){
    var userId = $('#user').attr('data-id');  //give me the data-id attribute
    ajax(`/trees?userId=${userId}`, 'get', null, h=>{
      $('#forest').empty().append(h);
    });
  }

  function plant(){
    var userId = $('#user').attr('data-id');  //give me the data-id attribute
    ajax('/trees/plant', 'post', {userId:userId}, h=>{
      $('#forest').append(h);
    });  //the default for success is that it prints it out to the console
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, h=>{
      $('#dashboard').empty().append(h);
    });
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
