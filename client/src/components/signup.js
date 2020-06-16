import React, {useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import {Avatar,Button,CssBaseline,TextField,Grid,Typography,Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import {Context} from './index'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  link:{
    textDecoration:'none'
  },
  error: {
    color:red[500]
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp(props) {
  const classes = useStyles()
  const {pageNoContext,userContext} = useContext(Context)
  const [pageNo,setPageNo] = pageNoContext
  const [user,setUser] = userContext
  const [data,setData]=useState({
      fname:"",
      lname:"",
      username:"",
      password:"",
      confirmpassword:""
  })
  const [error,setError] = useState({
    fname:false,
    lname:false,
    username:false,
    password:false,
    confirmpassword:false
  })
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

  const handleChange=(event) => {
      const {value,name}=event.target;
      setData({...data,[name]:value});
      setError({
        fname:false,
        lname:false,
        username:false,
        password:false,
        confirmpassword:false})
  }

  const handleSubmit=(event) => {
    event.preventDefault()
    axios.post('/api/users/signup', data)
    .then(res => {
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
        setError({...error,[res.data.element]:true})
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
          SignUp
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
        Welcome {data.fname} {data.lname}
      </Typography>
      <Typography variant="subtitle2" gutterBottom className={classes.error}>
          {errorMsg}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.fname}
                onChange={handleChange}
                value={data.fname}
                name="fname"
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.lname}
                onChange={handleChange}
                value={data.lname}
                name="lname"
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.username}
                onChange={handleChange}
                value={data.email}
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                name="username"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.password}
                error={(data.password.length>0 && data.password.length<8)||error.password}
                onChange={handleChange}
                value={data.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                helperText="Password should be minimum 8 characters"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={(data.confirmpassword.length>0 && data.confirmpassword!==data.password)||error.confirmpassword}
                onChange={handleChange}
                value={data.confirmpassword}
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link to="/login" className={classes.link}>
              <Typography variant="subtitle1" gutterBottom color='primary'>
                Already have an account? LogIn
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}