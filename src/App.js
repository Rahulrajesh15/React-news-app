import React, {useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers  from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import videoBg from './assets/videoBg.mp4';

const alanKey = process.env.REACT_APP_ALAN_KEY;

const App = () => {


  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
    useEffect(() => {
  var alanBtnInstance =  alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number}) => {
              switch (command) {
                 case 'newsHeadlines': 
                    setNewsArticles(articles);
                    console.log(articles[0].description);
                    setActiveArticle(-1); 
                     break; 

                 case 'highlight': 
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                    break;

                 case 'open':
                       const parsedNumber = number.length > 2 ? wordsToNumbers(number) : number;
                       const article = articles[parsedNumber - 1];

                       if (parsedNumber <= 20 && article) {
                          if (!alanBtnInstance.isActive()) {
                                alanBtnInstance.activate();
                           }
                        alanBtnInstance.playText('opening...');
                        window.open(article.url, '_blank');
                       } else {
                           if (!alanBtnInstance.isActive()) {
                                alanBtnInstance.activate();
                          }
                        alanBtnInstance.playText('Arcticle does not exist');
                       }
                    break;
                case 'read':
                  const num = number.length > 2 ? wordsToNumbers(number) : number;
                  const currentArticle = articles[num - 1];
                  const content = articles[num - 1].content;

                  if (num <= 20 && content) {
                     if (!alanBtnInstance.isActive()) {
                      alanBtnInstance.activate();
                      }
                      alanBtnInstance.playText('sure');
                      window.open(currentArticle.url, '_blank');
                      alanBtnInstance.playText(content);
                  } else {
                      if (!alanBtnInstance.isActive()) {                      
                        alanBtnInstance.activate();
                        }
                        alanBtnInstance.playText('Article does not exist');
                  }
                  break;
                default: 
                   console.log('invalid command');
                  
              }
            }
        });
    }, []);
  return (
    <div className={classes.main}>
    <div className={classes.overlay} style={{display: newsArticles.length === 0 ? 'flex' : 'none'}}></div>
    <video className={classes.video} style={{display: newsArticles.length === 0 ? 'flex' : 'none'}} src={videoBg} autoPlay loop muted/>
    <div className={classes.content}>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
    </div>
  )
}

export default App;