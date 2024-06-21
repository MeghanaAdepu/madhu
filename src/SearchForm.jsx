import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchForm({ setSearchQuery }) {
    const [searchInput, setSearchInput] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        history.push(`/user-details/${searchInput}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Search by ID, Name, or Email:
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default SearchForm;