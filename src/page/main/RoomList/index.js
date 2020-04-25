import React, { useEffect } from 'react'
import { styled } from 'linaria/react'
import { useQuery } from 'graphql-hooks'

const Wrap = styled.div`
    background-color: #00a6f3;
    flex: 1;
`

const CURRENT_USER = `
    query {
        currentUser {
            id
            username
        }
    }
`

function RoomList() {
    useEffect(() => {
        wx.setNavigationBarTitle({
            title: '菇房列表'
        })
    }, [])
    const { loading, error, data } = useQuery(CURRENT_USER)
    if (loading) return <div>loading</div>
    console.log(data)
    return <Wrap></Wrap>
}

export default RoomList
