import { Link, useSearchParams, useNavigate } from "react-router-dom"
import React from "react"
import { deleteProduct, getAllProducts } from "../../../services/Api.js"
import { VND, getImageProduct } from "../../../shared/ultils/index.js"
import Pagination from "../../../shared/components/Layout/Pagination"

const Product = () => {
    const navigate = useNavigate()
    const [products, setProducts] = React.useState([])
    const [searchParams] = useSearchParams();
    const [search, setSearch] = React.useState()

    const keyword = searchParams.get('keyword')
    const filter = searchParams.get('filter')

    const page = searchParams.get('page') || 1;
    const limit = 3;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    const getData = () => {
        getAllProducts({
            params: {
                limit,
                page, 
                keyword,
                filter
            }
        }).then(({ data }) => {
            setProducts(data.data.docs)
            seTotal(data.data.pages.total)
            setPages(data.data.pages)
        })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirm) {
            deleteProduct(id, {})
                .then(() => {
                    getData();
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
    const onChangFilter = (e) => {
        if (keyword) {
            navigate(`?keyword=${search}&filter=${e.target.value}`)

        } else {

            navigate(`?filter=${e.target.value}`)
        }
    }

    React.useEffect(() => {
        getData();
    }, [page, keyword, filter])


    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li className="active">Danh sách sản phẩm</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách sản phẩm</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <div className="bootstrap-table"><div className="fixed-table-toolbar"><div className="bars pull-left"><div id="toolbar" className="btn-group">
                                    <div className="tuy_chon">
                                        <Link to="/products/create" className="btn btn-success">
                                            <i className="glyphicon glyphicon-plus" /> Thêm sản phẩm
                                        </Link>
                                        <div className="search">
                                            <input type="text" id="search_input" onKeyDown={handleEnterSearch} className="form-control" placeholder="Search" onChange={handleChangeSearch} />
                                            <button className="btn btn-primary" onClick={handleSubmitSearch}>Tìm</button>
                                        </div>
                                    </div></div>

                                </div>


                                </div><div className="fixed-table-container"><div className="fixed-table-header"><table /></div><div className="fixed-table-body"><div className="fixed-table-loading" style={{ top: 37 }}>Loading, please wait…</div><table data-toolbar="#toolbar" data-toggle="table" className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th style={{}}><div className="th-inner sortable">#</div><div className="fht-cell" /></th>
                                            <th style={{}}><div className="th-inner sortable">STT</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner sortable">Tên sản phẩm</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner sortable">Giá</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Ảnh sản phẩm</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Số lượng</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Danh mục</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Hành động</div><div className="fht-cell" /></th></tr>
                                    </thead>
                                    <tbody>

                                        {products.map((item, index) => {
                                            return (
                                                <tr data-index={index}>
                                                    <td><input type="checkbox" value={item._id} name="items[]" className="checkitem" /></td>

                                                    <td >{index + 1}</td>
                                                    <td >{item.name}</td>
                                                    <td >{VND.format(item.price)}</td>
                                                    <td ><img width={130} height={180} src={getImageProduct(item.images[0])} />
                                                    </td>
                                                    <td >{item.quantity ? item.quantity : <span className="label label-danger">Hết hàng</span>}</td>
                                                    <td >{item.category_id?.name}</td>
                                                    <td className="form-group" >
                                                        <Link to={`/products/edit/${item._id}`} className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></Link>
                                                        <a href="" onClick={(e) => handleDelete(e, item._id)} className="btn btn-danger"><i className="glyphicon glyphicon-remove" /></a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table></div><div className="fixed-table-pagination" /></div></div><div className="clearfix" />
                                <Pagination pages={{ ...pages, total }} />
                            </div>
                        </div>
                    </div>
                </div>{/*/.row*/}
            </div>



        </>
    )
}

export default Product