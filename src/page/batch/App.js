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

const STAGE_LIST = `
    query StageList($pageQuery: PageQuery!, $batchId: Int!) {
        stageListByBatchId(pageQuery: $pageQuery, batchId: $batchId) {
            id
            environment
            mushroomHouseId
            batchId
            stageName
            recorder
            recordCount
            startTime
            endTime
            status
        }
    }
`

function Batch() {
    const handleClick = id => {
        window.open(`/stage/${id}`)
    }
    useEffect(() => {
        wx.setNavigationBarTitle({
            title: `阶段列表`
        })
    }, [])
    const { loading, error, data } = useQuery(STAGE_LIST, {
        variables: {
            pageQuery: {
                pageNum: 1,
                pageSize: 10
            },
            batchId: parseInt(window.location.pathname.split('/')[2])
        }
    })
    if (loading) return <p>Loading ...</p>
    console.log(data)
    return (
        <Wrap>
            {data.stageListByBatchId.map(v => (
                <Card key={v.id} onClick={() => handleClick(v.id)}>
                    {v.stageName}
                </Card>
            ))}
        </Wrap>
    )
}

export default Batch
