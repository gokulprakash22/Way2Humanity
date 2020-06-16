import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import {ListItem,ListItemSecondaryAction,ListItemText,IconButton,Chip,Divider,Hidden} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import {Context} from './index'

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
const {postsContext} = useContext(Context)
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
                label={(props.title.slice(0,12))+(props.title.length>12?'...':'')}
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
            label={(props.title.slice(0,12))+(props.title.length>12?'...':'')}
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
  )
}