import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class ProfileContainer extends Component {
  state = {profileApi: 'Pending', profileData: null}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApi: 'Pending'})

    const url = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileApi: 'Success', profileData: updatedData})
    } else {
      this.setState({profileApi: 'Fail'})
    }
  }

  pending = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  Success = () => {
    const {profileData} = this.state
    // console.log(profileData)
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="SuccessContainer">
        <img className="profileImg" alt="profile" src={profileImageUrl} />

        <h1 className="profileName">{name}</h1>
        <p className="profileBio">{shortBio}</p>
      </div>
    )
  }

  retry = () => {
    this.getProfileDetails()
  }

  fail = () => (
    <div className="failContainer">
      <button onClick={this.retry} className="RetryButton" type="button">
        Retry
      </button>
    </div>
  )

  conditionalRender = () => {
    const {profileApi} = this.state

    switch (profileApi) {
      case 'Pending':
        return this.pending()

      case 'Success':
        return this.Success()

      case 'Fail':
        return this.fail()
      default:
        return null
    }
  }

  render() {
    return <>{this.conditionalRender()}</>
  }
}
export default ProfileContainer
