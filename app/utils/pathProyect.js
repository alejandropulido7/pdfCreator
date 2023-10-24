const path = require('path');

const pathProyect = (pathRender) => {
     return path.join(__dirname, `../../${pathRender}`)
}

module.exports = {pathProyect}