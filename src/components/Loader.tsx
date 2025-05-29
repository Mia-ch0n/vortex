import React from 'react'
import { CircleLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className='mx-auto flex justify-center my-14 '>
            <CircleLoader
                color="#ffffff"
                size={100}
            />
        </div>
    )
}

export default Loader