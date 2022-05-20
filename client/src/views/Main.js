import React, { useState, useEffect } from 'react';
import UserOptions from '../components/UserOptions';
import axios from 'axios';
import Loading from '../components/Loading';
import SchoolList from '../components/SchoolList';
import { useUser } from '../contexts/userContext';

const Main = () => {

    const { user, setUser } = useUser();
    const [schools, setSchools] = useState();
    const [activeFilter, setActiveFilter] = useState('getAllSchools');
    const [searchParam, setSearchParam] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const filteredSchools = schools?.filter(school => {
        return school.nombreescuela.toLowerCase().includes(searchParam.toLowerCase()) ||
            school.ciudad.toLowerCase().includes(searchParam.toLowerCase()) ||
            school.direccionescuela.toLowerCase().includes(searchParam.toLowerCase())
    })

    useEffect(() => {
        getAllSchools()
    }, [searchParam]);

    const getAllSchools = () => {
        setIsLoading(true)
        axios.get('http://localhost:8000/api/allschoolOrdered')
            .then(res => {
                setIsLoading(false)
                setSchools(res.data.allSchools)
                setActiveFilter('getAllSchools')
            })
    }

    const getBests = () => {
        setIsLoading(true)
        axios.get('http://localhost:8000/api/bestschools')
            .then(res => {
                setIsLoading(false)
                setSchools(res.data.allSchools)
                setActiveFilter('getBests')
            })
    }

    const getWorsts = () => {
        setIsLoading(true)
        axios.get('http://localhost:8000/api/worstschools')
            .then(res => {
                setIsLoading(false)
                setSchools(res.data.allSchools)
                setActiveFilter('getWorsts')
            })
    }

    return (
        <div className='main-container'>
            <div className='main'>
                {user?<UserOptions></UserOptions>:''}
                <div>
                    <h2>Encuentra un establecimiento</h2>
                    <form>
                        <input type="text" placeholder='Ingresa el nombre, ciudad o dirección de la escuela' value={searchParam} onChange={(e) => setSearchParam(e.target.value)} />
                    </form>
                    <div className='filters'>
                        <button onClick={getAllSchools} disabled={activeFilter === 'getAllSchools'}><i className="fa-solid fa-layer-group"></i>Todos</button>
                        <button onClick={getBests} disabled={activeFilter === 'getBests'}><i className="fa-solid fa-circle-arrow-up"></i>Mejor valorados</button>
                        <button onClick={getWorsts} disabled={activeFilter === 'getWorsts'}><i className="fa-solid fa-circle-arrow-down"></i>Peor valorados</button>
                    </div>
                    {searchParam && <p className='search-results-text'>Hay {filteredSchools?.length} escuela(s) que coincide(n) con la búsqueda.</p>}
                    {!isLoading ? <div><SchoolList schools={filteredSchools} /></div> : <Loading />}
                </div>
            </div>
        </div>
    );
}

export default Main;
