import React, { useEffect, createContext,useReducer, useContext } from "react";
import NavBar from "./components/Navbar.jsx";
import "./App.css";
import { BrowserRouter, Route,Switch, useHistory } from "react-router-dom";
import Home from "./components/screens/Home.jsx";
import Login from "./components/screens/SignIn.jsx";
import Signup from "./components/screens/Signup.jsx";
import CreatePost from "./components/screens/CreatePost.jsx";
import {reducer, initialState} from './reducers/userReducer.jsx';
import Post from "./components/screens/post.jsx";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
    } else {
      history.push('/signin')
    }
  },[])

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Login />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/post">
        <Post/>
      </Route>
    </Switch>
  );
};

function App() {
  const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
