import { Link } from "react-router-dom"
import React from "react"
import { getAllCategories } from "../../../../services/Api"

const HeaderBottom = () => {
    const [categories, setCategory] = React.useState([])

    React.useEffect(() => {
        getAllCategories({
            params: {
                limit: 100
            }
        }).then(({ data }) => {
            setCategory(data.data.docs)
        })
    },[])
    return (
        <>
            <div className="header-bottom header-sticky d-none d-lg-block d-xl-block">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* Begin Header Bottom Menu Area */}
                            <div className="hb-menu">
                                <nav style={{ display: 'block'}}>
                                    <ul>

                                        <li ><a href="/">Trang chủ</a>
                                        </li>
                                        <li ><Link to="/products">Sản Phẩm</Link>
                                        </li>
                                        <li className="dropdown-holder"><a onClick={(e) => { e.preventDefault() }} href="blog-left-sidebar.html">Danh Mục</a>
                                            <ul style={{color: "white"}} className="hb-dropdown">
                                                {categories.map((item) => {
                                                    return (
                                                        <li ><Link to={`/category/${item._id}`}>{item.name}</Link>
                                                        </li>

                                                    )
                                                })}

                                            </ul>
                                        </li>
                                        <li><Link to="/blogs">Bài viết</Link></li>
                                        <li><Link to="/about">Thông tin</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            {/* Header Bottom Menu Area End Here */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-menu-area d-lg-none d-xl-none col-12">
                <div className="container">
                    <div className="row">
                        <div className="mobile-menu mean-container">
                            <div className="mean-bar">
                                <a href="#nav" className="meanmenu-reveal" style={{ background: '', color: '', right: 0, left: 'auto' }}>
                                    <span /><span /><span />
                                </a>
                                <nav className="mean-nav">

                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default HeaderBottom