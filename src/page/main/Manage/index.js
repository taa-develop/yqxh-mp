import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

const Wrap = styled.div`
    background-color: #eee;
    flex: 1;
`
const Item = styled.div`
    padding: 32rpx;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Stage = styled.div`
    background-color: #fff;
    border-bottom: 1rpx solid #eee;
    height: 100rpx;
    padding-left: 60rpx;
    padding-right: 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Window = styled.div`
    transition: height 0.1s linear;
    overflow: hidden;
    height: 0;
`
const showWindow = css`
    height: 300rpx;
`
const showTopBorder = css`
    border-top: 1px solid #ccc;
`
const noBorder = css`
    border-bottom: none;
`
const Icon = styled.div`
    height: 30rpx;
    width: 30rpx;
    background-image: url(https://i.loli.net/2020/04/25/it37Vgczw62E8lL.png);
    background-size: contain;
    transition: all 0.1s linear;
`
const ItemText = styled.div``
const rotate = css`
    transform: rotate(90deg);
`

function Manage() {
    const [showStage, setShowStage] = useState(false)
    const [showIndicator, setShowIndicator] = useState(false)
    const handleClick = () => {
        setShowStage(!showStage)
    }
    const handleClickIndicator = () => {
        setShowIndicator(!showIndicator)
    }
    const handleJumpStage = type => {
        window.open(`/stage-manage/${type}`)
    }
    const handleJumpIndicator = type => {
        window.open(`/indicator-manage/${type}`)
    }
    const handleClickJumpUserPower = () => {
        window.open('/user-power-manage')
    }
    return (
        <Wrap>
            <Item onClick={handleClick}>
                <ItemText>阶段管理</ItemText>
                <Icon className={showStage && rotate}></Icon>
            </Item>
            <Window className={showStage && showWindow}>
                <Stage onClick={() => handleJumpStage(0)}>
                    <ItemText>一次隧道</ItemText>
                    <Icon></Icon>
                </Stage>
                <Stage onClick={() => handleJumpStage(1)}>
                    <ItemText>二次隧道</ItemText>
                    <Icon></Icon>
                </Stage>
                <Stage className={noBorder} onClick={() => handleJumpStage(2)}>
                    <ItemText>菇房</ItemText>
                    <Icon></Icon>
                </Stage>
            </Window>
            <Item
                onClick={handleClickIndicator}
                className={showStage && showTopBorder}
            >
                <ItemText>指标管理</ItemText>
                <Icon className={showIndicator && rotate}></Icon>
            </Item>
            <Window className={showIndicator && showWindow}>
                <Stage onClick={() => handleJumpIndicator(0)}>
                    <ItemText>一次隧道</ItemText>
                    <Icon></Icon>
                </Stage>
                <Stage onClick={() => handleJumpIndicator(1)}>
                    <ItemText>二次隧道</ItemText>
                    <Icon></Icon>
                </Stage>
                <Stage
                    className={noBorder}
                    onClick={() => handleJumpIndicator(2)}
                >
                    <ItemText>菇房</ItemText>
                    <Icon></Icon>
                </Stage>
            </Window>
            <Item
                className={showIndicator && showTopBorder}
                onClick={handleClickJumpUserPower}
            >
                <ItemText>人员权限管理</ItemText>
                <Icon></Icon>
            </Item>
        </Wrap>
    )
}

export default Manage
