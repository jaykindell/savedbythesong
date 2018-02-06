import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    this.load();
  }
  
  load() {
    $.ajax({
        url: '/songs', 
        type: 'GET',
        success: (data) => {
          console.log(data);
          this.setState({
            items: data
          })
        },
        error: (err) => {
          console.log('err', err);
        }
      });
    }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: '/songs',
      contentType: 'application/json',
      data: JSON.stringify({ q: term }),//JSON!!!
      success: (data) => {
        console.log(`data posted`);
        this.load();
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  render () {
    return (<div>
      <h1>Save your Songs!</h1>
      <Search onSearch={this.search.bind(this)} />
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));