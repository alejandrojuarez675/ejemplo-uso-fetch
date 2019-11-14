import React, {useEffect, useState} from 'react';

import logo from './logo.svg';

import './App.css';

const App = () => {

  const [info, setInfo] = useState(undefined);

  const getData = async (url) => {
    const response = await fetch(url);

    const errors = [200, 201];
    if (!errors.includes(response.status)) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  };

  const postData = async (url, body) => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const errors = [200, 201];
    if (!errors.includes(response.status)) {
      throw new Error(response.status);
    }

    const data = await response.json();
    return data;
  }


  useEffect( () => {
      getData('http://192.168.1.40:8083/tmf/mantenedores/conceptoinfraccion/_search?sort=codigo,desc&page=1&size=10')
        .then(response => {
          console.log(response.content);
          setInfo(response.content);
        })
        .catch(console.error);


      postData('http://192.168.1.40:8083/tmf/mantenedores/conceptoinfraccion/crear', {codigo: 'pato'})
        .then(response => {
          if(response.ok) {
            console.log(response.content);
            setInfo([...info, response.content]);
          }
        })
        .catch (console.error)
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editar <code>src/App.js</code> y guardar para recargar.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aprender React
        </a>

        <p> datos: 
          {info ? info.map(x=> x.codigo).reduce((x,y)=>(x+', '+y)) : 'loading...'}
        </p>
      
      </header>
    </div>
  );
};

export default App;