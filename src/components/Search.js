import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Search.css'

const Search = () => {

    const [term, setTerm] = useState('');
    const [results,setResults] = useState([]);

    useEffect(() => {

        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list:'search',
                    origin: '*',
                    format:'json',
                    srsearch: term,
                }
            });
            setResults(data.query.search);
        };
        
        const timeoutId = setTimeout(() => {
            if(term) {
                search();
            };
        }, 500);

        return () => {
            clearTimeout(timeoutId)
        };
    }, [term]);

    const renderedResults = results.map((result)=>{
        return(
        <div key={result.pageid} className='item'>
            <div className='content'>
                <a href={`https://en.wikipedia.org/wiki/${result.title.replace(' ','_')}`} className='header' id='header'>
                    {result.title}
                </a>
                <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
            </div>
        </div>
    )});
    

    return (
        <div className="search">
            <div className='ui form'>
                <div className='field'>

                    <input 
                        placeholder='Enter some value'
                        value={term}
                        className='input'
                        onChange={(e) => setTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='ui celled list'>
                {renderedResults}
            </div>
        </div>
    )
}

export default Search