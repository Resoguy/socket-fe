import React from 'react';
import s from './Tabs.module.css';


const Tabs = ({items, name, value, onChange}) => {
    return (
        <div className={s.tabs}>
            {
                items.map(item => (
                    <div className={`${s.tabItem} ${value === item ? s.active : ''}`} key={item}>
                        <label htmlFor={item}>{item}</label>
                        <input 
                            id={item} 
                            name={name}
                            type="radio" 
                            value={item}
                            checked={value === item}
                            onChange={onChange} />
                    </div>
                ))
            }
        </div>
    )
}

export default Tabs;
