import './Lmap.css';
import {GoogleMap, withGoogleMap, withScriptjs,Marker,InfoWindow} from 'react-google-maps'
import { useState,useEffect } from 'react';
import firebase from './firebase'
import {useList} from 'react-firebase-hooks/database'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useStateValue } from './StateProvider.js';

function Map()
{
  const [map,setMap]=useState(null);
  const list=[];
  const [loc,setLoc]=useState([]);

  

  // Create Section
  const [todoRefee,loading,error]=useList(firebase.database().ref("Products"));
  
  // const todo={
  //   lat:27.5204,
  //   lng:17.8567
  // }
  // todoRef.push(todo);
  useEffect(() => {
   
    const todoRefe=firebase.database().ref("Products");
    
  
    todoRefe.on("value",(snapshot)=>{
      
      const data=snapshot.val();
      // console.log(data)
      if(data)
      {
        // console.log(data)
        for(let item in data)
        {
          
          if(data[item].Swipe===true)
          {
            // console.log(data[item].Location)
            for(let i in data[item].Location)
            {
              // console.log(data[item].Location[i])
              list.push(data[item].Location[i])
            }
              // list.push(data[item].Location)
          // console.log(data[item].Location)
            // console.log(list)
          }
          else if(data[item].Swipe==false)
          {
            firebase.database().ref(`Products/${data[item].ID}/Location`).remove();
          }
  
        }
      }
      
      // console.log(list)
      setLoc(list)
    
    })  
    
  }, [todoRefee])

  
console.log(loc)
  return<>
  {
      loc && loc.map((location)=>
    
        <GoogleMap defaultZoom={17} defaultCenter={{lat:location.lat,lng:location.lng}}
        // defaultOptions={{style:mapStyles}}
      >

    <Marker 
      className="markar"
        key={location.lat}
         position={{lat:location.lat,lng:location.lng}} 
         onClick={()=>{setMap({lat:location.lat,lng:location.lng})}}
         icon={{url:location.lat==="18.575916"?<LocationOnIcon/>:("https://static.thenounproject.com/png/429169-200.png"),scaledSize:new window.google.maps.Size(40,40)}}/>))
   
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
        
    
    
    )

  }
  
  </>
}

const WrapperMap=withScriptjs(withGoogleMap(Map));

function App() {
  const [{ID}]=useStateValue();

  return (
  
    <div className="lmap">
      {
        ID?(
          <WrapperMap 
       googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBmb0phsn1htYpa8-QBOA88796ZzabohTU`}
       loadingElement={<div style={{ height: "100%" }}/>}
       containerElement={<div style={{ height: `100%` }} />}
       mapElement={<div style={{ height: `100%` }} />}
       />
        ):(
          <div className="data">
            Select the product to view the location
          </div>
        )
      }
      
    </div>
  );
}

export default App;


