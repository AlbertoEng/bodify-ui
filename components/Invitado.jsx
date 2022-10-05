import React, { useState } from 'react'

const Invitado = (props) => {

  const {id,  nombre, mesa, grupo, telefono} = props;
  const {guardarMesa,guardarGrupo,eliminarInvitadoByID} = props;
  const [editing, setEditing] = useState(false);


  const handleMesa = ( e )=>{
    const mesa = {
      id,
      mesa: e.target.value
    }
    guardarMesa(mesa)
  }

  const handleGrupo = ( e )=>{
    const grupo = {
      id,
      grupo: e.target.value
    }
    guardarGrupo(grupo)
  }

  const handleEliminar = ( e )=>{
    eliminarInvitadoByID(id)
  }

  const handleEditar = ()=>{
      setEditing(!editing);
  }



  return (
    <div className='card-invitado'>
        <div className='nombreInvitado' key={id}>
          <div className='campostexto'>
            <p>{id}</p>
            <p>{nombre}</p>
            <p>{telefono}</p>
          </div>
          <div className='divBotones'>
            <div className='campoGrupo'>
              <p className='etiqueta'>Grupo</p>
              {
                editing
                  ? <input type="number" name="grupo" id="grupo" onChange={handleGrupo} value={grupo}/>  
                  : <p >{grupo ?? 'null'}</p> 
              }
            </div>
            <div className='campoMesa'>
              <p className='etiqueta'>Mesa</p>
              {
                editing 
                  ? <input  type="number" name="mesa" id="mesa" onChange={handleMesa} value={mesa}/>  
                  : <p >{mesa ?? 'null'}</p> 
              }
            </div>
            <button className='boton eliminar' onClick={handleEliminar}>
              Eliminar
            </button>
            <button className='boton editar' onClick={handleEditar}>
              {editing ? 'Guardar' : 'Editar'}
            </button>
          </div>
        </div>
    </div>
  )
}

export default Invitado