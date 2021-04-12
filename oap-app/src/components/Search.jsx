// Component of a search bar
const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return(
    <form action="/" method="get">
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="description key words"
            name="d-search" 
        />
    </form>
    );
}

export default SearchBar;