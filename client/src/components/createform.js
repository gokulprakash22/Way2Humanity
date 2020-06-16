import React, {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red'
import {Avatar,Button,CssBaseline,TextField,Radio,RadioGroup,FormControl,FormControlLabel,FormLabel,IconButton,Typography,Fade,Container} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment';
import CloseIcon from '@material-ui/icons/Close';
import {Context,Final} from './index'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  close: {
    marginTop: theme.spacing(6),
    color:red[500]
  },
  error: {
    color:red[500]
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}))

export default function CreateForm(props){
  const classes = useStyles()
  const {userContext} = useContext(Context)
  const [user,setUser] = userContext
  const [status,setStatus]=useState(false)
  const [data, setData] = useState({
    name:user.name,
    emailid:user.email,
    category:'',
    title:'',
    description:'',
    contact:''
  });
  const [image,setImage] = useState(null)
  const [error,setError] = useState({
    category:false,
    title:false,
    description:false,
    contact:false,
    image:false
  })
  const [errorMsg,setErrorMsg] = useState('')
    
  const handleevent=(event) =>{
    const {name,value}=event.target;
    if(name==='title' && value.length>30){
      setError({...error,title:true})
    }
    else if(name==='description' && value.length>1000){
      setError({...error,description:true})
    }
    else if(name==='contact' && value.length>250){
      setError({...error,contact:true})
    }
    else{
      setData({...data,[name]:value})
      setError({
        category:false,
        title:false,
        description:false,
        contact:false,
        image:false})
    }
  }
  const handleimage=(event) =>{
    setImage(event.target.files[0])
  }
  const changestatus=(event) =>{
    event.preventDefault()
    const formData = new FormData();
    formData.append('file',image)
    formData.append('name',data.name)
    formData.append('emailid',data.emailid)
    formData.append('category',data.category)
    formData.append('title',data.title)
    formData.append('description',data.description)
    formData.append('contact',data.contact)
    axios.post('/api/posts/createpost',formData,{headers:{'Content-Type':'multipart/form-data'}})
      .then(res => {
        if(res.data.msg==='Correct'){
          setStatus(true)
        }
        else{
          setErrorMsg(res.data.msg)
          setError({...error,[res.data.element]:true})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
    
return(
  status?<Final msg="Created"/>:
  <Fade in={true}>
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Link to="/posts">
      <IconButton className={classes.close}>
        <CloseIcon/>
      </IconButton>
      </Link>
      <div className={classes.paper}>
      
        <Avatar className={classes.avatar}>
            <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Fill Up The Details
        </Typography>
        <Typography variant="subtitle2" gutterBottom className={classes.error}>
          {errorMsg}
        </Typography>
        <form className={classes.form} noValidate>
          <FormControl component="fieldset" required error={error.category}>
            <FormLabel component="legend">Category</FormLabel>
            <RadioGroup row name="category" value={data.category} onChange={(event)=>setData({...data,category:event.target.value})}>
            <FormControlLabel value="Volunteer" control={<Radio />} label="I'm Volunteer" />
            <FormControlLabel value="Need Help" control={<Radio />} label="I Need Help" />
            </RadioGroup>
          </FormControl>
          <TextField
            error={error.title}
            margin="normal"
            required
            fullWidth
            name="title"
            label="Title"
            value={data.title}
            helperText={(30-(data.title.length))+' characters left'}
            variant="outlined"
            onChange={handleevent}
          />
          <TextField
            error={error.description}
            margin="normal"
            required
            fullWidth
            name="description"
            label="Description"
            multiline
            value={data.description}
            helperText={(1000-(data.description.length))+' characters left'}
            variant="outlined"
            onChange={handleevent}
          />
          <TextField
            error={error.contact}
            margin="normal"
            required
            fullWidth
            name="contact"
            label="Contact/Donation Details"
            multiline
            value={data.contact}
            helperText={(250-(data.contact.length))+' characters left'}
            variant="outlined"
            onChange={handleevent}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="image"
            label="Image"
            type="file"
            InputLabelProps={{shrink: true}}
            variant="outlined"
            onChange={handleimage}
          />
          <TextField
            margin="normal"
            fullWidth
            multiline
            label="Submitted By"
            defaultValue={data.name+' ('+data.emailid+')'}
            variant="outlined"
            disabled
        />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={changestatus}
          >
            Post
          </Button>
        </form>
      </div>
    </Container>
    </Fade>
  )
}