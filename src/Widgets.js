import React,{useState,useEffect} from 'react'
import './Widgets.css'
import SearchIcon from "@material-ui/icons/Search";
import firebase from './firebase'
import {useList} from 'react-firebase-hooks/database'
function Widgets() {
    const [Carbon,loading,error]=useList(firebase.database().ref("CarbonE"));
    const [value,setValue]=useState();
    useEffect(() => {
        const todoRefe=firebase.database().ref("CarbonE");
    
  
        todoRefe.on("value",(snapshot)=>{
          
          setValue(snapshot.val())
        });
    }, [Carbon])
    return (
        <div className="widgets">
            <div className="widgets__input">
                <SearchIcon className="widgets__searchIcon" />
                <input placeholder="Search Products" type="text" />
            </div>
            <div className="widgets__widgetContainer">
                <h2>Carbon Emission</h2>
                <h1>{value} gm</h1>
                </div>
        </div>
    )
}

export default Widgets
