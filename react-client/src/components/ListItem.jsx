import React from 'react';

const ListItem = (props) => (
  <div>
    <ul>
      <li><a href= {props.item.lyricsUrl}> { props.item.songName }</a></li>
      <li>{ props.item.artist }</li>
    </ul>  
  </div>  
)

export default ListItem;