const QiniuUploader = require("../src/qiniu");
const { QINIU_ACCESS_KEY, QINIU_SECRET_KEY,QINIU_TEST_BUCKET } = process.env;

const oss = new QiniuUploader({
    region:QiniuUploader.HUADONG,
    accessKeyId:QINIU_ACCESS_KEY,
    accessKeySecret:QINIU_SECRET_KEY,
    bucket:QINIU_TEST_BUCKET
});
oss.initOptions({clear:true});
oss.upload("./test/*.js","test").then(res => console.log(res)).catch(e => console.log(e));
