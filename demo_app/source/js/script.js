(function() {
  'use strict';
  kintone.events.on('app.record.index.show', function(event) {
    console.log('Hello from kintone CLI');
    createTemplateBtn();
    return event;
  });
  function createTemplateBtn() {
    var headerMenu = kintone.app.getHeaderMenuSpaceElement();
    // extentionの補完機能で作成
    // kuc-button-on でひな形作成
    var button = new kintoneUIComponent.Button({text: 'レコード作成'});
    var btnDiv = document.createElement("div");
    btnDiv.className = "headerMenuBtn";
    headerMenu.appendChild(button.render());
    button.on('click', function(event) {
      console.log('on click');

      // ka-record-add-recordでひな形作成
      var requestBody = {
        'app': kintone.app.getId(),
        'record': {
          'title': {
            'value': '今日の天気'
          },
          'description': {
            'value': '本日は晴天なり'
           }
        }
      }
      kintone.api(kintone.api.url('/k/v1/record', true), 'POST', requestBody, function(resp) {
        // success
        console.log(resp);
        // kuc-noitfy-popupでひな形作成
        var notifyPopup = new kintoneUIComponent.NotifyPopup({
          text: 'レコード登録が完了しました',
          type: 'success'
        });
        headerMenu.appendChild(notifyPopup.render());
        notifyPopup.on('click', function(event) {
          console.log('on click');
          location.reload();
        });
      }, function(error) {
        // error
        console.log(error);
        // kuc-noitfy-popupでひな形作成
        var notifyPopup = new kintoneUIComponent.NotifyPopup({
          text: 'レコード登録に失敗しました',
          type: 'error'
        });
        headerMenu.appendChild(notifyPopup.render());
        notifyPopup.show();
      });
    });
  }
})();
