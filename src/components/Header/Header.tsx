import './Header.scss'
import githubIcon from '../../assets/img/github.svg'

const Header = () => {
  return (
    <div className={'Header'}>
      <div className={'Header__project-name'}>ReactToDo</div>
      <a className={'Header__project-github'} href={'https://github.com/LASCode'}>
        <span className={'Header__github-link'}>MyGitHub</span>
        <img className={'Header__github-icon'} src={githubIcon} />
      </a>
    </div>
  )
}

export { Header };