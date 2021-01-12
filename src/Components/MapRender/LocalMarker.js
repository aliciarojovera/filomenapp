import './LocalMarker.css'
import React from 'react'


const LocalMarker = ({ text, handleClick }) => {

    const [hovered, setHovered] = React.useState("")

    return (
        <>
            <div><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png'
                alt={text}
                className="localMarkerPic"
                // onClick={handleClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}

            />
                <div className="localMarkerTitle">{text}</div>
            </div>

        </>
    )
}

export default LocalMarker