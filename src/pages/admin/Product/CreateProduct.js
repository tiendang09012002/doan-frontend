import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { createProduct, getAllCategories } from "../../../services/Api"
import { checkFileImage, colors } from "../../../shared/ultils";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { toast } from "react-toastify";
const CreateProduct = () => {
    const navigate = useNavigate()
    const [categories, setCategory] = React.useState([])
    const [inputs, setInputs] = React.useState({})
    const [image, setImage] = React.useState()
    const [message, setMessage] = React.useState("")
    console.log(inputs);
    const onChangeInputs = (e) => {
        setMessage("")
        const { value, name } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    const onChangeFile = (e) => {
        setMessage("")
        let isCheck = false
        const file = e.target.files[0]
        const files = Object.values([...e.target.files])
        document.getElementById("loadImg").src = URL.createObjectURL(file)
        files.forEach(file => {
            if(!checkFileImage(file.name)){
                isCheck = true
            }
        });
        if (!isCheck) {
            setImage(e.target.files)
        } else {
           toast.error("File không đúng định dạng!")
        }
    }
    const handleCreateProduct = () => {
        if (inputs.name && inputs.price && inputs.quantity && image && inputs.description && inputs.accessories && inputs.color) {
            const formData = new FormData();
            for (const key in inputs) {
                formData.append(key, inputs[key])
            }
            for (let i = 0; i < image.length; i++) {
                formData.append("images", image[i]);
            }
            console.log(formData);
            createProduct(formData, {})
                .then(({ data }) => {
                    navigate("/products")
                })

        } else {

            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ dữ liệu !</div>)
        }
    }
    const onChangeCheckbox = (e) => {
        if (e.target.checked) {
            setInputs({ ...inputs, [e.target.name]: true })
        } else {
            setInputs({ ...inputs, [e.target.name]: false })
        }
    }

    React.useEffect(() => {
        getAllCategories({
            params: {
                limit: 1000
            }
        }).then(({ data }) => {
            setCategory(data.data.docs)
            setInputs({ ...inputs, category_id: data.data.docs[0]._id })
        })
    }, [])
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/products">Quản lý sản phẩm</Link></li>
                        <li className="active">Thêm sản phẩm</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Thêm sản phẩm</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="col-md-6">
                                    {message}
                                    <form role="form" method="post" encType="multipart/form-data">
                                        <div className="form-group">
                                            <label>Tên sản phẩm</label>
                                            <input required value={inputs.name || ""} onChange={onChangeInputs} name="name" className="form-control" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Giá sản phẩm</label>
                                            <input required value={inputs.price || ""} onChange={onChangeInputs} name="price" type="number" min={0} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Màu sắc</label>
                                            <select name="color" onChange={onChangeInputs} className="form-control">
                                                <option value="">Chọn màu sắc</option>
                                               {
                                                colors.map(color=> {
                                                    return(<option value={color}>{color}</option>)
                                                })
                                            } 
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Phụ kiện</label>
                                            <input required value={inputs.accessories || ""} onChange={onChangeInputs} name="accessories" type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Giảm giá ( % )</label>
                                            <input value={inputs.promotion || ""} min={0} max={100} onChange={onChangeInputs} name="promotion" type="number" className="form-control" />
                                        </div>
                                        
                                    </form></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Ảnh sản phẩm</label>
                                        <input required onChange={onChangeFile} name="images" type="file" multiple />
                                        <br />
                                        <div>
                                            <img style={{ width: "400px" }} id="loadImg" src="img/download.jpeg" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <select onChange={onChangeInputs} name="category_id" className="form-control">
                                            {categories.map((item) => {
                                                return (

                                                    <option value={item._id}>{item.name}</option>
                                                )
                                            })}

                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng</label>
                                        <input value={inputs.quantity || ""} min={0} max={100} onChange={onChangeInputs} name="quantity" type="number" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Sản phẩm nổi bật</label>
                                        <div className="checkbox">
                                            <label>
                                                <input onChange={onChangeCheckbox} name="is_featured" type="checkbox" value={1} />Nổi bật
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả sản phẩm</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={inputs.description || ""}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                            }}
                                            onChange={(event, editor) => {
                                                setMessage("")
                                                setInputs({ ...inputs, description: editor.getData() })
                                            }}
                                        />
                                    </div>
                                    <button name="sbm" onClick={handleCreateProduct} type="submit" className="btn btn-success">Thêm mới</button>
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

export default CreateProduct