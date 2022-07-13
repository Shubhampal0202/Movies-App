import React, { Component } from 'react'
import styles from "./Banner.module.css"
import { movies } from '../getMovies'
export default class Banner extends Component {

    render() {
        let movie = movies.results[0];
        return (
            <>
                {
                    movie.length === 0 ? <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> :
                        <div NameName={`card ${styles.bannerCard}`}  >
                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className={`card-img-top ${styles.cardImg}`} alt={movie.title} />
                            {/* <div className="card-body"> */}
                                <h5 className={`card-title ${styles.cardTitle}`}>{movie.original_title}</h5>
                                <p className={`card-text ${styles.cardText}`}>{movie.overview}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            {/* </div> */}
                        </div>
                }
            </>
        )
    }
}
