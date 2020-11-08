import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'
import DetailedContent from './components/DetailedContent'
import UserProfile from './components/UserProfile'

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
        
      </Switch>
    </Router>
    );
}


