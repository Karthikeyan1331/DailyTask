import React, { Component } from "react";
import Pagination from './Pagination';
import DataGet from "./DataGet";

class MovieTable extends Component {
    state = {
        content: [],
        pageSize: 4,
        totalPage: 0,
        currentPage: 1,
    }

    async componentDidMount() {
        const data = await DataGet();
        this.setState({ content: data });
    }

    handleOnClickDelete = (dealID) => {
        if (window.confirm("Do you really want to delete this item?")) {
            this.setState(prevState => ({
                content: prevState.content.filter(item => item.dealID !== dealID)
            }));
        }
    }

    handleOnPageChange = (page) => {
        this.setState({ currentPage: page });
    }

    getPagedData = () => {
        const { content, pageSize, currentPage } = this.state;
        const startIndex = (currentPage - 1) * pageSize;
        return content.slice(startIndex, startIndex + pageSize);
    }

    render() {
        const { length: count } = this.state.content;
        if (count === 0) return <p>There is no review available for any books or games</p>;

        const pagedContent = this.getPagedData();

        return (
            <React.Fragment>
                <div>Showing exactly {count} games and movie reviews</div>
                <Pagination
                    itemCount={count}
                    pageSize={this.state.pageSize}
                    currentPage={this.state.currentPage}
                    onPageChange={this.handleOnPageChange}
                />
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-dark text-center">
                            <tr>
                                <th width="5%">S.No</th>
                                <th width="30%">Title</th>
                                <th width="10%">Rating</th>
                                <th width="10%">Price</th>
                                <th width="5%">Likes</th>
                                <th width="30%">Picture</th>
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedContent.map((cur, index) => (
                                <tr key={cur.dealID} className="text-center">
                                    <td>{index + 1 + (this.state.currentPage - 1) * this.state.pageSize}</td>
                                    <td>{cur.title}</td>
                                    <td>{cur.dealRating}</td>
                                    <td>${cur.salePrice}</td>
                                    <td>{cur.likes}</td>
                                    <td><img src={cur.thumb} alt={cur.internalName} width="150" /></td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => this.handleOnClickDelete(cur.dealID)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </React.Fragment>
        );
    }
}

export default MovieTable;
