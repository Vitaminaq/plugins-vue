const fs = require('fs');
const path = require('path');

const currentPath = path.resolve(__dirname, '../src/types.d.ts');
const targetPath = path.resolve(__dirname, '../dist/types.d.ts');

const createTypes = () => {
    return {
        name: 'create-types',
        generateBundle() {
            fs.copyFile(currentPath, targetPath, function(err) {
                if (err) {
                    console.log('生成types.d.ts文件失败', err);
                } else {
                    console.log('生成types.d.ts文件成功');
                }
            })
        }
    }
}

export default createTypes;
