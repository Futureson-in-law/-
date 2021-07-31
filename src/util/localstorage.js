var storageObjece = {
    set: function (key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    get: function (key) {
        var val = localStorage.getItem(key) || '[]';
        val = JSON.parse(val);
        return val
    }
}

export default storageObjece