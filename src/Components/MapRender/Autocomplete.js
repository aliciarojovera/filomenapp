import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import React from 'react'
import {TextField, InputAdornment} from '@material-ui/core'
import MapIcon from '@material-ui/icons/Map';
import './Autocomplete.css'

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
                className="AutoComplete"
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        {/* <TextField className="form-control" {...getInputProps("Escribe la Dirección")}></TextField> */}

                    <TextField
                    multiline
                    className="AutoCompleteTextField"
                    name="alertAddress"
                    size="small"
                    fullWidth={true}
                    label="Dirección"
                    placeholder="Dirección de la alerta"
                    onChange={handler}
                    InputProps={{startAdornment: (<InputAdornment position="start"><MapIcon/></InputAdornment>), ...getInputProps("Escribe la Dirección")}}
                    />
                        <div>
                            {loading ? <div>...loading</div> : null}
                            {suggestions.map((suggestion, idx) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#ffffff",
                                    color: "blue"
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