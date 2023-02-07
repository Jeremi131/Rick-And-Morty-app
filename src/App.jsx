import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import LocationInfo from './components/LocationInfo'
import ResidentInfo from './components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'
import loading from '/src/assets/loading.png'
import imageError from '/src/assets/imageError.png'

function App() {

  const [location, setLocation] = useState()
  const [numberLocation, setNumberLocation] = useState(getRandomLocation)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [listLocation, setListLocation] = useState()
  const [isShow, setIsShow] = useState(false)
  const [displaySuggestions, setDisplaySuggestions] = useState('none')
  const [getValue, setGetValue] = useState()


  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
      .then(res => {
        setLocation(res.data)
        setHasError(false)
      })
      .catch(err => {
        console.log(err)
        setHasError(true)
      })
      .finally(() => setTimeout(() => setIsLoading(false), 2000))

  }, [numberLocation])


  const handleSubmit = e => {
    e.preventDefault()
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRandomLocation())
    } else {
      
      setNumberLocation(e.target.inputLocation.value.trim())
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim()
    setDisplaySuggestions('none')

  }

  const handleChange = e => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`
    axios.get(url)
      .then(res => setListLocation(res.data.results))
      .catch(err => console.log(err))
      setDisplaySuggestions('flex')
  }

  const handleFocus = e => {
    e.target.value = ""
    clearInput()
  }

  // const handleBlur = () => {
  //   setDisplaySuggestions('none')
  // };

  const handleClickList = (loc) => {
    setNumberLocation(loc.id)
    setDisplaySuggestions('none')
    setGetValue(loc.name)
  }

  const clearInput = () => {
    setGetValue(null);
  };


  return (
    <div className="App">
      {
        isLoading ?
          <div className='load_screen'>
            <img className='load_image' src={loading} alt="" />
          </div>

          :

          <>
            <div className='img_app'>
              <img className='logo' src="./assets/Rick_and_Morty.webp" alt="" />
            </div>
            <form className='form' onSubmit={handleSubmit}>
              <input
                className='form_input'
                id='inputLocation'
                type="text"
                value={getValue}
                onChange={handleChange}
                onFocus={handleFocus} 
                // onBlur={handleBlur}
              />
              <button className='form_button'>Search</button>
              {
                <ul className='suggestions' style={{ display: displaySuggestions }}>
                  {
                    listLocation?.map(loc => (
                      <li className='list'  onClick={() =>  handleClickList(loc)} key={loc.id}>{loc.name}</li>
                    ))
                  }
                </ul>
              }
            </form>
          </>
      }

      {
        hasError ?
          <div className='error'>
            <div className='text_error'>
              <i className='bx box_error bx-x'></i>
              <h2 className='tittle_error'>Hey! The information entered is incorrect</h2>
              <i className='bx box_error bx-x'></i>
            </div>

            <img className='imageError' src={imageError} alt="" />
          </div>
          :

          <>

            <div className='location_container'>
              <LocationInfo location={location} />
            </div>
            <div className='residents_container'>
              {
                location?.residents.map(url => (
                  <ResidentInfo
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>

          </>
      }
      <Footer />
    </div>
  )
}

export default App
