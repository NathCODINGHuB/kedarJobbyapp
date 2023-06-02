import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import Skill from '../Skill'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class JobDetailsPage extends Component {
  state = {DetailJobsApi: 'Pending', jobDetails: '', similarJobs: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({DetailJobsApi: 'Pending'})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const upDatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,

          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,

          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },

          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(skill => ({
            imageUrl: skill.image_url,
            name: skill.name,
          })),
          title: data.job_details.title,
        },
        similarJobs: data.similar_jobs.map(smJob => ({
          companyLogoUrl: smJob.company_logo_url,
          employmentType: smJob.employment_type,
          id: smJob.id,
          jobDescription: smJob.job_description,
          location: smJob.location,
          rating: smJob.rating,
          title: smJob.title,
        })),
      }

      this.setState({
        similarJobs: upDatedData.similarJobs,
        DetailJobsApi: 'Success',
        jobDetails: upDatedData.jobDetails,
      })
    } else {
      this.setState({DetailJobsApi: 'Fail'})
    }
  }

  renderPendingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      employmentType,
      location,
      packagePerAnnum,
      companyWebsiteUrl,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails

    console.log(jobDetails)
    console.log(similarJobs)
    return (
      <div className="jobDetailSuccessContainer">
        <div className="CompanyDetailsContainer">
          <div className="DetailHeaderContainer">
            <img
              className="detailLogo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="detailTitleContainer">
              <h1 className="jobDetailsTitle">{title}</h1>
              <div className="DetailRatingContainer">
                <AiFillStar className="rating" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="jobItemsInfoContainer">
            <MdLocationOn />
            <p className="location">{location}</p>
            <BsFillBriefcaseFill className="breCase" />
            <p className="location">{employmentType}</p>
            <p className="Package">{packagePerAnnum}</p>
          </div>
          <div className="DesHeadingContainer">
            <h1 className="descDet">Description</h1>
            <a href={companyWebsiteUrl} className="DetailLink">
              Visit
              <BiLinkExternal className="LinkLogo" />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1 className="descDet">Skills</h1>
          <ul className="SkillsContainer">
            {skills.map(each => (
              <Skill data={each} key={each.name} />
            ))}
          </ul>
          <h1 className="descDet">Life at Company</h1>
          <div className="CompanyLifeContainer">
            <p className="lifeAtCompany">{lifeAtCompany.description}</p>
            <img
              className="companyImg"
              alt="life at company"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>
        <h1 className="descDet">Similar Jobs</h1>
        <ul className="SimilarJobContainer">
          {similarJobs.map(each => (
            <SimilarJobs data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  conditionalRender = () => {
    const {DetailJobsApi} = this.state

    switch (DetailJobsApi) {
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
    return (
      <div className="mainContainer">
        <Header />
        <div className="JobDetailContainer">{this.conditionalRender()}</div>
      </div>
    )
  }
}
export default JobDetailsPage
