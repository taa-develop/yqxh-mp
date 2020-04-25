import React from 'react'
import { styled } from 'linaria/react'

const Container = styled.div`
    height: 140rpx;
    border-radius: 10rpx;
    background-color: white;
    margin: 20rpx 30rpx;
    color: #000;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
    padding: 0 20rpx;
    font-weight: bold;
    font-size: 24rpx;
    display: flex;
    align-items: center;
`

const Card = ({ className, children, ...props }) => {
    return (
        <Container className={{ className }} {...props}>
            {children}
        </Container>
    )
}

export default Card
