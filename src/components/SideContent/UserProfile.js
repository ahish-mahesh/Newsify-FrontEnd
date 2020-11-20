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
import '../Styling/reactTags.css';

import TopNav from '../MainContent/TopNav'
import { MDBContainer } from 'mdbreact';

export default function UserProfile(props){
    const location = useLocation();
    console.log("UserDetails state");
    console.log(location.state);
    const [country, setCountry] = React.useState(location.state.country);
    const [confirmPassword, setConfirmPassword] = React.useState(true);
    const [confirmPasswordText, setConfirmPasswordText] = React.useState(" ");
    const [confirmPasswordColor, setConfirmPasswordColor] = React.useState("");
    const [invokeUrl] = React.useState("http://127.0.0.1:5000/newsify")

    const [ tags, setTags ] = React.useState(location.state.tags);
    const [ sources, setSources ] = React.useState(location.state.sources);
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
        // var url = 'http://127.0.0.1:5000/newsify/users?username=ahishm&password=feb182012';
        // axios.get(url)
        // .then(res => {
        //     setUserData(res.data['result'])
        //     console.log("Userdetails fetch")
        //     console.log(res.data['result']['username']);
        // }).catch(error => {
        //     console.log(error);
        // })

        setUserData(location.state);

        var url = 'http://127.0.0.1:5000/newsify/sources';
        axios.get(url)
        .then(res => {
            setSourceSuggestions(res.data['result']);
        }).catch(error => {
            console.log(error);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const updatePassword = (e) => {
        let temp = userData;
        temp.password = e.target.value;
        setUserData(temp);
    }

    const selectCountry = (val) => {
        let temp = userData;
        temp.country = val;
        setUserData(temp);
        setCountry(val);
    }

    const checkPassword = (e) => {
        if(e.target.value === userData.password) {
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

    const updateCredentials = (e) => {
        if (/\s/g.test(userData.password) || userData.password.length <= 4 || userData.password === "" || confirmPassword !== true) {
            window.alert("Enter a valid password.")
        }
        else {
        
            axios.put(invokeUrl+"/users", {
                "username": userData.username,
                "password": userData.password,
                "country" :userData.country,
                "tags": userData.tags,
                "sources" : userData.sources,
            })
            .then(res => {
                if(res.data["result"] === "Exists"){
                    window.alert("User already exists!")
                }
                else {
                    window.alert("Successfully saved the changes.")
                    history.push("/home", {
                        username: userData.username,
                        password: userData.password,
                        tags: userData.tags,
                        country: userData.country,
                        sources: userData.sources,
                    });
                }
            })
        }
        
    }

    const handleDelete = (i, flag) => {
        if(flag === 1){            
            let temp = userData;
            temp.tags = temp.tags.filter((tag, index) => index !== i);
            setUserData(temp);

            let tempTags = tags.filter((tag, index) => index !== i);
            setTags(tempTags);
        }
        else {
            let temp = userData;
            temp.tags = temp.sources.filter((source, index) => index !== i);
            setUserData(temp);

            let tempSources = sources.filter((source, index) => index !== i);
            setSources(tempSources);
        }
        
    }

    const handleAddition = (newTag, flag) => {
        if(flag === 1) {
            let temp = userData;
            temp.tags = [...temp.tags, newTag];
            console.log(temp.tags)
            setUserData(temp);

            setTags([...tags, newTag]);
        }
        else {
            let temp = userData;
            temp.sources = [...temp.sources, newTag];
            setUserData(temp);

            setSources([...sources, newTag]);
        }
        
    }

    const handleDrag = (tag, currPos, newPos, flag) => {
        if(flag === 1) {
            const temp = userData;
            const tempTags = temp.tags;
            const newTags = tempTags.slice();

            newTags.splice(currPos, 1);
            newTags.splice(newPos, 0, tag);

            temp.tags = newTags;
            setUserData(temp);

            setTags(newTags);
            
        }
        else {
            const temp = userData;
            const tempSources = temp.sources;
            const newSources = tempSources.slice();

            newSources.splice(currPos, 1);
            newSources.splice(newPos, 0, tag);

            temp.sources = newSources;
            setUserData(temp);

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
                value = {country}
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
                tags={tags}
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
                tags={sources}
                suggestions = {sourceSuggestions}
                handleDelete={(i) => handleDelete(i, 2)}
                handleAddition={(newTag) => handleAddition(newTag, 2)}
                handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, 2)}
                delimiters={delimiters} />
                <br/>
                <br/>

                <Button style = {styling.button} 
                        onClick = {updateCredentials}
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