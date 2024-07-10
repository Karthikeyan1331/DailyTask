import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
const Pagination1 = (props) => {
    const { itemCount, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(itemCount / pageSize);

    if (pageCount === 1) return null; // if there's only one page, don't render pagination

    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    const renderPaginationItems = () => {
        const items = [];
        if (pageCount <= 5) {
            // Show all pages if there are 5 or less
            pages.forEach(page => {
                items.push(
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Pagination.Item>
                );
            });
        } else {
            if (currentPage > 0) {
                items.push(
                    <Pagination.Item active={currentPage === 1} key={1} onClick={() => onPageChange(1)}>
                        1
                    </Pagination.Item>
                );
                if (currentPage > 3) items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(pageCount - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }

            if (currentPage <= pageCount) {
                if (currentPage < pageCount - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" />);
                items.push(
                    <Pagination.Item active={currentPage === pageCount} key={pageCount} onClick={() => onPageChange(pageCount)}>
                        {pageCount}
                    </Pagination.Item>
                );
            }
        }

        return items;
    };

    return (
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === pageCount} />
            <Pagination.Last onClick={() => onPageChange(pageCount)} disabled={currentPage === pageCount} />
        </Pagination>
    );
};
Pagination1.propTypes = {
    itemCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pagination1;
