import React from 'react'

const Pagination = ({ pageCount, clicked }) => {

    let pageLinks = []

    if(pageCount > 1) {
        for(let i = 0; i < pageCount; i++) {
            let pageNumber = i + 1
            pageLinks.push(<li className="page-item" key={`pageLink${i}`}><a className="page-link" href="#" onClick={() => clicked(i)}>{pageNumber}</a></li>)
        }
    }

    return(
        <ul className="pagination">
            {pageLinks}
        </ul>
    )
}

export default Pagination