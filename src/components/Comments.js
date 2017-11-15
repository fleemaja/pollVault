import React, { Component } from 'react';
import Comment from './Comment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Comments extends Component {
  state = {
    sortKey: 'popular'
  }

  handleSortKeyChange = (event, index, value) =>
    this.setState({ sortKey: value });

  render() {
    const comments = this.props.comments;
    const getVoteScore = (comment) => (
      comment.votes.reduce((accumulator, vote) => {
        return accumulator + (vote.isUpvote ? 1 : -1)
      }, 0)
    );
    const sortByKey = (sortKey) => (a, b) => {
      if (sortKey === 'popular') {
        return getVoteScore(b) - getVoteScore(a)
      } else {
        return (new Date(b.created) - new Date(a.created));
      }
    };
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
            <MenuItem value='popular' primaryText='Most Votes' />
            <MenuItem value='created' primaryText='Most Recent' />
          </SelectField>
        </section>
        <section style={style} >
          {
            comments
              .sort(sortByKey(this.state.sortKey))
              .map(c =>
                <Comment
                  handleCommentClick={this.props.handleCommentClick}
                  comment={c} />
              )
          }
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
