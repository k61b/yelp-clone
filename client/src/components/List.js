import React, { useContext, useEffect } from 'react'
import PlaceFinder from '../apis/PlaceFinder'
import { PlacesContext } from '../context/PlacesContext'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'

const List = (props) => {

    const { places, setPlaces } = useContext(PlacesContext)

    let history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PlaceFinder.get('/')
                setPlaces(response.data.data.place)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()

    }, [setPlaces])

    const handleDelete = async (i, id) => {
        i.stopPropagation()
        try {
            await PlaceFinder.delete(`/${id}`)
            setPlaces(places.filter(elem => {
                return elem.id !== id
            }))
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (i, id) => {
        i.stopPropagation()
        history.push(`/places/${id}/update`)
    }

    const handleSelect = async (id) => {
        history.push(`/places/${id}`)
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
                        <th scope="col">Place</th>
                        <th scope="col">Location</th>
                        <th scope="col">Place Type</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {places && places.map(e => {
                        return (
                            <tr onClick={() => handleSelect(e.id)} key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.location}</td>
                                <td>{e.place_type}</td>
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
