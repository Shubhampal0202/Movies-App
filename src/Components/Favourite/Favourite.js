import React, { Component } from 'react'
import { movies } from "../getMovies"
export default class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            currgenre: 'All Genres',
            movies: [],
            searchText: "",
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let data = JSON.parse(localStorage.getItem("movies") || "[]");
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres');
        this.setState({
            movies: [...data],
            genres: [...temp]
        })
    }
    handleChangeGenre = (genre) => {
        this.setState({
            currgenre: genre
        })
    }

    sortPopularityAsc = () => {
        let arr = this.state.movies;
        arr.sort(function (mObja, mObjb) {
            return (mObja.popularity - mObjb.popularity);
        })
        this.setState({
            movies: [...arr]
        })
    }
    sortPopularityDesc = () => {
        let arr = this.state.movies;
        arr.sort(function (mObja, mObjb) {
            return (mObjb.popularity - mObja.popularity);
        })
        this.setState({
            movies: [...arr]
        })
    }

    sortRatingAsc = () => {
        let arr = this.state.movies;
        arr.sort(function (mObja, mObjb) {
            return (mObja.vote_average - mObjb.vote_average);
        })
        this.setState({
            movies: [...arr]
        })
    }

    sortRatingDesc = () => {
        let arr = this.state.movies;
        arr.sort(function (mObja, mObjb) {
            return (mObjb.vote_average - mObja.vote_average);
        })
        this.setState({
            movies: [...arr]
        })
    }

    handlePageLimit = (page)=>{
        this.setState({
            currPage:page
        })
    }
    handleDeleteMovie =(movie)=>{
      let newArr = [];
      newArr = this.state.movies.filter((m)=>{
          return m.id !== movie.id
      })
      this.setState({
          movies:[...newArr]
      })
      localStorage.setItem("movies",JSON.stringify(newArr));
    }
    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };


        let filteredArr = [];
        if (this.state.searchText === "") {
            filteredArr = this.state.movies;
        } else {
            filteredArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.searchText.toLowerCase())
            })
        }


        if (this.state.currgenre !== "All Genres") {
            filteredArr = this.state.movies.filter((movieObj) => {
                return genreids[movieObj.genre_ids[0]] === this.state.currgenre;
            })
        }

        let pages = Math.ceil(filteredArr.length / this.state.limit);
        let pagesArr = [];
        for (let i = 1; i <=pages; i++) {
            pagesArr.push(i);
        }
        let si = (this.state.currPage - 1) * this.state.limit ;
        let li = si + this.state.limit;
        filteredArr = filteredArr.slice(si, li);


        return (
            <>
                <div Name="main" style={{ marginTop: "1.5rem" }}>
                    <div className="row">
                        <div className="col-lg-3 col-sm-12" style={{ padding: "3rem" }}>
                            <ul className="list-group">
                                {
                                    this.state.genres.map((genre) => {
                                        return (

                                            genre === this.state.currgenre ? <li className="list-group-item" style={{ backgroundColor: "#3f51b5", color: "white", fontWeight: "bold" }}>{genre}</li> :
                                                <li className="list-group-item" style={{ backgroundColor: "white", color: "#3f51b5" }} onClick={() => this.handleChangeGenre(genre)}>{genre}</li>

                                        )
                                    })
                                }


                            </ul>
                        </div>
                        <div className="col-lg-9 col-sm-12">
                            <div className="row">
                                <input type="text" value={this.state.searchText} className='input-group-text col' placeholder='Search' onChange={(e) => this.setState({ searchText: e.target.value })} />
                                <input type="number" value={this.state.limit} className='input-group-text col' placeholder='Rows Count' onChange={(e)=>this.setState({limit:e.target.value})} />
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i className="fa-solid fa-sort-up" onClick={this.sortPopularityAsc} />Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityDesc} /></th>
                                            <th scope="col"><i className="fa-solid fa-sort-up" onClick={this.sortRatingAsc} />Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingDesc} /></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredArr.map((movieObj) => {
                                                return (
                                                    <tr>
                                                        <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} />{movieObj.original_title}</td>
                                                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                        <td>{movieObj.popularity}</td>
                                                        <td>{movieObj.vote_average}</td>
                                                        <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDeleteMovie(movieObj)}>Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {
                                            pagesArr.map((page)=>{
                                                return(
                                                    <li className="page-item"><a className="page-link" onClick={()=>this.handlePageLimit(page)}>{page}</a></li>
                                                )
                                            })
                                            
                                        }
                                          

                                    </ul>
                                </nav>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
