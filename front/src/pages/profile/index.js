import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { OrbitProgress } from "react-loading-indicators";
import NavigationBar from '../../components/navigationbar';
import DataTable from '../../components/datatable';
import { Client } from '../../api/client'
import UserContext from '../../contexts/UserContext'
// import { getDataUser } from '../../service/UserService';
// import { getPermissions } from '../../service/PermissionService';


export default function Home() {

    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const navigate = useNavigate();
    const dataUser  = getDataUser()
    const permissions = getPermissions()

    function fetchData() {

        setLoad(true) 
        setTimeout(() => {
    
            Client.get('profile').then(res => {
                const userData = res.data
                console.log(userData)
                setData(disciplinas.data)
            })
            .catch(function(error) {
                console.log(error)
                // alert('ERROR')
            })
            .finally( () => {
                setLoad(false)
            })

        }, 1000)
    }

    function verifyPermission() {
        // Não Autenticado   
        if(!dataUser) navigate('/login')
        // Não Autorizado (rota anterior)
        else if(permissions.listDisciplina === 0) navigate(-1)
    }

    useEffect(() => {
        verifyPermission()
        fetchData()
    }, []);

    return (
        <>
           
        </>
    )
}