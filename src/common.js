export function formatDate(timestamp) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}
export function formatTime(s) {
    var ret = '', tmp = parseInt(s / 60), y = s % 60;
    if (tmp < 1) {
        ret = s + "秒";
    } else {
        ret = y + "秒";
        y = tmp % 60;
        tmp = parseInt(tmp / 60);
        if (tmp < 1) {
            ret = y + "分 " + ret;
        } else {
            ret = tmp + "时 " + y + "分 " + ret;
        }
    }

    return ret;
}
export function formatByte(byte) {
    var mb = parseInt(byte / (1048576)), tmp = mb / 1024;
    var ret = '';
    if (tmp < 1) {
        ret = mb + "MB";
    } else {
        ret = parseInt(tmp) + "GB " + (mb % 1024) + "MB";
    }
    return ret;
}
export function get(url) {
    return fetch(url, {
        credentials: "include"
    });
}

export function req_json(url, method, data) {
    var opts = {
        method: method,
        body: data,
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };
    return fetch(url, opts);
}