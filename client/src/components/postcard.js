import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
link: {
  textDecoration:'none',  
},
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));

export default function PostCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={'./uploads/'+props.imgpath}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                  
                    <Typography gutterBottom variant="h5" component="h2">
                      {props.title}
                      
                    </Typography>
                    
                    <Typography>
                      {props.description.slice(0,75)}{(props.description.length)>75 && '...'}
                    </Typography>
                  </CardContent>
                  
                  <CardActions>
                  {props.category==='Volunteer'?
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
                  
                    <Button size="small" style={{marginLeft:'auto'}}>
                    <Link to={'/posts/'+props.id} className={classes.link}  color="primary">
                      View
                    </Link>
                    </Button>
                    
                    
                  </CardActions>
                </Card>
  );
}