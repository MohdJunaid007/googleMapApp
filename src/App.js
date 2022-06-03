import Img from './image/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

import React from 'react'
import { useState, useRef } from 'react';


import './App.css';



//import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
const containerStyle = {
  width: '400px',
  height: '400px',

};

const center = {
  lat: 26.857199472166624,
  lng: 80.97820608709493
};

function App() {

  const [map, setMap] = React.useState(null)
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef();
  const destinationRef = useRef();


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ',
    libraries: ['places']
  })

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    //eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      //eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])






  return (
    <>
      <nav className="navbar navbar-light " style={{ "background": "white" }}>
        <a className="navbar-brand" href="#" style={{ "background": "white" }}>
          <img src={Img} style={{ "paddingLeft": "67px", "paddingTop": "6px" }} alt="" />
        </a>
      </nav>
      <div className='forbg' style={{ "background": "#F4F8FA" }}>
        <div className='text-center css2'>
          Let's calculate <b>distance</b> from google map
        </div>


        <div className="container">
          <div className="row">
            <div className="col">
              <div className='row'>
                <div className='col'>
                  <form>
                    <div className="form-group" style={{ "padding": "23px" }}>
                      <small id="emailHelp1" class="form-text ">origin</small>
                      {/* <Autocomplete> */}
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={originRef} />
                      {/* </Autocomplete> */}
                    </div>
                    <div className="form-group" style={{ "padding": "23px" }}>
                      <small id="emailHelp2" class="form-text ">destination</small>
                      {/* <Autocomplete> */}
                      <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={destinationRef} />
                      {/* </Autocomplete> */}
                    </div>
                  </form>
                </div>
                <div className='col' >
                  <div className='row'></div>
                  <br />
                  <br />
                  <br />
                  <br />
                  <button type="button" className="btn btn-primary buttonStyle" style={{ "background": "#1B31A8", "borderRadius": "30%", "padding": "10px", "margin": "0px", "display": "flex", "justifyContent": "center", "alignItems": "center", "margin": "auto" }} onClick={calculateRoute}> Calculate </button>


                  <div className='row'></div>
                </div>

              </div>
              <form>
                <div className="form-group" style={{ "padding": "10px" }}>
                  <div className='container'>
                    <div class="row" style={{ "fontSize": "24px", "padding": "15px", "background": "white" }}>
                      <div class="col" style={{ "color": "#1E2A32", "fontSize": "18px" }}>
                        Distance
                      </div>
                      <div class="col" style={{ "textAlign": "right", "color": "#0079FF", "font-family": "Rubik" }}>
                        {distance}
                      </div>
                    </div>
                    <div className='descDisc'>The distance between <b>{originRef.current.value}</b>  and <b>{destinationRef.current.value}</b> is <b>{distance}</b> and time is <b>{duration}</b></div>
                  </div>

                  {/* <small id="emailHelp" class="form-text text-muted">Distance</small>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={distance} style={{ "textAlign": "right" }} />
                  <div className='descDisc'>The distance between <b>{originRef.current.value}</b>  and <b>{destinationRef.current.value}</b> is <b>{distance}</b> and time is <b>{duration}</b></div> */}
                </div>
              </form>
            </div>
            <div className="col" style={{ "paddingLeft": "50px" }}>
              <div>


                <GoogleMap
                  className='mapCss'
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}

                >
                  <Marker position={center} />
                  {directionResponse && <DirectionsRenderer
                    directions={directionResponse}
                  />}
                  <></>
                </GoogleMap>

                <></>



              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default App;
////







//export default React.memo(App)