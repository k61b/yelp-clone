import React, { useContext, useEffect } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'

const List = (props) => {

    const { restaurants, setRestaurants } = useContext(RestaurantsContext)

    let history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get('/')
                setRestaurants(response.data.data.restaurant)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()

    }, [setRestaurants])

    const handleDelete = async (i, id) => {
        i.stopPropagation()
        try {
            await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(elem => {
                return elem.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (i, id) => {
        i.stopPropagation()
        history.push(`/restaurants/${id}/update`)
    }

    const handleSelect = async (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = (e) => {
        if (!e.count) {
            return <span className="text-warning">0 reviews</span>
        }
        return (
            <>
                <StarRating rating={e.id} />
                <span className="text-warning ml-1">({e.count})</span>
            </>
        )
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr>
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(e => {
                        return (
                            <tr onClick={() => handleSelect(e.id)} key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.location}</td>
                                <td>{"$".repeat(e.price_range)}</td>
                                <td>{renderRating(e)}</td>
                                <td>
                                    <button onClick={(i) => handleUpdate(i, e.id)} className="btn btn-warning">Update</button>
                                </td>
                                <td>
                                    <button onClick={(i) => handleDelete(i, e.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default List
