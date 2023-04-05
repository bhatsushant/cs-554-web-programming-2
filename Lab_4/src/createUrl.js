export const createUrl = (param, page) => {
    const md5 = require('blueimp-md5');
    const publickey = '7003b16424d2b557acc3eb7c98a2f843';
    const privatekey = 'f739f546d5d51c679093540741144f66861dcf9e';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    let baseUrl = ''
    if(page === 'list') {
        baseUrl = `https://gateway.marvel.com:443/v1/public/${param}`;
    } else {
        baseUrl = `https://gateway.marvel.com:443/v1/public/${param}/${page}`;
    }
    
    const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    return url;
}