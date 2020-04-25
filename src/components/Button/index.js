import React from 'react'
import { styled } from 'linaria/react'

const Container = styled.div`
    height: 80rpx;
    border-radius: 10rpx;
    background-color: #6190e8;
    margin: 20rpx 30rpx;
    color: #fff;
    padding: 0 20rpx;
    font-weight: bold;
    font-size: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Button = ({ className, children, ...props }) => {
    return (
        <Container className={{ className }} {...props}>
            {children}
        </Container>
    )
}

export default Button
