import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'

const useStyles= makeStyles((theme) => ({
    copyright:{
        position:'absolute',
        bottom:0,
        width:'100%',
        backgroundColor:blueGrey[500],
        color:'white',
        padding: theme.spacing(1),
        textAlign:'center',
    }
}))

export default function Footer(){
    const classes = useStyles()
    return(
        <div className={classes.copyright}>
        <Typography variant="caption">&copy; Copyright Way2Humanity {new Date().getFullYear()}</Typography>
        </div>
    )
}
