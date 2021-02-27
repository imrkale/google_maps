import './App.css';
import {GoogleMap, withGoogleMap, withScriptjs,Marker,InfoWindow} from 'react-google-maps'
import { useState,useEffect } from 'react';
import firebase from './firebase'
import mapStyles from './mapStyles'

function Map()
{
  const [map,setMap]=useState(null);
  const [loc,setLoc]=useState();
  
  // Create Section
  // const todoRef=firebase.database().ref("Products").child("Product1").child("Location");
  // const todo={
  //   lat:18.5204,
  //   lng:73.8567
  // }
  // todoRef.push(todo);
  useEffect(() => {
    const todoRefe=firebase.database().ref("Products").child("Product1").child("Location");
    console.log("HIIII")
    todoRefe.on("value",(snapshot)=>{
      
      const data=snapshot.val();
      const LocList=[];
      for(let id in data)
      {
        LocList.push(data[id]);
      }
      console.log(LocList);
      setLoc(LocList);

    })  
    
  }, [])
  
  
 

  return<>
  {loc && loc.map((location)=>(
     <GoogleMap defaultZoom={10} defaultCenter={{lat:location.lat,lng:location.lng}}
     defaultOptions={{style:mapStyles}}
   >
  
 <Marker
     key={location.lat}
      position={{lat:location.lat,lng:location.lng}} 
      onClick={()=>{setMap({lat:location.lat,lng:location.lng})}}
      icon={{url:"https://static.thenounproject.com/png/429169-200.png",scaledSize:new window.google.maps.Size(40,40)}}/>))

     
    
    
   
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
 
  ))}
  </>
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
