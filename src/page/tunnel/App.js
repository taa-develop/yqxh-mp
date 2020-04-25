import React, { useEffect, useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Card from '../../components/Card'
import Button from '../../components/Button'
import dayjs from 'dayjs'
import Rarrow from '../../assets/rArrow.png'
const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #eee;
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
`

const CardSty = css`
    height: 200rpx;
`
const Icon = styled.div`
    width: 30rpx;
    height: 30rpx;
    background-size: 100% 100%;
    background-image: url(https://i.loli.net/2020/04/25/it37Vgczw62E8lL.png);
`

const BATCH_LIST = gql`
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
            <Header>
                <Button>添加批次</Button>
            </Header>
            <Content>
                {data.batchList.map(v => (
                    <Card key={v.id} className={CardSty}>
                        <Items>
                            <ItemUp>
                                <FiledsBox>
                                    <Lable>批次：{v.number}</Lable>
                                    <Lable>仓号：{v.silo && v.silo.name}</Lable>
                                </FiledsBox>
                                <FiledsBox>
                                    <Lable>记录：{v.recordCount}</Lable>
                                    <Lable>记录员：{v.recorder}</Lable>
                                </FiledsBox>
                                <FiledsBox>
                                    {v.status == 0 && <TagWks>未开始</TagWks>}
                                    {v.status == 1 && <TagWwc>未完成</TagWwc>}
                                    {v.status == 2 && <TagYjs>已结束</TagYjs>}
                                </FiledsBox>
                            </ItemUp>
                            <Line></Line>
                            <ItemDown>
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
                        </Items>
                    </Card>
                ))}
            </Content>
        </Wrap>
    )
}

export default Tunnel
