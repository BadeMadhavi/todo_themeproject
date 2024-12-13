import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchComponent = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [isThrottling, setIsThrottling] = useState(false)
    const [inputStatus, setInputStatus] = useState('Waiting for input...')

 
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }


    const throttle = (func, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = new Date().getTime()
            if (now - lastCall < delay) {
                return;
            }
            lastCall = now
            func(...args)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!query) {
                setResults([])
                setLoading(false)
                return
            }
            setLoading(true)
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`);
                setResults(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
                setLoading(false)
            }
        }

        const debouncedFetch = debounce(fetchData, 500);
        const throttledFetch = throttle(fetchData, 1000);

        if (isThrottling) {
            throttledFetch();
            setInputStatus('Throttling...')
        } else {
            debouncedFetch();
            setInputStatus('Debouncing...')
        }

        const timer = setTimeout(() => {
            setInputStatus('Waiting for input...')
        }, isThrottling ? 1000 : 500)

        return () => clearTimeout(timer)
    }, [query, isThrottling])

    return (
        <div>
            <label>
                Toggle Throttling/Debouncing:
                <input
                    type="checkbox"
                    checked={isThrottling}
                    onChange={() => setIsThrottling(!isThrottling)}
                />
            </label>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p>{inputStatus}</p>
            {
                loading ?
                    <p>Loading...</p> :
                    <ul>{results.map((result) =>
                        <li key={result.id}>{result.title}</li>
                    )}
                    </ul>
            }
        </div>
    );
};

export default SearchComponent;