import React, { Component } from 'react';
import Comment from './Comment';
import Paper from 'material-ui/Paper';

class Comments extends Component {
  render() {
    return (
      <section>
        <h2 style={{margin: 20, color: '#777'}}>Comments</h2>
        <Paper style={style} zDepth={1} >
          {
            this.props.comments.map(c => <Comment comment={c} />)
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
  display: 'inline-block'
};

export default Comments;
