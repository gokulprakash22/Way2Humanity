import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  icon:{
    color: 'white',
  },
  link:{
    color: 'black',
    textDecoration:'none'
  },
}));

export default function LSMenu() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MenuIcon className={classes.icon}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <List>
        <Link to='/login' className={classes.link}>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <VpnKeyIcon color="secondary"/>
          </ListItemIcon>
          <ListItemText primary="LOGIN" />
        </ListItem>
        </Link>
        <Link to='/signup' className={classes.link}>
        <ListItem button onClick={handleClose}>
          <ListItemIcon>
            <AccountCircleIcon color="secondary"/>
          </ListItemIcon>
          <ListItemText primary="SIGNUP" />
        </ListItem>
        </Link>
      </List>
      </Menu>
    </div>
  );
}