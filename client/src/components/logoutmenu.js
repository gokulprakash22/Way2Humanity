import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {Button,Menu,List,ListItem,ListItemIcon,ListItemText,Hidden} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import {Context} from './index'

const useStyles = makeStyles((theme) => ({
    text: {
      color:'white'
    },
    link: {
      color:'black',
      textDecoration:'none'
    }
  }));

export default function LogoutMenu(props) {
    const classes = useStyles();
    const {userContext} = useContext(Context)
    const [user,setUser] = userContext
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button  className={classes.text} onClick={handleClick}>
        <Hidden xsDown>
        {user.name}
        </Hidden>
        <AccountBoxIcon style={{marginLeft:5}} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
        <Link to="/login" className={classes.link}>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <ExitToAppIcon color="secondary"/>
          </ListItemIcon>
          <ListItemText primary="LOGOUT" />
        </ListItem>
        </Link>
        </List>
        
      </Menu>
    </div>
  )
}