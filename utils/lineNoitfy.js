const axios = require('axios');
const querystring = require('querystring');

const LineNotify = function () { };

/**
 * LINE Notifyのトークンセット
 * @param {String} token LINE Notifyトークン
 */
LineNotify.prototype.setToken = function (token) {
  this.token = token;
};

/**
 * LINE Notify実行
 * @param {String} text メッセージ
 */
LineNotify.prototype.notify = function (text) {
  if (this.token == undefined || this.token == null) {
    console.error('undefined token.');
    return;
  }
  console.log(`notify message : ${text}`);
  axios(
    {
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: querystring.stringify({
        message: text,
      }),
    }
  )
    .then(function (res) {
      console.log(res.data);
    })
    .catch(function (err) {
      console.error(err);
    });
};

module.exports = LineNotify;
