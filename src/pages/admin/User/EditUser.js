import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../../services/Api"
import { data } from "jquery";
const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [user, setUser] = React.useState({});
    const [inputs, setInputs] = React.useState({});
    const [message, setMessage] = React.useState("");

    const onChangeInput = (e) => {
        try {
            setMessage("");
            const { name, value } = e.target;
            console.log(inputs);
            return setInputs({ ...inputs, [name]: value });
        } catch (error) {
            return setMessage(error.message);
        }
    }

    const submitUpdateUser = (e) => {
        e.preventDefault();
        try {
            if (inputs.email && inputs.fullName && inputs.phone) {
                const newData = { ...inputs }
                console.log(inputs);
                updateUser(newData, id).then(() => {
                    navigate("/users")
                }).catch(err => {
                    if (err.response && err.response.data) {
                        return setMessage(err.response.data.message);
                    } else {
                        return setMessage("Có lỗi xảy ra");
                    }
                })
            }
        } catch (error) {
            return setMessage(error.message);
        }
    }
    React.useEffect(() => {
        getUser(id).then(({ data }) => {
            setUser(data.data)
            setInputs({
                email: data.data.email,
                fullName: data.data.fullName,
                phone: data.data.phone,
                isAdmin: data.data.isAdmin,
            })
            console.log(inputs);
            console.log(id);

        })
    }, [])
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/users">Quản lý thành viên</Link></li>
                        <li className="active">Edit thành viên</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Edit thành viên</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    {message ? <div className="alert alert-danger">{message}</div> : ""}

                                    <form role="form" method="post">
                                        <div className="form-group">
                                            <label>Họ &amp; Tên</label>
                                            <input onChange={onChangeInput} value={inputs.fullName || ""} name="fullName" required className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input onChange={onChangeInput} value={inputs.email || ""} name="email" required type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input onChange={onChangeInput} value={inputs.phone || ""} name="phone" required type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Quyền</label>
                                            <select onChange={onChangeInput} name="isAdmin" className="form-control">
                                                {inputs.isAdmin ?
                                                    <>
                                                        <option value={1}>Admin</option>
                                                        <option value={0} >Member</option>
                                                    </> : <>

                                                        <option value={0} >Member</option>
                                                        <option value={1}>Admin</option>
                                                    </>}
                                            </select>
                                        </div>
                                        <button name="sbm" onClick={submitUpdateUser} type="submit" className="btn btn-success">Cập nhật</button>
                                        <button type="reset" className="btn btn-default">Làm mới</button>
                                    </form></div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>{/* /.row */}
            </div>
        </>
    )
}

export default EditUser;