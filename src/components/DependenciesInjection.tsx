"use client"
import React, { PropsWithChildren } from 'react'
import CustomCursor from './CustomCursor'

const DependenciesInjection = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
            <CustomCursor />
        </>
    )
}

export default DependenciesInjection