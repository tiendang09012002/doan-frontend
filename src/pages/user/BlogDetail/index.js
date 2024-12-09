import React from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { createCommentBlog, getBlogDetail, getBlogs, getCommentsBlog } from "../../../services/Api"
import { getImageBlog } from "../../../shared/ultils"
import moment from "moment"
import { useSelector } from "react-redux"
import Panigation from "../PanigationCmt"
import HTMLReactParser from "html-react-parser"

const BlogDetail = () => {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate()
    const page = searchParams.get('page') || 1;
    const limit = 4;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    const user = useSelector(({ Auth }) => Auth.user)
    const [message, setMessage] = React.useState("")
    const [cmtInput, setCmtInput] = React.useState({});
    const [comments, setComments] = React.useState([])
    const { id } = useParams()
    const [blog, setBlog] = React.useState({})
    const [blogsRecent, setBlogsRecent] = React.useState([])
    const [search, setSearch] = React.useState()
    const onChangeCmt = (e) => {
        setMessage("")
        setCmtInput({ ...cmtInput, [e.target.name]: e.target.value });
    }
    const handleCommentClick = (e) => {
        e.preventDefault();
        if (user._id) {

            if (cmtInput.content) {
                createCommentBlog({ ...cmtInput, user: user._id, blog: id }).then(() => {
                    getData();
                    setCmtInput({})

                })
            } else {
                setMessage(<div className="alert alert-danger">Vui lòng nhập bình luận!</div>)
            }
        } else {
            navigate("/login")
        }

    }
    const getData = () => {
        getCommentsBlog(id, {
            params: {
                limit, page
            }
        }).then(({ data }) => {
            setComments(data.data)
            setPages(data.pages)
            seTotal(data.total)
        })
    }


    React.useEffect(() => {
        getBlogs({
            params: {
                limit: 6
            }
        }).then(({ data }) => setBlogsRecent(data.data))
        getBlogDetail(id, {}).then(({ data }) => setBlog(data.data))
        getData()
    }, [id, page])
    const onChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const onEnterSearch = (e) => {
        if (e.which == 13) {
            e.preventDefault()
            if (e.target.value.trim()) {
                navigate(`/blog?keyword=${search.trim()}`)
            }
            e.target.blur()
        }
    }
    const onClickSearch = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`/blog?keyword=${search.trim()}`)
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
                            <li className="active">Chi tiết bài viết</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="li-main-blog-page li-main-blog-details-page pt-60 pb-60 pb-sm-45 pb-xs-45">
                <div className="container">
                    <div className="row">
                        {/* Begin Li's Blog Sidebar Area */}
                        <div className="col-lg-3 order-lg-1 order-2">
                            <div className="li-blog-sidebar-wrapper">
                                <div className="li-blog-sidebar">
                                    <div className="li-sidebar-search-form">
                                        <form action="#">
                                            <input onChange={onChangeSearch} id="search_blog" onKeyDown={onEnterSearch} type="text" className="li-search-field" placeholder="search here" />
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
                            <div className="row li-main-content">
                                <div className="col-lg-12">
                                    <div className="li-blog-single-item pb-30">
                                        <div className="li-blog-banner">
                                            <a href="#"><img className="img-full" src={getImageBlog(blog.image)} alt /></a>
                                        </div>
                                        <div className="li-blog-content">
                                            <div className="li-blog-details">
                                                <h3 className="li-blog-heading pt-25"><a href="#">{blog.title}</a></h3>
                                                <div className="li-blog-meta">
                                                    <a className="author" href="#"><i className="fa fa-user" />Admin</a>
                                                    <a className="comment" href="#"><i className="fa fa-comment-o" /> {total} comment</a>
                                                    <a className="post-time" href="#"><i className="fa fa-calendar" />{moment(blog.createdAt).format("DD/MM/YYYY")}</a>
                                                </div>
                                                <p>{blog.header}</p>
                                                {/* Begin Blog Blockquote Area */}
                                                <div className="li-blog-blockquote">
                                                    <blockquote>
                                                        <p>{blog.notes && HTMLReactParser(blog.notes)}
                                                        </p>
                                                    </blockquote>
                                                </div>
                                                {/* Blog Blockquote Area End Here */}
                                                <p>{blog.content && HTMLReactParser(blog.content)}
                                                </p>
                                                <div className="li-tag-line">
                                                    <h4>tag:</h4>
                                                    {
                                                        blog?.tags?.split(",").map((item, index) => {
                                                            if (index == blog.tags.split(",").length - 1) {


                                                                return (
                                                                    <a href="#">{item}</a>
                                                                )
                                                            }
                                                            return (
                                                                <>
                                                                    <a href="#">{item}</a>,
                                                                </>
                                                            )

                                                        })
                                                    }
                                                    {/* <a href="#">Headphones</a>,
                                                    <a href="#">Video Games</a>,
                                                    <a href="#">Wireless Speakers</a> */}
                                                </div>
                                                <div className="li-blog-sharing text-center pt-30">
                                                    <h4>Chia sẻ bài viết:</h4>
                                                    <a href="#"><i className="fa fa-facebook" /></a>
                                                    <a href="#"><i className="fa fa-twitter" /></a>
                                                    <a href="#"><i className="fa fa-pinterest" /></a>
                                                    <a href="#"><i className="fa fa-google-plus" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Begin Li's Blog Comment Section */}
                                    <div className="li-comment-section">
                                        <h3>Bình luận ({total})</h3>
                                        {!comments.length && <div className="comment-author-infos pt-25">
                                            <em>Chưa có bình luận nào!</em>
                                        </div>}
                                        <ul>
                                            {comments.map((item, index) => {

                                                return (
                                                    <li>
                                                        <div className="author-avatar pt-15">
                                                            <img class="shopee-avatar__img" style={{ height: 60, width: 60, borderRadius: 500, marginRight: 4 }} alt="ảnh đại diện" src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lphihlglcmk5ee_tn" />

                                                        </div>
                                                        <div className="comment-body pl-15">
                                                            <h5 className="comment-author pt-15">
                                                                {item.user._id === user._id ? "Bạn" :
                                                                    item.user.fullName}
                                                            </h5>
                                                            <div className="comment-post-date">
                                                                {moment(item.createdAt).fromNow()}
                                                            </div>
                                                            <p>{item.content}</p>
                                                        </div>
                                                    </li>
                                                )



                                            })}

                                        </ul>
                                    </div>
                                    {/* Li's Blog Comment Section End Here */}
                                    {/* Begin Blog comment Box Area */}
                                    <div className="li-blog-comment-wrapper pb-30">
                                        <form action="#">
                                            <div className="comment-post-box">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <label>Bình luận</label>
                                                        {message}
                                                        <textarea onChange={onChangeCmt} name="content" cols={45} rows={8} value={cmtInput?.content || ""} placeholder="Write a comment" />
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="coment-btn pt-30 pb-sm-30 pb-xs-30 f-left">
                                                            <input onClick={handleCommentClick} className="li-btn-2" type="submit" name="submit" defaultValue="post comment" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* Blog comment Box Area End Here */}
                                    <Panigation pages={{ total, ...pages }} />
                                </div>
                            </div>
                        </div>
                        {/* Li's Main Content Area End Here */}
                    </div>
                </div>
            </div>


        </>
    )
}
export default BlogDetail