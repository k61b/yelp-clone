import React, { useContext, useState } from 'react'
import PlaceFinder from '../apis/PlaceFinder'
import { PlacesContext } from '../context/PlacesContext'

const Add = () => {
    const { addPlaces } = useContext(PlacesContext)
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [placeType, setPlaceType] = useState("")
    const [priceRange, setPriceRange] = useState("Price Range")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await PlaceFinder.post("/", {
                name,
                location,
                place_type: placeType,
                price_range: priceRange
            })
            addPlaces(response.data.data.place)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                    <div className="col">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="name"
                        />
                    </div>
                    <div className="col">
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-control"
                            type="text"
                            placeholder="location"
                        />
                    </div>
                    <div className="col">
                        <input
                            value={placeType}
                            onChange={(e) => setPlaceType(e.target.value)}
                            className="form-control"
                            type="text"
                            placeholder="Place Type"
                        />
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
                            className="form-control custom-select my-1 mr-sm-2">
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </form>
        </div >
    )
}

export default Add
