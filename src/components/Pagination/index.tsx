import ReactPaginate from "react-paginate"
import { PER_PAGE_STANDARD_LIMIT } from "./const"
import { Props } from "./types"
import "./styles.scss"

export const Pagination: React.FC<Props> = ({ onChange, total, page }) => (
    <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={onChange}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(total / PER_PAGE_STANDARD_LIMIT)}
        previousLabel="<"
        forcePage={page - 1}
        className="pagination"
        activeClassName="selected"
    />
)
