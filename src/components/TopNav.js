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
    console.log("TopNav props")
    console.log(props);
    const history = useHistory();
    const [ collapse, setCollapse ] = React.useState(false);

    const goto = (url) => {
        history.push("/home", {username: props.username});
    }

    if(props.userDetails === undefined || props.userDetails === null){
        history.replace("/");
      }

    return(
        <div>
            <header>
                <Router>
                    <MDBNavbar style={Styling.navbar} dark expand="md" scrolling fixed="top" transparent>
                        <MDBNavbarBrand href="/home" onClick={ goto } style = {Styling.title}>
                            <strong>Newsify</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler  />
                        <MDBCollapse isOpen = { collapse } navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem>
                                    <MDBNavLink to = "/home" onClick = {() => goto("/home")}>Home</MDBNavLink>
                                </MDBNavItem>
                                </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBNavLink to="#"><MDBIcon far icon="user-circle" /> {props.userDetails !== undefined ? props.userDetails.username : null}</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <div className="d-none d-md-inline">Settings</div>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu right>
                                            <MDBDropdownItem href="/">Logout</MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </Router>

                {/* <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(40).jpg">
                    <MDBMask overlay="white-light" className="flex-center flex-column text-black text-center">
                    <h1>Welcome to Newsify {props.username}!</h1>
                    <h3>Here's your news for today</h3><br />
                    </MDBMask>
                </MDBView> */}
                
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