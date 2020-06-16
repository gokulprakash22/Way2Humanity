import React, { Component, useState, useEffect,useContext} from 'react'
import {Context} from './components/context.js';
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios';

export const ProtectedRoute = ({component:Component, ...rest}) => {
    const {userContext} = useContext(Context)
    const [user,setUser] = userContext
    const [redirect,setRedirect] = useState(false)
    useEffect(() => {
        axios.get('/api/users/verify')
            .then(res => {
            if(res.data.msg==='Correct'){
                setUser({
                    isAuth:true,
                    name:res.data.name,
                    email:res.data.email
                })
            }
            else{
                setUser({
                    isAuth:false,
                    name:'',
                    email:''
                })
                setRedirect(true)
            }})
            .catch(err => {
            console.log(err)
            setUser({
                isAuth:false,
                name:'',
                email:''
            })
            setRedirect(true)
          })
      },[])
    return(<>
        {user.isAuth&&<Route {...rest} render={props => {return <Component {...props} />}} />}
        {redirect&&<Route {...rest} render={props => {return <Redirect to={{pathname:'/login'}} />}} />}
        </>    
               
    )
}