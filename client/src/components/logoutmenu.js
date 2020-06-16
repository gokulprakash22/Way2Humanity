import React,{useState,useContext} from 'react';
import {Context} from './context.js';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Hidden from '@material-ui/core/Hidden';
import {Link} from 'react-router-dom';

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
  );
}