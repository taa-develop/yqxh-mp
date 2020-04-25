import React, { useEffect } from 'react'
import { styled } from 'linaria/react'

const Wrap = styled.div`
    /* background-color: #00a6f3; */
    flex: 1;
`
const Card = styled.div`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
    padding: 20rpx 32rpx;
    width: 100%;
`
const tunnelList = [
    { id: 0, name: '一次隧道' },
    { id: 1, name: '二次隧道' }
]
function TunnelList() {
    useEffect(() => {
        wx.setNavigationBarTitle({
            title: '隧道列表'
        })
    }, [])
    const handleCLickTunnel = id => {
        window.open(`/tunnel/${id}`)
    }
    return (
        <Wrap>
            {tunnelList.map(v => (
                <Card onClick={() => handleCLickTunnel(v.id)}>{v.name}</Card>
            ))}
        </Wrap>
    )
}

export default TunnelList
