import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movies: [],
            favourite: []


        }
    }
    async componentDidMount() {
        // side effects work

        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f8aa3ed793704c1de3ef2341a7fe971f&language=en.US&page=${this.state.currPage}`)
        let data = res.data;
        this.setState({
            movies: [...data.results]
        }
        )
        console.log(data);
        // console.log("mounting done");
    }
    changeMovies = async () => {
        console.log('changeMovies called');
        console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f8aa3ed793704c1de3ef2341a7fe971f&language=en.US&page=${this.state.currPage}`)
        let data = res.data;
        this.setState({
            movies: [...data.results]
        }
        )

    }
    handleRight = () => {
        let temparr = [];
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            temparr.push(i);
        }

        // this.setState({
        //     parr:[...temparr],    // setState is  asynchronous function changeMovies function will call before
        // updating the parr and currPage
        //     currPage:this.state.currPage+1
        // })
        // this.changeMovies();
        this.setState({
            parr: [...temparr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)// provide callback function as a function definition
    }

    handleLeft = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }
    handleClick = (value) => {
        // console.log(value);
        // console.log(this.state.currPage);
        if (value != this.state.currPage) {    // display the data of clicked(specific) page
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
        if (this.state.favourite.includes(movie.id)) {
            oldData = oldData.filter((m) => m.id != movie.id);
        } else {
            oldData.push(movie);
        }
        localStorage.setItem('movies',JSON.stringify(oldData));
        this.handleFavouritesState();
        console.log(oldData);
    }
    handleFavouritesState = ()=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourite:[...temp]
        })
    }
    render() {
        // console.log("render");
        // let movie = movies.results;
        // console.log(movie);
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div class="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h3 className="text-center"><strong>Trending</strong></h3>
                            <div className="movies-list">
                                {
                                    this.state.movies.map((movieObj) => (
                                        <div className="card movies-card" onMouseEnter={() => { this.setState({ hover: movieObj.id }) }} onMouseLeave={() => { this.setState({ hover: '' }) }}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-image" alt={movieObj.title} />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                            <div className="button-wrapper">
                                                {
                                                    this.state.hover == movieObj.id && // doubt about &&
                                                    <a  className="btn btn-primary movies-buton" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourite.includes(movieObj.id)?'Remove from favourite':' Add to Favourite'}</a>
                                                }
                                            </div>
                                            {/* </div> */}
                                        </div>
                                    ))
                                }
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                        {
                                            this.state.parr.map((value) => (
                                                <li class="page-item"><a class="page-link" onClick={() => (this.handleClick(value))}>{value}</a></li>
                                            ))
                                        }
                                        <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }
            </>
        )
    }
}
