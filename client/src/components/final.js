import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline,Typography,Container,Button,Hidden} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles= makeStyles((theme) => ({
    grid:{
        marginTop: theme.spacing(15),
        padding:20
    },
    link:{
      textDecoration:'none'
    }
}))

export default function Final(props){
  const classes = useStyles()
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.grid}>
      <Hidden smUp>
      <Typography variant="h4" gutterBottom>
        Your Post Has Been {props.msg} 😀
      </Typography>
      </Hidden >
      <Hidden xsDown>
      <Typography variant="h2" gutterBottom>
        Your Post Has Been {props.msg} Successfully 😀
      </Typography>
      </Hidden>
      <Link to="/posts" className={classes.link}><Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
  Back To Home
</Button></Link>
      </Container>
    </React.Fragment>
  )
}