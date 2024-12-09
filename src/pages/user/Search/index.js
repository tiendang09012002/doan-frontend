import { Link,useSearchParams } from "react-router-dom";
import React from "react"
import { getAllProducts } from "../../../services/Api";
import ProductItem from "../ProductItem";
import Panigation from "../Panigation";

const Search = () => {
    const [products,setProduct]=React.useState([])
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('keyword')
    const page = searchParams.get('page') || 1;
    const limit = 8;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    React.useEffect(()=>{
        getAllProducts({
            params:{
                keyword,
                limit,page
            }
        }).then(({data})=>{
            setProduct(data.data.docs)
            setPages(data.data.pages)
            seTotal(data.data.pages.total)
        })
    },[keyword,page])
    console.log(products)
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Tìm kiếm </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="li-section-title">
                                <h2>
                                    <span >Kết quả tìm kiếm với từ khóa : {keyword}</span>
                                </h2>

                            </div>
                            {/* shop-top-bar end */}
                            {/* shop-products-wrapper start */}
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {products.map((item) =>{
                                                    return (
                                                        <ProductItem item={item}/>
                                                    )
                                                })}
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
export default Search;