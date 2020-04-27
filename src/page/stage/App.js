import React, { useEffect, useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useQuery, useMutation } from 'graphql-hooks'

import Button from '../../components/Button'
import Card from '../../components/Card'

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

const Items = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
const ItemUp = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const FiledsBox = styled.div``
const Lable = styled.div`
    margin: 10rpx 0;
`

const Line = styled.div`
    width: 100%;
    height: 2rpx;
    background-color: #ccc;
    margin: 10rpx 0;
`

const ItemDown = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardSty = css`
    height: 200rpx;
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

const STAGE_END = `mutation EndStage($batchId: Int!,$stageId: Int!) {
    endStage(batchId: $batchId,stageId: $stageId)
}`

function Stage() {
    const [stageEnd] = useMutation(STAGE_END)

    window.addEventListener('wxshow', () => {
        refetch()
    })

    const handleClick = id => {
        // window.open(`/batch/${id}`)
    }

    const handleAddRecording = () => {
        window.open(`/recordAdd`)
    }

    const handleComplete = async () => {
        const { data, error } = await stageEnd({
            variables: {
                environment: window.$$global.environment,
                batchId: window.$$global.batchId,
                stageId: window.$$global.stageId
            }
        })
        if (error) {
            console.log(error)
        } else if (data) {
            wx.showToast({
                title: '阶段已完成',
                icon: 'success',
                duration: 3000,
                success: function() {
                    setTimeout(() => {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 2000)
                }
            })
        }
    }

    useEffect(() => {
        wx.setNavigationBarTitle({
            title: `记录列表`
        })
    }, [])

    const { loading, error, data, refetch } = useQuery(RECORD_LIST, {
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
            {data.recordListByStageId.map((v, indx) => (
                <Card
                    key={v.id}
                    onClick={() => handleClick(v.id)}
                    className={CardSty}
                >
                    <Items>
                        <ItemUp>
                            <FiledsBox>
                                <Lable>阶段：{v.stageName}</Lable>
                                <Lable>序号：{indx + 1}</Lable>
                            </FiledsBox>
                            <FiledsBox>
                                <Lable>记录数：{v.recordCount}</Lable>
                                <Lable>记录员：{v.recorder}</Lable>
                            </FiledsBox>
                        </ItemUp>
                        <Line></Line>
                        <ItemDown>
                            <FiledsBox>
                                <Lable>
                                    料温：
                                    {v.indicatorData &&
                                        v.indicatorData.map(indi => indi.value)}
                                </Lable>
                            </FiledsBox>
                        </ItemDown>
                    </Items>
                </Card>
            ))}
        </Wrap>
    )
}

export default Stage
