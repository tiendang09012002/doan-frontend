import React from "react";
import { Link,useSearchParams,useNavigate } from "react-router-dom";
import moment from "moment";
import { getImageBlog } from "../../../shared/ultils";
import Pagination from "../../../shared/components/Layout/Pagination";
import { deleteBlog, getBlogs } from "../../../services/Api";
const Blog=()=>{

    const navigate=useNavigate()
    const [blogs, setBlogs] = React.useState([])
    const [searchParams] = useSearchParams();
    const [search, setSearch] = React.useState()

    const keyword = searchParams.get('keyword')

    const page = searchParams.get('page') || 1;
    const limit = 2;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    const getData = () => {
        getBlogs({
            params: {
                limit,
                page,keyword
            }
        }).then(({ data }) => {
            setBlogs(data.data)
            seTotal(data.total)
            setPages(data.pages)
        })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteBlog(id, {})
                .then(() => {
                    getData();
                })
        }
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmitSearch = () => {
            navigate(`?keyword=${search}`)

    }
    const handleEnterSearch = (e) => {
        if (e.which == 13) {
            handleSubmitSearch()
            document.getElementById("search_input").blur()
        }
    }

    React.useEffect(() => {
        toggleBtnAction()
        getData();
    }, [page,keyword])
    const handleChangeCheckAll = (e) => {
        const isCheck = e.target.checked;
        document.querySelectorAll(".checkitem").forEach((item) => {
            item.checked = isCheck;
        })
        toggleBtnAction()
    }
    const handleChangeItem = (e) => {
        const isCheck = document.querySelectorAll(".checkitem").length == document.querySelectorAll(".checkitem:checked").length
        document.getElementById("checkall").checked = isCheck
        toggleBtnAction()
    }
    const handleClickAction = () => {
        

    }
    const toggleBtnAction = () => {
       

    }

    return (
        <>
        
        <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li className="active">Danh sách bài viết</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách bài viết</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="bootstrap-table"><div className="fixed-table-toolbar"><div className="bars pull-left"><div id="toolbar" className="btn-group">
                                    <Link to="/blogs/create" className="btn btn-success">
                                        <i className="glyphicon glyphicon-plus" /> Thêm bài viết
                                    </Link>
                                </div>
                                <div className="search">
                                        <input type="text" id="search_input" onKeyDown={handleEnterSearch} className="form-control" placeholder="Search" onChange={handleChangeSearch} />
                                        <button className="btn btn-primary" onClick={handleSubmitSearch}>Tìm</button>
                                    </div>
                                </div>
                                    
                                </div>
                                <div className="fixed-table-container"><div className="fixed-table-header"><table /></div><div className="fixed-table-body"><div className="fixed-table-loading" style={{ top: 37 }}>Loading, please wait…</div><table data-toolbar="#toolbar" data-toggle="table" className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{}}><div className="th-inner sortable">#</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner sortable">STT</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner sortable">Tên bài viết</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner sortable">Thời gian đăng</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner ">Ảnh bài viết</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner ">Tags</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Hành động</div><div className="fht-cell" /></th></tr>
                                    </thead>
                                    <tbody>

                                        {blogs.map((item, index) => {
                                            return (
                                                <tr data-index={index}>
                                                    <td><input type="checkbox" onChange={handleChangeItem} value={item._id} name="items[]" className="checkitem" /></td>

                                                    <td >{index + 1}</td>
                                                    <td >{item.title}</td>
                                                    <td >{moment(item.createdAt).format('LT')} {moment(item.createdAt).format('L')}</td>
                                                    <td ><img width={130} height={180} src={getImageBlog(item.image)} />
                                                    </td>
                                                    <td >{item.tags}</td>
                                                    <td className="form-group" >
                                                        <Link to={`/blogs/edit/${item._id}`} className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></Link>
                                                        <a href="" onClick={(e) => handleDelete(e, item._id)} className="btn btn-danger"><i className="glyphicon glyphicon-remove" /></a>
                                                    </td>
                                                </tr>
                                            )
                                        })}



                                    </tbody>
                                </table></div><div className="fixed-table-pagination" /></div></div><div className="clearfix" />
                            </div>
                            <Pagination pages={{ ...pages, total }} />
                        </div>
                    </div>
                </div>{/*/.row*/}
            </div>
        </>
    )
}

export default Blog