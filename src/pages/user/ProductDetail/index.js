import React from "react"
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom"
import { createCart, createComment, getCommentsProduct, getProduct, getProductByDm } from "../../../services/Api"
import { VND, getImageProduct } from "../../../shared/ultils"
import ProductItem from "../ProductItem"
import { useSelector } from "react-redux"
import moment from "moment"
import Panigation from "../PanigationCmt"
import HTMLReactParser from "html-react-parser"

const ProductDetail = () => {
    const [searchParams] = useSearchParams();

    const page = searchParams.get('page') || 1;
    const limit = 4;
    const [pages, setPages] = React.useState({})
    const [total, seTotal] = React.useState(0)

    const navigate = useNavigate()
    const user = useSelector(({ Auth }) => Auth.user)
    const [message, setMessage] = React.useState("")
    const { id } = useParams()
    const [product, setProduct] = React.useState({})
    const [productbyCategory, setProductbyCategory] = React.useState([])
    const [cmtInput, setCmtInput] = React.useState({});
    const [comments, setComments] = React.useState([])
    const onChangeCmt = (e) => {
        setMessage("")
        setCmtInput({ ...cmtInput, [e.target.name]: e.target.value });
    }
    const handleCommentClick = (e) => {
        e.preventDefault();
        if (user?._id) {

            if (cmtInput.content) {
                createComment(id, { ...cmtInput, user_id: user?._id, product: id }).then(() => {
                    getData();
                    setCmtInput({})
                })
            } else {
                setMessage(<div className="alert alert-danger">Vui lòng nhập bình luận!</div>)
            }
        } else {
            navigate("/login")
        }

    }
    const inputQuantity = document.getElementById("quantity")
    const downInputQty = () => {
        if (Number(inputQuantity.value) > 1)
            inputQuantity.value = Number(inputQuantity.value) - 1;
    }
    const upInputQty = () => {
        if (Number(inputQuantity.value) < product.quantity) {
            inputQuantity.value = Number(inputQuantity.value) + 1;
        } else {

        }
    }
    const handleAddToCart = (e) => {
        e.preventDefault()
        if (user._id) {
            createCart({
                user_id: user._id,
                product_id: id,
                quantity: Number(inputQuantity.value)
            }, {}).then(() => {
                navigate("/cart")
            })
        } else {
            navigate("/login")
        }
    }

    const getData = () => {
        getCommentsProduct(id, {
            params: {
                limit, page
            }
        }).then(({ data }) => {
            setComments(data.data.docs)
            setPages(data.data.pages)
            seTotal(data.data.pages.total)
        })
    }
    console.log(` ?????${product}`, product);

    React.useEffect(() => {
        getProduct(id, {}).then(({ data }) => {
            setProduct(data.data)
            getProductByDm(data.data.category_id, {
                params: {
                    limit: 4
                }
            }).then(({ data }) => {
                setProductbyCategory(data.data.docs)
            })
        })
        getData();

    }, [id, page])

    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Chi tiết sản phẩm</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="content-wraper">
                <div className="container">
                    <div className="row single-product-area">
                        <div className="col-lg-5 col-md-6">
                            {/* Product Details Left */}
                            <div className="product-details-left">
                                <div className="product-details-images slider-navigation-1">
                                    <div id="productCarousel" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#productCarousel" data-slide-to="0" className="active"></li>
                                            {/* Thêm các chỉ số slide nếu có nhiều hơn một hình ảnh */}
                                        </ol>
                                        <div className="carousel-inner">
                                            {/* Vòng lặp qua các hình ảnh */}
                                            {product.images && product.images.map((image, index) => (
                                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                                    <a className="popup-img venobox vbox-item" href={getImageProduct(image)} data-gall="myGallery">
                                                        <img className="d-block w-100" src={getImageProduct(image)} alt={`Product image ${index + 1}`} />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                        <a className="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#productCarousel" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>

                                </div>

                            </div>
                            {/*// Product Details Left */}
                        </div>
                        <div className="col-lg-7 col-md-6">
                            <div className="product-details-view-content pt-60">
                                <div className="product-info">
                                    <h2>{product?.name}</h2>
                                    {/* <p>Hãng sản xuất : <b className="product-details-ref">{product?.category_id?.name}</b></p> */}
                                    {/* <div className="rating-box pt-20">
                                            <ul className="rating rating-with-review-item">
                                                <li><i className="fa fa-star-o" /></li>
                                                <li><i className="fa fa-star-o" /></li>
                                                <li><i className="fa fa-star-o" /></li>
                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                <li className="no-star"><i className="fa fa-star-o" /></li>
                                                <li className="review-item"><a href="#">Read Review</a></li>
                                                <li className="review-item"><a href="#">Write Review</a></li>
                                            </ul>
                                        </div> */}

                                    {product.promotion ?
                                        <div className="price-box pt-20">
                                            <span className="new-price new-price-2">Giá: {VND.format(product?.price - (product?.price * product?.promotion) / 100)}</span>
                                            <span className="old-price" style={{ textDecoration: "line-through", color: "#666", margin: "0 10px" }}>{VND.format(product?.price)}</span>
                                            <span className="discount-percentage" style={{ color: "red" }}>-{product?.promotion}%</span>
                                        </div> :
                                        <div className="price-box pt-20">
                                            <span className="new-price new-price-2">{VND.format(product?.price)}</span>
                                        </div>
                                    }
                                    <div className="rating-box">
                                        <div>
                                            <b>Ưu đãi</b>
                                        </div>
                                        <p style={{ marginBottom: 0 }}>Phụ kiện : <span>{product.accessories}</span></p>
                                        <p >
                                            Màu : <span>{product.color}</span></p>

                                    </div>
                                    <div className="product-desc">
                                        <div>
                                            <b>Mô tả sản phẩm</b>
                                        </div>
                                        <p>
                                            <span>
                                                {product.description && HTMLReactParser(product?.description)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="rating-box pt-20">
                                        {product.quantity > 0 ?
                                            <span className="btn btn-success">Còn hàng</span> :
                                            <span className="btn btn-danger">Hết hàng</span>}
                                    </div>
                                    <div className="single-add-to-cart">
                                        <form action="#" className="cart-quantity">
                                            <div className="quantity">
                                                <label>Số lượng</label>
                                                <div className="cart-plus-minus">
                                                    <input className="cart-plus-minus-box" id="quantity" value={1} type="text" />
                                                    <div onClick={downInputQty} className="dec qtybutton"><i className="fa fa-angle-down" /></div>
                                                    <div onClick={upInputQty} className="inc qtybutton"><i className="fa fa-angle-up" /></div>
                                                </div>
                                            </div>
                                            {product.quantity > 0 ?
                                                <button className="add-to-cart" onClick={handleAddToCart} type="submit">Thêm vào giỏ hàng</button>
                                                :
                                                <button className="add-to-cart" style={{ cursor: 'not-allowed' }} disabled type="submit">Hết hàng</button>
                                            }
                                        </form>
                                    </div>
                                    <div className="product-additional-info pt-25">
                                        <a className="wishlist-btn" href="#"><i className="fa fa-heart-o" />Thêm vào danh sách yêu thích</a>
                                        <div className="product-social-sharing pt-25">
                                            <ul>
                                                <li className="facebook"><a href="#"><i className="fa fa-facebook" />Facebook</a></li>
                                                <li className="twitter"><a href="#"><i className="fa fa-twitter" />Twitter</a></li>
                                                <li className="google-plus"><a href="#"><i className="fa fa-google-plus" />Google +</a></li>
                                                <li className="instagram"><a href="#"><i className="fa fa-instagram" />Instagram</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="block-reassurance">
                                        <ul>
                                            <li>
                                                <div className="reassurance-item">
                                                    <div className="reassurance-icon">
                                                        <i className="fa fa-check-square-o" />
                                                    </div>
                                                    <p>Chính sách bảo mật (sửa với module Đảm bảo với khách hàng)</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="reassurance-item">
                                                    <div className="reassurance-icon">
                                                        <i className="fa fa-truck" />
                                                    </div>
                                                    <p>Chính sách giao hàng (sửa với module Đảm bảo với khách hàng)</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="reassurance-item">
                                                    <div className="reassurance-icon">
                                                        <i className="fa fa-exchange" />
                                                    </div>
                                                    <p> Chính sách hoàn trả (sửa với module Đảm bảo với khách hàng)</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* comment */}
            <div className="product-area pt-35">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-product-tab">
                                <ul className="nav li-product-menu">
                                    <li><a className="active" data-toggle="tab" href="#reviews"><span>Bình luận ({total})</span></a></li>
                                </ul>
                            </div>
                            {/* Begin Li's Tab Menu Content Area */}
                        </div>
                    </div>
                    <div className="tab-content">
                        <div id="reviews" className="tab-pane active show" role="tabpanel">
                            <div className="product-reviews">
                                <div className="product-details-comment-block">
                                    {!comments.length && <div className="comment-author-infos pt-25">
                                        <em>Chưa có bình luận nào!</em>
                                    </div>}
                                    <div className="li-comment-section">
                                        <ul>
                                            {comments.map((item, index) => {

                                                return (
                                                    <li>
                                                        <div className="author-avatar pt-15">
                                                            <img class="shopee-avatar__img" style={{ height: 60, width: 60, borderRadius: 500, marginRight: 4 }} alt="ảnh đại diện" src="https://down-vn.img.susercontent.com/file/vn-11134226-7r98o-lphihlglcmk5ee_tn" />

                                                        </div>
                                                        <div className="comment-body pl-15">
                                                            <p>{item.user_id.fullName}</p>
                                                            <div className="comment-post-date">
                                                                {moment(item.createdAt).fromNow()}
                                                            </div>
                                                            <p>{item.content}</p>
                                                        </div>
                                                    </li>
                                                )
                                            })}

                                        </ul>
                                    </div>


                                    <div className="review-btn">
                                        <p className="feedback-form">
                                            <label htmlFor="feedback">Bình luận</label>
                                            <textarea id="feedback" onChange={onChangeCmt} name="content" cols={45} rows={8} value={cmtInput?.content || ""} aria-required="true" style={{ height: 50 }} />
                                            {message}
                                        </p>

                                        <a className="review-links" onClick={handleCommentClick} href="#" data-toggle="modal" data-target="#mymodal">Bình luận!</a>
                                    </div>
                                    {/* Begin Quick View | Modal Area */}

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Phân trang */}
                    <Panigation pages={{ ...pages, total }} />
                </div>
            </div>
            {/* liên quan */}
            <div className="content-wraper pt-60 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-section-title">
                                <h2>
                                    <span >Sản phẩm liên quan</span>
                                </h2>

                            </div>

                            {/* shop-top-bar end */}
                            {/* shop-products-wrapper start */}
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className="tab-pane fade active show" role="tabpanel">
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {productbyCategory.map((item) => {
                                                    return (<ProductItem item={item} />)
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
                                                        <Link to="/products" className="Next"> Xem thêm  <i className="fa fa-chevron-right" /></Link>
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
export default ProductDetail