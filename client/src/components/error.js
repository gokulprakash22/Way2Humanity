import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {Typography,Button} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(20),
      textAlign:'center'
    },
    link:{
      textDecoration:'none',
      display:'flex',
      justifyContent:'center'
    },
}))

export default function Error(){
    const classes = useStyles()
    return(
    <>
    <Typography variant="h5" gutterBottom className={classes.root} color='secondary'>
    <WarningIcon fontSize="large"/><br/>404 Error<br/>(Page Not Found)
    </Typography>
    <Link to="/" className={classes.link}><Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
    Back To Home
    </Button>
    </Link>
    </>
    )
}