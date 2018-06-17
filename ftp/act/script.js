"use strict";
// Global variables
var CUR_ACCOUNT_ID = null;
var API_URL = 'https://vnzic.com/truedice/users';

$(function() {
  showAllUser();
  setEventListener();
});

function setEventListener() {
  $('#activate-btn').click(function() {
    activateNewUser();
  });

  $('#btn-delete').click(function() {
    deleteUser();
  });
}

function deleteUser() {
  $('#activate-btn span').text('Loading...')
  var activateUrl = API_URL + '/delete/?accountId=' + CUR_ACCOUNT_ID;
    $.ajax({
            url: activateUrl,
            type: "GET",
            async: true,
            crossDomain: true
        }).done(function(data, textStatus, jqXHR) {
            location.reload();
            $('#activate-btn span').text('Activate');
            $('#confirm-modal').modal('hide');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert('Unknown error!');
            location.reload();
        });
}

function activateNewUser() {
  $('#activate-btn span').text('Loading...')
  var activateUrl = API_URL + '/active/?accountId=' + $('#account-id-input').val() + '&fbAddr=' + $('#fb-addr-input').val();
    $.ajax({
            url: activateUrl,
            type: "GET",
            async: true,
            crossDomain: true
        }).done(function(data, textStatus, jqXHR) {
            location.reload();
            $('#activate-btn span').text('Activate');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert('Unknown error!');
            location.reload();
        });
}

function showAllUser() {
  $('#activate-btn span').text('Loading...');
  $.getJSON(API_URL, function(json, textStatus) {
    //console.log(json);
    $('#table').bootstrapTable({

      data: json,
      onClickRow: function(rowData) {
        CUR_ACCOUNT_ID = rowData.accountId;
        //console.log(CUR_ACCOUNT_ID);
        $('.cur-account-id').text(CUR_ACCOUNT_ID);
        $('#confirm-modal').modal();
      }
    });
    $('#activate-btn span').text('Activate');
  });
}