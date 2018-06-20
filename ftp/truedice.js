"uses strict";

var VERSION_NAME = 'V1.6';
var VERSION_CODE = 16;
var STATISTIC_BOX = null;
var INIT_BALANCE = 0;
var TAKE_PROFIT_AMOUNT = 100;
var STOP_LOSS_AMOUNT = 1000;
var PROFIT_LOSS_AMOUNT = 0;

var STRATEGY_CODE = 0; // Default strategy
var INIT_BET_AMOUNT = 0.0001;
var INIT_PAYOUT = '2x';
var FIRST_TIME_FLAG = true;
var AUTO_FLAG = false;
var MULTIPLYER = 2;
var CUR_AMOUNT = 0;
var LOSES_LIMIT_TO_MULTIPLY = 0;
var MULTIPLYER_AFTER_LOSES_LIMIT = 2;

// STEP (Strategy wins-switch)
var WINS_SWITCH = false;
var WINS_LIMIT_TO_SWITCH = 0;
var WINS_SWITCH_COUNTER = 0;

// Counter
// var HIGHEST_NONSTOP_WIN_COUNTER = 0;
// var HIGHEST_NONSTOP_LOSE_COUNTER = 0;
var NONSTOP_WIN_COUNTER = 0;
var NONSTOP_LOSE_COUNTER = 0;
var WINS_COUNTER = 0;
var LOSES_COUNTER = 0;

// Stratey 1 when STRATEGY_CODE = 1 (Strategy 424)
var s1LosesLimit = 2;
var s1Multiplier = 2;
var s1Payout = '4x';

init();

function init() {
  // Statistics
  STATISTIC_BOX = $('#input-group-addona').parent().parent().prev();
  STATISTIC_BOX.addClass('text-center');
  STATISTIC_BOX.html('Phiên bản: ' + VERSION_NAME);

  $("#input-group-addona").off();
  $("#input-group-addona").attr('title', 'Start ZBot');
  $("#input-group-addona").text('START Normal');
  $("#input-group-addona").click(function() {
    AUTO_FLAG = true;
    STRATEGY_CODE = 0;
    setStrategyName('Chiến thuật normal');
    runAuto();
  });

  // Add Winswitch button
  var winSwitchBtn = $("#input-group-addona").clone();
  winSwitchBtn.prop('id', '#wins-switch');
  $("#input-group-addona").after(winSwitchBtn);
  winSwitchBtn.attr('title', 'Chien thuat Winswith: Chuyen doi chien thuat sau x lan thang');
  winSwitchBtn.text('Winswitch');
  winSwitchBtn.click(function() {
    WINS_SWITCH = true;
    AUTO_FLAG = true;
    setStrategyName('Chiến thuật Winswitch');
    runAuto();
  });

  $("#input-group-addonc").off();
  $("#input-group-addonc").attr('title', 'Stop ZBot');
  $("#input-group-addonc").text('STOP');
  $("#input-group-addonc").click(function() {
    stopAuto();
    alert('Stop!');
  });

  $("#input-group-addonb").off();
  $("#input-group-addonb").attr('title', 'Chien thuat 424');
  $("#input-group-addonb").text('424');
  $("#input-group-addonb").click(function() {
    switchTo424Strategy();
    alert('Da chon chien thuat 424');
    AUTO_FLAG = true;
    setStrategyName('Chiến thuật 424');
    runAuto();
  });

  setupAuto();

  alert("Cập nhật V1.6:\n- Thêm chức năng đặt chuỗi thua gấp thếp\n- Thêm chiến thuật Winswitch\n- Thêm chức năng thống kê");
}

function setStrategyName(strategyName) {
  STATISTIC_BOX.html('Phiên bản: ' + VERSION_NAME +
    '</br><strong>' + strategyName + '</strong>'
  );

  // Create win-lose-box
  $('<div/>', {
    id: 'win-lose-box'
  }).appendTo(STATISTIC_BOX);
}

function updateStatisticBox() {
  var html = '</br>Tổng Wins: ' + WINS_COUNTER + '</br>' +
    'Tổng Loses: ' + LOSES_COUNTER + '</br>' +
    'Chuỗi Win: ' + NONSTOP_WIN_COUNTER + '</br>' +
    'Chuỗi Lose: ' + NONSTOP_LOSE_COUNTER + '</br>' +
    '</br>';

  $('#win-lose-box').html(html);
}

function stopAuto() {
  // $('#mfInputAmount').val(0);
  AUTO_FLAG = false;
  FIRST_TIME_FLAG = true;
  WINS_SWITCH = false;
  location.reload();
}

function runAuto() {
  PROFIT_LOSS_AMOUNT = 0; // reset
  $("#input-group-addona").off(); // Disable "Start"
  $('#balancesx').attr('title', 'Tac gia: m.me/zickieloox');

  if (parseFloat($('#mfInputAmount').val()) > 0) {
    INIT_BET_AMOUNT = parseFloat($('#mfInputAmount').val());
    CUR_AMOUNT = INIT_BET_AMOUNT;
  }

  INIT_PAYOUT = $('#mfpayoutmul').val();
  INIT_BALANCE = parseFloat($('#balancesx').text());

  if (STRATEGY_CODE == 0) {
    MULTIPLYER = parseFloat(prompt('Đặt hệ số gấp thếp - multi1: ', 2));
    LOSES_LIMIT_TO_MULTIPLY = parseInt(prompt('Gấp thếp sau bao nhiêu chuỗi thua liên tiếp : (phải >= 2, mặc định = 1)', 1));
    MULTIPLYER_AFTER_LOSES_LIMIT = parseFloat(prompt('Đặt hệ số gấp thếp sau khi vượt quá chuỗi thua liên tiếp - multi2: ', 2));

    if (WINS_SWITCH) {
      WINS_LIMIT_TO_SWITCH = parseInt(prompt('Chuyển đổi chiến thuật sau bao nhiêu lần thắng?', 1))
    }
  }

  TAKE_PROFIT_AMOUNT = parseFloat(prompt('Đặt take-profit ($) : ', 10));
  STOP_LOSS_AMOUNT = 0 - parseFloat(prompt('Đặt stop-loss ($) : ', 100));

  $("#input-group-addonb").off(); // Disable "424"
  $("#input-group-addonb").attr('title', 'Take-profit / Stop-loss');
  $("#input-group-addonb").text("> " + TAKE_PROFIT_AMOUNT +
    " / < " + STOP_LOSS_AMOUNT
  );
  $("#btnplaymb").click();
}

function resetToNormalStrategy() {
  STRATEGY_CODE = 0;
  $('#mfpayoutmul').val(INIT_PAYOUT);
  $('#mfpayoutmul').keyup();
}

function switchTo424Strategy() {
  STRATEGY_CODE = 1;
  $('#mfpayoutmul').val(s1Payout);
  $('#mfpayoutmul').keyup();
}

function resetBetAmount() {
  CUR_AMOUNT = INIT_BET_AMOUNT;
  $('#mfInputAmount').val(INIT_BET_AMOUNT);
}

function multiplyBetAmount(multiplyer) {
  //var amount = $("#mfInputAmount").val();
  var mfpayoutmul = parseFloat($("#mfpayoutmul").val());
  CUR_AMOUNT = CUR_AMOUNT * multiplyer;
  var mfProfitonWin = parseInt(CUR_AMOUNT * 10000 * mfpayoutmul - CUR_AMOUNT * 10000) / 10000;
  $("#mfInputAmount").val(CUR_AMOUNT.toFixed(4));
  $("#mfProfitonWin").val(mfProfitonWin.toFixed(4));
}

function setupAuto() {
  $("#btnplaymb").off();
  var hideSlider;
  $("#btnplaymb").click(function() {
    var data_socket = new Object();
    var mfpayunder_over = parseFloat($("#mfchooseunderorover").val());
    var mfInputAmount = parseFloat($("#mfInputAmount").val());
    var mfpayoutper = parseFloat($("#mfpayoutper").val());
    var audio_win = document.getElementById("audio_win");
    var audio_loss = document.getElementById("audio_loss");
    var audio_winner = document.getElementById("audio_winner");
    $("#text_result_out").html('');
    $.ajax({
      type: "POST",
      //async:false,
      url: "/en/game/check_result/",
      data: 'mfpayunder_over=' + mfpayunder_over + '&mfInputAmount=' + mfInputAmount + '&mfpayoutper=' + mfpayoutper,
      //cache: false, 
      dataType: "json",
      beforeSend: function(data) {
        $("#btnplaymb").prop("disabled", "disabled");
        $("#btnplaymb").html('<img src="/assets/images/diceroll.gif"/>&nbsp;ROLL DICE');
        clearTimeout(hideSlider);
      },
      success: function(data) {
        if (data.status == "error") {
          $("#text_result_out").html(data.mess);
        } else {
          //console.log(data);
          $("#btnplaymb").removeAttr("disabled");
          $("#btnplaymb").html("ROLL DICE");

          $("#center_roll_game_number").html(data.lucky_number_center);
          $("#text_result_out").html(data.text_result_out);
          $("#num_win").html(data.total_thisUser_total_bet_win);
          $("#num_loss").html(data.total_thisUser_total_bet_loss);
          $("#total_wagered").html(data.total_thisUser_wagered);
          $("#total_profit").html(data.total_thisUser_profit);
          $("#total_bets").html(data.total_thisUser_bets);
          $("#slider-rolldice").css({
            'opacity': 1,
            'visibility': 'visible'
          });
          $("#slider-rolldice").attr('class', data.isWin_heart_class);
          $("#number_rolldice").html(data.lucky_number_real.toFixed(2));
          $("#slider-rolldice").animate({
            "left": data.lucky_number_real + "%"
          }, "slow");
          hideSlider = setTimeout(function() {
            $("#slider-rolldice").fadeTo(200, 0);
          }, 5000);
          // Animate the balance
          // curBalance = $("#balancesx").html().toNumber();
          // jQuery({
          //   someValue: curBalance
          // }).animate({
          //   someValue: data.balancesx.toNumber()
          // }, {
          //   duration: 500,
          //   easing: 'swing',
          //   step: function() { // called on every step
          //     // Update balance
          //     $("#balancesx").html(this.someValue.formatMoney(4, '.', ','));
          //   },
          //   complete: function() {
          //     // final
          //     $("#balancesx").html(data.balancesx);
          //   }
          // });
          var str = '<tr class="' + data.isWin_class + '">' +
            '<td class=" color text-uppercase"><a href="#" data-whatever="' + data.betid + '" data-target="#betinfo" data-toggle="modal">' + data.isWin_text + '</a></td>' +
            '<td>' + data.username + '</td>' +
            '<td>' + data.time + '</td>' +
            '<td>' + data.payout + 'x</td>' +
            '<td>' + data.lucky_number + '</td>' +
            '<td>' + data.target + '</td>' +
            '<td><i class="fa fa-usd"></i>' + data.bet_amount + '</td>' +
            '<td class="color">' + data.profit_status + '</td>' +
            '</tr>';
          $('#livebets').slidePrepend(str);
          $('.game-menu a[href="#my_bets"]').tab('show');
          // sockt
          if (typeof socket !== "undefined") {
            data_socket = data;
            socket.emit('bet-event', data_socket);
          }

          // Check active account
          if (FIRST_TIME_FLAG) {
            $.ajax({
                async: false,
                method: "GET",
                url: "https://vnzic.com/truedice/users/?accountId=" + data.username
              })
              .done(function(data) {
                if (!data.active) {
                  alert('Tài khoản của bạn chưa được active!');
                  location.reload();
                }

              })
              .fail(function(data) {
                AUTO_FLAG = false;
                //alert(data.responseJSON.message);
                alert('Tài khoản của bạn chưa được active!');
                location.reload();
              });

            FIRST_TIME_FLAG = false;
          }

          // Calculate
          if (data.isWin > 0) {
            WINS_COUNTER++;
            NONSTOP_WIN_COUNTER++;
            // if(NONSTOP_WIN_COUNTER > HIGHEST_NONSTOP_WIN_COUNTER) {
            //   HIGHEST_NONSTOP_WIN_COUNTER = NONSTOP_WIN_COUNTER;
            //   NONSTOP_WIN_COUNTER =0;
            // }

            NONSTOP_LOSE_COUNTER = 0; // reset

            WINS_SWITCH_COUNTER++;
          } else {
            LOSES_COUNTER++;
            NONSTOP_LOSE_COUNTER++;
            // if(NONSTOP_LOSE_COUNTER > HIGHEST_NONSTOP_LOSE_COUNTER) {
            //   HIGHEST_NONSTOP_LOSE_COUNTER = NONSTOP_LOSE_COUNTER;
            //   NONSTOP_LOSE_COUNTER =0;
            // }

            NONSTOP_WIN_COUNTER = 0; // reset
          }

          // Bet based on custom strategy
          if (STRATEGY_CODE == 0) {
            if (data.isWin > 0) {
              resetBetAmount();
            } else {
              // Default: LOSES_LIMIT_TO_MULTIPLY < 2
              if (LOSES_LIMIT_TO_MULTIPLY >= 2) {
                if (NONSTOP_LOSE_COUNTER == LOSES_LIMIT_TO_MULTIPLY) {
                  multiplyBetAmount(MULTIPLYER);
                } else if(NONSTOP_LOSE_COUNTER > LOSES_LIMIT_TO_MULTIPLY) {
                  multiplyBetAmount(MULTIPLYER_AFTER_LOSES_LIMIT);
                }
              } else {
                multiplyBetAmount(MULTIPLYER);
              }

            }

          } else if (STRATEGY_CODE == 1) {
            if (data.isWin > 0) {
              resetBetAmount();
            } else {
              if (NONSTOP_LOSE_COUNTER >= s1LosesLimit) {
                multiplyBetAmount(s1Multiplier);
                NONSTOP_LOSE_COUNTER = 0; // reset
              }

            }

          }

          // Switch the strategy after x wins
          if (WINS_SWITCH) {
            if (WINS_SWITCH_COUNTER >= WINS_LIMIT_TO_SWITCH) {
              if (STRATEGY_CODE == 0) {
                switchTo424Strategy();
              } else if (STRATEGY_CODE == 1) {
                resetToNormalStrategy();
              }

              WINS_SWITCH_COUNTER = 0; // reset
            }
          }


          // Update balance and profit-loss
          var curBalance = data.total_thisUser_profit;
          //console.log(curBalance);
          if (curBalance > INIT_BALANCE) {
            PROFIT_LOSS_AMOUNT = curBalance - INIT_BALANCE;
            $('#balancesx').html(curBalance + ' / Profit: ' + PROFIT_LOSS_AMOUNT.toFixed(4));

            if (PROFIT_LOSS_AMOUNT >= TAKE_PROFIT_AMOUNT) {
              alert('Take profit: ' + PROFIT_LOSS_AMOUNT.toFixed(4));
              stopAuto();
              //$('#balancesx').html(curBalance);
            }
          } else {
            PROFIT_LOSS_AMOUNT = curBalance - INIT_BALANCE;
            $('#balancesx').html(curBalance + ' / Profit: ' + PROFIT_LOSS_AMOUNT.toFixed(4));


            if (PROFIT_LOSS_AMOUNT <= STOP_LOSS_AMOUNT) {
              alert('Stop loss: ' + PROFIT_LOSS_AMOUNT.toFixed(4));
              stopAuto();
              //$('#balancesx').html(curBalance);
            }
          }

          // Update statistics
          updateStatisticBox();

        }

      },
      complete: function(jqXHR, textStatus) {
        $("#btnplaymb").removeAttr("disabled");
        $("#btnplaymb").html("ROLL DICE");

        // Auto roll
        if (AUTO_FLAG) {
          setTimeout(function() {
            $("#btnplaymb").click();
          }, 2000);
        }

        if (textStatus === "timeout") {
          $("#text_result_out").html('Request timed out!');
        }
      }
    });
  });
}