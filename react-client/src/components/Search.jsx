import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Sing another song...</h4>
      Enter a title: <input value={this.state.terms} onChange={this.onChange} />
      <button onClick={this.search}> Get Lyrics </button>
    </div>)
  }
}

export default Search;