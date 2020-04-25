/**
 * 配置参考：https://wechat-miniprogram.github.io/kbone/docs/config/
 */

module.exports = {
    origin: 'https://miniprogram.com',
    entry: '/main',
    router: {
        main: ['/main'],
        tunnel: ['/tunnel/:tunnelId'],
        batch: ['/batch/:batchId'],
        stage: ['/stage/:stageId'],
        room: ['/room/:roomId'],
        manage: ['/manage']
    },
    redirect: {
        notFound: 'main',
        accessDenied: 'main'
    },
    generate: {
        autoBuildNpm: 'npm'
    },
    app: {
        navigationBarTitleText: 'miniprogram-project'
    },
    appExtraConfig: {
        sitemapLocation: 'sitemap.json'
    },
    global: {},
    pages: {},
    optimization: {
        domSubTreeLevel: 10,

        elementMultiplexing: true,
        textMultiplexing: true,
        commentMultiplexing: true,
        domExtendMultiplexing: true,

        styleValueReduce: 5000,
        attrValueReduce: 5000
    },
    projectConfig: {
        projectname: 'kbone-template-react',
        appid: 'wxe7de0046998773b8'
    }
}
