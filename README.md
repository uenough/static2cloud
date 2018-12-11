static2cloud
============

Install
============

```bash
$ npm install qiniu
```

Usage
============

```js
//七牛云 对象存储 
const { QiniuUploader } = require("static2cloud");
const oss = new QiniuUploader({
    region:QiniuUploader.HUADONG,
    accessKeyId:QINIU_ACCESS_KEY,
    accessKeySecret:QINIU_SECRET_KEY,
    bucket:QINIU_TEST_BUCKET
});
oss.initOptions({clear:true});//target是否清空文件夹
oss.upload("./test/*.js","test")
    .then(res => {
        //
    })
    .catch(e => {
        //
    });
```
