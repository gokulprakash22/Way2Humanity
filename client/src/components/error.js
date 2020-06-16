import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import WarningIcon from '@material-ui/icons/Warning';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(20),
      textAlign:'center',
      
    }
}))

export default function Error(){
    const classes = useStyles();
    return(
    <Typography variant="h5" gutterBottom className={classes.root} color='secondary'>
    <WarningIcon fontSize="large"/><br/>404 Error<br/>(Page Not Found)
  </Typography>
    )
}