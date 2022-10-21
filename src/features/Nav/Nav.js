import {useState} from 'react';
import {useDispatch} from 'react-redux';
import logo from '../../Reddit-logo.webp';
import '../../App.css';
import {setSearchTerm} from '../../app/redditSlice.js';

export const Nav = () => {
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();
    

    const handleChange = (e) => {
        setTerm(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(term));
    }
    return(
        <nav>
            <img src={logo} alt='reddit logo' height='50px'/>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type='text' placeholder='Search Reddit' value={term} />
            </form>
        </nav>
    )
}
