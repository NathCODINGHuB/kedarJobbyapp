import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobsItems = props => {
  const {data} = props
  const {
    title,
    rating,
    packagePerAnnum,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    id,
  } = data
  return (
    <Link className="JobsItemsLink" to={`jobs/${id}`}>
      <li className="JobsItemContainer">
        <div className="JobsItemHeader">
          <img
            className="JobsItemLogo"
            alt="job details company logo"
            src={companyLogoUrl}
          />
          <div className="TitleContainer">
            <h1 className="jobTitle">{title}</h1>
            <div className="ratingContainer">
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

        <h1 className="descriptionHeading">Description</h1>
        <p className="desCRip">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsItems
