import React,{useState,useContext} from 'react';
import {Context} from './context.js';
import {Link} from 'react-router-dom';
import LSMenu from './lsmenu.js';
import LogoutMenu from './logoutmenu.js';
import { makeStyles, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  link:{
    color: 'white',
    textDecoration:'none'
  },
  title: {
    flexGrow: 1,
  },
}));



export default function Header(props) {
  const history = props.history
  const classes = useStyles();
  const {userContext} = useContext(Context)
  const [user,setUser] = userContext

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
        
          <Typography variant="h6" className={classes.title}>
          <Link to={user.isAuth?'posts':'/'} className={classes.link}>
            Way2Humanity
            </Link>
          </Typography>
          
          {user.isAuth?<LogoutMenu history={history}/>:
          <>
          <Hidden smUp>
          <LSMenu />
          </Hidden>
          <Hidden xsDown>
          <Link to='/login' className={classes.link}><Button color="inherit">Login</Button></Link>
          <Link to='/signup' className={classes.link}><Button color="inherit">SignUp</Button></Link>
          </Hidden>
          </>}
        </Toolbar>
      </AppBar>
    </div>
  );
}