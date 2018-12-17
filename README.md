static2cloud
============

[![Build Status](https://travis-ci.com/uenough/static2cloud.svg?branch=master)](https://travis-ci.com/uenough/static2cloud)
[![](https://img.shields.io/azure-devops/coverage/github/uenough/static2cloud.svg)](https://coveralls.io/github/uenough/static2cloud)
[![](https://img.shields.io/npm/v/static2cloud.svg)](https://www.npmjs.com/package/static2cloud)




Install
============

```bash
$ npm install static2cloud
```

Usage
============

```js
//上传到七牛云对象存储 
const { QiniuUploader } = require("static2cloud");

const oss = new QiniuUploader({
    region:QiniuUploader.HUADONG,//[ QiniuUploader.HUADONG, QiniuUploader.HUABEI, QiniuUploader.HUANAN, QiniuUploader.BEIMEI ]
    accessKeyId:"your accesskey",
    accessKeySecret:"your secretkey",
    bucket:"your bucket"
});

oss.initOptions({clear:true});//target是否清空文件夹

/**
 * @Param glop 路径
 * @Param targetPath 云存储路径
 * */
oss.upload("./test/*.js","test")
    .then(res => {
        //
    })
    .catch(e => {
        //
    });
```
