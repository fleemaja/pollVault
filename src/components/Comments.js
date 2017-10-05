import React, { Component } from 'react';
import Comment from './Comment';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Comments extends Component {
  state = {
    sortKey: 'votes'
  }

  handleSortKeyChange = (event, index, value) =>
    this.setState({sortKey: value});

  render() {
    const comments = this.props.comments;
    const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];
    return (
      <section>
        <h2 style={{margin: 20, color: '#777'}}>{ comments.length } Comments</h2>
        <SelectField
          floatingLabelText="Sort By"
          value={this.state.sortKey}
          onChange={this.handleSortKeyChange}
          style={{width: 150, marginLeft: '40px'}}
        >
          <MenuItem value='votes' primaryText='Most Votes' />
          <MenuItem value='timestamp' primaryText='Most Recent' />
        </SelectField>
        <Paper style={style} zDepth={1} >
          {
            comments
              .sort(sortByKey(this.state.sortKey))
              .map(c => <Comment comment={c} />)
          }
        </Paper>
      </section>
    )
  }
}

const style = {
  width: 600,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'block'
};

export default Comments;
