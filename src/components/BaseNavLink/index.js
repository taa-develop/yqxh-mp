import React from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from 'linaria/react'

const BaseNavLink = styled(NavLink)`
    height: 100%;
    /* background-color: red; */
    line-height: 100rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
`

function StyledNavLink({ className, children, ...props }) {
    return (
        <BaseNavLink activeClassName={className} {...props}>
            {children}
        </BaseNavLink>
    )
}

export default StyledNavLink
