import React, { useState, useEffect } from 'react';

const Buscador = ({ pokemonList, handlePokemonClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    const filterPokemonList = () => {
      const filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonList(filteredList);
    };

    filterPokemonList();
  }, [searchTerm, pokemonList]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Buscar Pokémon</h2>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {filteredPokemonList.map((pokemon, index) => (
          <li key={index} onClick={() => handlePokemonClick(pokemon.name)} style={{ cursor: 'pointer' }}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Buscador;





