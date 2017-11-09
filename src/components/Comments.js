import React, { Component } from 'react';
import Comment from './Comment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactList from 'react-list';

class Comments extends Component {
  state = {
    sortKey: 'votes'
  }

  handleSortKeyChange = (event, index, value) =>
    this.setState({sortKey: value});

  renderItem = (index, key) => {
    const comment = this.props.comments[index];
    return <Comment key={key} comment={comment} />
  }

  render() {
    const comments = this.props.comments;
    return (
      <section>
        <section>
          <h2 style={{margin: 20, display: 'inline-block', verticalAlign: 'middle', color: '#333'}}>{ comments.length } Comments</h2>
          <SelectField
            floatingLabelText="Sort By"
            value={this.state.sortKey}
            onChange={this.handleSortKeyChange}
            style={{width: 150, marginLeft: '40px', display: 'inline-block', verticalAlign: 'middle',}}
          >
            <MenuItem value='votes' primaryText='Most Votes' />
            <MenuItem value='timestamp' primaryText='Most Recent' />
          </SelectField>
        </section>
        <section style={style}>
          <ReactList
            itemRenderer={this.renderItem.bind(this)}
            length={comments.length}
            type='variable'
          />
        </section>
      </section>
    )
  }
}

const style = {
  maxWidth: 900,
  margin: 20,
  padding: 20,
  textAlign: 'center',
  display: 'block'
};

export default Comments;
