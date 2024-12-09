import { Link, useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  return (
    <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
      
      <ul className="nav menu">
        <li className={location.pathname === "/" ? "active" : ""}><Link to="/"><svg className="glyph stroked dashboard-dial"><use xlinkHref="#stroked-dashboard-dial" /></svg> Thống kê</Link></li>
        <li className={location.pathname.includes("/users") ? "active" : ""}><Link to="/users"><svg className="glyph stroked male user "><use xlinkHref="#stroked-male-user" /></svg>Quản lý thành viên</Link></li>
        <li className={location.pathname.includes("/categories") ? "active" : ""}><Link to="/categories"><svg className="glyph stroked open folder"><use xlinkHref="#stroked-open-folder" /></svg>Quản lý danh mục</Link></li>
        <li className={location.pathname.includes("/products") ? "active" : ""}><Link to="/products"><svg className="glyph stroked bag"><use xlinkHref="#stroked-bag" /></svg>Quản lý sản phẩm</Link></li>
        <li className={location.pathname.includes("/blogs") ? "active" : ""}><Link to="/blogs"><svg className="glyph stroked bag"><use xlinkHref="#stroked-bag" /></svg>Quản lý bài viết</Link></li>
        {/* <li className={location.pathname.includes("/comments") ? "active" : ""}><Link to="/comments"><svg className="glyph stroked two messages"><use xlinkHref="#stroked-two-messages" /></svg> Quản lý bình luận</Link></li> */}
        <li className={location.pathname.includes("/commentblog") ? "active" : ""}><Link to="/commentblog"><svg className="glyph stroked two messages"><use xlinkHref="#stroked-two-messages" /></svg> Quản lý bình luận bài viết</Link></li>
        <li className={location.pathname.includes("/orders") ? "active" : ""}><Link to="/orders"><svg className="glyph stroked chain"><use xlinkHref="#stroked-chain" /></svg> Quản lý đơn hàng</Link></li>
        <li className={location.pathname.includes("/setting") ? "active" : ""}><Link to="/setting"><svg className="glyph stroked gear"><use xlinkHref="#stroked-gear" /></svg> Cấu hình</Link></li>
      </ul>
    </div>
  );
};
export default Sidebar;
