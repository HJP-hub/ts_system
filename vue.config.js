module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:"http://106.12.84.152:9090/",
                changeOrigin: true,
            }
        }
    }
}
