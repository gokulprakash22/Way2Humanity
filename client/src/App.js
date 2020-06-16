import React,{useState,useEffect,createContext} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {ProtectedRoute} from './protectedroute.js';
import {Context} from './components/context.js';
import './App.css';
import LogIn from './components/login.js';
import SignUp from './components/signup.js';
import PostsTab from './components/poststab.js';
import PostsTabMob from './components/poststabmob.js';
import CreateForm from './components/createform.js';
import UpdateForm from './components/updateform.js';
import PostCard from './components/postcard.js';
import PostsGrid from './components/postsgrid.js';
import MyPosts from './components/myposts.js';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Poster from './components/poster';
import ViewPost from './components/viewpost.js';
import Error from './components/error.js';
import { createMuiTheme , ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
      primary: indigo,
      secondary: deepOrange,
    },
});


function App() {
  const [pageNo,setPageNo]=useState(0)
  const [posts,setPosts]=useState([])
  const [user,setUser]=useState({
    isAuth:false,
    name:'',
    email:''
  })
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Context.Provider value={{pageNoContext:[pageNo,setPageNo],postsContext:[posts,setPosts],userContext:[user,setUser]}}>
        <Header />
        <Switch>
        <Route path='/' exact component={Poster} />
        <Route path='/login' exact component={LogIn} />
        <Route path='/signup' exact component={SignUp} />
        <ProtectedRoute path='/posts' exact component={PostsGrid} />
        <ProtectedRoute path='/posts/:id' exact component={ViewPost} />
        <ProtectedRoute path='/createform' exact component={CreateForm} />
        <ProtectedRoute path='/updateform/:id' exact component={UpdateForm} />
        <Route component={Error} />
        </Switch>
        <Footer />
        </Context.Provider>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
