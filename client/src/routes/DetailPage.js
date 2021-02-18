import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { PlacesContext } from '../context/PlacesContext'
import PlaceFinder from '../apis/PlaceFinder'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'

const DetailPage = () => {
    const { id } = useParams()
    const { selectedPlace, setSelectedPlace } = useContext(PlacesContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await PlaceFinder.get(`/${id}`)
                setSelectedPlace(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [setSelectedPlace, id])
    return (
        <div>
            {selectedPlace && (
                <>
                    <h1 className="text-center display-1">
                        {selectedPlace.place.name}
                    </h1>
                    <div className="text-center">
                        <StarRating rating={selectedPlace.place.average_rating} />
                        <span className="text-warning ml-1">
                            {selectedPlace.place.count
                                ? `(${selectedPlace.place.count})`
                                : "(0)"}
                        </span>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedPlace.reviews} />
                    </div>
                    <AddReview />
                </>
            )}
        </div>
    )
}

export default DetailPage
