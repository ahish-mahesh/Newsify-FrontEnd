import React from 'react';
import {
    useHistory,
    BrowserRouter as Router
} from "react-router-dom";

// MDB React
import {  
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, 
    MDBNavbarToggler, MDBCollapse, MDBNavItem, 
    MDBNavLink, MDBIcon, MDBDropdownMenu,
    MDBDropdown, MDBDropdownToggle, MDBDropdownItem,
 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';


export default function TopNav (props) {

    // console.log("TopNav props")
    // console.log(props);
    const history = useHistory();


    

    const goto = (url) => {
        history.push(url, {
            username: props.userDetails["username"],
            password: props.userDetails["password"],
            tags: props.userDetails["tags"],
            country: props.userDetails["country"],
            sources: props.userDetails["sources"],
        });
    }

    const gotoUserProfile = () => {
        history.push("/userprofile", {
            username: props.userDetails["username"],
            password: props.userDetails["password"],
            tags: props.userDetails["tags"],
            country: props.userDetails["country"],
            sources: props.userDetails["sources"],
        });
    }

    const logout = () => {
        history.replace("/")
    }

    if(props.userDetails === undefined || props.userDetails === null){
        console.log("TopNav state not found")
        history.replace("/");
      }

    return(
        <div>
            <header>
                <Router>
                    <MDBNavbar style={Styling.navbar} dark expand="md" scrolling fixed="top" transparent>
                        <MDBNavbarBrand onClick={ goto } style = {Styling.title}>
                            <strong>Newsify</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler  />
                        <MDBCollapse isOpen = { false } navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem>
                                    <MDBNavLink to = "/home" onClick = { () => goto('/home')}>Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to = "/search" onClick = { () => goto('/search')}>Search</MDBNavLink>
                                </MDBNavItem>
                                </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="#"><MDBIcon far icon="user-circle" /> {props.userDetails !== undefined && props.userDetails !== null ? props.userDetails.username : null}</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <div className="d-none d-md-inline">Settings</div>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu right>
                                            <MDBDropdownItem onClick = {gotoUserProfile}>Your Profile</MDBDropdownItem>
                                            <MDBDropdownItem onClick = {logout}>Logout</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </Router>
                
            </header>
        </div>
    );
}

//CSS for all the other components
const Styling = {
    navbar: {
        backgroundColor: '#000000',
        // color: "black"
    },
    title: {
        fontSize: "30px",
        fontFamily: "Poynter"
    }
};