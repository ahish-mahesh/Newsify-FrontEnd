import React, { useEffect } from 'react';
import axios from 'axios';
import {
    useHistory
} from "react-router-dom";

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardDeck, Card, Button } from 'react-bootstrap'


export default function MainPage(props) {
    // console.log("Mainpage props");
    // console.log(props);
    const [headlines, setHeadlines] = React.useState(null);
    const [appleNews, setAppleNews] = React.useState(null);
    const [bbcNews, setBbcNews] = React.useState(null);
    
    const history = useHistory();

    // API call to get news
    useEffect(() => {
        var url = 'http://newsapi.org/v2/top-headlines?country='+props.userDetails.country+'&pageSize=3&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
        axios.get(url)
        .then(res => {
          console.log(res.data.articles);
          setHeadlines(res.data.articles);
        }).catch(error => {
            console.log(error);
        })

        url = 'http://newsapi.org/v2/top-headlines?sources=bbc-news&pageSize=3&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
        axios.get(url)
        .then(res => {
          console.log(res.data.articles);
          setBbcNews(res.data.articles);
        }).catch(error => {
            console.log(error);
        })

        url = 'http://newsapi.org/v2/everything?q=Apple&from=2020-10-21&sortBy=popularity&pageSize=3&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
        axios.get(url)
        .then(res => {
          console.log(res.data.articles);
          setAppleNews(res.data.articles);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const goToDetailedContent = (type) => {        
        history.push('/detailedcontent', {username: props.userDetails.username, type: type, pageNo : 1});
    }
    
    const goToURL = (url) => {
        window.open(url);
    }


    const displayNews = (type) => {
        let newsToDisplay = null;
        if(type === "headlines"){
            newsToDisplay = headlines;
        }
        else if(type === "bbc") {
            newsToDisplay = bbcNews;
        }
        else {
            newsToDisplay  = appleNews;
        }

        if(newsToDisplay === null) {
            return(null);
        }
        

        return(
        <CardDeck>
            {newsToDisplay.map((eachArticle) => (
                <Card className="mb-2">
                    <Card.Img variant = "top" src = {eachArticle.urlToImage}/>
                    <Card.Body>
                        <Card.Title>{eachArticle.title}</Card.Title>
                        <Card.Text>
                            {eachArticle.content !== null ? eachArticle.content: eachArticle.description}
                        </Card.Text>    
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="outline-dark" size="sm" onClick = {() => goToURL(eachArticle.url)}>Read full article here</Button>
                    </Card.Footer>
                </Card>
            ))}
        </CardDeck>);
    }

    return (
        <div>
            <h2 style = {styling.h2}><strong>India Headlines</strong></h2>
            {displayNews("headlines")}
            <br/>
            <a  onClick = {() => goToDetailedContent("headlines")}>More articles on India Headlines >></a>
            <br/>
            <br/>

            <h2><strong>BBC News</strong></h2>
            {displayNews("bbc")}
            <br/>
            <a  onClick = {() => goToDetailedContent("bbc")}>More articles from BBC >></a>
            <br/>
            <br/>

            <h2><strong>Apple</strong></h2>
            {displayNews("apple")}
            <br/>
            <a  onClick = {() => goToDetailedContent("apple")}>More articles about Apple >></a>
            <br/>
            <br/>
        </div>
    );
}

const styling = {
    h2 : {
        margin: "2vh",
    }
}