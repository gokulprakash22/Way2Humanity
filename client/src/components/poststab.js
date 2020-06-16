import React,{useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Paper,Tabs,Tab} from '@material-ui/core'
import {Context} from './index'

const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(6)
  }
}))

export default function PostsTab() {
  const classes = useStyles()
  const {pageNoContext} = useContext(Context)
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
  )
}