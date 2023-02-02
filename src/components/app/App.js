import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    onSelectedChar = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList onSelectedChar={this.onSelectedChar} />
                        <ErrorBoundary>                            
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;


const obj = [
    {name: "fisrt", price: 55, count: 10, weght: 5},
    {name: "second", price: 35, count: 15, weght: 40},
    {name: "third", price: 50, count: 15, weght: 40},
    {name: "fourth", price: 55, count: 5, weght: 40},
    {name: "fivth", price: 15, count: 10, weght: 40},
]

function getWeght (arr) {
    return arr
        .filter((item) => {
            return item.price >= 50 && item.count >= 10
        })
        .map((item) => item.weght)
        .reduce((prev, cur) => {
            return prev + cur
        })
}

console.log(getWeght(obj));