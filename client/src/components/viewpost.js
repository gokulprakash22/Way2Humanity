import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import {Card,CardActions,CardContent,CardMedia,Button,Typography,Chip,Container,CssBaseline,TextField} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  link: {
    textDecoration:'none'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}))

export default function ViewPost(props) {
  const classes = useStyles()
  const id=props.match.params.id
  const [data,setData] = useState({})

  useEffect(() => {
    axios.get('/api/posts/getpost/'+id)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  return (
    <React.Fragment>
    <CssBaseline />
      <Container className={classes.cardGrid} maxWidth="md">
    <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={data.imgpath}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                  {data.category==='Volunteer'?
                  <Chip
                    icon={<AccessibilityNewIcon  fontSize="small" />}
                    label="Volunteer"
                    color="primary"
                  />:
                  <Chip
                    icon={<PriorityHighIcon  fontSize="small" />}
                    label="Need Help"
                    color="secondary"
                  />}
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.title} 
                    </Typography>
                    <Typography>
                      {data.description}
                    </Typography>
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      name="contact details"
                      label="Contact/Donation Details"
                      defaultValue={data.contact}
                      multiline
                      InputLabelProps={{shrink: true}}
                      InputProps={{readOnly: true}}
                    />
                    <Typography variant="button">
                      Posted By :<br/>
                    </Typography>
                      <Chip variant="outlined" color="secondary" icon={<FaceIcon />} label={data.name} style={{marginLeft:5}}/>
                      <Chip variant="outlined" color="secondary" icon={<MailOutlineIcon />} label={data.emailid} style={{marginLeft:5}}/><br/>
                    <Typography variant="body2" style={{marginLeft:5}}>
                      Date-{data.date}<br/>Time-{data.time}
                    </Typography>
                  </CardContent>  
                  <CardActions> 
                    <Button size="small" style={{marginLeft:'auto'}}>
                    <Link to='/posts' className={classes.link} color="primary">
                      Back
                    </Link>
                    </Button> 
                  </CardActions>
                </Card>
                </Container>
    </React.Fragment>
  )
}