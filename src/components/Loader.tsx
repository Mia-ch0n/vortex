import React from 'react'
import { PulseLoader  } from 'react-spinners'

const Loader = () => {
    return (
        <div className='mx-auto flex justify-center my-14 '>
            <PulseLoader 
                color="#ffffff"
                size={20}
            />
        </div>
    )
}

export default Loader