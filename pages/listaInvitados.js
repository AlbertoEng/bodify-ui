import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import Invitado from '../components/Invitado';

const ListaInvitados = ({ titulo }) => {
    const [invitados, setInvitados] = useState([]);

    const listarInvitados = async()=>{
    const result = await axios.get('http://www.goweddings.net/admin/lista-invitados');
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
            const result = await axios.put(`http://www.goweddings.net/admin/lista-invitados/grupo/${obj.id}`, obj );
        }else{
            const result = await axios.put(`http://www.goweddings.net/admin/lista-invitados/mesa/${obj.id}`,obj);
        }

    }

    const agregarInvitado = async(e)=>{
        e.preventDefault();
        const nuevoInvitado = {
            nombre: e.target.name
        }
        const result = await axios.post(`http://www.goweddings.net/admin/lista-invitados/agregarNuevo` );
        
    }


    return (
        <>
            <Header className='titulo' titulo={'Lista de Invitados'}/>
            <div className='containerInputs'>
                <form action="#" method="post" onSubmit={agregarInvitado}>
                    <input className='camposForm' type="text" name="nombre" id="" placeholder='Invitado' />
                    <input className='camposForm' type="text" name="grupo" id="" placeholder='Grupo' />
                    <input className='camposForm' type="text" name="mesa" id="" placeholder='Mesa' />
                    <button type='submit' className='botonAgregar' >Agregar Invitado</button>
                </form>
                
            </div>
            <div className='listaInvitados'> 
                {
                    invitados.map(( invitado ) => {
                        return <Invitado key={invitado.id} {...invitado } 
                            guardarMesa={guardarMesa}  
                            guardarGrupo={guardarGrupo}
                            />
                    })
                }
            </div>
        </>
    )
}

export default ListaInvitados;