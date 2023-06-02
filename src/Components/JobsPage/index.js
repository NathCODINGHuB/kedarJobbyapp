import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileContainer from '../ProfileContainer'
import JobsItems from '../JobsItems'
// import EmploymentType from '../EmploymentType'
import './index.css'

class JobsPage extends Component {
  state = {
    jobsApi: 'Pending',
    EmploymentType: [],
    selectedSalaryRange: '',
    searchValue: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({jobsApi: 'Pending'})
    const {EmploymentType, selectedSalaryRange, searchValue} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${EmploymentType}&minimum_package=${selectedSalaryRange}&search=${searchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsApi: 'Success', jobsData: updatedData})
      // console.log(updatedData)
    } else {
      this.setState({jobsApi: 'Fail'})
    }
  }

  handleCheckboxChange = event => {
    const {id, checked} = event.target

    if (checked) {
      this.setState(
        prevState => ({
          EmploymentType: [...prevState.EmploymentType, id],
        }),
        this.getData,
      )
    } else {
      this.setState(
        prevState => ({
          EmploymentType: prevState.EmploymentType.filter(each => each !== id),
        }),
        this.get,
      )
    }
  }

  changeSalaryRange = event => {
    this.setState({selectedSalaryRange: event.target.value}, this.getData)
  }

  searchValueChanged = event => {
    this.setState({searchValue: event.target.value})
  }

  searchBnClicked = () => {
    this.getData()
  }

  keyDown = event => {
    if (event.key === 'Enter') {
      this.searchBnClicked()
    }
  }

  renderPendingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div className="jobsSuccessContainerEmpty">
          <img
            className="noJobsImg"
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          />
          <h1 className="noJobsHeading">No Jobs Found</h1>
          <p className="noJobsDESC">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }

    return (
      <ul className="jobsSuccessContainer">
        {jobsData.map(each => (
          <JobsItems data={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailView = () => (
    <div className="jobsDataFailContainer">
      <img
        className="noJobsImg"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.getData} className="RetryButtonFa" type="button">
        Retry
      </button>
    </div>
  )

  conditionalRender = () => {
    const {jobsApi} = this.state

    switch (jobsApi) {
      case 'Pending':
        return this.renderPendingView()

      case 'Success':
        return this.renderSuccessView()

      case 'Fail':
        return this.renderFailView()

      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    const {EmploymentType, selectedSalaryRange, searchValue} = this.state
    // console.log(employmentTypesList)
    // console.log(jobsApi)
    return (
      <div className="jobsPage">
        <Header />
        <div className="jobsPageContainer">
          <div className="filerContainer">
            <div className="searchContainerMobile">
              <input
                onChange={this.searchValueChanged}
                onKeyDown={this.keyDown}
                value={searchValue}
                placeholder="Search"
                className="searchBarDesktop"
                type="search"
              />
              <button
                onClick={this.searchBnClicked}
                className="searchButton"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <ProfileContainer />
            <hr className="horizontalRuler" />
            <h1 className="FilterHeading">Type of Employment</h1>

            <div>
              {employmentTypesList.map(employmentType => (
                <div
                  className="listContainer"
                  key={employmentType.employmentTypeId}
                >
                  <input
                    className="checkboxInput"
                    id={employmentType.employmentTypeId}
                    type="checkbox"
                    value={employmentType.employmentTypeId}
                    name="EmploymentType"
                    onChange={this.handleCheckboxChange}
                    checked={EmploymentType.includes(
                      employmentType.employmentTypeId,
                    )}
                  />
                  <label
                    className="labelText"
                    htmlFor={employmentType.employmentTypeId}
                  >
                    {employmentType.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className="horizontalRuler" />
            <h1 className="FilterHeading">Salary Range</h1>

            {salaryRangesList.map(salaryRange => (
              <div className="listContainer" key={salaryRange.salaryRangeId}>
                <input
                  type="radio"
                  id={salaryRange.salaryRangeId}
                  name="salaryRange"
                  value={salaryRange.salaryRangeId}
                  checked={selectedSalaryRange === salaryRange.salaryRangeId}
                  onChange={this.changeSalaryRange}
                />
                <label
                  className="labelText"
                  htmlFor={salaryRange.salaryRangeId}
                >
                  {salaryRange.label}
                </label>
              </div>
            ))}
          </div>

          <div className="dataContainer">
            <div className="searchContainerDesktop">
              <input
                onChange={this.searchValueChanged}
                onKeyDown={this.keyDown}
                value={searchValue}
                placeholder="Search"
                className="searchBarDesktop"
                type="search"
              />
              <button
                onClick={this.searchBnClicked}
                className="searchButton"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <div className="JobsInfoContainer">{this.conditionalRender()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsPage
