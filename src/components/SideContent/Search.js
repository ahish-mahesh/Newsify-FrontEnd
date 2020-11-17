import React, { useEffect } from 'react';
import axios from 'axios';
import {
    useLocation,
    useHistory
} from "react-router-dom";

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import {
    Button
} from 'react-bootstrap'

import {TextField} from '@material-ui/core';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { WithContext as ReactTags } from 'react-tag-input';
import '../Styling/reactTags.css';

import TopNav from '../MainContent/TopNav';
import Footer from '../MainContent/Footer';


export default function Search(){
    const location = useLocation();
    const history = useHistory();

    const [ sources, setSources ] = React.useState([]);
    const [ sourceSuggestions, setSourceSuggestions ] = React.useState([]);

    const [searchText, setSearchText] = React.useState(null);
    const [ fromDate, setFromDate ] = React.useState(null);
    const [ fromDateString, setFromDateString ] = React.useState(null);

    const [ toDate, setToDate ] = React.useState(null);
    const [ toDateString, setToDateString ] = React.useState(null);

    if(location.state === undefined || location.state === null){
        console.log("Home state not found")
        history.replace("/");
    }

    const KeyCodes = {
        tab: 9,
        comma: 188,
        enter: 13,
      };
       
      const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.tab];

    // API call to get sources
    useEffect(() => {
        var url = 'http://127.0.0.1:5000/newsify/sources';
        axios.get(url)
        .then(res => {
            setSourceSuggestions(res.data['result']);
        }).catch(error => {
            console.log(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange = (event) => {
        setSearchText(event.target.value);
    }

    const setFromDateValues = (date) => {
        setFromDate(date);
        setFromDateString(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate());
        console.log(date);
    }

    const setToDateValues = (date) => {
        setToDate(date);
        setToDateString(date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate());
        console.log(date);
    }

    const dateOperations = (date, value) => {
        if(date === null || date === undefined) {
            return null;
        }
        let tempDate = new Date(date);
        tempDate.setDate(date.getDate() + value);
        // console.log(date);
        return tempDate;
    }

    const handleDelete = (i,) => {
        let tempSources = sources.filter((source, index) => index !== i);
        setSources(tempSources);
    }
  
    const handleAddition = (newTag) => {
        setSources([...sources, newTag]);
    }
  
    const handleDrag = (tag, currPos, newPos) => {
        const tempSources = sources;
        const newSources = tempSources.slice();

        newSources.splice(currPos, 1);
        newSources.splice(newPos, 0, tag);

        // re-render
        setSources(newSources);
    }

    const executeSearch = () => {

        if(/\s/g.test(searchText) || searchText === "") {
            window.alert("Enter a valid search value.");
        }

        var url = 'http://newsapi.org/v2/everything?q='+searchText+'&apiKey=7ac4dc02591646bf91c5a3ccf45633f4&language=en';

        if(fromDate !== null) {
            url += '&from='+fromDateString;
        }

        if(toDate !== null) {
            url += '&to='+toDateString;
        }
        else {
            let tempDate = new Date();
            let tempDateString = tempDate.getFullYear()+"-"+tempDate.getMonth()+"-"+tempDate.getDate()

            url += '&to='+tempDateString;
        }

        if(sources !== []) {
            let sourcesString = '';
            sources.forEach((eachSource, index) => {
                if(index !== sources.length-1) {
                    sourcesString += eachSource.id+',';
                }
                else{
                    sourcesString += eachSource.id;
                }
            })
            url += '&sources='+sourcesString;
        }

        console.log(url);
        window.alert(searchText);
    }

    return(
        <div>
            <TopNav userDetails = {location.state !== null && location.state !== undefined ? location.state : null}/>

            <h2 style = {Styling.h2}>Search for your news articles here</h2>

            <div style = {Styling.searchBar}>
                <TextField id="outlined-basic" 
                    style = {Styling.searchBox}
                    label="Search here..." 
                    variant="outlined" 
                    onChange = {onChange}/>

                <div style = {Styling.dateBox}>
                    <DatePicker 
                        selected = {fromDate}
                        dateFormat="yyyy-MM-dd"
                        onChange={setFromDateValues}
                        style = {Styling.dateBox}
                        maxDate = {dateOperations(new Date(), -1)}
                        placeholderText="From"
                    />
                </div>

                <div style = {Styling.dateBox}>
                    <DatePicker 
                        selected = {toDate}
                        dateFormat="yyyy-MM-dd"
                        onChange={setToDateValues}
                        style = {Styling.dateBox}
                        placeholderText="To"
                        minDate = {dateOperations(fromDate, 1)}
                        maxDate = {new Date()}
                    />
                </div>

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
                style = {Styling.dateBox}
                inputFieldPosition="top"
                placeholder  = {'News sources'}                
                tags={sources}
                suggestions = {sourceSuggestions}
                handleDelete={(i) => handleDelete(i)}
                handleAddition={(newTag) => handleAddition(newTag)}
                handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos)}
                delimiters={delimiters} />

                
            </div>
                <Button variant="dark" size="sm" style = {Styling.searchButton} onClick = {executeSearch}>Search</Button>
            <Footer />
        </div>
        );
}
  
const Styling = {
    container: {
        height: "100vh",
    },
    h2: {
        marginTop: "15vh",
        fontFamily: "Poynter",
        textAlign: "center",
    },
    searchBar: {
        display: "flex",
        marginTop: "5vh",
        marginLeft: "10vw",
    },
    searchBox: {
        margin: "2vh",
        height: "4vh",
    },
    dateBox: {
        margin: "3vh",
    },
    searchButton: {
        height: "4vh", 
        marginTop: "3vh",
        marginLeft: "48%",
    }

};

