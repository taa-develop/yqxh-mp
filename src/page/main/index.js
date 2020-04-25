import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

import App from './App'

axios.defaults.adapter = mpAdapter
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const instance = axios.create()

const client = new GraphQLClient({
    url: 'https://api.yiquanxinhe.com/graphql',
    fetch: (url, options) =>
        instance({
            url,
            method: options.method,
            data: options.body,
            header: options.headers
        }).then(res => {
            return {
                ok: () => {
                    return statusCode >= 200 && statusCode < 300
                },
                json: () => {
                    return Promise.resolve(res.data)
                },
                text: () => {
                    return Promise.resolve(JSON.stringify(res.data))
                }
            }
        })
})
window.$$global.client = client

export default function createApp() {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    ReactDOM.render(
        <ClientContext.Provider value={client}>
            <App />
        </ClientContext.Provider>,
        container
    )
}

;('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
