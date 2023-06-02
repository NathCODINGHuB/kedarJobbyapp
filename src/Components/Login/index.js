import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {UserName: '', PassWord: '', error: false, errorMsg: ''}

  formSubmitted = async event => {
    event.preventDefault()

    this.setState({error: false})
    const {UserName, PassWord} = this.state
    const url = 'https://apis.ccbp.in/login'
    const data = {username: UserName, password: PassWord}

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)

    const ApiResult = await response.json()

    if (response.ok) {
      // console.log(ApiResult.jwt_token)
      const {history} = this.props
      Cookies.set('jwt_token', ApiResult.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({error: true, errorMsg: ApiResult.error_msg})
      // console.log(response)
    }
  }

  userNameChanged = event => {
    this.setState({UserName: event.target.value})
  }

  passwordChanged = event => {
    this.setState({PassWord: event.target.value})
  }

  ErrorMsg = () => {
    const {error, errorMsg} = this.state
    if (error) {
      return <p className="errorMsg">* {errorMsg}</p>
    }
    return null
  }

  render() {
    const {UserName, PassWord} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginPage">
        <form onSubmit={this.formSubmitted} className="formContainer">
          <img
            className="loginLogo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />

          <label className="label" htmlFor="UserName">
            USERNAME
          </label>
          <input
            value={UserName}
            onChange={this.userNameChanged}
            placeholder="Username"
            className="input"
            id="UserName"
            type="text"
          />
          <label className="label" htmlFor="PassWord">
            PASSWORD
          </label>
          <input
            onChange={this.passwordChanged}
            value={PassWord}
            placeholder="Password"
            className="input"
            id="PassWord"
            type="password"
          />
          <button className="loginButton" type="submit">
            Login
          </button>
          {this.ErrorMsg()}
        </form>
      </div>
    )
  }
}
export default Login
