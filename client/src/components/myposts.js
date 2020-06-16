import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert';
import {List,Grid,Typography,Container,CssBaseline,Fab,Zoom,Fade,Collapse,IconButton} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
import {Context,MyPostList} from './index'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%'
  },
  link:{
    textDecoration:'none',
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
    textAlign:'center'
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}))


export default function MyPosts() {
  const classes = useStyles();
  const {postsContext,userContext} = useContext(Context)
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
  )
}