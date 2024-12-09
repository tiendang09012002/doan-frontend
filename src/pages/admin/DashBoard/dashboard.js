import React from "react"
import { getAllComments, getAllProducts, getAllUsers, getOrders, getOrdersByDate } from "../../../services/Api"
import { Link } from "react-router-dom";
import moment from "moment";
import { VND, renderId } from "../../../shared/ultils/index";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js'
Chart.register(ArcElement);
const Home = () => {
    const [chartData, setChartData] = React.useState({
        labels: ['Chờ xử lí', 'Đang giao', 'Hoàn thành'],
        datasets: [{
            data: [0, 0, 0], // Số lượng đơn hàng tương ứng
            backgroundColor: ['red', 'yellow', 'green'],
            borderWidth: 0
        }]
    }
    );
    const [data, setData] = React.useState([0, 0, 0])
    const [message, setMessage] = React.useState("")
    const [product, setProduct] = React.useState(0)
    const [user, setUser] = React.useState(0)
    const [comment, setComment] = React.useState(0)
    const [order, setOrder] = React.useState(0)
    const [dateInput, setDateInput] = React.useState({
        end: moment().format("YYYY-MM-DD")
        , start: moment().subtract(10, 'days').format("YYYY-MM-DD")
    })
    const [orders, setOrders] = React.useState([])
    const [total, setTotal] = React.useState(0)
    const getOrderTotal = (items) => {
        return items.reduce((total, item) => {
            const { price, promotion } = item.prd_id;
            console.log(price, promotion);
            const discountedPrice = price - (price * promotion / 100);
            return total + (discountedPrice * item.qty);
        }, 0);
    };
    const getDataPiechart = async () => {
        const data1 = await getOrders({ params: { status: 2 } })
        const data2 = await getOrders({ params: { status: 1 } })
        const data3 = await getOrders({ params: { status: 0 } })
        return [data1.data.data.pages.total, data2.data.data.pages.total, data3.data.data.pages.total]
    }
    React.useEffect(() => {
        getAllUsers({})
            .then(({ data }) => setUser(data.data.pages.total))
        getAllProducts({})
            .then(({ data }) => setProduct(data.data.pages.total))
        getAllComments({})
            .then(({ data }) => setComment(data.data.pages.total))
        getOrders({ params: { filter: "pending" } })
            .then(({ data }) => setOrder(data.data.pages.total))
        getOrdersByDate({ params: dateInput })
            .then(({ data }) => {
                setOrders(data)
                const tongTien = data.reduce((total, item) => total + getOrderTotal(item.items), 0)
                setTotal(tongTien)
            })
        getDataPiechart().then((data) => {
            setChartData({
                labels: ['Chờ xử lí', 'Đang giao', 'Hoàn thành'],
                datasets: [{
                    data: data, // Số lượng đơn hàng tương ứng
                    backgroundColor: ['red', 'yellow', 'green'],
                    borderWidth: 0
                }]
            })
        })
    }, [])
    const onClickSearch = () => {
        const start = new Date(dateInput.start)
        const end = new Date(dateInput.end)
        if (start > end) {
            setOrders([])
            setTotal(0)
            setMessage(<div className="alert alert-danger">"Từ ngày" phải nhỏ hơn hoặc bằng "Đến ngày" . Bạn hãy kiểm tra lại! </div>)
        } else {
            getOrdersByDate({ params: dateInput })
                .then(({ data }) => {
                    setOrders(data)
                    const tongTien = data.reduce((total, item) => total + getOrderTotal(item.items), 0)
                    setTotal(tongTien)
                })
        }
    }
    const onChangeInput = (e) => {
        setMessage()
        const { value, name } = e.target
        setDateInput({ ...dateInput, [name]: value })
    }
    const clickAllView = (e) => {
        if (document.getElementById("viewall").style.display == "none") {
            document.getElementById("viewall").style.display = "block"
            e.target.innerHTML = "Đóng lại"
        } else {
            document.getElementById("viewall").style.display = "none"
            e.target.innerHTML = "Xem tất cả"

        }
    }

    return (
        <>
            <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
                <div className="row">
                    <ol className="breadcrumb">
                        <li><a href="#"><svg className="glyph stroked home"><use xlinkHref="#stroked-home" /></svg></a></li>
                        <li className="active">Trang chủ quản trị</li>
                    </ol>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Trang chủ quản trị</h1>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-blue panel-widget ">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked bag"><use xlinkHref="#stroked-bag" /></svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{product}</div>
                                    <div className="text-muted">Sản Phẩm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-orange panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked empty-message"><use xlinkHref="#stroked-empty-message" /></svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{comment}</div>
                                    <div className="text-muted">Bình Luận</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-teal panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked male-user"><use xlinkHref="#stroked-male-user" /></svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{user}</div>
                                    <div className="text-muted">Thành Viên</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-6 col-lg-3">
                        <div className="panel panel-red panel-widget">
                            <div className="row no-padding">
                                <div className="col-sm-3 col-lg-5 widget-left">
                                    <svg className="glyph stroked app-window-with-content"><use xlinkHref="#stroked-app-window-with-content" /></svg>
                                </div>
                                <div className="col-sm-9 col-lg-7 widget-right">
                                    <div className="large">{order}</div>
                                    <div className="text-muted">Đơn hàng mới</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>{/*/.row*/}
                <div className="row">
                    <div className="col-lg-7">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Các đơn hàng đã bán</h3>
                                <div className="dateselect" style={{ display: "flex", }}>

                                    <div className="dateitem">
                                        <label for="start" style={{
                                            marginBottom: 10,
                                            display: "block",
                                        }}>Từ ngày</label>
                                        <input style={{ height: 34, borderRadius: 9 }} id="start" value={dateInput.start} type="date" name="start" onChange={onChangeInput} />
                                    </div>
                                    <div className="dateitem" style={{ marginLeft: 200 }}>
                                        <label for="end" style={{
                                            marginBottom: 10,
                                            display: "block",
                                        }}>Đến ngày</label>
                                        <input style={{ height: 34, borderRadius: 9 }} id="end" type="date" value={dateInput.end} name="end" onChange={onChangeInput} />
                                    </div>
                                </div>
                                <div style={{ borderBottom: "1px solid #ccc", padding: "20px 0" }}>
                                    <button onClick={onClickSearch} style={{ padding: "10px 40px" }} className="btn btn-primary">Tìm kiếm</button>
                                </div>
                                <h3>Tổng số tiền từ các đơn đã bán : <span>{VND.format(total)}</span></h3>
                                <div>
                                    <h4 style={{ margin: "30px 0" }}>Danh sách đơn hàng đã hoàn thành</h4>
                                    {message}
                                    {orders.map((item, index) => {
                                        const qty = item.items.reduce((total, item) => total + item.qty, 0)
                                        if (index < 5) {
                                            return (
                                                <div style={{ width: "80%", border: "1px solid #ccc", borderRadius: 10, padding: "10px 10px 0 10px", marginBottom: 30 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", }}>
                                                        <p>Mã đơn hàng : {renderId(item._id)} </p>
                                                        <p>Thời gian đặt: {moment(item.dateOrder).format('LT')} {moment(item.dateOrder).format('L')}</p>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", paddingTop: 10 }}>
                                                        <p>Tên người đặt : {item.user_id.fullName}</p>
                                                        <p>Số sản phẩm : {qty}</p>
                                                    </div>

                                                    <p style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: "10px 0" }}>Tổng tiền : {VND.format(item.items.reduce((total, item) => total + item.qty * (item.prd_id.price - item.prd_id.price * item.prd_id.promotion / 100), 0))}</p>
                                                    <p style={{ textAlign: "center" }}><Link to={`/orders/${item._id}`} style={{ textDecoration: "none" }}>Xem chi tiết</Link></p>
                                                </div>
                                            )
                                        }
                                    })}
                                    <div id="viewall" style={{ display: "none" }}>
                                        {orders.map((item, index) => {
                                            const qty = item.items.reduce((total, item) => total + item.quantity, 0)
                                            if (index >= 5) {
                                                return (
                                                    <div style={{ width: "80%", border: "1px solid #ccc", borderRadius: 10, padding: "10px 10px 0 10px", marginBottom: 30 }}>
                                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", }}>
                                                            <p>Mã đơn hàng : {renderId(item._id)} </p>
                                                            <p>Thời gian đặt: {moment(item.dateOrder).format('LT')} {moment(item.dateOrder).format('L')}</p>
                                                        </div>
                                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #ccc", paddingTop: 10 }}>
                                                            <p>Tên người đặt : {item.fullName}</p>
                                                            <p>Số sản phẩm : {qty}</p>
                                                        </div>

                                                        <p style={{ textAlign: "right", borderBottom: "1px solid #ccc", padding: "10px 0" }}>Tổng tiền : {VND.format(item.items.reduce((total, item) => total + item.qty * (item.prd_id.price - item.prd_id.price * item.prd_id.promotion / 100), 0))}</p>
                                                        <p style={{ textAlign: "center" }}><Link to={`/orders/${item._id}`} style={{ textDecoration: "none" }}>Xem chi tiết</Link></p>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                    {orders.length > 5 && <div style={{ textAlign: "center", width: "80%" }}><button onClick={clickAllView} className="btn btn-primary">Xem tất cả</button></div>}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="panel panel-default">
                            <div style={{ padding: "20px 60px" }} className="panel-body">
                                <h3 style={{ textAlign: "center", marginBottom: 30 }}>Biểu đồ hiện thị tỉ lệ của các trạng thái đơn hàng</h3>
                                <Doughnut

                                    data={chartData}
                                />
                                <div style={{ textAlign: 'center', marginTop: 30 }}>
                                    <span style={{ display: 'inline-block', backgroundColor: 'red', width: 10, height: 10, marginRight: 5 }}></span>
                                    <span>Chờ xử lí</span>
                                    <span style={{ display: 'inline-block', backgroundColor: 'yellow', width: 10, height: 10, marginRight: 5, marginLeft: 10 }}></span>
                                    <span>Đang giao</span>
                                    <span style={{ display: 'inline-block', backgroundColor: 'green', width: 10, height: 10, marginRight: 5, marginLeft: 10 }}></span>
                                    <span>Hoàn thành</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




        </>


    )
}

export default Home