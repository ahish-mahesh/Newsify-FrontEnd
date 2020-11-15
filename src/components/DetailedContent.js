import React, { useEffect } from 'react';
import axios from 'axios';
import TopNav from './TopNav'
import {
    useLocation,
    useHistory
} from "react-router-dom";

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardDeck, Card, Button } from 'react-bootstrap'
import { MDBContainer } from 'mdbreact';
import Footer from './Footer';

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
            setTitle(location.state.title);
            url = location.state.navigationUrl+"&page="+pageNo+'&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
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

    const loadArticles = () => {
        console.log(pageNo)
        var url = "";
        if(location.state !== undefined && location.state !== null) {
            setTitle(location.state.title);
            url = location.state.navigationUrl+"&page="+pageNo+'&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
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

          setArticles(tempArticleSplit);
        }).catch(error => {
            console.log(error);
        })
    }

    const changePage = (val) => {
        console.log("PGG "+pageNo)
        setPageNo(pageNo+val);
        history.push("/detailedcontent", {username: location.state.username, type: location.state.type, pageNo : pageNo+val});
        window.location.reload(false);
    }

    const goToURL = (url) => {
        window.open(url);
    }

    const displayArticles = () => {
        if(articles === null) {
            return null
        }
        else{
            return(
                <div>
                    {articles.map( (eachArticleSplit) => (
                        <div style = {styling.card}>
                        <CardDeck>
                            {eachArticleSplit.map( eachArticle => (
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
                        </CardDeck>
                        </div>
                    ))}
                </div>
            )
        }        
    }

    return(
    <div>
        <TopNav userDetails = {location.state !== null && location.state !== undefined ? location.state : null}/>

        <MDBContainer style={styling.container} className="text-center mt-5 pt-5">
            <h1 style = {styling.h1}>{title}</h1>
            {displayArticles()}

            {pageNo !== 1 ? <Button variant = "dark" href = "" onClick = {() => changePage(-1)}> {"<<"} Prev Page</Button> : null}
            <Button variant = "dark" href = "" onClick = {() => changePage(1)}>Next Page {">>"}</Button>
        </MDBContainer>
        <Footer/>
    </div>);
}

const styling = {
    card: {
        marginTop: "2vh",
        marginBottom: "2vh",
    },
    container: {
        height: "100vh",
    },
    h1 : {
        margin: "2vh",
        fontFamily: "Poynter"
    },
}