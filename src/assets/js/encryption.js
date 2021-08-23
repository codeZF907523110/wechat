module.exports= function(content){
    //crypto加密模块
    var crypto=require('crypto')

    //1.md5加密第一次
    var md51=crypto.createHash('md5')
    md51.update(content, 'utf8');
    var md51jiami=md51.digest('hex').toUpperCase();
    // console.log(md51jiami,'md51');

    //  2.md5加密第二次
    var md52=crypto.createHash('md5')
    md52.update(md51jiami, 'utf8');
    // console.log(md52.digest('hex').toUpperCase(),'md52');
    return md52.digest('hex').toUpperCase()
}
