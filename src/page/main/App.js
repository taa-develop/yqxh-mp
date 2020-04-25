import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { styled } from 'linaria/react'

import Login from './Login'
import Nav from './Nav'
import TunnelList from './TunnelList'
import RoomList from './RoomList'
import Manage from './Manage'
import User from './User'

const Wrap = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: #eee;
`

const GET_LOAIN_STATUS = gql`
    {
        loggedIn @client
    }
`

function App() {
    const { data } = useQuery(GET_LOAIN_STATUS)
    if (!data.loggedIn) {
        return <Login></Login>
    }
    return (
        <Router>
            <Wrap>
                <Switch>
                    <Route path='/main/room'>
                        <RoomList />
                    </Route>
                    <Route path='/main/manage'>
                        <Manage />
                    </Route>
                    <Route path='/main/user'>
                        <User />
                    </Route>
                    <Route path='/main'>
                        <TunnelList />
                    </Route>
                </Switch>
                <Nav></Nav>
            </Wrap>
        </Router>
    )
}

export default App
