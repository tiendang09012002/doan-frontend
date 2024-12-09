import React from "react"
import { Link,useNavigate } from "react-router-dom"
import { createCategory } from "../../../services/Api"

const CreateCategory = () => {
    const navigate=useNavigate()
    const [inputs, setInputs] = React.useState({})
    const [message, setMessage] = React.useState("")


    const onChangeInput = (e) => {
        setMessage("")
        const { value, name } = e.target

        setInputs({ ...inputs, [name]: value })
    }
    const handleSubmit = (e) => {
        if (inputs.name) {
            e.preventDefault();
            createCategory(inputs, {})
                .then(() =>{
                navigate("/categories")
                } )
                .catch(() => {
                    setMessage(<div className="alert alert-danger">Danh mục đã tồn tại !</div>)

                })
        }
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to='/categories'>Quản lý danh mục</Link></li>
                        <li className="active">Thêm danh mục</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm danh mục</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    {message}
                                    <form role="form" method="post">
                                        <div className="form-group">
                                            <label>Tên danh mục:</label>
                                            <input required onChange={onChangeInput} type="text" value={inputs.name || ""} name="name" className="form-control" placeholder="Tên danh mục..." />
                                        </div>
                                        <button type="submit" onClick={handleSubmit} name="sbm" className="btn btn-success">Thêm mới</button>
                                        <button type="reset" className="btn btn-default">Làm mới</button>
                                    </form></div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>
            </div>

        </>
    )
}

export default CreateCategory