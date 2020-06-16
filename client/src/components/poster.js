import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import {Slide,Grid,Container,Typography,Paper,List,ListItem,Divider,IconButton,Tooltip,ClickAwayListener,Hidden} from '@material-ui/core'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import {Context} from './index'

const useStyles= makeStyles((theme) => ({
    grid:{
        marginTop: theme.spacing(15),
        paddingLeft:theme.spacing(4),
        zIndex: 1,
        position: 'relative'
       
    },
   grid2:{
       padding:10
   },
    paper:{
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
      img: {
        width: '100%',
        height: '100%',
      },
    text:{
        color:'white',
        textTransform:'Capitalize'
    }
}))

export default function Poster(){
    const classes = useStyles()
    const {userContext} = useContext(Context)
    const [user,setUser] = userContext
    const [open1, setOpen1] = useState(false);
    const handleTooltipClose1 = () => {
        setOpen1(false);
    }
    const handleTooltipOpen1 = () => {
        setOpen1(true);
    }
    const [open2, setOpen2] = useState(false);
    const handleTooltipClose2 = () => {
        setOpen2(false);
    }
    const handleTooltipOpen2 = () => {
        setOpen2(true);
    }
    useEffect(() => {
        axios.get('/api/users/logout')
          .then(res => {
            setUser({
              isAuth:false,
              name:'',
              email:''
            })
          })
      },[])
    return(
        <>
        <div className='poster'>
            <Grid container>
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                <Grid item  className={classes.grid} xs={12} sm={7}>
                    <Hidden mdUp>
                    <Typography variant="h3" gutterBottom className={classes.text}>Be the reason someone smiles.</Typography>
                    </Hidden>
                    <Hidden smDown>
                    <Typography variant="h2" gutterBottom className={classes.text}>Be the reason someone smiles.</Typography>
                    </Hidden>
                    <Typography variant="button" display="block" gutterBottom  className={classes.text}>You Don't Need Reason To Help Others.<br/>Sharing is Caring</Typography>
                </Grid>
            </Slide>
            </Grid>
        </div>
        <div>
        <Container maxWidth="md">
        <Paper elevation={3} className={classes.paper}>
        <Grid container>
            <Grid item xs={12} sm={4}>
                <img src='../img/img1.jpg' className={classes.img} alt='Teddy'/>
            </Grid>
            <Grid item className={classes.grid2} xs={12} sm={8}>
            <List>
            <ListItem>
            <Typography variant="h5" gutterBottom>Anyone who need help can post their needs here.</Typography>
            <ClickAwayListener onClickAway={handleTooltipClose1}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose1}
                open={open1}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Need Help Symbol"
                arrow
              >
            <IconButton edge="end" onClick={handleTooltipOpen1}>
                <PriorityHighIcon color='secondary'/>
            </IconButton>
            </Tooltip>
            </div>
          </ClickAwayListener>
            </ListItem>
            <Divider />
            <ListItem>
            <Typography color='secondary' variant="subtitle2" style={{textAlign:'center'}} gutterBottom>Volunteers can contact them and help them.</Typography>
            </ListItem>
            </List>
            </Grid>
        </Grid>
        </Paper>
        <Paper elevation={3} className={classes.paper}>
        <Grid container>
        <Hidden smUp>
            <Grid item xs={12} sm={4}>
                <img src='../img/img2.jpg' className={classes.img} alt='Hands'/>
            </Grid>
        </Hidden>
            <Grid item className={classes.grid2} xs={12} sm={8}>
            <List>
            <ListItem>
            <Typography variant="h5" gutterBottom>Volunteers who ready to help in anyway can also post here.</Typography>
            <ClickAwayListener onClickAway={handleTooltipClose2}>
            <div>
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose2}
                open={open2}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Volunteer Symbol"
                arrow
              >
            <IconButton edge="end" onClick={handleTooltipOpen2}>
                <AccessibilityNewIcon color='primary'/>
            </IconButton>
            </Tooltip>
            </div>
          </ClickAwayListener>
            </ListItem>
            <Divider />
            <ListItem>
            <Typography color='primary' variant="subtitle2" style={{textAlign:'center'}} gutterBottom>Anyone can contact the volunteers and get their help.</Typography>
            </ListItem>
            </List>
            </Grid>
        <Hidden xsDown>
            <Grid item xs={12} sm={4}>
                <img src='../img/img2.jpg' className={classes.img} alt='Hands'/>
            </Grid>
        </Hidden>
        </Grid>
        </Paper>
        </Container>
    </div>
    </>
    )
}
