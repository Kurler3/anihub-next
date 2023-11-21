'use client'
import { Pagination } from "@/types";

interface PaginationComponentProps {
    currentPage: number;
    data: Pagination;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, data }) => {

    const onPageClick = (pageNumber: number) => {
        // Update the 'page' query parameter to '2'
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('page', pageNumber.toString());

        // Update the URL without triggering a full page reload
        window.history.replaceState({}, '', currentUrl.toString());

        window.scrollTo({ behavior: 'instant', top: 0 })

        window.location.reload();
    }

    const getPageButtons = () => {
        const totalPages = data.last_visible_page;
        const visiblePages = 5;

        if (totalPages <= visiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const pagesToShow = [];
        const halfVisible = Math.floor(visiblePages / 2);
        const startPage = Math.max(1, currentPage - halfVisible);
        const endPage = Math.min(totalPages, startPage + visiblePages - 1);

        if (startPage > 1) {
            pagesToShow.push(1, '...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pagesToShow.push(i);
        }

        if (endPage < totalPages) {
            pagesToShow.push('...', totalPages);
        }

        return pagesToShow;
    };

    return (
        <div className="join m-auto">

            <button
                className={`join-item btn${currentPage > 1 ? '' : ' btn-disabled'}`}
                onClick={() => (currentPage > 1 ? onPageClick(currentPage - 1) : null)}
            >
                {'<'}
            </button>

            {getPageButtons().map((page, index) => (
                <button
                    key={index}
                    className={`join-item btn${page === '...' ? ' ellipsis' : currentPage === page ? ' bg-highlightedColor text-white' : ''}`}
                    onClick={() => (typeof page === 'number' ? onPageClick(page) : null)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`join-item btn${currentPage < data.last_visible_page ? '' : ' btn-disabled'}`}
                onClick={() => (currentPage < data.last_visible_page ? onPageClick(currentPage + 1) : null)}
            >
                {'>'}
            </button>
        </div>
    );
};

export default PaginationComponent;