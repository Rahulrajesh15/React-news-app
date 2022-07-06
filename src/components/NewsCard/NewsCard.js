import React , { useState, useEffect, createRef } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import classNames from 'classnames';



const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, index }) => {

  const classes = useStyles();
  const [elementRefs, setElementRefs] = useState([]);

  const scrollToRef = (ref) => {
    window.scroll(0, ref.current.offsetTop - 50);
  }
 
  //setting referece for twenty array items.
  useEffect(() => {
    setElementRefs((refs) => Array(20).fill().map((_, i) => refs[i] || createRef())); 
  }, []);

  //scrolling to particular ref when any of given dependencies changes
 useEffect(() => {
    if ( index === activeArticle && elementRefs[activeArticle] ) {
      scrollToRef(elementRefs[activeArticle]);
    }
 }, [index, activeArticle, elementRefs]);
  return (
    <Card ref={elementRefs[index]} className={classNames(classes.card, activeArticle === index ? classes.activeCard: null)}>
      <CardActionArea href={url} target="_blank">
         <CardMedia className={classes.media} image={urlToImage || "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_640.jpg"}/>
         <div className={classes.details}>
            <Typography variant="body-2" color="textSecondary" component="p">{(new Date(publishedAt)).toDateString()}</Typography>
            <Typography variant="body-2" color="textSecondary" component="p">{source.name}</Typography>
        </div>
            <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
            <Button size="small" color="primary">Learn More</Button>
            <Typography variant="h5" color="textSecondary">{index + 1}</Typography>
      </CardActions>
    </Card>  
  )
}

export default NewsCard;