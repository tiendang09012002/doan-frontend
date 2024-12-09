import React from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { deleteComment, getAllComments, activeComment } from "../../../services/Api"
import Pagination from "../../../shared/components/Layout/Pagination"


const Comment = () => {
    const [comments, setComments] = React.useState([])
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const keyword = searchParams.get('keyword')
    const [search, setSearch] = React.useState()
    const page = searchParams.get('page') || 1;
    const limit = 3;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)
    const handleDelete = (e, id) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteComment(id, {})
                .then(() => {
                    getData();
                })
        }
    }
    const handleActive = (e, id) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn kích hoạt?");
        if (isConfirm) {
            activeComment(id, { status: 1 })
               .then(() => {
                    getData();
                })
        }
    }
    const getData = () => {
        getAllComments({ params: { page, limit, keyword } }).then(({ data }) => {
            setComments(data.data.docs)
            setPages(data.data.pages)
            seTotal(data.data.pages.total)
        })

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
        getData()
    }, [page, keyword])
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
        const items = []
        const action = document.getElementById("selectaction").value
        document.querySelectorAll(".checkitem:checked").forEach((item) => {
            items.push(item.value)
        })
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteComment({
                items, action
            }, {}).then(() => {
                getData()

            })
        }


    }
    const toggleBtnAction = () => {
        let isCheck = true;
        if (document.querySelectorAll(".checkitem:checked").length && document.getElementById("selectaction").value) {
            isCheck = false
        }
        //document.getElementById("action").disabled = isCheck

    }

    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li className="active">Danh sách bình luận</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách bình luận</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="bootstrap-table"><div className="fixed-table-toolbar"><div className="bars pull-left"><div id="toolbar" className="btn-group">
                                </div>
                                    <div className="search">
                                        <input type="text" id="search_input" onKeyDown={handleEnterSearch} className="form-control" placeholder="Search" onChange={handleChangeSearch} />
                                        <button className="btn btn-primary" onClick={handleSubmitSearch}>Tìm</button>
                                    </div></div>
                                   {/* <div className="tuychon">
                                        <div className="handles" >
                                            <label style={{ margin: 0, cursor: "pointer" }} for="checkall">Tất cả</label>
                                            <input style={{ margin: "0 10px" }} onChange={handleChangeCheckAll} type="checkbox" className="checkall" id="checkall" />
                                        </div>
                                        
                                    </div> */}
                                    
                                </div><div className="fixed-table-container"><div className="fixed-table-header"><table /></div><div className="fixed-table-body"><div className="fixed-table-loading" style={{ top: 37 }}>Loading, please wait…</div><table data-toolbar="#toolbar" data-toggle="table" className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{}}><div className="th-inner sortable">#</div><div className="fht-cell" /></th>

                                            <th style={{}}><div className="th-inner sortable">STT</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner sortable">Nội dung</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner sortable">Tác giả</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Sản phẩm</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Hành động</div><div className="fht-cell" /></th></tr>
                                    </thead>
                                    <tbody>
                                        {comments.map((comment, index) => {
                                            return (
                                                <tr >
                                                    <td><input type="checkbox" onChange={handleChangeItem} value={comment._id} name="items[]" className="checkitem" /></td>

                                                    <td >{index + 1}</td>
                                                    <td >{comment.content}</td>
                                                    <td >{comment.user_id.fullName}</td>
                                                    <td >{comment.product_id.name}</td>
                                                    <td className="form-group" style={{}}>
                                                        <a href="/" onClick={(e) => handleDelete(e, comment._id)} className="btn btn-danger"><i className="glyphicon glyphicon-remove" /></a>
                                                        {
                                                            comment.status?
                                                                <a href="/" onClick={(e) => handleActive(e, comment._id)} className="btn btn-success"><i className="glyphicon glyphicon-eye-open" /></a>
                                                            :
                                                                <a href="/" onClick={(e) => handleActive(e, comment._id)} className="btn btn-success"><i className="glyphicon glyphicon-eye-close" /></a>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table></div>
                                        <div className="fixed-table-pagination" /></div></div><div className="clearfix" />
                            <Pagination pages={{ ...pages, total }} />
                            </div>
                        </div>
                    </div>
                </div>{/*/.row*/}
            </div>
        </>
    )
}

export default Comment