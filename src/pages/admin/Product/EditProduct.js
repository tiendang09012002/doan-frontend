import React from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { updateProduct, getAllCategories, getEditProduct } from "../../../services/Api";
import { checkFileImage, getImageProduct, colors } from "../../../shared/ultils";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategory] = React.useState([])
    const [description, setDescription] = React.useState("")
    const [message, setMessage] = React.useState("")
    const [product, setProduct] = React.useState({})
    const [inputs, setInputs] = React.useState({})
    console.log(inputs);
    const [image, setImage] = React.useState()
    React.useEffect(() => {
        getEditProduct(id, {}).then(({ data }) => {
            console.log(data.data)
            setProduct(data.data)
           // setImage(data.data.images)
            setInputs({...inputs,
                quantity: data.data.quantity,
                name: data.data.name,
                price: data.data.price,
                accessories: data.data.accessories,
                is_featured: data.data.is_featured,
                promotion: data.data.promotion,
                category_id: data.data.category_id,
                color: data.data.color,
            })
            setDescription(data.data.description)
        })
        getAllCategories({
            params: {
                limit: 100
            }
        }).then(({ data }) => {
            setCategory(data.data.docs)
        })
    }, [id])

    const handleUpdateProduct = () => {
        if (inputs.name && inputs.price && inputs.quantity  && description && inputs.accessories && inputs.color) {
            const formData = new FormData();
           ;
            for (const key in inputs) {
                formData.append(key, inputs[key])
            }
            if(image){
                for (let i = 0; i < image.length; i++) {
                    formData.append("images", image[i]);
                }
            }    
            formData.append("description", description)

            updateProduct(id, formData, {})
                .then(() => {
                    navigate("/products")
                })

        } else {

            setMessage(<div className="alert alert-danger">Vui lòng nhập đầy đủ dữ liệu !</div>)
        }
    }

    const onChangInput = (e) => {
        setMessage("")

        const { value, name } = e.target

        setInputs({ ...inputs, [name]: value })


    }
    const onChangeCheckbox = (e) => {
        if (e.target.checked) {
            setInputs({ ...inputs, [e.target.name]: true })
        } else {
            setInputs({ ...inputs, [e.target.name]: false })
        }
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
        }

    }
    const changeCKE=(e,editor)=>{
        setMessage("")
        const description = editor.getData()
        setDescription(description)
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li><Link to="/products">Quản lý sản phẩm</Link></li>
                        <li className="active">{product.name}</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Sản phẩm: {product.name}</h1>
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
                                            <input type="text" name="name" required onChange={onChangInput} value={inputs.name || ""} className="form-control" defaultValue="Sản phẩm số 1" placeholder />
                                        </div>
                                        <div className="form-group">
                                            <label>Giá sản phẩm</label>
                                            <input type="number" name="price" required onChange={onChangInput} value={inputs.price || ""} defaultValue={18500000} className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Màu sắc</label>
                                            <select name="color" onChange={onChangInput} className="form-control">
                                                <option value="">Chọn màu sắc</option>
                                                {
                                                    colors.map(color => {
                                                        return (<option value={color}>{color}</option>)
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Phụ kiện</label>
                                            <input type="text" name="accessories" required onChange={onChangInput} value={inputs.accessories || ""} defaultValue="Xạc, Tai nghe..." className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Giảm giá ( % )</label>
                                            <input type="number" min="0" max="100" name="promotion" required onChange={onChangInput} value={inputs.promotion || ""} defaultValue="Xạc dự phòng" className="form-control" />
                                        </div>
                                    </form></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Ảnh sản phẩm</label>
                                        <input type="file" name="image" required onChange={onChangeFile} multiple />
                                        <br />
                                        {product && product.images && product.images.length > 0 ? (
                                            <img style={{ width: "400px" }} id="loadImg" src={getImageProduct(product.images[0])} alt={product.name} />
                                        ) : (
                                            <div>No image available</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Danh mục</label>
                                        <select onChange={onChangInput} name="category_od" className="form-control">
                                            {categories?.map((item) => {
                                                return (
                                                    item._id === inputs.category_id ?
                                                        <option selected value={item._id}>{item.name}</option> :
                                                        <option value={item?._id}>{item.name}</option>

                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Số lượng</label>
                                        <input type="number" min="0" max="100" name="quantity" required onChange={onChangInput} value={inputs.quantity || ""} defaultValue="Xạc dự phòng" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label>Sản phẩm nổi bật</label>
                                        <div className="checkbox">
                                            <label>
                                                <input name="is_featured" checked={inputs.is_featured} onChange={onChangeCheckbox} type="checkbox" />Nổi bật
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Mô tả sản phẩm</label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={description||""}
                                            onChange={changeCKE}
                                        />
                                    </div>
                                    <button type="submit" onClick={handleUpdateProduct} name="sbm" className="btn btn-primary">Cập nhật</button>
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

export default EditProduct