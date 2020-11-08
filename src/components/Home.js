import React from 'react';
import {
    useLocation,
    useHistory,
    // Switch,
    // Route,
    // BrowserRouter as Router
} from "react-router-dom";
import MainPage from './MainPage';
import DetailedContent from './DetailedContent'

// MDB React
import { MDBContainer
 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import TopNav from './TopNav'

export default function Home(){
    const location = useLocation();
    const history = useHistory();
    console.log("home state")
    console.log(location.state);

    if(location.state === undefined || location.state === null){
        console.log("Home state not found")
        history.replace("/");
      }

    return(
        <div>
            <TopNav userDetails = {location.state !== null && location.state !== undefined ? location.state : null}/>
            <MDBContainer style={Styling.container} className="text-center mt-5 pt-5">
                <MainPage userDetails = {location.state !== null && location.state !== undefined ? location.state : null}/>
            </MDBContainer>
        </div>
        );
}
  
const Styling = {
    container: {
        height: "100vh",
    }
};

