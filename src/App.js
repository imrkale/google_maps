import './App.css';
import {GoogleMap, withGoogleMap, withScriptjs,Marker,InfoWindow} from 'react-google-maps'
import { useState,useEffect } from 'react';
import firebase from './firebase'
import mapStyles from './mapStyles'

function Map()
{
  const [map,setMap]=useState(null);
  const [data,setData]=useState("");

  // Create Section
  // const todoRef=firebase.database().ref("Products").child("Product1").child("Location");
  // const todo={
  //   lat:18.5204,
  //   lng:73.8567
  // }
  // todoRef.push(todo);
  
    const todoRefe=firebase.database().ref("Products").child("Product1").child("Location");
    console.log("HIIII")
    todoRefe.on("value",(snapshot)=>{
      setData(snapshot.val());
      console.log(data);
    })  


 

  return <GoogleMap defaultZoom={10} defaultCenter={{lat:18.5204,lng:73.8567}}
    defaultOptions={{style:mapStyles}}
  >
   {
     data.map((data)=>(
      <Marker
      key={123}
       position={{lat:data.lat,lng:data.lng}} 
       onClick={()=>{setMap({lat:18.5204,lng:73.8567})}}
       icon={{url:"https://static.thenounproject.com/png/429169-200.png",scaledSize:new window.google.maps.Size(45,45)}}/>
     ))
   }
   
  
    {map && (
      <InfoWindow 
      position={{lat:map.lat,lng:map.lng}}
      onCloseClick={()=>{
        setMap(null)
      }}>
        <div>{map.lat}</div>
      </InfoWindow>
    )}
  </GoogleMap>

}

const WrapperMap=withScriptjs(withGoogleMap(Map));

function App() {
  
  return (
    <div className="app">
      <WrapperMap 
       googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
       loadingElement={<div style={{ height: "100%" }}/>}
       containerElement={<div style={{ height: `100%` }} />}
       mapElement={<div style={{ height: `100%` }} />}
       />
    </div>
  );
}

export default App;
