import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {


  // state para validar el error
  const [error, setError] = useState(false);

   // Extraer ciudad y busqueda
   const { ciudad, pais } = busqueda


  //Funcion que coloca los elementos en el state
  const  handleChange = e => {
    // Actualizar el state
    setBusqueda({
      ...busqueda,
      [e.target.name] : e.target.value
    })
  }

    // Cuando el user da submit al form
    const handleSubmit = e => {
      e.preventDefault();

      // validar
      if( ciudad.trim() === '' || pais.trim() === '' ) {
        setError(true);
        return;
      }

      setError(false);


      // Pasarlo al componente principal
      setConsultar(true)

    }



  return (
   <form
   onSubmit={handleSubmit}
   >
     {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
     <div className="input-field col s12">
       <input 
          type="text"
          name="ciudad"
          id="ciudad" 
          value={ciudad}
          onChange={handleChange}
       />
       <label htmlFor="ciudad">Ciudad: </label>
     </div>

     <div className="input-field col s12">
       <select 
          name="pais"   
          id="pais"    
          value={pais} 
          onChange={handleChange}
       >
         <option value="">-- Seleccione un pais --</option>
         <option value="US">Estados Unidos</option>
         <option value="MX">Mexico</option>
         <option value="AR">Argentina</option>
         <option value="CO">Colombia</option>
         <option value="CR">Costa Rica</option>
         <option value="ES">España</option>
         <option value="PE">Perú</option>
       </select>
       <label htmlFor="pais">País: </label>
     </div>


     <div className="input-field col s12">
       <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4" 
       >Buscar Clima</button> 
     </div>
   </form>
  )
}

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsultar: PropTypes.func.isRequired
}

export default Formulario;