import React from 'react'
import ReactDOM from 'react-dom'
import { ClientContext } from 'graphql-hooks'

import '../../page/index.css'

export default function createApp() {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    ReactDOM.render(
        <ClientContext.Provider value={window.$$global.client}>
            <div>用户权限管理</div>
        </ClientContext.Provider>,
        container
    )
}

;('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
