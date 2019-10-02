(function() {
  'use strict';
  kintone.events.on('app.record.index.show', function(event) {
    console.log('Hello from kintone CLI');
    createTemplateBtn();
    return event;
  });
  // webpack: no && kintone-UI-component: yesとした場合に自動でkucのmin.jsをアップローダにセットして欲しい
  function createTemplateBtn() {
    var headerMenu = kintone.app.getHeaderMenuSpaceElement();
    // extentionの補完機能で作成
    var button = new kintoneUIComponent.Button({text: 'レコード作成'});
    var btnDiv = document.createElement("div");
    btnDiv.className = "headerMenuBtn";
    headerMenu.appendChild(button.render());
    button.on('click', function(event) {
      console.log('on click');
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
        var notifyPopup = new kintoneUIComponent.NotifyPopup({
          text: 'レコード登録が完了しました',
          type: 'success'
        });
        headerMenu.appendChild(notifyPopup.render());
        notifyPopup.on('click', function(event) {
          // 閉じるボタンを押した際に動かない
          console.log('on click');
          location.reload();
        });
      }, function(error) {
        // error
        console.log(error);
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
