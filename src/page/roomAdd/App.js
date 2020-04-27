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

const ROOM_ADD = `mutation AddRoom($id:Int,$name:String){
    addMushroomHouse(inputMushroomHouse: {id:$id,name:$name}){
        id
        name
    }
}
`

function RoomAdd() {
    const [num, setNum] = useState('')
    const [name, setName] = useState('')

    const [roomAdd] = useMutation(ROOM_ADD)

    useEffect(() => {
        wx.setNavigationBarTitle({ title: `添加菇房` })
    }, [])

    const handleNum = e => {
        setNum(e.target.value)
    }
    const handleName = e => {
        setName(e.target.value)
    }

    const handleRoomAdd = async () => {
        const { data, error } = await roomAdd({
            variables: {
                id: Number(num),
                name: name
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
                        placeholder='编号'
                        type='text'
                        value={num}
                        onChange={handleNum}
                    />
                </FiledsBox>
                <FiledsBox>
                    <input
                        className={inputSty}
                        placeholder='名称'
                        type='text'
                        value={name}
                        onChange={handleName}
                    />
                </FiledsBox>
                <ButtonBox>
                    <Button onClick={handleRoomAdd}>提交</Button>
                </ButtonBox>
            </Content>
        </Wrap>
    )
}

export default RoomAdd
