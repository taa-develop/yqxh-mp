import React, { useEffect, useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useQuery } from 'graphql-hooks'
import Card from '../../components/Card'
import Button from '../../components/Button'

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
`

const Header = styled.div``
const Content = styled.div``

const ButtonSty = css`
    background-color: #fff;
    color: #6190e8;
    border: 1px solid #6190e8;
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
        window.open(`/batch/${id}`)
    }

    const handleAddRecording = () => {
        console.log('handleAddRecording')
    }

    const handleComplete = () => {
        console.log('handleComplete: ')
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
            <Header>
                <Button onClick={handleAddRecording}>添加记录</Button>
                <Button onClick={handleComplete} className={ButtonSty}>
                    完成阶段
                </Button>
            </Header>
            <Content></Content>
            {data.recordListByStageId.map(v => (
                <Card key={v.id} onClick={() => handleClick(v.id)}>
                    {v.recorder}
                </Card>
            ))}
        </Wrap>
    )
}

export default Stage
