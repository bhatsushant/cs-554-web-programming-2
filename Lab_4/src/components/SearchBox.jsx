import '../styles/SearchBox.css';

const SearchBox = ({handleInputChange, label}) => {
    return (
        <div className="search-box">
            <label htmlFor="search-box" className='bigger'>{`SEARCH ${label} :`}</label>
            <input type="search" onChange={handleInputChange} id="search-box" placeholder={`SEARCH ${label}`} name="search-box" />
        </div>
    )
}

export default SearchBox;