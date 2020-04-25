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

const RECORD_LIST = `
    query RecordList($pageQuery: PageQuery!, $stageId: Int) {
        recordListByStageId(pageQuery: $pageQuery, stageId: $stageId) {
            id
            recorderId
            recorder
            batchId
            stageId
            environment
            mushroomHouseId
            picture
            remark
            indicatorData {
                key
                value
            }
        }
    }
`

function Stage() {
    const handleClick = id => {
        // window.open(`/batch/${id}`)
    }
    useEffect(() => {
        wx.setNavigationBarTitle({
            title: `记录列表`
        })
    }, [])
    const { loading, error, data } = useQuery(RECORD_LIST, {
        variables: {
            pageQuery: {
                pageNum: 1,
                pageSize: 10
            },
            stageId: parseInt(window.location.pathname.split('/')[2])
        }
    })
    if (loading) return <p>Loading ...</p>
    console.log(data)
    return (
        <Wrap>
            {data.recordListByStageId.map(v => (
                <Card key={v.id} onClick={() => handleClick(v.id)}>
                    {v.recorder}
                </Card>
            ))}
        </Wrap>
    )
}

export default Stage
