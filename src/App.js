import { Fragment, useEffect, useState } from "react";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Formulario from "./components/Formulario";
import Header from "./components/Header";

function App() {
  // State del Form
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  // Extraer ciudad y busqueda
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "a5a35fa61a0c0ba938733d60ab466613";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);
        
        // Detecta si hubo resultados correctos en la consulta

        if(resultado.cod === '404') {
          setError(true)
        } else {
          setError(false)
        }
      
      }


    };

    consultarAPI();
    //eslint-disable-next-line
  }, [consultar]);


  let componente;
  if(error) {
    componente = <Error mensaje='No hay resultados'/>
  } else {
    componente = <Clima 
                    resultado={resultado}
                 />
  }



/*****************************************************/
  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
