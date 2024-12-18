import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';


import { LOGOUT_SUCCESS } from "../../../constants/action-type";


const HeaderAdmin = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ Auth }) => Auth.user)
  const navigate = useNavigate()


  const onClickLogOut = (e) => {
    e.preventDefault();
    dispatch({
      type: LOGOUT_SUCCESS
    })
    navigate("/")
  }

  return (
    <>
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/"><span>TECHZONE</span>ADMINISTRATOR</Link>
            <ul className="user-menu">
              <li className="dropdown pull-right">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown"><svg className="glyph stroked male-user"><use xlinkHref="#stroked-male-user" /></svg> {user.fullName} <span className="caret" /></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#"><svg className="glyph stroked male-user"><use xlinkHref="#stroked-male-user" /></svg> Hồ sơ</a></li>
                  <li><a href="#" onClick={onClickLogOut}><svg className="glyph stroked cancel"><use xlinkHref="#stroked-cancel" /></svg> Đăng xuất</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>{/* /.container-fluid */}
      </nav>
    </>
  )
}

export default HeaderAdmin