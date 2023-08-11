import React from "react";
import '../sass/card.scss'

const Card = ({name,img}) => {
    return(
        <div className="card">
            <p className="card-name">{name}</p>
            <div className="card-circle"></div>
            <img className="card-img" src={img} alt="pokemon"/>
        </div>
    )
}

export {Card}