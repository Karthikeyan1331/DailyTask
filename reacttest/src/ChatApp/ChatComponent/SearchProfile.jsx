import React from 'react'

const SearchProfile = () => {
    return (
        <div className="input-group rounded mb-3">
            
            <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
            />
            <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search"></i>
            </span>
        </div>
    )
}

export default SearchProfile
