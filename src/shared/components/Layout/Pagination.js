import { Link, useSearchParams, useLocation } from "react-router-dom";

const Pagination = ({ pages }) => {
  
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || '';
    const totalPages = Math.ceil(pages.total / pages.limit);

    const formatUrl = (page) => {
        return `${location.pathname}?keyword=${keyword}&page=${page}`;
    };

    const renderPagesHtml = (delta = 2) => {
        const left = pages.currentPage - delta;
        const right = pages.currentPage + delta;
        const pagesHtml = [];
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || i === pages.currentPage || (i >= left && i <= right)) {
                pagesHtml.push(i);
            } else if (i === left - 1 || i === right + 1) {
                pagesHtml.push("...");
            }
        }
        return pagesHtml;
    };

    return (
        <>
            <ul className="pagination">
                {pages.hasPrev && <li className="page-item"><Link className="page-link" to={formatUrl(pages.prev)}>Trang trước</Link></li>}
                {renderPagesHtml().map((page, index) => (
                    page !== "..." ? (
                        <li key={index} className={`page-item ${pages.currentPage === page ? "active" : ""}`}>
                            <Link className="page-link" to={formatUrl(page)}>{page}</Link>
                        </li>
                    ) : (
                        <li key={index} className="page-item"><span className="page-link">{page}</span></li>
                    )
                ))}
                {pages.hasNext && <li className="page-item"><Link className="page-link" to={formatUrl(pages.next)}>Trang sau</Link></li>}
            </ul>
        </>
    );
};

export default Pagination;
