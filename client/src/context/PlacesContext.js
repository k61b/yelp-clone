import React, { useState, createContext } from 'react'

export const PlacesContext = createContext()

export const PlacesContextProvider = (props) => {
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)

  const addPlaces = (place) => {
    setPlaces([...places, place])
  }
  return (
    <PlacesContext.Provider
      value={{
        places,
        setPlaces,
        addPlaces,
        selectedPlace,
        setSelectedPlace
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  )
}