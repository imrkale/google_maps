import React from 'react'
import './Sidebar.css'
import TwitterIcon from "@material-ui/icons/Twitter";
import {useHistory,Link} from 'react-router-dom'
import p1 from './p1.PNG'
import Lmap from './Lmap'
import { useStateValue } from './StateProvider.js';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import p2 from './p2.PNG'

function Sidebar() {
   const history=useHistory();
   const [{ID},dispatch]=useStateValue();

   const IDD="603312324"
   
   const handleMap=()=>{
    
    dispatch({
        type: "ADD_ID",
        item: IDD
    });

}
console.log(ID)
   
    return (
        <div className="sideBar">
           <LocationOnIcon/>
            <div className='card' onClick={()=>handleMap()}>
                <img src={p1} alt="" />
                <div className="card__info">
                    <h2>I Phone 12</h2>
                    <button>View On Map</button>
                </div>
            </div>
            <div className='card'>
                <img src={p2} alt="" />
                <div className="card__info">
                    <h2>I Phone 12</h2>
                    <button>View On Map</button>
                </div>
            </div>


        
        </div>
    )
}

export default Sidebar
