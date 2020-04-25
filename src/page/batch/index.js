import React from 'react'
import ReactDOM from 'react-dom'
import { ClientContext } from 'graphql-hooks'

import '../../page/index.css'

import App from './App'

export default function createApp() {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    ReactDOM.render(
        <ClientContext.Provider value={window.$$global.client}>
            <App />
        </ClientContext.Provider>,
        container
    )
}

;('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
