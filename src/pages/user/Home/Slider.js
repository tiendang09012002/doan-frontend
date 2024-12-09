import React from "react"
import Aos from "aos"
import "aos/dist/aos.css"
const Slider = () => {

    React.useEffect(() => {
        Aos.init()
        Aos.refresh()
    }, [])
    return (
        <>
            <div data-aos="fade-up" className="slider-with-banner">
                <div className="container">
                    <div className="row">
                        {/* Begin Slider Area */}
                        <div className="col-lg-8 col-md-8">
                            <div className="slider-area">
                                <div className="slider-active owl-carousel">
                                    {/* Begin Single Slide Area */}
                                    {/* <div className="single-slide align-center-left  animation-style-01 bg-1">
                                        <div className="slider-progress" />
                                        <div className="slider-content">
                                            <h5>Sale Offer <span>-20% Off</span> This Week</h5>
                                            <h2>Chamcham Galaxy S9 | S9+</h2>
                                            <h3>Starting at <span>$1209.00</span></h3>
                                            <div className="default-btn slide-btn">
                                                <a className="links" href="shop-left-sidebar.html">Shopping Now</a>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* Single Slide Area End Here */}
                                    {/* Begin Single Slide Area */}
                                    <div className="single-slide align-center-left animation-style-02 bg-2">
                                        <div className="slider-progress" />
                                        <div className="slider-content">
                                            <h5>Khuyến mãi <span>Mùa hè</span></h5>
                                            <h2>Microsoft Surface Studio Mockup</h2>
                                            <h3>Giảm giá <span>2tr VNĐ</span></h3>
                                            <div className="default-btn slide-btn">
                                                <a className="links" href="shop-left-sidebar.html">Mua ngay</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Single Slide Area End Here */}
                                    {/* Begin Single Slide Area */}
                                    <div className="single-slide align-center-left animation-style-01 bg-3">
                                        <div className="slider-progress" />
                                        <div className="slider-content">
                                            <h5>Khuyến mãi <span>Mùa hè</span></h5>
                                            <h2>Phantom 4 Pro+ Obsidian</h2>
                                            <h3>Giảm giá <span>2tr VNĐ</span></h3>
                                            <div className="default-btn slide-btn">
                                                <a className="links" href="shop-left-sidebar.html">Mua ngay</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Single Slide Area End Here */}
                                </div>
                            </div>
                        </div>
                        {/* Slider Area End Here */}
                        {/* Begin Li Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="li-banner">
                                <a href="#">
                                    <img src="./Asset/User/images/banner/slide1.png" alt />
                                </a>
                            </div>
                            <div className="li-banner mt-15 mt-sm-30 mt-xs-30">
                                <a href="#">
                                    <img src="./Asset/User/images/banner/638439395021366400_lny-kv_-meta_yoga-slim-7i-pro-9i-x90_1920x1200_vn.jpg" alt />
                                </a>
                            </div>
                        </div>
                        {/* Li Banner Area End Here */}
                    </div>
                </div>
            </div>


        </>

    )
}

export default Slider