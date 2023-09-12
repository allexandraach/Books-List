

export function SearchBar({ searchBooks, search, filterBooks, disableBtn }) {

  return <form id="searchBarForm">

    <input type="text" value={searchBooks} placeholder="Search books"
      onChange={(e) => { search(e.target.value) }} />

    <br />

    <div id="booksDropdownWrapper">

      <div>
        Filter by:
        <label htmlFor="filterBooks">
          <select name="filter" value="default" onChange={(e) => { filterBooks(e.target.name, e.target.value) }} >
            <option value="default" disabled hidden> </option>
            <option value="currentlyReading"> currently reading</option>
            <option value="favourite"> favourite</option>
          </select>
        </label>
      </div>

      <div>
        Sort by:
        <label htmlFor="sortBooks">
          <select name="sort" value="default" onChange={(e) => { filterBooks(e.target.name, e.target.value) }} >
            <option value="default" disabled hidden> </option>
            <option value="author"> author</option>
            <option value="genre"> genre</option>
          </select>
        </label>
      </div>

      <div>
        <button id="clearBtn" href="/" disabled={!disableBtn} >
          Clear </button>
      </div>

    </div>


  </form>
};