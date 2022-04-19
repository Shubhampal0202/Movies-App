import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currGen: 'All Genres',
            movies: [],
            limit:5,
            currText: '',
            currPage:1
        }
    }
    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let data = JSON.parse(localStorage.getItem('movies') || '[]');

        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })
        //   console.log(temp);
        temp.unshift('All Genres');
        this.setState({
            genres: [...temp],
            movies: [...data]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGen: genre
        })
    }

    sortPopularityDesc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity - objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortPopularityAsc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity - objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingAsc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average - objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingDesc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average - objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange = (page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDelete =(id)=>{
     let newArr =[];
     newArr = this.state.movies.filter((movieObj)=>movieObj.id!=id);
     this.setState({
         movies:[...newArr]
     })
     localStorage.setItem('movies',JSON.stringify(newArr));
    }

    render() {


        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let filterarr =[];
        if(this.state.currText===''){
            filterarr = this.state.movies;
            
        }else{
            filterarr = this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                 return title.includes(this.state.currText.toLowerCase());
            })
        }

        if(this.state.currGen!=='All Genres'){
            filterarr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] === this.state.currGen)
        }

      let pages = Math.ceil(filterarr.length/this.state.limit);
      let pagesArr =[];
      for(let i=1;i<=pages;i++){
          pagesArr.push(i);
      }
      let si = (this.state.currPage-1)*this.state.limit;
      let ei = si + this.state.limit;
      filterarr = filterarr.slice(si,ei);


        return (

            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                                <ul class="list-group Favourites-genres">
                                    {
                                        this.state.genres.map((genre) => (                        // here foreach method can not be used bcos it does not return anything
                                            this.state.currGen === genre ?
                                                <li class="list-group-item" style={{ background: '#3f51b5', color: 'white', font: 'bold' }}>{genre}</li> :
                                                <li class="list-group-item" style={{ background: 'white', color: '#3f51b5', font: 'bold' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                        ))
                                    }
                                    {/* <li class="list-group-item">All Genres</li>
                            <li class="list-group-item">Action</li>
                            <li class="list-group-item">Action</li>
                            <li class="list-group-item">Action</li>
                            <li class="list-group-item">Action</li>
                            <li class="list-group-item">Action</li> */}
                                </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                                    <input type="number" className='input-group-text col' placeholder='Rows count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})} />
                                </div>
                                <div className="row">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genres</th>
                                               
                                                <th scope="col"><i class='fas fa-sort-up'  onClick={this.sortPopularityAsc}/>Popularity<i class='fas fa-sort-down'  onClick={this.sortPopularityDesc} /></th>
                                                <th scope="col"><i class='fas fa-sort-up' onClick={this.sortRatingAsc}/>Rating<i class='fas fa-sort-down'  onClick={this.sortRatingDesc}/></th>
                                          
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filterarr.map((movieObj) => (
                                                    <tr>

                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} />{movieObj.original_title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pagesArr.map((page)=>(
                                                <li class="page-item"><a class="page-link"  onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }

                                      
                                
                                    </ul>
                                </nav>

                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
