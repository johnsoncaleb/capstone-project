import React, { useState, useEffect } from 'react';
import axios from 'axios';



const API_KEY = process.env.REACT_APP_API_KEY;



export const NewsAPI = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const response = await axios.get('https://api.newscatcherapi.com/v2/search', {
        params: {
          q: 'covid', // search query
          lang: 'en', // language of articles
          sort_by: 'relevancy', // sort by relevancy
          page: 1, // page number
          page_size: 10, // number of results per page
        },
        headers: {
          'x-api-key': API_KEY, // API key
        },
      });

      setNews(response.data.articles);
    };

    getNews();
  }, []);

  return (
    <div className='articles'>
      {news.map((article) => (
        <div className='article' key={article._id}>
          <h3 className='article-title'>{article.title}</h3>
          <p className='article-summary'>{article.summary}</p>
          <a className='read-more' href={article.link} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};
