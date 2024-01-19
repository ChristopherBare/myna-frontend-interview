import {useState} from "react";

const Search = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
        console.info("search term is now", term)
    };

    return (
        <label className="form-control w-full max-w-xs">
            <input type="search"
                   placeholder="Search..."
                   className="input input-bordered w-full max-w-xs rounded-full"
                   value={searchTerm}
                   onChange={handleInputChange}/>
        </label>
    )
}

export default Search;