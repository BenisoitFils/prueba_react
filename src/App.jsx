import React, { useState } from 'react';
import './App.css';
import MiApi from './MiApi';
import Buscador from './Buscador';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);

  const handlePokemonClick = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Bienvenido a la PokéAPI!</h1>
        <Buscador pokemonList={pokemonList} handlePokemonClick={handlePokemonClick} />
        <MiApi pokemonList={pokemonList} setPokemonList={setPokemonList} handlePokemonClick={handlePokemonClick} />
        
      </header>
    </div>
  );
}

export default App;
