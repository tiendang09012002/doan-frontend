import { Link, useNavigate } from "react-router-dom"
import React from "react"
import { useSelector } from "react-redux"
import { getCartUser } from "../../../../services/Api"
import { VND } from "../../../../shared/ultils"
const HeaderMiddle = () => {
    const navigate = useNavigate()

    const [quantity, setQuantity] = React.useState(0)
    const [total, setTotal] = React.useState(0)
    const [keyword, setKeyword] = React.useState("")

    const user = useSelector(({ Auth }) => Auth.user)
    React.useEffect(() => {
        if (user._id) {
            getCartUser(user._id, {}).then(({ data }) => {
                console.log(data);
                const qty = data.data.reduce((sum, item) => sum + item.quantity, 0)
                setQuantity(qty)
                const sumPrice = data.data.reduce((sum, item) =>
                    sum + (item.product_id.price - (item.product_id.price * item.product_id.promotion) / 100) * item.quantity, 0)
                setTotal(sumPrice)
            })
        }else{
            setTotal(0)
            setQuantity(0)

        }

    })
    const onChangeSearch = (e) => {
        setKeyword(e.target.value)
    }
    const onEnterSearch = (e) => {
        if (e.which == 13) {
            e.preventDefault()
            if (e.target.value.trim()) {
                navigate(`/search?keyword=${keyword.trim()}`)
            }
            e.target.blur()
        }
    }
    const onClickSearch=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search?keyword=${keyword.trim()}`)
        }else{
            document.getElementById("search").focus()
        }
        

    }
    return (
        <>
            <div className="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
                <div className="container">
                    <div className="row">
                        {/* Begin Header Logo Area */}
                        <div className="col-lg-3">
                            <div className="logo pb-sm-30 pb-xs-30">
                                <a href="/">
                                    <img   className="img-fluid" src="./Asset/User/images/menu/logo/logo header.png" alt />
                                </a>
                            </div>
                        </div>
                        {/* Header Logo Area End Here */}
                        {/* Begin Header Middle Right Area */}
                        <div className="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
                            {/* Begin Header Middle Searchbox Area */}
                            <form action="#" className="hm-searchbox">
                                <input onChange={onChangeSearch} id="search" onKeyDown={onEnterSearch} value={keyword||""} type="text" placeholder="Nhập từ khóa tìm kiếm ..." />
                                <button onClick={onClickSearch} className="li-btn" type="submit"><i style={{color :"white"}} className="fa fa-search" /></button>
                            </form>
                            {/* Header Middle Searchbox Area End Here */}
                            {/* Begin Header Middle Right Area */}
                            <div className="header-middle-right">
                                <ul className="hm-menu">
                                    {/* Begin Header Middle Wishlist Area */}
                                    {/* <li className="hm-wishlist">
                                        <a href="wishlist.html">
                                            <span className="cart-item-count wishlist-item-count">0</span>
                                            <i className="fa fa-heart-o" />
                                        </a>
                                    </li> */}
                                    {/* Header Middle Wishlist Area End Here */}
                                    {/* Begin Header Mini Cart Area */}
                                    <li onClick={() => navigate("/cart")} className="hm-minicart">
                                        <div className="hm-minicart-trigger is-active">
                                            <span className="item-icon" />
                                            <span className="item-text">{VND.format(total)}
                                                <span className="cart-item-count">{quantity}</span>
                                            </span>
                                        </div>
                                        <span />

                                    </li>
                                    
                                    {/* Header Mini Cart Area End Here */}
                                </ul>
                            </div>
                            {/* Header Middle Right Area End Here */}
                        </div>
                        {/* Header Middle Right Area End Here */}
                    </div>
                </div>
            </div>



        </>
    )
}

export default HeaderMiddle