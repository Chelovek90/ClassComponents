import React, { Component } from 'react';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarveService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component{

    state = {
        charList:[],        
        loading: true,
        error: false,
        newItemLoading: false,
        offSet: 210
    }

    marvelService = new MarvelService();

    loadCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError); 
    }

    onCharLoaded = (newCharList) => {
        this.setState( ({offSet, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offSet: offSet + 9
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
    }

    renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objestFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'contain'};
            }

            return(
                <li className="char__item"
                ref={this.setRef}
                key={item.id}
                onClick={() => {
                    this.props.onSelectedChar(item.id);
                    this.focusOnItem(i);
                }} >                    
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return(
            <ul className="char__grid">
                {items};
            </ul>
        )
    }


    render () {
        const {charList, loading, error, offSet, newItemLoading} = this.state;

        const elements = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null;

        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => this.onRequest(offSet)} >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;