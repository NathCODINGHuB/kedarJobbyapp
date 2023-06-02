const EmploymentType = props => {
  const {data} = props

  const {employmentTypeId, label} = data

  return (
    <li className="inputAndLabel">
      <input
        id={employmentTypeId}
        type="checkbox"
        value={employmentTypeId}
        name="EmploymentType"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default EmploymentType
