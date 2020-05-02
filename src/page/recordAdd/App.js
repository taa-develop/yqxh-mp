import React, { useEffect, useState, useRef } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useMutation, useQuery } from 'graphql-hooks'
import Button from '../../components/Button'

const Wrap = styled.div`
    width: 100vw;
    height: 100vh;
`
const Header = styled.div``
const Content = styled.div``
const FiledsBox = styled.div`
    background-color: #ffffff;
    width: 100vw;
    height: 100rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 20px;
`
const Lable = styled.div``
const inputSty = css`
    height: 44px;
    line-height: 44px;
    color: rgb(0, 0, 0);
    font-size: 20px;
    .input-placeholder {
        color: gray;
    }
`
const ButtonBox = styled.div``

const RECORD_ADD = `mutation AddTunnelBatch($batchId: Int,$stageId: Int,$environment: Environment!,$picture: String,$remark: String,$indicatorData: [InputIndicatorData]) {
    addRecord(inputRecord:{batchId: $batchId,stageId: $stageId,environment: $environment,picture: $picture,remark: $remark,indicatorData:$indicatorData}) {
    id
    environment
    recorderId
    recorder
    batchId
    stageId
    picture
    remark
  }
}`

const ZHIBIAO_LIST = `
{
    indicatorsList(pageQuery:{
      pageNum:1,
      pageSize:10,
    },
      indicatorQuery:{
        environment:ONCE_TUNNEL
      }
    ){
      name,
      id,
      unit
    }
  } 
`

function RecordAdd() {
    const [lw, setLw] = useState('')
    const [bz, setBz] = useState('')
    const [sj, setSj] = useState([])

    const [recordAdd] = useMutation(RECORD_ADD)

    const { loading, error, data, refetch } = useQuery(ZHIBIAO_LIST, {
        variables: {
            pageQuery: {
                pageNum: 1,
                pageSize: 1000
            },
            indicatorQuery: {
                environment: window.$$global.environment
            }
        }
    })

    useEffect(() => {
        wx.setNavigationBarTitle({ title: `添加记录` })
    }, [])

    const handleValueLw = e => {
        setLw(e.target.value)
        setSj([
            {
                key: 1,
                value: e.target.value
            }
        ])
    }
    const handleValueBz = e => {
        setBz(e.target.value)
    }

    const handleRecordAdd = async () => {
        const { data, error } = await recordAdd({
            variables: {
                batchId: Number(window.$$global.batchId),
                stageId: Number(window.$$global.stageId),
                remark: bz,
                indicatorData: sj.map(v => ({
                    key: v.key,
                    value: v.value
                })),
                environment: window.$$global.environment
            }
        })
        if (error) {
            console.log(error)
        } else if (data) {
            wx.showToast({
                title: '添加成功',
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

    return (
        <Wrap>
            <Content>
                <FiledsBox>
                    <input
                        className={inputSty}
                        placeholder='备注'
                        type='text'
                        value={bz}
                        onChange={handleValueBz}
                    />
                </FiledsBox>
                <FiledsBox>
                    <input
                        className={inputSty}
                        placeholder='料温'
                        type='text'
                        value={lw}
                        onChange={handleValueLw}
                    />
                </FiledsBox>
                <ButtonBox>
                    <Button onClick={handleRecordAdd}>提交</Button>
                </ButtonBox>
            </Content>
        </Wrap>
    )
}

export default RecordAdd
