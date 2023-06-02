import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="mainContainer">
    <Header />

    <div className="homeBody">
      <div className="homeContent">
        <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
        <p>
          Millions of people are searching for jobs,salary information,company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link className="jobsLink" to="/jobs">
          <button className="findJobBn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
