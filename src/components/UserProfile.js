import React, { useEffect } from 'react';
import {TextField} from '@material-ui/core';

import {
  useHistory,
  useLocation
} from "react-router-dom";
import axios from 'axios';

import {Button ,Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CountryDropdown } from 'react-country-region-selector';
import { WithContext as ReactTags } from 'react-tag-input';
import './Styling/reactTags.css';

import TopNav from './TopNav'
import { MDBContainer } from 'mdbreact';

export default function UserProfile(props){
    const location = useLocation();
    console.log("UserDetails state");
    console.log(location.state);
    const [username, setUsername ]= React.useState("");
    const [password, setPassword] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState(false);
    const [confirmPasswordText, setConfirmPasswordText] = React.useState(" ");
    const [confirmPasswordColor, setConfirmPasswordColor] = React.useState("");
    const [invokeUrl] = React.useState("http://127.0.0.1:5000/newsify")

    const [ tags, setTags ] = React.useState([]);
    const [ sources, setSources ] = React.useState([]);
    const [ sourceSuggestions, setSourceSuggestions ] = React.useState([]);
    const history = useHistory();

    const [userData, setUserData] = React.useState({});

    const KeyCodes = {
        tab: 9,
        comma: 188,
        enter: 13,
    };
    
    const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab];

    // API call to get sources
    useEffect(() => {
        var url = 'http://127.0.0.1:5000/newsify/users?username=ahishm&password=feb182012';
        axios.get(url)
        .then(res => {
            setUserData(res.data['result'])
            console.log("Userdetails fetch")
            console.log(res.data['result']['username']);
        }).catch(error => {
            console.log(error);
        })

        url = 'http://127.0.0.1:5000/newsify/sources';
        axios.get(url)
        .then(res => {
        setSourceSuggestions(res.data['result']);
        }).catch(error => {
            console.log(error);
        })

    }, [])

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const selectCountry = (val) => {
        setCountry(val);
    }

    const checkPassword = (e) => {
        if(e.target.value === password) {
        setConfirmPassword(true);
        setConfirmPasswordText("Password match!");
        setConfirmPasswordColor("green");
        }
        else {
        setConfirmPassword(false);
        setConfirmPasswordText("Password does not match!");
        setConfirmPasswordColor("red");
        }
        
    }

    const createCredentials = (e) => {
        if(/\s/g.test(username) || username === "") {
        window.alert("Enter a valid username.")
        } else if (/\s/g.test(password) || password.length <= 4 || password === "" ) {
        window.alert("Enter a valid password.")
        }
        else {
        const url = invokeUrl+"/users?username="+username+"&password="+password+"&country="+country+"&tags="+tags;
        // axios.post(url)
        axios.post(invokeUrl+"/users", {
            "username": username,
            "password": password,
            "country" :country,
            "tags": tags,
            "sources" : sources,
        })
        .then(res => {
            if(res.data["result"] === "Exists"){
            window.alert("User already exists!")
            }
            else {
            history.push('/');
            }
        })
        }
        
    }

    const goBackToLogin = () => {
        history.push("/", );
    }

    const handleDelete = (i, flag) => {
        if(flag === 1){
            let tempTags = tags.filter((tag, index) => index !== i);

            setTags(tempTags);
        }
        else {
            let tempSources = sources.filter((source, index) => index !== i);

            setSources(tempSources);
        }
        
    }

    const handleAddition = (newTag, flag) => {
        if(flag === 1) {
        setTags([...tags, newTag]);
        }
        else {
        setSources([...sources, newTag]);
        }
        
    }

    const handleDrag = (tag, currPos, newPos, flag) => {
        if(flag === 1) {
        const tempTags = tags;
        const newTags = tempTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
        }
        else {
        const tempSources = sources;
        const newSources = tempSources.slice();

        newSources.splice(currPos, 1);
        newSources.splice(newPos, 0, tag);

        // re-render
        setSources(newSources);
        }
        
    }

    return(
        <div>
            <TopNav userDetails = {location.state !== null && location.state !== undefined ? location.state : null}/>

            <MDBContainer style={styling.container} className="text-center mt-5 pt-5">
            <div style={styling.mainDiv}>
                <h1 style = {styling.title}> Your profile</h1>
                
                <br/>            
                <TextField id="outlined-basic"
                            style = {styling.textField} 
                            label="New password:" 
                            variant="outlined" 
                            type="password"
                            onChange = {updatePassword}
                            />
                <br/>
                <TextField id="outlined-basic"
                            style = {styling.textField} 
                            label="Confirm new password:" 
                            variant="outlined" 
                            type="password"
                            onChange = {checkPassword}
                            />
                            <br/>
                            <div style = {{color: confirmPasswordColor, fontSize: '10px'}}>
                            {confirmPasswordText}
                            </div>
                <br/>
                {/* <TextField id="outlined-basic" 
                            style = {styling.textField}
                            label="Username:" 
                            variant="outlined" 
                            onChange = {updateUsername}/> */}
                <Form.Label> Country </Form.Label>
                <br/>
                <CountryDropdown
                value = {userData["country"]}
                valueType = "short"
                onChange = {selectCountry}
                style = {{
                    width: "240px",
                }}
                />
                <br/>
                <br/>

                <ReactTags
                classNames={{
                    tags: 'ReactTags__tags',
                    tagInput: 'ReactTags__tagInput',
                    tagInputField: 'ReactTags__tagInputField',
                    selected: 'ReactTags__selected',
                    tag: 'ReactTags__selected ReactTags__tag',
                    remove: 'ReactTags__selected ReactTags__remove',
                    suggestions: 'ReactTags__suggestions',
                    activeSuggestion: 'ReactTags__activeSuggestion'
                }} 
                placeholder  = {'Keywords'}
                inline={false}
                tags={userData["tags"]}
                handleDelete={(i) => handleDelete(i, 1)}
                handleAddition={(newTag) => handleAddition(newTag, 1)}
                handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, 1)}
                delimiters={delimiters} />
                <br/>
                <br/>

                <ReactTags
                classNames={{
                    tags: 'ReactTags__tags',
                    tagInput: 'ReactTags__tagInput',
                    tagInputField: 'ReactTags__tagInputField',
                    selected: 'ReactTags__selected',
                    tag: 'ReactTags__selected ReactTags__tag',
                    remove: 'ReactTags__selected ReactTags__remove',
                    suggestions: 'ReactTags__suggestions',
                    activeSuggestion: 'ReactTags__activeSuggestion'
                }} 
                placeholder  = {'News sources'}
                inline={false}
                tags={userData["sources"]}
                suggestions = {sourceSuggestions}
                handleDelete={(i) => handleDelete(i, 2)}
                handleAddition={(newTag) => handleAddition(newTag, 2)}
                handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, 2)}
                delimiters={delimiters} />
                <br/>
                <br/>

                <Button style = {styling.button} 
                        onClick = {createCredentials}
                        variant = 'dark'>Save changes</Button>
                <br/>

            </div>
            </MDBContainer>
        </div>
    );
}


//Styling for the page
const styling = {
    mainDiv: {
        position: 'absolute', left: '50%', top: '58%',
        transform: 'translate(-50%, -50%)',
        // border: '1px solid black',
        borderRadius: '10px',
        // height: '48vh',
        width: '60vh',
        display: 'inline-block',
        textAlign: 'center',
    },
    textField: {
        marginBottom: '2vh',
        marginTop: '2vh'
    },
    confirmPassword: {
        fontSize: '8px',
    },
    button: {
        marginTop: '1vh',
        marginBottom: '1vh'
    },
    title: {
        marginTop: '1vh',
        fontWeight: 'bold',
        fontFamily: "Poynter",
        fontSize: "50px",
    }
};