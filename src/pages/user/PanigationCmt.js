import { Link,useSearchParams } from "react-router-dom"


const Panigation = ({ pages }) => {
    const { currentPage, total, limit, next, prev, hasNext, hasPrev } = pages
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get('keyword')
    const renderPage = () => {
        const pageHtml = []
        const pageCount = Math.ceil(total / limit)
        const l = currentPage - 1
        const r = currentPage + 1

        for (let i = 1; i <= pageCount; i++) {
            if ([1, pageCount, currentPage].includes(i) || (i >= l && i <= r)) {
                pageHtml.push(i);
            } else if (i == l - 1 || i == r + 1) {
                pageHtml.push("...")
            }
        }
        return pageHtml
    }
    return (<>

        <div className="row">
            <div className="col-lg-12">
                <div className="li-paginatoin-area text-center pt-25">
                    <div className="row">
                        <div className="col-lg-12">
                            <ul className="li-pagination-box">
                                {hasPrev && <li><Link to={keyword?`?keyword=${keyword}&page=${prev}`:`?page=${prev}`} className="Previous"><i className="fa fa-chevron-left" /> Previous</Link>
                                </li>}
                                {renderPage().map((item) => {

                                    return item === "..." ? <li><span >{item}</span></li>
                                        : <li className={currentPage == item ? "active" : ""}><Link to={keyword?`?keyword=${keyword}&page=${item}`:`?page=${item}`}>{item}</Link></li>
                                })}

                                {hasNext && <li>
                                    <Link to={keyword?`?keyword=${keyword}&page=${next}`:`?page=${next}`} className="Next"> Next <i className="fa fa-chevron-right" /></Link>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}

export default Panigation