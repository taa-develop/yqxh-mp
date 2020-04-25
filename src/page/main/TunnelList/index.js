import React, { useEffect } from 'react'
import { styled } from 'linaria/react'
import Card from '../../../components/Card'

const Wrap = styled.div`
    flex: 1;
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
