import React, { useEffect } from 'react';
import axios from 'axios';
import {
    useHistory
} from "react-router-dom";

//Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Carousel, Tabs,
    Tab, Button
} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import Footer from './Footer';

export default function MainPage(props) {
    
    const [headlines, setHeadlines] = React.useState(null);
    const [sourceData, setSourceData] = React.useState({});
    const [tagData, setTagData] = React.useState({});

    const [covidData, setCovidData] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    
    const history = useHistory();

    // API call to get news
    useEffect(() => {
        
        var url = 'http://newsapi.org/v2/top-headlines?country='+props.userDetails.country+'&pageSize=5&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
        // axios.get(url)
        // .then(res => {
        //     console.log(res.data.articles);
        //     setHeadlines(res.data.articles);
        // }).catch(error => {
        //     console.log(error);
        //     window.alert(error);
        // })
        
        // initializeSourceData(props.userDetails.sources[0].id);
        // initializeTagData(props.userDetails.tags[0].id);
        // eslint-disable-next-line react-hooks/exhaustive-deps

        url = "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
        axios.get(url)
        .then(res => {
            console.log(res.data);
            let temp = res.data;

            temp["regionData"].forEach(eachRegion => {
                eachRegion["open"] = false;
            })

            setCovidData(temp);
        }).catch(error => {
            console.log(error);
            window.alert(error);
        })

    }, [])

    const initializeSourceData = (id) => {
        var url = 'http://newsapi.org/v2/top-headlines?sources='+id+'&pageSize=4&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';

        axios.get(url)
        .then(res => {
            let temp = sourceData;
            temp[id] = res.data.articles;
            setSourceData(temp);
        }).catch(error => {
            console.log(error);
        })
    }

    const initializeTagData = (id) => {
        var url = 'http://newsapi.org/v2/everything?q='+id+'&from=2020-10-21&pageSize=4&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';

        axios.get(url)
        .then(res => {
            let temp = tagData;
            temp[id] = res.data.articles;
            setTagData(temp);
        }).catch(error => {
            console.log(error);
        })
    }

    const goToDetailedContent = (navigationUrl, title) => {        
        history.push("/detailedcontent", {
            username: props.userDetails["username"],
            password: props.userDetails["password"],
            tags: props.userDetails["tags"],
            country: props.userDetails["country"],
            sources: props.userDetails["sources"],
            navigationUrl: navigationUrl,
            title: title,
            pageNo: 1
        });
    }
    
    const goToURL = (url) => {
        window.open(url);
    }


    const displayHeadlines = (type) => {
        let newsToDisplay = null;

        if(type === "headlines"){
            newsToDisplay = headlines;
        }

        if(newsToDisplay === null) {
            return(null);
        }
        
        return(
            <div style = {{width: "50vw", marginLeft: "20vw", textAlign: "center"}}>
            <Carousel keyboard={false} pauseOnHover={true}>
                {newsToDisplay.map((eachArticle) => (
                    <Carousel.Item style = {{cursor: "pointer"}}>
                        <img
                        className="d-block w-100"
                        src= {eachArticle.urlToImage}
                        alt={eachArticle.title}
                        onClick = {() => goToURL(eachArticle.url)}
                        />
                        <Carousel.Caption>
                        <h3 onClick = {() => goToURL(eachArticle.url)}>{eachArticle.title}</h3>
                        <p onClick = {() => goToURL(eachArticle.url)}>{eachArticle.content !== null ? eachArticle.content: eachArticle.description}</p>
                        </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        </div>);
    }

    const getTagData = (id, title) => {
        var navigationUrl = 'http://newsapi.org/v2/everything?q='+id
        if( tagData[id] === undefined || tagData[id] === null) {
            
            var url = 'http://newsapi.org/v2/everything?q='+id+'&from=2020-10-21&pageSize=4&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';

            axios.get(url)
            .then(res => {
                let temp = tagData;
                temp[id] = res.data.articles;
                setTagData(temp);
                return(
                    <div className={classes.root}>
                        <GridList cellHeight={200} style = {{width: "50vw", height: "55vh"}} className={classes.gridList}>
                            {temp[id].map((eachArticle) => (
                            <GridListTile key={eachArticle.id} style = {styling.newsTile} onClick = {() => goToURL(eachArticle.url)}>
                                <img src={eachArticle.urlToImage} alt={eachArticle.title} />
                                <GridListTileBar
                                title={eachArticle.title}
                                subtitle={<span>{eachArticle.source.name}</span>}
                                />
                            </GridListTile>
                            ))}
                        </GridList>
                        <div style = {{margin: "0.5vh"}}>
                            <Button variant="outline-dark" size="sm" onClick = {() => goToDetailedContent(navigationUrl, title)}>More articles under {title} >></Button>
                            {/* <a  onClick = {() => goToDetailedContent("bbc")}>More articles from BBC >></a> */}
                        </div>
                    </div>
                );
            }).catch(error => {
                console.log(error);
            })
        }
        else {
            return(
                <div className={classes.root}>
                    <GridList cellHeight={200} style = {{width: "50vw", height: "55vh"}} className={classes.gridList}>
                        {tagData[id].map((eachArticle) => (
                        <GridListTile key={eachArticle.id} style = {styling.newsTile} onClick = {() => goToURL(eachArticle.url)}>
                            <img src={eachArticle.urlToImage} alt={eachArticle.title} />
                            <GridListTileBar
                            title={eachArticle.title}
                            subtitle={<span>{eachArticle.source.name}</span>}
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                    <div style = {{margin: "0.5vh"}}>
                        <Button variant="outline-dark" size="sm" onClick = {() => goToDetailedContent(navigationUrl, title)}>More articles under {title} >></Button>
                        {/* <a  onClick = {() => goToDetailedContent("bbc")}>More articles from BBC >></a> */}
                    </div>
                </div>
            )        
        }
        
    }

    const displayTagTabs = () => {
        return(
            <div style = {{width: "45%", display: "inline-block"}}>
                <h3 style = {styling.h2}>Your tags</h3>
                <Tabs defaultActiveKey={props.userDetails.tags[0].id} id="uncontrolled-tab-example" >
                    {props.userDetails.tags.map( eachTag => {
                        return(
                            <Tab eventKey={eachTag.id} title={eachTag.text}>
                                {/* {getTagData(eachTag.id, eachTag.text)} */}
                            </Tab>
                        )
                    })}
                </Tabs>
            </div>
        );
    }

    const getSourceData = (id, title) => {
        var navigationUrl = 'http://newsapi.org/v2/top-headlines?sources='+id;

        if( sourceData[id] === undefined || sourceData[id] === null) {
            
            var url = 'http://newsapi.org/v2/top-headlines?sources='+id+'&pageSize=4&language=en&apiKey=7ac4dc02591646bf91c5a3ccf45633f4';
        
            axios.get(url)
            .then(res => {
                let temp = sourceData;
                temp[id] = res.data.articles;
                setSourceData(temp);

                return(
                    <div className={classes.root}>
                        <GridList cellHeight={200} style = {{width: "50vw", height: "55vh"}} className={classes.gridList}>
                            {temp[id].map((eachArticle) => (
                            <GridListTile key={eachArticle.id} style = {styling.newsTile} onClick = {() => goToURL(eachArticle.url)}>
                                <img src={eachArticle.urlToImage} alt={eachArticle.title} />
                                <GridListTileBar
                                title={eachArticle.title}
                                subtitle={<span>{eachArticle.source.name}</span>}
                                />
                            </GridListTile>
                            ))}
                        </GridList>
                        <div style = {{margin: "0.5vh"}}>
                            <Button variant="outline-dark" size="sm" onClick = {() => goToDetailedContent(navigationUrl, title)}>More articles from {title} >></Button>
                            {/* <a  onClick = {() => goToDetailedContent("bbc")}>More articles from BBC >></a> */}
                        </div>
                    </div>
                )        

            }).catch(error => {
                console.log(error);
            })
        }
        else {
            return(
                <div className={classes.root}>
                    <GridList cellHeight={200} style = {{width: "50vw", height: "55vh"}} className={classes.gridList}>
                        {sourceData[id].map((eachArticle) => (
                        <GridListTile key={eachArticle.id} style = {styling.newsTile} onClick = {() => goToURL(eachArticle.url)}>
                            <img src={eachArticle.urlToImage} alt={eachArticle.title} />
                            <GridListTileBar
                            title={eachArticle.title}
                            subtitle={<span>{eachArticle.source.name}</span>}
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                    <div style = {{margin: "0.5vh"}}>
                        <Button variant="outline-dark" size="sm" onClick = {() => goToDetailedContent(navigationUrl, title)}>More articles from {title} >></Button>
                        {/* <a  onClick = {() => goToDetailedContent("bbc")}>More articles from BBC >></a> */}
                    </div>
                </div>
            )        
        }
        
    }
 
    const setSource = (id) => {
        console.log(id);
        initializeSourceData(id);
    }

    const displaySourceTabs = () => {
        
        return(
            <div style = {{width: "45%", display: "inline-block", margin: "5vh"}}>
                <h3 style = {styling.h2}>News from your preferred sources</h3>
                <Tabs defaultActiveKey={props.userDetails.sources[0].id} id="uncontrolled-tab-example" onSelect = {setSource}>
                    {props.userDetails.sources.map( eachTag => {
                        return(
                            <Tab eventKey={eachTag.id} title={eachTag.text} >
                                {/* {getSourceData(eachTag.id, eachTag.text)} */}
                            </Tab>
                        )
                    })}
                    
                </Tabs>
            </div>
        );
        
    }

    const displayCovidTracker = () => {
        if(covidData === null) {
            return null;
        }

        var nf = new Intl.NumberFormat();

        return(
            <div style = {styling.covidTracker}>
                <h4 style = {styling.h4}>Covid Tracker</h4>
                <h5 style = {styling.h4}>India</h5>

                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.listRoot}
                    
                >
                    <ListItem button>                
                        <strong>Total Cases:&emsp;</strong>{nf.format(covidData["totalCases"])}
                    </ListItem>

                    <ListItem button>
                        <strong>Total Active cases:&emsp;</strong>{nf.format(covidData["activeCases"])}
                    </ListItem>
                    <ListItem button>                
                        <strong>New Active cases today:&emsp;</strong>{nf.format(covidData["activeCasesNew"])}
                    </ListItem>

                    <ListItem button style = {{backgroundColor: "#e6ffe6"}}>                
                        <strong>Total Recovered:&emsp;</strong>{nf.format(covidData["recovered"])}
                    </ListItem>
                    <ListItem button style = {{backgroundColor: "#e6ffe6"}}>                
                        <strong>Newly Recovered:&emsp;</strong>{nf.format(covidData["recoveredNew"])}
                    </ListItem>
                    <ListItem button style = {{backgroundColor: "#ffe6e6"}}>                
                        <strong>Total Deaths:&emsp;</strong>{nf.format(covidData["deaths"])}
                    </ListItem>
                    <ListItem button style = {{backgroundColor: "#ffe6e6"}}>                
                        <strong>New Deaths:&emsp;</strong>{nf.format(covidData["deathsNew"])}
                    </ListItem>

                    <ListItem button>                
                        <strong>Previous Day Tests:&emsp;</strong>{nf.format(covidData["previousDayTests"])}
                    </ListItem>
                    
                    {displayCovidRegionData()}
                    
                </List>
            </div>);
    }

    const displayCovidRegionData = () => {
        var nf = new Intl.NumberFormat();

        return(
            <div>
                <h6 style = {{margin: "3vh"}}><strong>Regional Statistics</strong></h6>
                {covidData["regionData"].map((eachRegion, index) => (
                    <div>
                        <ListItem button onClick={() => handleClick(index)} >
                            <ListItemText primary={eachRegion["region"]} />
                            {eachRegion["open"] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        
                        <Collapse in={eachRegion["open"]} timeout="auto" unmountOnExit>
                            <List   component="div" 
                                    disablePadding
                                    dense={true}
                                    >
                                <ListItem button className={classes.nested}>
                                    <strong>Total infected:&emsp;</strong>{nf.format(eachRegion["totalInfected"])}
                                </ListItem>

                                <ListItem button className={classes.nested}>
                                    <strong>Newly infected:&emsp;</strong>{nf.format(eachRegion["newInfected"])}
                                </ListItem>

                                <ListItem button className={classes.nested} style = {{backgroundColor: "#e6ffe6"}}>
                                    <strong>Total Recovered:&emsp;</strong>{nf.format(eachRegion["recovered"])}
                                </ListItem>

                                <ListItem button className={classes.nested} style = {{backgroundColor: "#e6ffe6"}}>
                                    <strong>Newly recovered:&emsp;</strong>{nf.format(eachRegion["newRecovered"])}
                                </ListItem>

                                <ListItem button className={classes.nested} style = {{backgroundColor: "#ffe6e6"}}>
                                    <strong>Total Deceased:&emsp;</strong>{nf.format(eachRegion["deceased"])}
                                </ListItem>

                                <ListItem button className={classes.nested} style = {{backgroundColor: "#ffe6e6"}}>
                                    <strong>Newly deceased:&emsp;</strong>{nf.format(eachRegion["newDeceased"])}
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                ))}
            </div>
        );
    }

    const handleClick = (index) => {
        let temp = covidData;
        temp["regionData"][index]["open"] = !temp["regionData"][index]["open"];
        setCovidData(temp);
        setOpen(!open);
    };

    return (
        <div style = {{margin: "15vh", textAlign: "center"}}>
            {displayCovidTracker()}
            <h2 style = {styling.h2}><strong>Headlines for you today</strong></h2>
            {displayHeadlines("headlines")}
            <br/>
            <Button variant="outline-dark" size="sm" onClick = {() => goToDetailedContent('http://newsapi.org/v2/top-headlines?country='+props.userDetails.country, "Headlines for Today")}>More articles on Headlines >></Button>
            <br/>
            <br/>

            <div style = {{marginTop: "50vh"}}>
                {displaySourceTabs()}
                {displayTagTabs()}
            </div>
            <Footer />
        </div>
    );
}

const styling = {
    h2 : {
        margin: "2vh",
        fontFamily: "Poynter"
    },
    h4 : {
        margin: "1vh",
        fontFamily: "Poynter",
        textAlign: "center",
    },
    newsTile: {
        cursor: "pointer",
    },
    covidTracker: {
        position: 'absolute',
        left: "2vw",
        top: "15vh",
        borderRight: "1px solid black",
        height: "50vh",
        width: "20vw",
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      margin: "5vh"
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    listRoot: {
        width: '100%',
        maxWidth: 360,
        fontSize: "15px",
        maxHeight: "40vh",
        overflow: "auto",
        scrollbarWidth: "none",
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
  }));