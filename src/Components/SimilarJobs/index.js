import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {data} = props

  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    jobDescription,
    location,
  } = data
  // console.log(title)

  return (
    <li className="SimilarJobItem">
      <div className="JobsItemHeader">
        <img
          className="JobsItemLogo"
          alt="similar job company logo"
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
      <h1 className="DescriptionDetail">Description</h1>
      <p>{jobDescription}</p>

      <div className="jobItemsInfoContainer sim">
        <MdLocationOn />
        <p className="location">{location}</p>
        <BsFillBriefcaseFill className="breCase" />
        <p className="location">{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
