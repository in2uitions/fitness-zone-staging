import React from 'react'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function CompMap({data={}, key , h='100vh'}) {
    return (
        <>
            <div className='container lg:mt-32 md:mt-32 mt-0 mb-32 mx-auto xl:pb-0 lg:px-5 md:px-5 px-5 ' style={{ height: h, width: '100%' }}>
            {data.title? <p className="font-bold futura-bold lg:text-5xl text-3xl text-white mb-10">{data.title}</p>:null}
                <GoogleMapReact
                    bootstrapURLKeys={{ key: key }}
                    defaultCenter={{
                        lat: 59.95,
                        lng: 30.33
                    }}
                    defaultZoom={11}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="Location"
                    />
                </GoogleMapReact>
            </div>
        </>
    )
}