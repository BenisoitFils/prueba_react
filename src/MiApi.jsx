import React, { useState, useEffect } from 'react';

const MiApi = ({ handlePokemonClick, setPokemonList }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemonList, setLocalPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const data = await response.json();
        const sortedPokemonList = data.results.sort((a, b) => (a.name > b.name ? 1 : -1));
        setLocalPokemonList(sortedPokemonList);
        setPokemonList(sortedPokemonList); // Update the parent component with the fetched data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setPokemonList]);

  const fetchPokemonDetails = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h2>Lista de Pokémon</h2>
          <ul>
            {pokemonList.map((pokemon, index) => (
              <li
                key={index}
                onClick={() => {
                  handlePokemonClick(pokemon.name);
                  fetchPokemonDetails(pokemon.name);
                }}
                style={{ cursor: 'pointer' }}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
          {selectedPokemon && (
            <div>
              <h2>{selectedPokemon.name}</h2>
              <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
              <h3>Abilities:</h3>
              <ul>
                {selectedPokemon.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
              <h3>Types:</h3>
              <ul>
                {selectedPokemon.types.map((type, index) => (
                  <li key={index}>{type.type.name}</li>
                ))}
              </ul>
              <h3>Stats:</h3>
              <ul>
                {selectedPokemon.stats.map((stat, index) => (
                  <li key={index}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MiApi;


