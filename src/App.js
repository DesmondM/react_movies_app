import React from 'react';
import {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavouriteMovies from './components/AddFavouriteMovies';
import RemoveFavourites from './components/RemoveFavourites';

const App=()=> {
  const [movies, setMovies] = useState([]);

  const [favourites, setFavourites] = useState([]);
  // search value is the "state"
  const [searchValue, setSearchValue] = useState('');
  
  const getMovieRequest = async (searchValue) =>{
    try {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=e890f7a8`

    const response = await fetch(url);
    
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search)
       }
      
      } catch (error) {
      console.log(error)
      }
  };

// Anytime the "searchValue" changes
  useEffect(() => {
    getMovieRequest(searchValue);
    
  }, [searchValue]);

  useEffect(()=>{
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    if(movieFavourites){
      setFavourites(movieFavourites);
    }
  }, []); //a dependency



  const saveToLocalStorage =(items)=>{
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavourite =(movie)=>{
    const newFavouriteList =[...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie =(movie)=>{
    const newFavouriteList = favourites.filter(
      (favourite)=>favourite.imdbID!==movie.imdbID
      );
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading ='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
        </div>

      <div className='row'> 
      <MovieList movies = {movies} 
      handleFavouritesClick={addFavourite} 
      favouriteComponent ={AddFavouriteMovies} 
      />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading ='Favourites'/>
      </div>
      <div className='row'> 
      <MovieList movies = {favourites} 
      handleFavouritesClick={removeFavouriteMovie} 
      favouriteComponent ={RemoveFavourites} 
      />
      </div>
    </div>
  );
}

export default App;
