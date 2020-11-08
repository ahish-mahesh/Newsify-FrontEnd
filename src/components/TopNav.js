import React from 'react';
import {
    useLocation,
    useHistory,
    Switch,
    Route,
    BrowserRouter as Router
} from "react-router-dom";

// MDB React
import { MDBContainer, 
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, 
    MDBNavbarToggler, MDBCollapse, MDBNavItem, 
    MDBNavLink, MDBIcon, MDBDropdownMenu,
    MDBDropdown, MDBDropdownToggle, MDBDropdownItem
 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';



export default function TopNav (props) {
    console.log("TopNav props")
    console.log(props);
    const history = useHistory();
    const [ collapse, setCollapse ] = React.useState(false);

    const onClick = () => {
        setCollapse(!collapse);
      }

    const goto = (url) => {
        history.push("/home", {username: props.username});
    }

    if(props.username === undefined || props.username === null){
        history.replace("/");
      }

    return(
        <Router>
            <header>
                <MDBNavbar style={Styling.navbar} dark expand="md" scrolling fixed="top">
                    <MDBNavbarBrand href="/home" onClick={ goto }>
                        <strong>Newsify</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler  />
                    <MDBCollapse isOpen = { collapse } navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <MDBNavLink to = "/home" onClick = {() => goto("/home")}>Home</MDBNavLink>
                            </MDBNavItem>
                            </MDBNavbarNav>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBNavLink to="#"><MDBIcon far icon="user-circle" /> {props.username}</MDBNavLink>
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
            </header>
        </Router>
    );
}

//CSS for all the other components
const Styling = {
    navbar: {
        backgroundColor: '#000000',
    }
};