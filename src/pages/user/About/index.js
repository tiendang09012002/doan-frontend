import { Link } from "react-router-dom"

const About = () => {
    return (
        <>
            <div style={{ marginTop: "-20px" }} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">About </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="about-us-wrapper pt-60 pb-40">
                    <div className="container">
                        <div className="row">
                            {/* About Text Start */}
                            <div className="col-lg-6 order-last order-lg-first">
                                <div className="about-text-wrap">
                                    <h2><span>Dịch vụ tốt nhất</span>Sản phẩm dành cho bạn</h2>
                                    <p>Chúng tôi cung cấp loại dầu râu tốt nhất trên toàn thế giới. Chúng tôi là cửa hàng tốt nhất thế giới về Laptop. Bạn có thể mua sản phẩm của chúng tôi mà không phải đắn đo vì họ tin tưởng chúng tôi và mua sản phẩm của chúng tôi mà không hề đắn đo vì họ tin tưởng và luôn vui vẻ khi mua sản phẩm của chúng tôi.</p>
                                    <p>Một số khách hàng của chúng tôi nói rằng họ tin tưởng chúng tôi và mua sản phẩm của chúng tôi mà không hề do dự vì họ tin tưởng chúng tôi và luôn vui vẻ khi mua sản phẩm của chúng tôi.</p>
                                    <p>Chúng tôi cung cấp những điều tốt nhất mà họ đã tin tưởng chúng tôi và mua sản phẩm của chúng tôi mà không hề có bất kỳ sự đắn đo nào vì họ tin tưởng chúng tôi và luôn vui vẻ mua hàng.</p>
                                </div>
                            </div>
                            {/* About Text End */}
                            {/* About Image Start */}
                            <div className="col-lg-5 col-md-10">
                                <div className="about-image-wrap">
                                    <img className="img-full" src="./Asset/User/images/product/large-size/13.jpg" alt="About Us" />
                                </div>
                            </div>
                            {/* About Image End */}
                        </div>
                    </div>
                </div>
                {/* about wrapper end */}
                {/* Begin Counterup Area */}
                <div className="counterup-area pb-40">
                    <div className="container-fluid p-0">
                        <div className="row no-gutters">
                            <div className="col-lg-3 col-md-6">
                                {/* Begin Limupa Counter Area */}
                                <div className="limupa-counter white-smoke-bg">
                                    <div className="container">
                                        <div className="counter-img">
                                            <img src="./Asset/User/images/about-us/icon/1.png" alt />
                                        </div>
                                        <div className="counter-info">
                                            <div className="counter-number">
                                                <h3 className="counter">2169</h3>
                                            </div>
                                            <div className="counter-text">
                                                <span>HAPPY CUSTOMERS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* limupa Counter Area End Here */}
                            </div>
                            <div className="col-lg-3 col-md-6">
                                {/* Begin limupa Counter Area */}
                                <div className="limupa-counter gray-bg">
                                    <div className="counter-img">
                                        <img src="./Asset/User/images/about-us/icon/2.png" alt />
                                    </div>
                                    <div className="counter-info">
                                        <div className="counter-number">
                                            <h3 className="counter">869</h3>
                                        </div>
                                        <div className="counter-text">
                                            <span>AWARDS WINNED</span>
                                        </div>
                                    </div>
                                </div>
                                {/* limupa Counter Area End Here */}
                            </div>
                            <div className="col-lg-3 col-md-6">
                                {/* Begin limupa Counter Area */}
                                <div className="limupa-counter white-smoke-bg">
                                    <div className="counter-img">
                                        <img src="./Asset/User/images/about-us/icon/3.png" alt />
                                    </div>
                                    <div className="counter-info">
                                        <div className="counter-number">
                                            <h3 className="counter">689</h3>
                                        </div>
                                        <div className="counter-text">
                                            <span>HOURS WORKED</span>
                                        </div>
                                    </div>
                                </div>
                                {/* limupa Counter Area End Here */}
                            </div>
                            <div className="col-lg-3 col-md-6">
                                {/* Begin limupa Counter Area */}
                                <div className="limupa-counter gray-bg">
                                    <div className="counter-img">
                                        <img src="./Asset/User/images/about-us/icon/4.png" alt />
                                    </div>
                                    <div className="counter-info">
                                        <div className="counter-number">
                                            <h3 className="counter">2169</h3>
                                        </div>
                                        <div className="counter-text">
                                            <span>COMPLETE PROJECTS</span>
                                        </div>
                                    </div>
                                </div>
                                {/* limupa Counter Area End Here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default About