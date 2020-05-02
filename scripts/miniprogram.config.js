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
        batchAdd: ['/batchAdd/:environment'],
        recordAdd: ['/recordAdd'],
        stage: ['/stage/:stageId'],
        room: ['/room/:roomId'],
        roomAdd: ['/roomAdd'],
        stageManage: ['/stage-manage/:stageType'],
        indicatorManage: ['/indicator-manage/:indicatorType'],
        userPowerManage: ['/user-power-manage']
    },
    redirect: {
        notFound: 'main',
        accessDenied: 'main'
    },
    generate: {
        autoBuildNpm: 'npm',
        subpackages: {
            package1: ['tunnel'],
            package2: ['batch'],
            package3: ['stage'],
            package4: ['stageManage'],
            package5: ['indicatorManage'],
            package6: ['userPowerManage'],
            package7: ['batchAdd'],
            package8: ['recordAdd'],
            package9: ['roomAdd'],
        },
        preloadRule: {
            main: {
                network: 'all',
                packages: [
                    'package1',
                    'package2',
                    'package3',
                    'package4',
                    'package5',
                    'package6',
                    'package7',
                    'package8',
                    'package9',
                ]
            }
        }
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
