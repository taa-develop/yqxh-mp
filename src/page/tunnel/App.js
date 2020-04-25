import React, { useEffect, useState } from 'react'
import { styled } from 'linaria/react'
import { useQuery } from 'graphql-hooks'

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
`
const Card = styled.div`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
    padding: 20rpx 32rpx;
    width: 100%;
`

const BATCH_LIST = `
    query BatchList($pageQuery: PageQuery!, $batchQuery: BatchQuery!) {
        batchList(pageQuery: $pageQuery, batchQuery: $batchQuery) {
            id
            environment
            number
            status
            startTime
            endTime
            recorder
            recordCount
            silo {
                id
                name
            }
            stage {
                stageName
            }
        }
    }
`

function Tunnel() {
    const [tunnelName] = useState(
        window.location.pathname.split('/')[2] === '0' ? '一次隧道' : '二次隧道'
    )
    useEffect(() => {
        wx.setNavigationBarTitle({
            title: `${tunnelName} > 批次列表`
        })
    }, [])
    const handleClick = id => {
        window.open(`/batch/${id}`)
    }
    const { loading, error, data } = useQuery(BATCH_LIST, {
        variables: {
            pageQuery: {
                pageNum: 1,
                pageSize: 10
            },
            batchQuery: {
                environment:
                    window.location.pathname.split('/')[2] === '0'
                        ? 'ONCE_TUNNEL'
                        : 'TWICE_TUNNEL'
            }
        }
    })
    if (loading) return <p>Loading ...</p>
    console.log(data)
    return (
        <Wrap>
            {data.batchList.map(v => (
                <Card key={v.id} onClick={() => handleClick(v.id)}>
                    {v.number}
                </Card>
            ))}
        </Wrap>
    )
}

export default Tunnel
