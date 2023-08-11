
//Hooks
import { useState, useEffect } from 'react'
//Iconoos
import {TiArrowRightThick} from 'react-icons/ti'
import {TiArrowLeftThick} from 'react-icons/ti'

// componentes
import { Card } from './Components/card'
import Button from './Components/Button'

//estilos
import './sass/App.scss'

function App() {

  const [pokemonId, setPokemonId] = useState(1)
  const [isback, setIsBack] = useState(false)
  const [pokemonEvolutions,setPokemonEvolutions] = useState([])
 

  const handleClickAtras = () =>{
    (pokemonId <= 1) ? setPokemonId(1) : setPokemonId(pokemonId - 1) && setIsBack(true)
  }

  const handleClickAdelante = () => {
    setPokemonId(pokemonId + 1)
  }

  const fetchPokemonName = async(id) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
    const data = await resp.json()
    let pokemonEvolutionArray = []
    let pokemonl1 = data.chain.species.name
    let pokemonl1Img = await fetchPokemonImg(pokemonl1)
    pokemonEvolutionArray.push([pokemonl1,pokemonl1Img])

    if (data.chain.evolves_to.length !== 0){
      let pokemonl2 = data.chain.evolves_to[0].species.name
      let pokemonl2Img = await fetchPokemonImg(pokemonl2)
      pokemonEvolutionArray.push([pokemonl2,pokemonl2Img])
      

      if (data.chain.evolves_to[0].evolves_to.length !== 0){
        let pokemonl3 = data.chain.evolves_to[0].evolves_to[0].species.name
        let pokemonl3Img = await fetchPokemonImg(pokemonl3)
        pokemonEvolutionArray.push([pokemonl3,pokemonl3Img])
        
        console.log(pokemonEvolutionArray)
      }
    }

    setPokemonEvolutions(pokemonEvolutionArray)

  }

  const fetchPokemonImg =  async(name) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default
  }
  
  
  useEffect(() => {
    fetchPokemonName(pokemonId)
  },[pokemonId])
  
  return (
    <>
      <div className='card-container'>
        {pokemonEvolutions.map(pokemon => 
        <Card 
          key={pokemon[0]}
          name={pokemon[0]}
          img = {pokemon[1]}
        
        ></Card>)
        }
        
      </div>
      <div className='button-div'>
        
        <Button
         icon = {<TiArrowLeftThick/>} 
         handleClick = {handleClickAtras}>
        </Button> 
        
        <div> </div>
        <Button 
          icon = {<TiArrowRightThick/>}
          handleClick = {handleClickAdelante}>

        </Button>
      </div>
      
    </>
  )
}

export default App
