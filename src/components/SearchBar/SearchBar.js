

export function SearchBar({ searchBooks, setSearchBooks, filterBooks, sortBooks }) {

  return <form id="searchBarForm">

    <input type="text" value={searchBooks} placeholder="Search books" 
    onChange = {(e) => setSearchBooks(e.target.value)} />

    <br />

    <div id="booksDropdownWrapper">

      <div>
        Filter by:
        <label htmlFor="filterBooks">
          <select name="filterBooks" value="default" onChange={(e) => {filterBooks(e.target.value)}} >
            <option value="default" disabled hidden> </option>
              <option value="currentlyReading"> currently reading</option>
              <option value="favourite"> favourite</option>
          </select>
        </label>
      </div>

      <div>
        Sort by:
        <label htmlFor="sortBooks">
          <select name="sortBooks" value="default" onChange={(e) => {sortBooks(e.target.value)}} >
            <option value="default" disabled hidden> </option>
              <option value="author"> author</option>
              <option value="genre"> genre</option>
          </select>
        </label>
      </div>

    </div>

  </form>
};