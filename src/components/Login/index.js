import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    submitMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    console.log(jwtToken)
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({submitMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, submitMsg, errorMsg} = this.state

    return (
      <div className="login-app-container">
        <div className="login-container">
          <div className="left-sm-container">
            <img
              src=" https://res.cloudinary.com/dmswymrzt/image/upload/v1644511404/Bookhub/login-sm_mqxitk.png"
              alt="login website logo"
              className="sm-img"
            />
          </div>
          <div className="left-container">
            <img
              src=" https://res.cloudinary.com/dmswymrzt/image/upload/v1643632908/Bookhub/bookhub-bg_u1re6y.png"
              alt="login website logo"
              className="img"
            />
          </div>
          <div className="right-container">
            <img
              src=" https://res.cloudinary.com/dmswymrzt/image/upload/v1643632925/Bookhub/bookhub-logo_y7ptgd.png"
              alt="website login"
              className="logo"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="name" className="label">
                UserName*
              </label>
              <input
                id="name"
                type="text"
                value={username}
                onChange={this.onChangeUserName}
              />
              <label htmlFor="password" className="label">
                password*
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={this.onChangePassword}
              />
              {submitMsg && <p className="error-msg">*{errorMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
