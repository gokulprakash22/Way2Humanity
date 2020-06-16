import React,{useState,useEffect,useContext} from 'react';
import {Context} from './context.js';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import UpdateForm from './updateform.js';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyPostList from './mypostlist.js';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  link:{
    textDecoration:'none',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    textAlign:'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


export default function MyPosts() {
  const classes = useStyles();
  const {pageNoContext,postsContext,userContext} = useContext(Context)
  const [pageNo,setPageNo] = pageNoContext
  const [posts,setPosts] = postsContext
  const [user,setUser] = userContext
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <React.Fragment>
    <CssBaseline />
      <Container className={classes.cardGrid} maxWidth="md">
    <div className={classes.root}>
    <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Your Post Has Been Deleted Successfully
        </Alert>
      </Collapse>
    <Fade in={true} style={{ transitionDelay: '200ms'}}>
      <Link to='/createform' className={classes.link}>
        <Fab variant="extended" color='primary'>
        <AddIcon className={classes.extendedIcon}/>
        Add Post
        </Fab>
      </Link>
      </Fade>
          <div className={classes.demo}>
            {posts.filter(post => post.emailid===user.email).length===0?<Typography variant="subtitle2" gutterBottom>
              No Posts Has Been Created Yet
            </Typography>:
            <List>
            <Grid container spacing={1}>
            {posts.filter(post => post.emailid===user.email).map((post,index) => (
              <Zoom in={true} style={{ transitionDelay: '200ms'}} key={index}>
                <Grid item xs={12}>
                <MyPostList  key={index} title={post.title} category={post.category} id={post._id} handleOpen={handleOpen}/>
                </Grid>
              </Zoom>
            ))}
            </Grid>
            </List>}
          </div>
       
    </div>
    </Container>
    </React.Fragment>
  );
}