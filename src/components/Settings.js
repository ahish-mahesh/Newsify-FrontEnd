import React, { useEffect } from 'react';
import axios from 'axios';
import TopNav from './TopNav'
import {
    useLocation,
    useHistory
} from "react-router-dom";

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer } from 'mdbreact';


export default function DetailedContent(props) {
    const location = useLocation();
    const history = useHistory();

    const [ articles, setArticles ] = React.useState(null);
    const [ title, setTitle ] = React.useState(null);
    const [ pageNo, setPageNo ] = React.useState(1);

    useEffect(() => {
        var url = "";
        if(location.state !== undefined && location.state !== null) {
            setPageNo(location.state.pageNo);
            if(location.state.type === "headlines"){
                setTitle("Top headlines for today");
                url = 'http://newsapi.org/v2/top-headlines?country=in&page='+location.state.pageNo+'&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
            }
            else if(location.state.type === "bbc"){
                setTitle("Top headlines from BBC");
                url = 'http://newsapi.org/v2/top-headlines?sources=bbc-news&page='+location.state.pageNo+'&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
            }
            else if(location.state.type === "apple"){
                setTitle("Top articles about Apple Inc.");
                url = 'http://newsapi.org/v2/everything?q=Apple&page='+location.state.pageNo+'&from=2020-10-21&sortBy=popularity&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
            }
        }
        
        axios.get(url)
        .then(res => {
        //   console.log(res.data.articles);
          let tempArticleSplit = []

          tempArticleSplit.push(res.data.articles.slice(0,4));
          tempArticleSplit.push(res.data.articles.slice(4,8));
          tempArticleSplit.push(res.data.articles.slice(8,12));
          tempArticleSplit.push(res.data.articles.slice(12,16));
          tempArticleSplit.push(res.data.articles.slice(16,20));
        //   setPageNo(pageNo+1);
          setArticles(tempArticleSplit);
        }).catch(error => {
            console.log(error);
        })

    }, [])

    
    return(
    <div>
        <TopNav username = {location.state !== null && location.state !== undefined ? location.state.username : null}/>

        <MDBContainer style={styling.container} className="text-center mt-5 pt-5">
            <h1>{title}</h1>
            {displayArticles()}

            {pageNo !== 1 ? <Button variant = "dark" href = "" onClick = {() => changePage(-1)}> {"<<"} Prev Page</Button> : null}
            <Button variant = "dark" href = "" onClick = {() => changePage(1)}>Next Page {">>"}</Button>
        </MDBContainer>
    </div>);
}

const styling = {
    card: {
        marginTop: "2vh",
        marginBottom: "2vh",
    },
    container: {
        height: "100vh",
    }
}