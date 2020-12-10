const Webpack = require("webpack")
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')
const express = require("express")
const bodyParser = require('body-parser')
const portfinder = require('portfinder')

class Server {
    constructor() {
        portfinder.basePort = 8080
        this.server = null
        this.port = 8080
    }
    async init() {
        await this.getPort()
        this.initWebpack()
        this.initApi()
        this.server.use("/web-api", this.app)
        this.server.listen(this.port, "0.0.0.0", () => {
            console.log(`Starting server on http://localhost:${this.port}`)
        })
    }
    // 获取没有被占用的端口
    async getPort() {
        this.port = await portfinder.getPortPromise()
    }
    // 初始化 webpack
    initWebpack() {
        const compiler = Webpack(config)
        this.server = new WebpackDevServer(compiler, {
            stats: { colors: true }, 
            noInfo: true,
            historyApiFallback: true
        })
        this.server.use(bodyParser.urlencoded({ extended: true }))
        this.server.use(bodyParser.json())
    }
    // 初始化接口
    initApi() {
        this.app = express.Router()
        this.app.get("/", (req, res) => { res.json({ name: "xm" }) })
        this.app.get("/exit", (req, res) => { process.exit(1) })
    }
}

new Server().init()
