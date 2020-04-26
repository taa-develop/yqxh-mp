import React from 'react'
import ReactDOM from 'react-dom'
import { ClientContext } from 'graphql-hooks'

import '../../page/index.css'

const list = ['一次隧道指标管理', '二次隧道指标管理', '菇房指标管理']

export default function createApp() {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    ReactDOM.render(
        <ClientContext.Provider value={window.$$global.client}>
            <div>{list[parseInt(window.location.pathname.split('/')[2])]}</div>
        </ClientContext.Provider>,
        container
    )
}

;('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
