import React, {useState} from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import Charts from './Charts'
import Spinner from './Spinner'

const App = () => {
  const [country, setCountry] = useState('')
  const [weather, setWeather] = useState({})
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState('none')
  const [showSpinner, setSpinner] = useState(false)
  
  const getWoeID = async ()=>{
    try {
      const res = await axios.get(`https://www.metaweather.com/api/location/search/?query=${country}`)
      setSpinner(true)
      if(res.data.length > 0){
        const woeid = res.data[0].woeid
        searchWeather(woeid)
        setShow('none')
      }else{
        setSpinner(false)
        setMsg('請輸入有效的城市名稱')
        setShow('inline')
      }
    } catch (error) {
      if(error.response.status === 403){
        setMsg('請輸入有效的城市名稱')
        setShow('inline')
      }
      setSpinner(false)
      console.error(error)
    }
    
    
  }
  const searchWeather = async (woeid) => {
    try {
      const res = await axios.get(`https://www.metaweather.com/api/location/${woeid}/`) 
      setWeather(res.data.consolidated_weather)
      setSpinner(false)
    } catch (error) {
      setSpinner(false)
      console.error(error.response)
    }
  }
  const getCountry = (userInputCountry) => {
    setCountry(userInputCountry)
  }
  return (
    <>
      <SearchBar msg={msg} show={show} getUserInput={getCountry} searchHandler={getWoeID}/>
      {showSpinner ? <Spinner/> :<Charts weather={weather}/>}
    </>
  );
}

export default App




