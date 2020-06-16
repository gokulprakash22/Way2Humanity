import React,{useState,useEffect,useContext} from 'react';
import {Context} from './context.js';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import red from '@material-ui/core/colors/red';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  link:{
    textDecoration:'none'
  },
  error: {
    color:red[500]
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn(props) {
 
  const classes = useStyles();
  const {pageNoContext,userContext} = useContext(Context)
  const [pageNo,setPageNo] = pageNoContext
  const [user,setUser] = userContext
  const [data,setData]=useState({
    username:"",
    password:""
});
  const [errorMsg,seterrorMsg]=useState("")

useEffect(() => {
    axios.get('/api/users/logout')
      .then(res => {
        setUser({
          isAuth:false,
          name:'',
          email:''
        })
      })
  },[])

function handleChange(event){
    const {value,name}=event.target;
    setData({...data,[name]:value});
}

function handleSubmit(event){
  event.preventDefault()
  axios.post('/api/users/login',data)
  .then(res => {
    console.log(res)
    if(res.data.msg==='Correct'){
      setPageNo(0)
      setUser({
        isAuth:true,
        name:res.data.name,
        email:res.data.email
      })
      props.history.push("/posts")
    }
    else{
      seterrorMsg(res.data.msg)
    }
  })
  .catch(err => {
    console.log(err)
  })
}

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LogIn
        </Typography>
        <Typography variant="subtitle2" gutterBottom className={classes.error}>
          {errorMsg}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            value={data.email}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={handleChange}
            value={data.password}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            LogIn
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" className={classes.link}>
              <Typography variant="subtitle1" gutterBottom color='primary'>
                Don't have an account? Sign Up
              </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}