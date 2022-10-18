import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import Invitado from '../components/Invitado';

const ListaInvitados = ({ titulo }) => {
    const [invitados, setInvitados] = useState([]);
    const [nombre, setNombre] = useState('');
    const [mesa, setMesa] = useState('');
    const [grupo, setGrupo] = useState('');

    const listarInvitados = async()=>{
        const result = await axios.get('http://www.goweddings.net:3001/admin/lista-invitados');
        const listaOrdenada = result.data.sort((a, b)=>{
            return a.id-b.id;
        })
        setInvitados(listaOrdenada)
    }

    useEffect(()=>{
        listarInvitados();
    },[])  


    const salvarCambios = ()=>{
        
    }
    
    const guardarMesa = ( obj )=>{
        console.log(obj);
        const nuevaLista = invitados.map(( inv )=>{
            if(inv.id === obj.id){
                return {
                    ...inv,
                    mesa: obj.mesa || 'null' 
                }
            }
            return inv;
        })
        const listaOrdenada = nuevaLista.sort((a, b)=>{
            return a.id-b.id;
        })
        setInvitados(listaOrdenada);
        guardarInvitado(obj, 'mesa');
    }


    const guardarGrupo = ( obj )=>{
        console.log(obj);
        const nuevaLista = invitados.map(( inv )=>{
            if(inv.id === obj.id){
                return {
                    ...inv,
                    grupo: obj.grupo || 'null'
                }
            }
            return inv;
        })
        const listaOrdenada = nuevaLista.sort((a, b)=>{
            return a.id-b.id;
        })
        setInvitados(listaOrdenada);
        guardarInvitado(obj, 'grupo');
    }

    const guardarInvitado = async ( obj, dato )=>{
        if(dato == 'grupo'){
            const result = await axios.put(`http://www.goweddings.net:3001/admin/lista-invitados/grupo/${obj.id}`, obj );
        }else{
            const result = await axios.put(`http://www.goweddings.net:3001/admin/lista-invitados/mesa/${obj.id}`,obj);
        }
    }

    const handleNombre = ( e )=>{
        setNombre(e.target.value)
        console.log(e.target.value)
    }

    const handleGrupo = (e) =>{
        setGrupo(e.target.value);
        console.log(e.target.value)
    }

    const handleMesa = (e) => {
        setMesa(e.target.value);
        console.log(e.target.value)
    }

    const agregarInvitado = async(e)=>{
        e.preventDefault();

        if(nombre != '' && mesa != '' && grupo != ''){
            const nuevoInvi = {
                nombre,
                grupo,
                mesa
            };
            const result = await axios.post(`http://www.goweddings.net:3001/admin/lista-invitados/agregarNuevo`, nuevoInvi );
            listarInvitados();
            setNombre('')
            setGrupo('')
            setMesa('')
        }
        
        
    }

    

    const eliminarInvitadoByID =  async( id )=>{
        const result = await axios.delete(`http://www.goweddings.net:3001/admin/lista-invitados/eliminar/${id}`);
        console.log(`invitado con id: ${id} borrado`);
        listarInvitados();
    }


    return (
        <>
            <Header className='titulo' titulo={'Lista de Invitados'}/>
            <div className='containerInputs'>
                <form  action="#" method="post" onSubmit={agregarInvitado}>
                    <input className='camposForm' type="text" name="nombre" onChange={handleNombre} id="" placeholder='Invitado' value={nombre} />
                    <input className='camposForm' type="text" name="grupo" onChange={handleGrupo} id="" placeholder='Grupo'  value={grupo}/>
                    <input className='camposForm' type="text" name="mesa" onChange={handleMesa} id="" placeholder='Mesa' value={mesa}/>
                    <button type='submit' className='botonAgregar' >Agregar Invitado</button>
                </form>
            </div>
            <p className='recuento'>Recuento: {invitados.length}</p>
            <div className='opciones'>
                <label htmlFor="todos">Todos</label>
                <input type="radio" name="filtro" id="todos" />
                <label htmlFor="confirmados">confirmados</label>
                <input type="radio" name="filtro" id="confirmados" />
            </div>
            <div className='listaInvitados'> 
                {
                    invitados.map(( invitado ) => {
                        return <Invitado key={invitado.id} {...invitado } 
                            guardarMesa={guardarMesa}  
                            guardarGrupo={guardarGrupo}
                            eliminarInvitadoByID={eliminarInvitadoByID}
                            />
                    })
                }
            </div>
        </>
    )
}

export default ListaInvitados;