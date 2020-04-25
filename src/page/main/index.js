import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import App from './App'

axios.defaults.adapter = mpAdapter
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const instance = axios.create()

const client = new ApolloClient({
    uri: 'https://api.yiquanxinhe.com/graphql',
    // request: operation => {
    //     const token = window.$$global.token
    //     let headers = {}
    //     if (token) {
    //         headers = {
    //             authorization: `Bearer ${token}`
    //         }
    //     }
    //     operation.setContext({ headers })
    // },
    fetch: (url, options) =>
        instance({
            url,
            method: options.method,
            data: options.body,
            header: options.headers
        }).then(({ data, statusCode }) => {
            return {
                ok: () => {
                    return statusCode >= 200 && statusCode < 300
                },
                text: () => {
                    return Promise.resolve(JSON.stringify(data))
                }
            }
        }),
    clientState: {
        defaults: {
            loggedIn: false
        },
        resolvers: {}
    }
})

export default function createApp() {
    const container = document.createElement('div')
    container.id = 'app'
    document.body.appendChild(container)

    ReactDOM.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>,
        container
    )
}

;('undefined' != typeof wx && wx.getSystemInfoSync) || createApp()
