import React from 'react'
import { styled } from 'linaria/react'

import BaseNavLink from '../../../components/BaseNavLink'

const Wrap = styled.div`
    height: 100rpx;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #ccc;
`
const StyledNavLink = styled(BaseNavLink)`
    color: #00a6f3;
`

function Nav() {
    return (
        <Wrap>
            <StyledNavLink to='/main' exact>
                隧道
            </StyledNavLink>
            <StyledNavLink to='/main/room'>菇房</StyledNavLink>
            <StyledNavLink to='/main/manage'>管理</StyledNavLink>
            <StyledNavLink to='/main/user'>用户</StyledNavLink>
        </Wrap>
    )
}

export default Nav
