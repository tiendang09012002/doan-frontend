import React from "react"
import { Link } from "react-router-dom"
import { getProductHot } from "../../../services/Api"
import ProductItem from "../ProductItem"
import Aos from "aos"
import "aos/dist/aos.css"

const ProductHot = () => {
    const [productHot,setProductHot]=React.useState([])
    React.useEffect(()=>{
        getProductHot({
            params:{
                limit:4
            }
        }).then(({data})=>{
            setProductHot(data.data)
        })
        Aos.init()
        Aos.refresh()
    },[])

    return (
        <>
            <div data-aos="fade-up" className="content-wraper pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-section-title">
                                <h2>
                                    <span >Sản phẩm nổi bật</span>
                                </h2>
                                
                            </div>

                            {/* shop-top-bar end */}
                            {/* shop-products-wrapper start */}
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {productHot.map((item) =>{
                                                    return (<ProductItem item={item}/>)
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="paginatoin-area">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">

                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <ul className="pagination-box">
                                                    <li>
                                                        <Link to="/products" className="Next"> Xem tất cả  <i className="fa fa-chevron-right" /></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* shop-products-wrapper end */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductHot