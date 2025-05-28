import React, { PropsWithChildren } from 'react'
import { Nav } from './Navbar'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Nav />
            {children}
        </>
    )
}

export default Layout