import React,{useState,useContext} from 'react';
import {Context} from './context.js';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(6),
  },
}));

export default function PostsTab() {
  const classes = useStyles();
  const {pageNoContext,postsContext} = useContext(Context)
  const [pageNo,setPageNo] = pageNoContext



  return (
   
    <Paper className={classes.root}   position="fixed">
      <Tabs
        value={pageNo}
        onChange={(event,value) => setPageNo(value)}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab wrapped label="All" />
        <Tab wrapped label="Volunteers" />
        <Tab wrapped label="Need Help" />
        <Tab wrapped label="My Posts" />
      </Tabs>
    </Paper>
          
  );
}