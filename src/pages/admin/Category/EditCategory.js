import React from "react";
import { Link,useParams,useNavigate } from "react-router-dom"
import { updateCategory, getEditCategory } from "../../../services/Api";

const EditCategory = () => {
    const {id}=useParams();
    const navigate=useNavigate();

    const [message,setMessage]=React.useState("")
    const [category,setCategory] = React.useState({})
    const [inputs,setInputs] = React.useState({})


    React.useEffect(()=>{
        getEditCategory(id,{})
            .then(({data})=>{
                setCategory(data.data)
                setInputs({name:data.data.name})
            })
    },[id])
    const onChangeInput=(e)=>{
        setMessage("")
        const {name,value}=e.target;
        setInputs({...inputs,[name]:value})
    }
    console.log(inputs);
    const handleSubmitEdit=(e)=>{
        if(inputs.name){
            e.preventDefault();
            updateCategory(id,inputs,{})
                .then(()=>{
                    navigate("/categories")
                })
                .catch(()=>{
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
                        <li><Link to="/categories">Quản lý danh mục</Link></li>
                        <li className="active">{category.name}</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh mục:{category.name}</h1>
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
                                            <input onChange={onChangeInput} type="text" name="name" required value={inputs.name||""} className="form-control" placeholder="Tên danh mục..." />
                                        </div>
                                        <button type="submit" onClick={handleSubmitEdit} name="sbm" className="btn btn-primary">Cập nhật</button>
                                        <button type="reset" className="btn btn-default">Làm mới</button>
                                    </form></div>
                            </div>
                        </div>
                    </div>{/* /.col*/}
                </div>	{/*/.main*/}
            </div>


        </>
    )
}

export default EditCategory