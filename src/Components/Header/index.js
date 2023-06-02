import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="HeaderContainer">
      <div className="HeaderContentContainer">
        <Link to="/" className="logoContainer">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="deskTopLinkContainer">
          <Link className="Link" to="/">
            <li className="Home">Home</li>
          </Link>
          <Link className="Link" to="/jobs">
            <li className="Jobs">Jobs</li>
          </Link>
        </ul>
        <div className="DesktopLogoutBnContainer">
          <button onClick={logOut} className="button" type="button">
            Logout
          </button>
        </div>

        <div className="mobileButtonsContainer">
          <Link className="Link" to="/">
            <AiFillHome className="icons hi" />
          </Link>
          <Link className="Link" to="/jobs">
            <BsBriefcaseFill className="icons ji" />
          </Link>

          <button onClick={logOut} className="mobileLogOutBn li" type="button">
            <FiLogOut className="icons" />
          </button>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Header)
