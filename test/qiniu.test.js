const should = require("should");
const { QiniuUploader } = require("../src/index.js");


before(function (done) {
    if (!process.env.QINIU_ACCESS_KEY || !process.env.QINIU_SECRET_KEY || !
        process.env.QINIU_TEST_BUCKET) {
        console.log('should run command `source test-env.sh` first\n');
        process.exit(0);
    }
    done();
});

describe("test upload static files to qiniu cloud", () => {
    const { QINIU_ACCESS_KEY, QINIU_SECRET_KEY, QINIU_TEST_BUCKET } = process.env;
    const oss = new QiniuUploader({
        region: QiniuUploader.HUADONG,
        accessKeyId: QINIU_ACCESS_KEY,
        accessKeySecret: QINIU_SECRET_KEY,
        bucket: QINIU_TEST_BUCKET
    });
    it("test upload", async () => {
        oss.initOptions({ clear: true });
        const res = await oss.upload("./test/*.bundle.js", "static2upload_test");
        res[0].should.have.property("hash");
        res[0].should.have.property("key");
    });
    it("test clear", async () => {
        await oss._clearFiles("static2upload_test");
    })
})






