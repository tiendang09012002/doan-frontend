import { Link, useNavigate, useSearchParams } from "react-router-dom";
import React from "react"
import { getBlogs } from "../../../services/Api";
import Panigation from "../PanigationCmt";
import { getImageBlog } from "../../../shared/ultils";
import moment from "moment";
import HTMLReactParser from "html-react-parser"

const Blog = () => {
    const navigate = useNavigate()
    const [blogs, setBlogs] = React.useState([])
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('keyword')
    const [blogsRecent, setBlogsRecent] = React.useState([])
    const [search, setSearch] = React.useState()
    const page = searchParams.get('page') || 1;
    const limit = 2;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    React.useEffect(() => {
        getBlogs({
            params: {
                limit: 6
            }
        }).then(({ data }) => setBlogsRecent(data.data))
        getBlogs({
            params: {
                limit, page, keyword
            }
        }).then(({ data }) => {
            setBlogs(data.data);
            seTotal(data.total)
            setPages(data.pages)
        })
    }, [page, keyword])

    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const onEnterSearch = (e) => {
        if (e.which == 13) {
            e.preventDefault()
            if (e.target.value.trim()) {
                navigate(`?keyword=${search.trim()}`)
            }
            e.target.blur()
        }
    }
    const onClickSearch = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`?keyword=${search.trim()}`)
        } else {
            document.getElementById("search_blog").focus()
        }

    }
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Bài viết</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="li-main-blog-page pt-60 pb-55">
                <div className="container">
                    <div className="row">
                        {/* Begin Li's Blog Sidebar Area */}
                        <div className="col-lg-3 order-lg-1 order-2">
                            <div className="li-blog-sidebar-wrapper">
                                <div className="li-blog-sidebar">
                                    <div className="li-sidebar-search-form pt-xs-30 pt-sm-30">
                                        <form action="#">
                                            <input onKeyDown={onEnterSearch} onChange={onChangeSearch} id="search_blog" type="text" className="li-search-field" placeholder="search here" />
                                            <button onClick={onClickSearch} type="submit" className="li-search-btn"><i className="fa fa-search" /></button>
                                        </form>
                                    </div>
                                </div>
                                <div className="li-blog-sidebar pt-25">
                                    <h4 className="li-blog-sidebar-title">Bài viết gần đây</h4>
                                    {blogsRecent.map((item, index) => {
                                        if (index < 3) {
                                            return (
                                                <div className="li-recent-post pb-30">
                                                    <div className="li-recent-post-thumb">
                                                        <Link to={`/blog/${item._id}`}>
                                                            <img className="img-full" src={getImageBlog(item.image)} alt="Li's Product Image" />
                                                        </Link>
                                                    </div>
                                                    <div className="li-recent-post-des">
                                                        <span style={{ padding: 0 }}><Link to={`/blog/${item._id}`}>{item.title}</Link></span>
                                                        <span style={{ padding: 0 }} className="li-post-date">{moment(item.createdAt).format("DD-MM-YYYY")}</span>

                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                                <div className="li-blog-sidebar">
                                    <h4 className="li-blog-sidebar-title">Tags</h4>
                                    <ul className="li-blog-tags">
                                        {blogsRecent.map((item) => {
                                            const tag = item.tags.split(',');
                                            return tag.map((item2) => {
                                                return (
                                                    <li><a href="#">{item2}</a></li>
                                                )
                                            })
                                        })}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* Li's Blog Sidebar Area End Here */}
                        {/* Begin Li's Main Content Area */}
                        <div className="col-lg-9 order-lg-2 order-1">
                            {keyword && <h5>Kết quả tìm kiếm với từ khóa : <span style={{ color: 'red' }}>{keyword}</span></h5>}
                            <div className="row li-main-content">
                                {blogs.map((item) => {
                                    return (
                                        <div className="col-lg-12">
                                            <div className="li-blog-single-item mb-30">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="li-blog-banner">
                                                            <Link to={`/blog/${item._id}`}><img style={{ border: "1px solid #ccc" }} className="img-full" src={getImageBlog(item.image)} alt /></Link>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <div className="li-blog-content">
                                                            <div className="li-blog-details">
                                                                <h3 className="li-blog-heading pt-xs-25 pt-sm-25"><Link to={`/blog/${item._id}`}>{item.title}</Link></h3>
                                                                <div className="li-blog-meta">
                                                                    <a className="author" href="#"><i className="fa fa-user" />Admin</a>
                                                                    {/* <a className="comment" href="#"><i className="fa fa-comment-o" /> 3 comment</a> */}
                                                                    <a className="post-time" href="#"><i className="fa fa-calendar" />{moment(item.createdAt).format("DD/MM/YYYY")}</a>
                                                                </div>
                                                                <p className="baiviettat">{HTMLReactParser(item.notes)}</p>
                                                                <Link className="read-more" to={`/blog/${item._id}`}>Đọc tiếp...</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}



                                {/* Begin Li's Pagination Area */}
                                <div className="col-lg-12">
                                    <Panigation pages={{ ...pages, total }} />
                                </div>
                                {/* Li's Pagination End Here Area */}
                            </div>
                        </div>
                        {/* Li's Main Content Area End Here */}
                    </div>
                </div>
            </div >



        </>
    )
}

export default Blog;
