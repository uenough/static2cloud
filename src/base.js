const path = require("path");
const glob = require("glob");
module.exports = class Base {

    constructor(){
        this.options = {
            clear:false,
        }
    }


    initOptions(op) {
        this.options = Object.assign({},this.options,op);
    }
    /**
     * 上传多个文件
     */
    upload(glopPath,targetPath="") {

        const clear = () => {
            if(this.options.clear) {
                return this._clearFiles(targetPath);   
            } else {
                return Promise.resolve();
            }
        };

        return new Promise((rev,rej) => {
            clear().then(() =>{
                glob(glopPath, (er, files) => {
                    if(er) {
                        rej(er);
                        return;
                    }
                    Promise.all(files.map(v => this._uploadOne(v,path.join(targetPath,path.basename(v))))).then(rev).catch(rej);    
                })
            }).catch(rej)
        })
    }

    /**
     * 上传单个文件
     */
    _uploadOne(filePath,key) {
        // 继承实现
    }

    /**
     * 清空文件夹
     */
    _clearFiles(targetPath) {
        // 继承实现
    }
}