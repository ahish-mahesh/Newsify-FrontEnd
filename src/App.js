import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Login from './components/UserAuth/Login';
import Signup from './components/UserAuth/Signup';
import Home from './components/MainContent/Home';
import DetailedContent from './components/SideContent/DetailedContent';
import UserProfile from './components/SideContent/UserProfile';
import Search from './components/SideContent/Search'

export default function App(){
  const history = useHistory();

  return(
    <Router history = {history}>
    <Switch>
        <Route exact path="/" component={props => <Login />}/>
        
        <Route path="/signup" component={props => <Signup />}/>

        <Route path="/home" component={props => <Home />}/>

        <Route path="/detailedcontent" component={props => <DetailedContent />}/>

        <Route path="/userprofile" component={props => <UserProfile />}/>

        <Route path="/search" component={props => <Search />}/>
        
      </Switch>
    </Router>
    );
}


