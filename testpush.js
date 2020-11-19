
var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BCIVLh5SnkRLW1Waw5yc-f5vcClH-LBo79nWM9DHORYtNj9U0J7NdPEyfc9H-f3jlVeY9WXrHL552qfLqbbRWa4",
    "privateKey": "hzQ2dRTarNvrE68WMj9PRYPhxrrBGimvCRGxcN4xACc"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ezLNLYT3RaU:APA91bEHOxr5mMspEIiGHgKI3SrMH6HjZb9AZeltppOEnMhFtmz6NozsCR77DIfIlffjTJ5yx38GY5WZ_q1rdHgRrGrTYxJiLQRFTlm44VB_IWxXO6W9M43HRs2K2-MlBLYsBTiEGwUp",
    "keys": {
        "p256dh": "BCijicys/h9TSl0b0tlR+d20IN5UhaWCSYGyjpTZXE+LW2SzAPLkLwvZXCsXjaPpYOzOhwcL/QPobhOXj2WILaQ=",
        "auth": "bABT2HGxs3otiUy7FNsxoA=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '249794266165',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);