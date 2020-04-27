import React, { useEffect } from 'react'
import { styled } from 'linaria/react'
import { useQuery } from 'graphql-hooks'
import Card from '../../../components/Card'
import Button from '../../../components/Button'
const Wrap = styled.div`
    flex: 1;
`
const Header = styled.div``

const MUSHROOM_LIST = `
    query {
        mushroomHouseList {
            id
            name
        }
    }
`

function RoomList() {
    window.addEventListener('wxshow', () => {
        refetch()
    })
    useEffect(() => {
        wx.setNavigationBarTitle({
            title: '菇房列表'
        })
    }, [])

    const { loading, error, data, refetch } = useQuery(MUSHROOM_LIST)

    if (loading) return <div>loading</div>
    console.log(data)

    const handleCLickRoom = id => {
        window.open(`/room/${id}`)
    }
    const handleAdd = () => {
        window.open(`/roomAdd`)
    }
    return (
        <Wrap>
            <Header>
                <Button onClick={handleAdd}>添加菇房</Button>
            </Header>
            {data &&
                data.mushroomHouseList.map(v => (
                    <Card onClick={() => handleCLickRoom(v.id)}>{v.name}</Card>
                ))}
        </Wrap>
    )
}

export default RoomList
