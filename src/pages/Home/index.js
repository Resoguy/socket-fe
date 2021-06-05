import React from 'react';
import s from './Home.module.css';

class Home extends React.Component {
    state = {
        client: {
            x: 0,
            y: 0
        }
    }


    componentDidMount() {
        document.addEventListener('mousemove', this.handleMousemove)
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMousemove);
    }

    handleMousemove = event => {
        const {clientX, clientY} = event;

        console.log({x: clientX, y: clientY});

        this.setState({client: {x: clientX, y: clientY}});

    }

    render() {
        return (
            <div>
                <h1>HomePage!</h1>
                <div style={{top: this.state.client.y, left: this.state.client.x}} className={s.box}>
                    <img src={`https://unsplash.it/${this.state.client.x}/${this.state.client.y}`} />
                </div>
            </div>
        )
    }
}

export default Home;
