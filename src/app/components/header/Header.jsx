import { Link } from "react-router-dom"
const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <h1>Redux Blog Post</h1>
      </div>
      <nav>
        <ul className="navbar">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/post"}>
            <li>Post</li>
          </Link>
        </ul>
      </nav>
    </header>
  )
}

export default Header
