import React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../../services/Api";
import Pagination from "../../../shared/components/Layout/Pagination";

const User = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const keyword = searchParams.get('keyword') || '';
    const filter = searchParams.get('filters') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 3;
    const [search, setSearch] = React.useState()
    const [pages, setPages] = React.useState({});
    const [total, setTotal] = React.useState(0);
    const [users, setUsers] = React.useState([]);

    const getData = () => {
        getAllUsers({
            params:{
                keyword,
                filter,
                limit,
                page
            }
        }).then(({ data }) => {
            setUsers(data.data.docs);
            setTotal(data.data.pages.total);
            setPages(data.data.pages);
        })
    }
    const handdleDelete = (e, id) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteUser(id, {})
                .then(({ data }) => {
                    if (data.status === "success") {
                        getData();
                    }
                })
        }
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmitSearch = () => {
        if (filter) {
            navigate(`?keyword=${search}&filter=${filter}`)

        } else {
            navigate(`?keyword=${search}`)
        }

    }
    const handleEnterSearch = (e) => {
        if (e.which == 13) {
            handleSubmitSearch()
            document.getElementById("search_input").blur()
        }
    }

    React.useEffect(() => {
        getData()

    }, [keyword, filter, page]);
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">
                                <svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg>
                            </Link>
                        </li>
                        <li className="active">Danh sách thành viên</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách thành viên</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="bootstrap-table">
                                    <div className="fixed-table-toolbar">
                                        <div className="bars pull-left">
                                            <div id="toolbar" className="btn-group">
                                                <Link to="/users/create" className="btn btn-success">
                                                    <i className="glyphicon glyphicon-plus" /> Thêm thành viên
                                                </Link>

                                            </div>
                                            <div className="search">
                                                <input type="text" id="search_input" onKeyDown={handleEnterSearch} className="form-control" placeholder="Search" onChange={handleChangeSearch} value={search} />
                                                <button className="btn btn-primary" onClick={handleSubmitSearch}>Tìm</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fixed-table-container">
                                        <div className="fixed-table-header">
                                            <table />
                                        </div>
                                        <div className="fixed-table-body">
                                            <div className="fixed-table-loading" style={{ top: 37 }}>Loading, please wait…</div>
                                            <table data-toolbar="#toolbar" data-toggle="table" className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th><div className="th-inner sortable">#</div></th>
                                                        <th><div className="th-inner sortable">STT</div></th>
                                                        <th><div className="th-inner sortable">Họ & Tên</div></th>
                                                        <th><div className="th-inner sortable">Email</div></th>
                                                        <th><div className="th-inner">Quyền</div></th>
                                                        <th><div className="th-inner">Hành động</div></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users.map((user, index) => (
                                                        <tr key={user._id}>
                                                            <td>{!user.isAdmin ? <input type="checkbox" value={user._id} name="items[]" className="checkitem" /> : ''}</td>
                                                            <td>{index + 1}</td>
                                                            <td>{user.fullName}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.isAdmin ? <span className="label label-danger">Admin</span> : <span className="label label-warning">Member</span>}</td>
                                                            <td className="form-group">
                                                                {!user.isAdmin ? (
                                                                    <>
                                                                        <Link to={`/users/edit/${user._id}`} className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></Link>
                                                                        <a href="/" onClick={(e) => handdleDelete(e, user._id)} className="btn btn-danger"><i className="glyphicon glyphicon-remove" /></a>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span style={{ cursor: "no-drop" }} className="btn btn-primary disabled"><i className="glyphicon glyphicon-pencil" /></span>
                                                                        <span style={{ cursor: "no-drop" }} className="btn btn-danger disabled"><i className="glyphicon glyphicon-remove" /></span>
                                                                    </>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="clearfix" />
                                </div>
                                <Pagination pages={{ ...pages, total }} />
                            </div>
                        </div>
                    </div>
                </div>{/*/.row*/}
            </div>

        </>
    );
}

export default User;
