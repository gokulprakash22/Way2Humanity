import React,{useContext} from 'react';
import {Context} from './context.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import red from '@material-ui/core/colors/red';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link:{
      textDecoration:'none',
      color:'black'
    },
    delete: {
      color:red[500]
    },
    
  }));

export default function MyPostList(props) {
const classes = useStyles();
const id=props.id
const {pageNoContext,postsContext} = useContext(Context)
const [pageNo,setPageNo] = pageNoContext
const [posts,setPosts] = postsContext

const handleDelete = () =>{
    axios.delete('/api/posts/deletepost/'+id)
      .then((res) => {
        props.handleOpen()
      })
      .catch((err) => {
        console.log(err)
      })
    setPosts(posts.filter(post => post._id!==id))
}
  return (
    <>
        <ListItem>
        {props.category==='Volunteer'?<>
        <Hidden smUp>
        <Link to={'/posts/'+id} className={classes.link}>
            <Chip
                icon={<AccessibilityNewIcon  fontSize="small" />}
                label={(props.title.slice(0,12))+(props.title.length>12&&'...')}
                color="primary"
                style={{marginRight:10}}
        />
        </Link>
        </Hidden>
        <Hidden xsDown>
        <Link to={'/posts/'+id} className={classes.link}>
        <Chip
                icon={<AccessibilityNewIcon  fontSize="small" />}
                label="Volunteer"
                color="primary"
                style={{marginRight:10,width:130}}
        />   
        </Link>
        <Link to={'/posts/'+id} className={classes.link}>
         <ListItemText primary={props.title} />
         </Link>
        </Hidden></>:<>
        <Hidden smUp>
        <Link to={'/posts/'+id} className={classes.link}>
        <Chip
            icon={<PriorityHighIcon  fontSize="small" />}
            label={(props.title.slice(0,12))+(props.title.length>12&&'...')}
            color="secondary"
            style={{marginRight:10}}
        />
        </Link>
        </Hidden>
        <Hidden xsDown>
        <Link to={'/posts/'+id} className={classes.link}>
        <Chip
            icon={<PriorityHighIcon  fontSize="small" />}
            label="Need Help"
            color="secondary"
            style={{marginRight:10,width:130}}
        />
        </Link>
        <Link to={'/posts/'+id} className={classes.link}>
        <ListItemText primary={props.title} />
        </Link>
        </Hidden></>}
        
           
            
            <ListItemSecondaryAction>
            <Link to={'/updateform/'+id}>
            <IconButton edge="end">
                <EditIcon color='primary'/>
            </IconButton>
            </Link>
            <IconButton edge="end" onClick={handleDelete}>
                <DeleteIcon className={classes.delete}/>
            </IconButton>
            </ListItemSecondaryAction>
            
        </ListItem>
        
        <Divider />
            </>
  );
}