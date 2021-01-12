import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import React from 'react'
// Tutorial https://www.youtube.com/watch?v=uJYqQdnw8LE


const Autocomplete = ({ handler, defAddress }) => {

    // Creamos este useState para poder guardar la dirección una vez escogida
    const [address, setAddress] = React.useState("")
    // const [coordinates, setCoordinates] = React.useState({lat: null, lng: null})

    const handleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setAddress(value)
        // Aquí está el handler donde vamos a pasar el resultado a su padre
        handler(latLng, value)
    }


    return (
        <>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input className="form-control" {...getInputProps({ placeholder: defAddress ? defAddress : "Escribe la Dirección" })}
                        >

                        </input>
                        <div>
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map((suggestion, idx) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#ffffff"
                                }
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}
                                        key={idx}>
                                        {suggestion.description}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

            </PlacesAutocomplete>
        </>
    )
}

export default Autocomplete