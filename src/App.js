import {React, useEffect, useState} from 'react'
// import SearchBar from './components/SearchBar.js'
import Book from './components/Book.js'
import BookMesh from './components/Book.js';
import './style.css';

export default function App() {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchBarValue, setSearchBarValue] = useState("Hacking Darwin")
    const [bookSearch, setBookSearch] = useState("")
    const [searchExpandToggle, setSearchExpandToggle] = useState(["hidden"])
    const [searchExpandOpacity, setSearchExpandOpacity] = useState(0)

    const [searchHistory, setSearchHistory] = useState([])

    // const [searchResults, setSearchResults] = useState([])


    const [book, setBook] = useState({
      title: "",
      author: "",
      pages: 100,
      cover: '', 
    })

     // API Call 
     

   const apiCall = useEffect(() => {
        var googleAPI = `https://www.googleapis.com/books/v1/volumes?q=${searchBarValue}&key=AIzaSyDimuW-oYnw1e9JomtKM1dpWgBSn_Y-6vw`

         const fetchData = async () => {
            try {
                const response = await fetch(googleAPI);
                const data = await response.json();

               
                setBook(prevState => {
                  searchHistory.push(data.items[0].volumeInfo.title)
                   console.log(searchHistory)

                  return {
                        ...book,
                        title: data.items[0].volumeInfo.title,
                        author: data.items[0].volumeInfo.authors,
                        pages: data.items[0].volumeInfo.pageCount / 400,
                        cover: data.items[0].volumeInfo.imageLinks.thumbnail
                  }
                })
           
                // console.log(book)

                

                // console.log(googleBooksData.items[0].volumeInfo.imageLinks.thumbnail)
                    } catch (error) {
                        console.log("error", error);
                    }
                    };

        fetchData();

    }, [searchBarValue]);

 

    const expandSearchBar = () => {
      setSearchExpandToggle("visible")
      setSearchExpandOpacity(1)
      // console.log("expand search bar")
      document.getElementsByClassName('search-bar')
    }


  return (
    <div>

        <div>
            <div className="search-bar-container"
>               
              <div className='search-bar-div'>
                <input
                    id='searchInput'
                    className="search-bar"
                    placeholder="search a book..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={expandSearchBar}
                    autoComplete="off"
                 ></input>
                 <button className='search-button' onClick={() => {setSearchBarValue(searchTerm)}}><img src={"./searchicon.png"} width={"36px"}></img></button>
                 <div>

                 </div>
              </div>
                <div className='search-contents-div' 
                      style={{"visibility": searchExpandToggle, "opacity": searchExpandOpacity}}>
                  {/* <h1>{searchResults}</h1> */}
                  {/* <h1>{book.title}</h1>
                  <p>{book.author}</p> */}
                  {book.author}
                  {searchHistory.map((item, i) => {return (<p onClick={() => console.log("clicked!")}>{searchHistory[i]}</p>)})}
                  {/* <p style={{"position": "absolute", "zIndex": "120", "cursor": "pointer"}} onMouseDown={console.log("clicked")}>{searchHistory}</p> */}
                </div>
            </div>
        </div>
        <Book width={book.pages} title={book.title} author={book.author} cover={book.cover} />
        


        {/* <button className='button' onClick={apiCall} ></button> */}
    </div>
    
  )
}

