import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { checkFileImage } from "../../../shared/ultils"
import { createBlog } from "../../../services/Api"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const CreateBlog = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = React.useState({})
    const [image, setImage] = React.useState()
    const [message, setMessage] = React.useState("")



    const onChangeInputs = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    const onChangeFile = (e) => {
        setMessage("")
        const file = e.target.files[0]
        document.getElementById("loadImg").src = URL.createObjectURL(file)
        if (checkFileImage(file.name)) {

            setImage(file)
        } else {
            setMessage(<div className="alert alert-danger">File ảnh không đúng định dạng !</div>)

        }

    }


    const handleCreateBlog = () => {
        if (inputs.title && inputs.header && image && inputs.notes && inputs.tags && inputs.content) {
            const formData = new FormData();
            for (const key in inputs) {
                formData.append(key, inputs[key])
            }
            formData.append("image", image)

            createBlog(formData, {})
                .then(({ data }) => {
                    if (data.success) {
                        navigate("/blogs")
                    }
                })

        } else {

            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ dữ liệu !</div>)
        }
    }

    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/blogs">Quản lý bài viết</Link></li>
                        <li className="active">Thêm bài viết</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm bài viết</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-8">
                                    {message}
                                    <form role="form" method="post" encType="multipart/form-data">
                                        <div className="form-group">
                                            <label>Tiêu đề bài viết</label>
                                            <input required value={inputs.title || ""} onChange={onChangeInputs} name="title" className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Mở đầu bài viết</label>
                                            <textarea onChange={onChangeInputs} required value={inputs.header || ""} name="header" className="form-control" rows={3} defaultValue={""} />
                                        </div>
                                        <div className="form-group">
                                            <label>Thẻ gắn</label>
                                            <input required value={inputs.tags || ""} onChange={onChangeInputs} name="tags" type="text" className="form-control" />
                                        </div>
                                    </form></div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>Ảnh bài viết</label>
                                        <input required onChange={onChangeFile} name="image" type="file" />
                                        <br />
                                        <div>
                                            <img style={{ width: "400px" }} id="loadImg" src="img/download.jpeg" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả bài viết</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={inputs.notes || ""}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                            onChange={(event, editor) => {
                                                setMessage("")
                                                setInputs({ ...inputs, notes: editor.getData() })
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Nội dung bài viết</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={inputs.content || ""}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                            onChange={(event, editor) => {
                                                setMessage("")
                                                setInputs({ ...inputs, content: editor.getData() })
                                            }}
                                        />
                                    </div>
                                    <button name="sbm" onClick={handleCreateBlog} type="submit" className="btn btn-success">Thêm mới</button>
                                    <button type="reset" onClick={() => setInputs({})} className="btn btn-default">Làm mới</button>
                                </div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>{/* /.row */}
            </div>	{/*/.main*/}

        </>
    )
}

export default CreateBlog