import { createFollowedCoin, getFollowedCoins, deleteCoin } from "../api/coindb"
import { useState, useEffect, React } from "react"
import { Link } from 'react-router-dom'


function Dashboard(props) {
    const { user } = props
    console.log(user);
    const [savedCoins, setSavedCoins] = useState([])

    // This useEffect and Function is to GET all the saved Coins from the Database
    useEffect(() => {
        getFollowedCoins(user)
            .then(res => {
                res = Object.values(res.data.coins)
                setSavedCoins(res)
                console.log('Object.values output', res)
            })
    }, [])

    // This Function is to POST coins to the saved collection in the database
    const addCoin = (info) => {
        createFollowedCoin(info, user)
            .then(res => {
                console.log("This is response: ", res)

            })
    }

    // This Function is to DELETE coins from the saved collection in the database
    const removeCoin = (s) => {
        deleteCoin(s._id)
            .then(res => {
                console.log('This is the coin to be deleted: ', res)
            })
    }

    const allCoins = props.coins.map((c, i) => {
        return (
            <li key={i}>
                <div>
                    <Link to={`${c.id}`}> {c.id}</Link>
                    <br />
                    ${Number(c.priceUsd).toFixed(2)}
                    <br />
                    <button onClick={() => addCoin(c)}>Add to Favorites</button>
                </div>
            </li>
        )
    })


    const followedCoins = savedCoins.map((s, i) => {
        return (
            <li key={i}>
                <div>
                    {s.name}
                </div>
                <button onClick={() => removeCoin(s)}>Remove Coin</button>
            </li>
        )
    })

    return (


        <>
            <div className="dashboard">
                <h2>This is your dashboard</h2>
                <h4>Followed Coins: </h4>
                <ul>
                    {followedCoins}
                </ul>
                <h4>Current Info on coins: </h4>
                <ul>
                    {allCoins}
                </ul>
            </div>
        </>
    )
}

export default Dashboard
