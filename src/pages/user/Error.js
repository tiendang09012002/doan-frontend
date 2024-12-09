import { Link } from "react-router-dom"

const Error = () => {
    return (
        <>
            <div style={{marginTop:"-20px"}} className="breadcrumb-area">
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul>
                            <li><Link to="/">Trang chủ</Link></li>
                            <li className="active">Page Error</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="error404-area pt-30 pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="error-wrapper text-center ptb-50 pt-xs-20">
                                <div className="error-text">
                                    <h1>404</h1>
                                    <h2>Opps! PAGE NOT BE FOUND</h2>
                                    <p>Sorry but the page you are looking for does not exist, have been removed, <br /> name changed or is temporarity unavailable.</p>
                                </div>
                                <div className="search-error">
                                    <form id="search-form" action="#">
                                        <input type="text" placeholder="Search" />
                                        <button><i className="zmdi zmdi-search" /></button>
                                    </form>
                                </div>
                                <div className="error-button">
                                    <Link to="/">Quay lại trang chủ</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Error