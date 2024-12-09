import { Link,useSearchParams,useParams } from "react-router-dom";
import React from "react";
import { getCategory, getProductByDm } from "../../../services/Api";
import ProductItem from "../ProductItem";
import Panigation from "../Panigation";
const Category = () => {
    const {id}=useParams();
    const [category,setCategory]=React.useState({})
    const [products, setProducts] = React.useState([])
    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') || 1;
    const limit = 8;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    const getData = () => {
        getProductByDm(id,{
            params: {
                limit,
                page
            }
        }).then(({ data }) => {
            setProducts(data.data.docs)
            seTotal(data.data.pages.total)
            setPages(data.data.pages)
        })
    }
    React.useEffect(() => {
        getCategory(id,{}).then(({ data }) => {
            console.log(data);
            setCategory(data.data)
        })
        getData();
    }, [page,id])

    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Danh mục </li>
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
                                    <span >{category.name} hiện có {total} sản phẩm</span>
                                </h2>

                            </div>
                            {/* shop-top-bar end */}
                            {/* shop-products-wrapper start */}
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {products.map((item) =>(<ProductItem item={item}/>))}
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
export default Category;