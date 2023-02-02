import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import MarvelService from '../../services/MarveService';

class CharInfo extends Component {
    
    state = {
        char:null,
        loading: false,
        error: false,
        charEnded: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    marvelService = new MarvelService();

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return
        }

        this.onCharLoading();
        this.onLoadingError();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoader)
            .catch(this.onError); 
    }

    onCharLoader = (char) => {
        this.setState({char, 
            loading: false
        });
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onLoadingError = () => {
        this.setState({
            error: false
        })
    }

    onError = () => {
        this.setState({             
            loading: false,
            error: true
        });
    }

    render() {
        const { char, loading, error } = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error|| !char) ? <View char={char}/> : null

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const { name, description, thumbnail, hompage, wiki, comics } = char;

    let imgStyle = {'objestFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <>
            <div className="char__basics">
                    <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={hompage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {!comics.length ? "List is empty" : (comics.slice(0, 12)).map((item, i) => {
                        return(
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })}

                </ul>
                </>
    )
}

export default CharInfo;