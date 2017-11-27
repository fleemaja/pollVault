import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { apiUpdateUserAvatar } from '../actions/users';
import { connect } from 'react-redux';
import { letterToHexColor } from '../helpers';

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
    const letter = user.username.charAt(0);
    const { imagePreviewUrl } = this.state
    return (
      <form>
        <section>
          {
            imagePreviewUrl ?
            <Avatar src={imagePreviewUrl} /> :
              (
                userPhoto
                  ? <Avatar src={`../uploads/${userPhoto}`} />
                  : <Avatar style={{backgroundColor: letterToHexColor[letter.toLowerCase()] || '#ddd', color: '#333'}}>{ letter }</Avatar>
              )
          }
          <input
            onChange={this.previewImageChange.bind(this)}
            type="file"
            ariaLabel="Choose Photo"
            style={{ marginLeft: 10 }}
            name="photo"
            id="photo"
            accept="image/gif, image/png, image/jpeg, image/jpg" />
        </section>
        <RaisedButton
          primary={true}
          style={{marginTop: 40}}
          onClick={this.handleSubmit.bind(this)}
          label="save" />
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
