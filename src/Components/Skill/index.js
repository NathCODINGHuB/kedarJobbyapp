import './index.css'

const Skill = props => {
  const {data} = props
  const {name, imageUrl} = data

  return (
    <li className="skillItemContainer">
      <img className="skillLogo" alt={name} src={imageUrl} />
      <p className="skillName">{name}</p>
    </li>
  )
}
export default Skill
