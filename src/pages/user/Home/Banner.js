import React from "react"
import Aos from "aos"
import "aos/dist/aos.css"
const Banner = () => {
    React.useEffect(()=>{
        Aos.init()
        Aos.refresh()
    },[])
    return (
        <>
            <div data-aos="fade-up" className="li-static-banner">
                <div className="container">
                    <div className="row">
                        {/* Begin Single Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="./Asset/User/images/banner/slide1.png" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        {/* Single Banner Area End Here */}
                        {/* Begin Single Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="./Asset/User/images/banner/slide2.png" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        {/* Single Banner Area End Here */}
                        {/* Begin Single Banner Area */}
                        <div className="col-lg-4 col-md-4 text-center pt-xs-30">
                            <div className="single-banner">
                                <a href="#">
                                    <img src="./Asset/User/images/banner/slide3.jpg" alt="Li's Static Banner" />
                                </a>
                            </div>
                        </div>
                        {/* Single Banner Area End Here */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Banner