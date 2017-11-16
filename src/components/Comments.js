import React, { Component } from 'react';
import Comment from './Comment';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { setAndSortComments } from '../actions/comments';

class Comments extends Component {
  state = {
    sortKey: 'popular'
  }

  handleSortKeyChange = (event, index, value) => {
    const { comments } = this.props
    const sortKey = value
    this.setState({ sortKey });
    this.props.setAndSortComments(comments, sortKey)
  }

  render() {
    const { comments } = this.props;
    const { sortKey } = this.state;
    return (
      <section>
        <section>
          <h2 style={{margin: 20, display: 'inline-block', verticalAlign: 'middle', color: '#333'}}>{ comments.length } Comments</h2>
          <SelectField
            floatingLabelText="Sort By"
            value={sortKey}
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

function mapStateToProps ({ comments }) {
  return { comments }
}

function mapDispatchToProps(dispatch) {
  return {
    setAndSortComments: (comments, sortType) => dispatch(setAndSortComments(comments, sortType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
