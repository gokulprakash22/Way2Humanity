import React,{useState} from 'react'
import './App.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { createMuiTheme , ThemeProvider } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'
import deepOrange from '@material-ui/core/colors/deepOrange'
import PostsTabMob from './components/poststabmob'
import {Header,Poster,LogIn,SignUp,PostsGrid,ViewPost,CreateForm,UpdateForm,Error,Footer,ProtectedRoute,Context} from './components'

const theme = createMuiTheme({
  palette: {
      primary: indigo,
      secondary: deepOrange
    }
})

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
  )
}

export default App;
