import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { apiUpdateUserAvatar } from '../actions/users';
import { connect } from 'react-redux';

class UserAvatarForm extends Component {
  state = {
    photo: '',
    imagePreviewUrl: ''
  }

  previewImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photo: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const photo = this.state.photo;
    if (photo) {
      this.props.handleClose();
      this.props.updateUser(photo);
    }
  }

  render() {
    const user = this.props.auth.user
    const userPhoto = user.photo
    const { photo, imagePreviewUrl } = this.state
    return (
      <form>
        {
          imagePreviewUrl ?
          <Avatar src={imagePreviewUrl} /> :
          <Avatar
            src={userPhoto ? `/uploads/${userPhoto}` : ''}>
            { user.username.substring(0, 3) }
          </Avatar>
        }
        <label for="photo">
          <span>Choose Photo</span>
          <input
            onChange={this.previewImageChange.bind(this)}
            type="file"
            name="photo"
            id="photo"
            accept="image/gif, image/png, image/jpeg, image/jpg" />
          <RaisedButton
            onClick={this.handleSubmit.bind(this)}
            label="submit" />
        </label>
      </form>
    )
  }
}

function mapStateToProps ({ auth }) {
  return { auth }
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: (photo) => dispatch(apiUpdateUserAvatar(photo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAvatarForm);
