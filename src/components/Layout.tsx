import React, { PropsWithChildren } from 'react'
import { Nav } from './Navbar'
import Footer from './Footer'

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <Nav />
            {children}
            <Footer />
        </>
    )
}

export default Layout