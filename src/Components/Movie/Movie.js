import React, { Component } from 'react'
import styles from "./Movie.module.css";
import axios from 'axios';
export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: "",
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: []
        }
    }

    async componentDidMount() {
        console.log("mount");
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f8aa3ed793704c1de3ef2341a7fe971f&language=en.US&page=${this.state.currPage}`)
        const data = res.data.results;
        this.setState({
            movies: [...data]
        })
    }
    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f8aa3ed793704c1de3ef2341a7fe971f&language=en.US&page=${this.state.currPage}`)
        const data = res.data.results;
        this.setState({
            movies: [...data]
        })
    }
    nextPage = () => {
        const tempArr = [];
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            tempArr.push(i);
        }
        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)

        // alter 
        // let lastIndex = this.state.parr.length - 1;
        // let elm = this.state.parr[lastIndex];
        // this.setState({
        //     parr:[...this.state.parr, elm+1]
        // })
    }
    particularPage = (pVal) => {
        if (pVal !== this.state.currPage) {
            this.setState({
                currPage: pVal
            }, this.changeMovies)
        }
    }

    previousPage = () => {

        if (this.state.currPage !== 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
    }
    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) => {
               return m.id !== movie.id;
            })
        } else {
            oldData.push(movie);
        }
        localStorage.setItem("movies",JSON.stringify(oldData));
        this.handleFavouritesState();
    }
    handleFavouritesState = ()=>{
        let oldData = JSON.parse(localStorage.getItem("movies") || "[]");
       let temp =  oldData.map((movie)=>{
            return movie.id
        })
        this.setState({
            favourites:[...temp]
        })
    }

    render() {
        return (
            <>

                {
                    this.state.movies.length === 0 ? <div NameName="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                        <div >
                            <h3 className={`${styles.center}`}><strong>Trending</strong></h3>
                            <div className={`${styles.movieContainer}`}>
                                {
                                    this.state.movies.map((movieObj, index) => {
                                        return (

                                            <div className={`card ${styles.movieCard}`} onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: "" })}>
                                                <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className={`card-img-top ${styles.cardImg}`} alt={movieObj.title} />
                                                {/* <div class="card-body"> */}
                                                <h5 className={`card-title ${styles.cardTitle}`}>{movieObj.original_title}</h5>
                                                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                                                {
                                                    movieObj.id === this.state.hover &&
                                                    <div className={`${styles.btn}`} >
                                                        <a className="btn btn-primary" onClick={() => this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id) ? "Remove from favourites" : "Add to Favourite" }</a>
                                                    </div>
                                                }


                                                {/* </div> */}
                                            </div>

                                        )
                                    })
                                }
                            </div>
                            <div className={`${styles.page}`}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item"><a className="page-link" onClick={this.previousPage}>Previous</a></li>
                                        {
                                            this.state.parr.map((pVal) => {
                                                return (
                                                    <li className="page-item" ><a className="page-link" onClick={() => this.particularPage(pVal)}>{pVal}</a></li>
                                                )
                                            })
                                        }

                                        <li className="page-item"><a className="page-link" onClick={this.nextPage} >Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                }




            </>
        )
    }
}
