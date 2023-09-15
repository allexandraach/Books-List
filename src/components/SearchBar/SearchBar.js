

export function SearchBar({ searchBooks, search, filterBooks, disableBtn }) {

  return <form id="searchBarForm">
      <input type="text" value={searchBooks} id="searchBooks" placeholder="Search books"
        onChange={(e) => { search(e.target.value) }} />
    <br />

    <div id="booksDropdownWrapper">

      <div>
        Filter by:
        <label htmlFor="filterBooks">
          <select name="filter" value="default" id="filterBooks"
            onChange={(e) => { filterBooks(e.target.name, e.target.value) }} >
            <option value="default" disabled hidden> </option>
            <option value="currentlyReading"> currently reading</option>
            <option value="favourite"> favourite</option>
          </select>
        </label>
      </div>

      <div>
        Sort by:
        <label htmlFor="sortBooks">
          <select name="sort" value="default" id="sortBooks"
            onChange={(e) => { filterBooks(e.target.name, e.target.value) }} >
            <option value="default" disabled hidden> </option>
            <option value="title"> asc order</option>
            <option value="author"> author</option>
            <option value="genre"> genre</option>
          </select>
        </label>
      </div>

      <div>
        <button id="clearBtn" to="/" disabled={!disableBtn} >
          Clear </button>
      </div>

    </div>


  </form>
};