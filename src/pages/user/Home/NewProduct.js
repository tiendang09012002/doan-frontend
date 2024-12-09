import React from "react"
import { getAllProducts } from "../../../services/Api"
import ProductItem from "../ProductItem"
import Panigation from "../Panigation"
import { useSearchParams } from "react-router-dom"
import Aos from "aos"
import "aos/dist/aos.css"
const NewProduct = () => {

    const [products,setProduct]=React.useState([])

    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') || 1;
    const limit = 8;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)
    React.useEffect(()=>{
        getAllProducts({
            params:{
                limit,page
            }
        }).then(({data})=>{
            setProduct(data.data.docs)
            setPages(data.data.docs.pages)
            seTotal(data.data.docs.total)
        })
        Aos.init()
        Aos.refresh()
        
    },[page])
    return (
        <>
            <div data-aos="fade-up" className="content-wraper pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-section-title">
                                <h2>
                                    <span >Sản phẩm mới</span>
                                </h2>

                            </div>
                            {/* shop-top-bar end */}
                            {/* shop-products-wrapper start */}
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {products.map((item) =>
                                                    <ProductItem item={item}/>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <Panigation pages={{...pages,total}}/>
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
export default NewProduct