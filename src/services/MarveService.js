

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKey = '90c504032911792f60bd908ad11e5860'
    _baseOffsetChar = 210

    getResurce = async (url) => {
        let res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffsetChar) => {
        const res = await this.getResurce(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResurce(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {

        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path +  '.' + char.thumbnail.extension,
            hompage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    }
}

export default MarvelService;