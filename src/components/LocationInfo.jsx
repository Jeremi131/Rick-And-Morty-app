import React from 'react'
import './styles/locationInfo.css'

const LocationInfo = ({location}) => {
  return (
   <article className='location'>
    <h3 className='info_name'> {location?.name}</h3>

    <ul className='location_info'>
        <li className='location_item'>
          <span className='info_label'>Type: </span>
          {location?.type}
        </li>

        <li className='location_item'>
          <span className='info_label'>Dimension: </span>
          {location?.dimension}
        </li>

        <li className='location_item'>
          <span className='info_label'>Population: </span>
          {location?.residents.length}
        </li>
    </ul>
   </article>
  )
}

export default LocationInfo
