import React from 'react'
import { styled } from 'linaria/react'
import { useQuery } from 'graphql-hooks'
const Wrap = styled.div`
    flex: 1;
`
const Header = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
`
const Cotent = styled.div``
const Ava = styled.div`
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
`
const Name = styled.div``

const CURRENT_USER = `
    query {
        currentUser {
            id
            username
            avatarUrl
            realName
            nickName
            gender
            role
        }
    }
`

function User() {
    const { loading, error, data } = useQuery(CURRENT_USER)
    if (loading) return <div>loading</div>
    console.log(data)
    return (
        <Wrap>
            <Header>
                <Ava>
                    <img
                        src={data.currentUser.avatarUrl}
                        width='50rpx'
                        height='50rpx'
                    />
                </Ava>
                <Name>{data.currentUser.nickName}</Name>
            </Header>
            <Cotent></Cotent>
        </Wrap>
    )
}

export default User
