import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PlaceFinder from '../apis/PlaceFinder'

const Update = (props) => {

    const { id } = useParams()
    let history = useHistory()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [placeType, setPlaceType] = useState("")
    const [priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await PlaceFinder.get(`/${id}`)

            setName(response.data.data.place.name)
            setLocation(response.data.data.place.location)
            setPlaceType(response.data.data.place.place_type)
            setPriceRange(response.data.data.place.price_range)
        }
        fetchData()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await PlaceFinder.put(`/${id}`, {
            name,
            location,
            place_type: placeType,
            price_range: priceRange
        })
        history.push("/")
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Place Type</label>
                    <input value={placeType} onChange={e => setLocation(e.target.value)} id="place_type" className="form-control" type="text" />
                </div>
                <div className="col">
                    <label htmlFor="price_range">Price Range</label>
                    <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
                        id="price_range" className="form-control custom-select my-1 mr-sm-2">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="mt-2">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
                </div>

            </form>
        </div>
    )
}

export default Update
