const qiniu = require("qiniu");
const Base = require("./base.js");
class QiniuUploader extends Base {

    constructor({
        region,//one of [HUADONG,HUABEi,HUANAN,BEIMEI]
        accessKeyId,
        accessKeySecret,
        bucket
    }) {
        super();
        this.accessKeyId = accessKeyId;
        this.accessKeySecret = accessKeySecret;
        this.bucket = bucket;
        const config = new qiniu.conf.Config();
        config.zone = region;
        this.formUploader = new qiniu.form_up.FormUploader(config);
        this.putExtra = new qiniu.form_up.PutExtra();
        this.mac = new qiniu.auth.digest.Mac(this.accessKeyId, this.accessKeySecret);
        this.bucketManager = new qiniu.rs.BucketManager(this.mac, config);
    }
    //@Override
    _uploadOne(filePath, key) {

        const putPolicy = new qiniu.rs.PutPolicy({
            scope: `${this.bucket}:${key}`,
        });
        const uploadToken = putPolicy.uploadToken(this.mac);

        return new Promise((rev, rej) => {
            this.formUploader.putFile(uploadToken, key, filePath, this.putExtra, (respErr,
                respBody, respInfo) => {
                if (respErr) {
                    rej(respErr)
                }
                if (respInfo.statusCode == 200) {
                    rev(respBody);
                } else {
                    rej(respInfo)
                }
            });
        })
    }
    //Override
    _clearFiles(targetPath) {
        return this._listFiles(targetPath).then(arr => {
            let deleteOperations = arr.map(w => qiniu.rs.deleteOp(this.bucket, w),)
            if(deleteOperations.length > 0) {
                return this._deleteFiles(deleteOperations);
            } else {
                return Promise.resolve([]);
            }
        })
    }

    _listFiles(targetPath) {
        var options = {
            limit: 1000,
            prefix: targetPath,
        };
        return new Promise((rev, rej) => {
            this.bucketManager.listPrefix(this.bucket, options, (err, respBody, respInfo) => {
                if (err) {
                    rej(err);
                }
                if (respInfo.statusCode == 200) {
                    var items = respBody.items;
                    let arr = items.map(v => v.key);
                    rev(arr);
                } else {
                    rej(respInfo)
                }
            });
        })

    }

    _deleteFiles(deleteOperations) {
        return new Promise((rev, rej) => {
            this.bucketManager.batch(deleteOperations, (err, respBody, respInfo) => {
                if (err) {
                    rej(err);
                } else {
                    // 200 is success, 298 is part success
                    if (parseInt(respInfo.statusCode / 100) == 2) {
                        rev(respBody);
                    } else {
                        rej(respInfo);
                    }
                }
            });
        })

    }

}

QiniuUploader.HUADONG = qiniu.zone.Zone_z0;//华东
QiniuUploader.HUABEI = qiniu.zone.Zone_z1;//华北
QiniuUploader.HUANAN = qiniu.zone.Zone_z2;//华南
QiniuUploader.BEIMEI = qiniu.zone.Zone_zna0;//北美

module.exports = QiniuUploader;




