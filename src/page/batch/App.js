import React, { useEffect, useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import Card from '../../components/Card'
import Button from '../../components/Button'
import dayjs from 'dayjs'
import { useQuery } from 'graphql-hooks'
const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
`
const Header = styled.div``
const Content = styled.div``
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

const TagWks = styled.div`
    color: #fff;
    background-color: #6190e8;
    padding: 4rpx 8rpx;
    border-radius: 6rpx;
    background-color: #6190e8;
`
const TagWwc = styled.div`
    color: #fff;
    background-color: #6190e8;
    padding: 4rpx 8rpx;
    border-radius: 6rpx;
    background-color: #da3026;
`
const TagYjs = styled.div`
    color: #fff;
    background-color: #6190e8;
    padding: 4rpx 8rpx;
    border-radius: 6rpx;
    background-color: #50a14f;
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
    margin-top: 10rpx;
`

const CardSty = css`
    height: 320rpx;
    display: flex;
    flex-direction: column;
`
const CardStyH = css`
    height: 220rpx;
    display: flex;
    flex-direction: column;
`

const Icon = styled.div`
    width: 30rpx;
    height: 30rpx;
    background-size: 100% 100%;
    background-image: url(https://i.loli.net/2020/04/25/it37Vgczw62E8lL.png);
`
const ButtonBox = styled.div`
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

    const handleStartStage = () => {
        console.log('click start')
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
            {data.stageListByBatchId.map((v, indx) => (
                <Card key={v.id} className={v.status == 0 ? CardSty : CardStyH}>
                    <Items>
                        <ItemDown onClick={() => handleClick(v.id)}>
                            <FiledsBox>
                                <Lable>
                                    开始时间：
                                    {v.startTime == -1
                                        ? ''
                                        : dayjs
                                              .unix(v.startTime)
                                              .format('YYYY-MM-DD HH:mm')}
                                </Lable>
                            </FiledsBox>
                            <FiledsBox>
                                <Icon></Icon>
                            </FiledsBox>
                        </ItemDown>
                        <Line></Line>

                        <ItemUp>
                            <FiledsBox>
                                <Lable>阶段：{v.stageName}</Lable>
                                <Lable>记录数：{v.recordCount}</Lable>
                            </FiledsBox>
                            <FiledsBox>
                                <Lable>序号：{indx + 1}</Lable>
                                <Lable>记录员：{v.recorder}</Lable>
                            </FiledsBox>
                            <FiledsBox>
                                {v.status == 0 && <TagWks>未开始</TagWks>}
                                {v.status == 1 && <TagWwc>未完成</TagWwc>}
                                {v.status == 2 && <TagYjs>已结束</TagYjs>}
                            </FiledsBox>
                        </ItemUp>
                    </Items>

                    <ButtonBox>
                        {v.status == 0 && (
                            <Button onClick={handleStartStage}>开始阶段</Button>
                        )}
                    </ButtonBox>
                </Card>
            ))}
        </Wrap>
    )
}

export default Batch
