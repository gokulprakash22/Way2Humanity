import React, {useEffect,useContext} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import {CssBaseline,Grid,Zoom,Container,Divider,Typography,Hidden} from '@material-ui/core'
import WarningIcon from '@material-ui/icons/Warning'
import {Context,PostsTab,PostsTabMob,MyPosts,PostCard} from './index'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    marginTop:theme.spacing(16),
  },
  disclaimer:{
    marginTop: theme.spacing(4),
    textAlign:'center'
},
warning:{
  marginTop: theme.spacing(1)
}
}))


export default function PostsGrid() {
  const classes = useStyles()
  const {pageNoContext,postsContext} = useContext(Context)
  const [pageNo,setPageNo] = pageNoContext
  const [posts,setPosts] = postsContext

  useEffect(() => {
    axios.get('/api/posts/getposts')
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  return (
    <React.Fragment>
      <CssBaseline />
      <Hidden smUp>
      <PostsTabMob />
      </Hidden>
      <Hidden xsDown>
        <PostsTab />
      </Hidden>
        {pageNo===3?<MyPosts/>:
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {pageNo===0&&posts.map((post,index) => (
              <Zoom in={true} style={{ transitionDelay: '200ms'}} key={index}>
              <Grid item xs={12} sm={6} md={4}>
                <PostCard title={post.title} description={post.description} category={post.category} imgpath={post.imgpath} id={post._id}/>
              </Grid>
              </Zoom>
            ))}
            {pageNo===1&&posts.filter(post => post.category==='Volunteer').map((post,index) => (
              <Zoom in={true} style={{ transitionDelay: '200ms'}} key={index}>
              <Grid item xs={12} sm={6} md={4}>
                <PostCard title={post.title} description={post.description} category={post.category} imgpath={post.imgpath} id={post._id}/>
              </Grid>
              </Zoom>
            ))}
            {pageNo===2&&posts.filter(post => post.category!=='Volunteer').map((post,index) => (
              <Zoom in={true} style={{ transitionDelay: '200ms'}} key={index}>
              <Grid item xs={12} sm={6} md={4}>
                <PostCard title={post.title} description={post.description} category={post.category} imgpath={post.imgpath} id={post._id}/>
              </Grid>
              </Zoom>
            ))}
          </Grid>
          <div className={classes.disclaimer}>
            <Divider/>
            <WarningIcon  className={classes.warning} color='secondary' fontSize="small"/><br/>
            <Typography color='secondary' variant="button"> Disclaimer</Typography>
            <Typography color='secondary' variant="body2" gutterBottom>All information on this site is provided in good faith. However we make no representation or warranty of any kind regarding the accuracy, validity, reliability, availability or completeness of any information on this site.</Typography>
        </div>
        </Container>}
        
    </React.Fragment>
  )
}