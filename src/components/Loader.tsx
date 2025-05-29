import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='mx-auto flex justify-center my-14 '>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#FFFFFF"
                secondaryColor="#FFFFFF"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader