import React from 'react'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const CompMap = ({ center, zoom, data = {}, mapLocations }) => {

    const pin = "/marker.png"

    const googleAPIKey = "";

    const markerStyle = {
        position: "absolute",
        top: "100%",
        left: "100%",
        transform: "translate(-50%, -100%)"
    };
    return (
        <>
            <div className='container lg:mt-32 md:mt-32 mt-0 mb-32 mx-auto xl:pb-0 lg:px-5 md:px-5 px-5 ' style={{ height: '100vh', width: '100%' }}>
                {data.title ? <p className="font-bold futura-bold lg:text-5xl text-3xl text-white mb-10">{data.title}</p> : null}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleAPIKey }}
                    yesIWantToUseGoogleMapApiInternals={true}
                    defaultZoom={zoom}
                    defaultCenter={center}
                >
                    {mapLocations.map(item => {
                        return (
                            <div lat={item.location[0]} lng={item.location[1]}>
                          
                                <img style={markerStyle} className="w-7" src={pin} alt="pin" />
                                <div className=''>
                                <p className='text-white'> {item.name}</p>
                            <p className='text-white'>{item.country}</p>
                            </div>
                            </div>
                        );
                    })}
                </GoogleMapReact>
            </div>
        </>
    )
}
export default CompMap;