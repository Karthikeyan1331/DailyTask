import React, { Component } from "react";
import MovieTable from "./MovieTable";
class Mainpage extends Component {
    state = {}
    render() {
        return (
            <main className="container">
                <h1>Movie Ratings</h1>
                <MovieTable />
            </main>
        );
    }
}

export default Mainpage;