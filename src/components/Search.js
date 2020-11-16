import React from 'react';
import {
    useLocation,
    useHistory
} from "react-router-dom";

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import { MDBCol, MDBIcon } from "mdbreact";

import TopNav from './TopNav';
import Footer from './Footer';


export default function Search(){
    console.log("Search code executed");
    const location = useLocation();
    const history = useHistory();
    const [searchText, setSearchText] = React.useState(null);

    if(location.state === undefined || location.state === null){
        console.log("Home state not found")
        history.replace("/");
      }

    const onChange = (event) => {
        setSearchText(event.target.value);
    }

    const executeSearch = (e, v) => {
        window.alert(searchText);
        e.preventDefault();
    }

    return(
        <div>
            <TopNav userDetails = {location.state !== null && location.state !== undefined ? location.state : null}/>
            <div style = {Styling.searchBar}>
                {/* <h1>Hola!</h1> */}
                {/* <SearchField
                    placeholder="Search..."
                    onChange={onChange}
                    onEnter = {executeSearch}
                    classNames="test-class"
                    style = {Styling.searchBar}
                /> */}
                <MDBCol md="6">
                <form className="form-inline mt-4 mb-4" onSubmit={executeSearch}>
                    <MDBIcon icon="search" />
                    <input  className="form-control form-control-sm ml-3 w-75" 
                            type="text" 
                            placeholder="Search" 
                            aria-label="Search"
                            onChange = {onChange}
                            onEnter = {executeSearch}
                             />
                </form>
                </MDBCol>
            </div>
            <Footer />
        </div>
        );
}
  
const Styling = {
    container: {
        height: "100vh",
    },
    searchBar: {
        marginLeft: "35vw",
        marginTop: "8vw",
    }
};

