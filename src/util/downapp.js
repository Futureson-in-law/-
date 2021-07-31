export const downapp = () => {
    var Platform = checkPlatform();
    switch (Platform) {
        case 'Android':
            window.location.href = "http://zms.zgw.com/UploadFile/Android/app-release.apk"
            break;
        case 'iOS':
            window.location.href = "https://apps.apple.com/us/app/id959819016"
            break;
    }
}


//手机端判断各个平台浏览器及操作系统平台
function checkPlatform() {
    if (/android/i.test(navigator.userAgent)) {
        // document.write("安卓端，即将开始下载...");//这是Android平台下浏览器
        return "Android"
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        // document.write("苹果端，即将跳转AppStore...");//这是iOS平台下浏览器
        return "iOS"
    }
    if (/Linux/i.test(navigator.userAgent)) {
        // document.write("PC端不提供下载");//这是Linux平台下浏览器
    }
    if (/Linux/i.test(navigator.platform)) {
        // document.write("PC端不提供下载");//这是Linux操作系统平台
    }
    if (/MicroMessenger/i.test(navigator.userAgent)) {
        // document.write("暂不支持微信中直接下载，请复制链接到浏览器下载");//这是微信平台下浏览器
    }
}

