import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useMutation } from 'graphql-hooks'

import { instance } from '../index'

const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #fff;
    /* background-image: linear-gradient(#00a6f3, #6ab4ec); */
    background-image: linear-gradient(#194a7a, #6ab4ec);
`
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-direction: column;
`
const Title = styled.span`
    font-size: 26px;
    font-weight: bold;
`
const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const WxButton = css`
    background-color: transparent !important;
    & element {
        width: 100px;
        font-size: 18px;
        /* color: #fff;
        background-color: #5bc0de; */
        color: #1d5181;
        background-color: #fff;
        border-color: #46b8da;
        padding: 16px 24px;
        display: block;
        border-radius: 4px;
        margin: 0 auto;
        text-align: center;
    }
`

const LOGIN_MUTATION = `
    mutation WeLogin($code: String!, $userInfo: InputWeChatUser) {
        weChatLogin(code: $code, userinfo: $userInfo) {
            token
        }
    }
`

function Login({ loginSuccess }) {
    const [needAuth, setNeedAuth] = useState(true)
    const emitLogin = uInfo => {
        let userInfo = {
            avatarUrl: uInfo.avatarUrl,
            gender: uInfo.gender == 1 ? 'MAN' : 'WOMAN',
            nickName: uInfo.nickName,
            country: uInfo.country,
            province: uInfo.province,
            city: uInfo.city
        }
        wx.login({
            success(res) {
                loginMutation({
                    variables: { code: res.code, userInfo: userInfo }
                }).then(res2 => {
                    if (res2.data) {
                        const { token } = res2.data.weChatLogin
                        instance.defaults.headers.common[
                            'Authorization'
                        ] = `Bearer ${token}`
                        window.$$global.token = token
                        loginSuccess()
                    }
                })
            }
        })
    }
    useEffect(() => {
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    setNeedAuth(false)
                    wx.getUserInfo({
                        success(res2) {
                            emitLogin(res2.userInfo)
                        }
                    })
                }
            }
        })
    }, [])
    const userInfoButton = useRef()
    const [loginMutation] = useMutation(LOGIN_MUTATION)
    const handleGetUserInfo = res => {
        emitLogin(res.detail.userInfo)
    }
    useEffect(() => {
        userInfoButton.current.addEventListener(
            'getuserinfo',
            handleGetUserInfo
        )
    }, [])
    return (
        <Wrap>
            <Header>
                <Title>双胞蘑菇工厂化生产</Title>
                <Title>智能管理平台</Title>
            </Header>
            <Content>
                {needAuth ? (
                    <wx-button
                        className={WxButton}
                        open-type='getUserInfo'
                        ref={userInfoButton}
                    >
                        登录
                    </wx-button>
                ) : (
                    <div>loading</div>
                )}
            </Content>
        </Wrap>
    )
}

export default Login
