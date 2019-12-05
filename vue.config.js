module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:"http://172.16.61.151:9090/",
                changeOrigin: true,
            }
        }
    }
}
