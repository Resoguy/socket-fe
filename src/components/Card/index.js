import React from 'react';
import s from './Card.module.css';


const Card = ({username, message}) => {
    return (
        <div className={s.card}>
            <h6 className={s.username}>
                {username}
            </h6>
            <p>{message}</p>
        </div>
    )
};

export default Card;
