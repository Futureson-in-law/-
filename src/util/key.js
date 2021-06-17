import md5 from 'md5'

export const getKeys = () => {
    let date = new Date()
    let keys = md5(date.getHours() + "zgw" + "(%+(-A/#*-C^%!.$)");
    return keys
}