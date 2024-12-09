import { Link,useSearchParams,useNavigate } from "react-router-dom"
import React from "react"
import { editOrder, getOrders } from "../../../services/Api"
import moment from "moment"
import { VND } from "../../../shared/ultils"
import Pagination from "../../../shared/components/Layout/Pagination"
const Order = () => {
    const [orders, setOrder] = React.useState([])
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const keyword = searchParams.get('keyword')
    const [search, setSearch] = React.useState()
    const filter = searchParams.get('filter')

    const page = searchParams.get('page') || 1;
    const limit = 10;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)
    const getData = () => {
        getOrders({
            params:{
                page,limit,keyword,filter,
            }
        }).then(({ data }) => {
            setOrder(data.data.docs)
            setPages(data.data.pages)
            seTotal(data.data.pages.total)
        })
    }
    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmitSearch = () => {
        if(filter){
            navigate(`?keyword=${search}&filter=${filter}`)

        }else{

            navigate(`?keyword=${search}`)
        }

    }
    const handleEnterSearch = (e) => {
        if (e.which == 13) {
            handleSubmitSearch()
            document.getElementById("search_input").blur()
        }
    }
    const onChangFilter=(e)=>{
        if(keyword){
            navigate(`?keyword=${search}&filter=${e.target.value}`)

        }else{

            navigate(`?filter=${e.target.value}`)
        }
    }

    React.useEffect(() => {
        getData();
    }, [page,keyword,filter])

    const handleClickShipping=(e,id)=>{
        e.preventDefault();
        editOrder(id,{
            status: 1,
        },{}).then(()=>{
            getData();
        })
    }
    const handleClickDone=(e,id)=>{
        e.preventDefault();
        editOrder(id,{
            status: 0,
        },{}).then(()=>{
            getData();
        })
    }
    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><Link to="/"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></Link></li>
                        <li className="active">Danh sách đơn hàng</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Danh sách đơn hàng</h1>
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
                                        </div>
                                        {/* <div className="filter">
                                            Lọc :
                                            <select onChange={onChangFilter} name="filter">
                                                <option value="">Tất cả</option>
                                                <option value="done">Giao thành công</option>
                                                <option value="shipping">Đang giao hàng</option>
                                                <option value="pending">Chờ xử lí</option>

                                            </select>

                                        </div> */}
                                </div>
                                
                                        
                                    
                                </div><div className="fixed-table-container"><div className="fixed-table-header"><table /></div><div className="fixed-table-body"><div className="fixed-table-loading" style={{ top: 37 }}>Loading, please wait…</div><table data-toolbar="#toolbar" data-toggle="table" className="table table-hover">
                                    <thead>
                                        <tr><th style={{}}><div className="th-inner sortable">Mã đơn hàng</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner sortable">Tên người đặt</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner sortable">Số sản phẩm</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Thời gian đặt</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Thành tiền</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Trạng thái</div><div className="fht-cell" /></th><th style={{}}><div className="th-inner ">Hành động</div><div className="fht-cell" /></th></tr>
                                    </thead>
                                    <tbody>

                                        {orders.map((item, index) => {
                                            console.log(item);
                                            var madh = "";
                                            for (let i = 0; i < item._id.length; i++) {
                                                if (i > 15) {
                                                    madh += item._id[i]
                                                }
                                            }
                                            const qty=item.items.reduce((total, item) => total+item.qty,0)
                                            return (
                                                <tr data-index={index}><td >{madh}</td>
                                                    <td >{item.user_id.fullName}</td>
                                                    <td >{qty} Sản phẩm</td>
                                                    <td >
                                                    {moment(item.dateOrder).format('LT')} {moment(item.dateOrder).format('L')}
                                                    </td>
                                                    <td >{VND.format(item.items?.reduce((total, current) => (total + (current.prd_id?.price - current.prd_id?.price * current.prd_id?.promotion / 100) * current.qty), 0))}</td>
                                                    <td >
                                                        {item.status === 2 && <span className="label label-danger">Chờ xử lí</span>}
                                                        {item.status === 1 && <span className="label label-warning">Đang giao hàng</span>}
                                                        {item.status === 0 && <span className="label label-success">Giao thành công</span>}
                                                    </td>
                                                    <td className="form-group" >
                                                        <Link to={`/orders/${item._id}`} style={{margin: "5px"}} className="btn btn-info"><i className="glyphicon glyphicon-eye-open" /></Link>
                                                        {item.status === 2 &&
                                                            <a href="" onClick={(e)=>handleClickShipping(e,item._id)} className="btn btn-warning">Giao hàng</a>
                                                        }
                                                        {item.status === 1 &&
                                                            <a href="" onClick={(e)=>handleClickDone(e,item._id)} className="btn btn-success">Hoàn thành</a>
                                                        }
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
export default Order