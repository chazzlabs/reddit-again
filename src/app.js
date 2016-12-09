import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import RedditAgain from './components/reddit-again';

$(function() {
  ReactDOM.render(
    <RedditAgain />,
    document.getElementById('reddit-again')
  );
})
