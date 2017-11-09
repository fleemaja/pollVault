import React, { Component } from 'react';
import Comment from './Comment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactList from 'react-list';

class Comments extends Component {
  state = {
    sortKey: 'votes',
    showReplies: []
  }

  componentWillReceiveProps = (nextProps) => {
    const commentsLength = nextProps.comments.length;
    const showReplies = Array.apply(null, Array(commentsLength))
                             .map(() => false)
    this.setState({ showReplies })
  }

  handleSortKeyChange = (event, index, value) =>
    this.setState({sortKey: value});

  handleToggleReplies = (index) => {
    const showReplies = [
      ...this.state.showReplies.slice(0, index),
      !this.state.showReplies[index],
      ...this.state.showReplies.slice(index + 1)
    ]
    this.setState({ showReplies })
  }

  renderItem = (index, key) => {
    const comment = this.props.comments[index];
    const showReplies = this.state.showReplies[index];
    return <Comment
             key={key}
             comment={comment}
             showReplies={showReplies}
             handleToggleReplies={() => this.handleToggleReplies(index)}
           />
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
