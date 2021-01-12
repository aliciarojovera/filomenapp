import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocalMarker from './LocalMarker'

class MapRender extends Component {
    constructor() {
        super()
        this.state = {
            center: {
                lat: 40.42380022443293,
                lng: -3.7113449216902583
            },
            zoom: 13,
            height:"600px"
        }
    }

    componentDidMount=()=>{
    
        if (this.props.local) {
            this.setState({center: { lat: this.props.local.location.coordinates[0], lng: this.props.local.location.coordinates[1]}, zoom:17, height: "600px"})
        }
 }

    render() {


        return (

            <div style={{ height: this.state.height, width: '100%' }}>
                <GoogleMapReact
                    center={this.state.center}
                    zoom={this.state.zoom}
                >
                    {this.props.locals ?
                        this.props.locals.map((elm, idx) => <LocalMarker
                            lat={elm.location.coordinates[0]}
                            lng={elm.location.coordinates[1]}
                            text={elm.name}
                            key={idx}
                            handleClick={() => this.handleClick(elm)}
                        />)
                        :
                        null}
                    

                    {this.props.local ? 
                    
                        <LocalMarker
                            lat={this.props.local.location.coordinates[0]}
                            lng={this.props.local.location.coordinates[1]}
                            text={this.props.local.name}
                            handleClick={() => this.handleClick(this.props.local)}
                        />
                    
                    : null
                    
                    }
                    

                </GoogleMapReact>
            </div>
        );
    }
}

export default MapRender