import React, { useEffect, useState, useRef } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useMutation } from 'graphql-hooks'
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

const lcData = ['一号料仓', '二号料仓', '三号料仓', '四号料仓', '五号料仓']

const BATCH_ADD = `mutation AddBatch($environment: Environment!,$number: Int,$siloId: Int) {
    addBatch(inputBatch:{environment:$environment,number:$number,siloId:$siloId}) {
      id
      environment
      stage{
        stageName
        recorder
        recordCount
        status
      }
    }
  }`

function BatchAdd() {
    const WxPicker = useRef()

    const [lcValue, setLcValue] = useState(0)
    const [pcNum, setPcNum] = useState('')

    const [batchAdd] = useMutation(BATCH_ADD)

    useEffect(() => {
        wx.setNavigationBarTitle({ title: `添加批次` })
        WxPicker.current.addEventListener('change', onPickerChange)
    }, [])

    const handleValue = e => {
        setPcNum(e.target.value)
    }
    const onPickerChange = evt => {
        setLcValue(evt.detail.value)
    }
    const handleBatchAdd = async () => {
        const { data, error } = await batchAdd({
            variables: {
                environment: window.location.pathname.split('/')[2],
                number: pcNum,
                siloId: lcValue + 1
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
                        placeholder='批次编号'
                        type='number'
                        value={pcNum}
                        onChange={handleValue}
                    />
                </FiledsBox>
                <FiledsBox>
                    <wx-picker
                        ref={WxPicker}
                        mode='selector'
                        range={lcData}
                        value={lcValue}
                    >
                        <span>{lcData[lcValue]}</span>
                    </wx-picker>
                </FiledsBox>
                <ButtonBox>
                    <Button onClick={handleBatchAdd}>提交</Button>
                </ButtonBox>
            </Content>
        </Wrap>
    )
}

export default BatchAdd
