import React from 'react'
import marca from '/src/assets/marca.png'


const Footer = () => {
    return (
        <article>
            <footer className='footer'>
                <a href="https://www.facebook.com/Jeremi.Castellano131" target="_blank">
                    <i className='bx box_icon bxl-facebook'></i>
                </a>

                <a href="https://www.instagram.com/jeremi_castellano/" target="_blank">
                    <i className='bx box_icon bxl-instagram' ></i>
                </a>

                <a href="https://www.linkedin.com/in/jeremi-castellano-5b924a1a3/" target="_blank">
                    <i className='bx box_icon bxl-linkedin'></i>
                </a>
            </footer>
            <div className='credits'>
                <p className='text_credits' >MADE BY</p>
                <img className='marca_image' src={marca} alt="" />
                <p className='text_credits'>ALL RIGHTS RESERVED</p>
            </div>
        </article>


    )
}

export default Footer