
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
    "endpoint": "https://fcm.googleapis.com/fcm/send/e7EcCfUwwjY:APA91bF9jzyNRQOjkQ__pf-CcK3xlroZ35A-W4Stmt7YgbitF6JjrQxUaQsPxtq7KHo3giP8-BRoey79k2FYDxt7w5CF8s9fD5-cRzktA1uddPBVdVux-kiuP9-7gfY9HcyBcqS2znR-",
    "keys": {
        "p256dh": "BLAz+gQi0LT00i+qDfPLJ2eIj9dvUx2hmrVSwKoOESO5rsARzHWJgZbvaO4uFtdWMnQfqxJLm3a09tGzSXxU7go=",
        "auth": "9ULlR9T/lDNB0saQW90Ssw=="
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