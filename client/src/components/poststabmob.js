import React,{useState,useContext} from 'react';
import {Context} from './context.js';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(6),
  },
}));

const options = [
  'All Posts',
  'Volunteers Posts',
  'Need Help Posts',
  'My Posts'
];

export default function PostsTabMob() {
  const classes = useStyles();
  const {pageNoContext,postsContext} = useContext(Context)
  const [pageNo,setPageNo] = pageNoContext
  const [posts,setPosts] = postsContext
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(pageNo);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setPageNo(index)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
          button
          
          onClick={handleClickListItem}
        >
          <ListItemText primary="Show Me" secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}