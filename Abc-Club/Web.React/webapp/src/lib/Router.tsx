import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { getRoutes } from './routes'


const AppRouter: React.FC = () => {

    const routes = getRoutes()
    
    const resolvedRoutes = React.useMemo(() =>{
        const resolvedRoutes = Array(0)
        
        routes.forEach((r, index) => {
            
            resolvedRoutes.push(<Route key={index} path={r.path} element={r.element}/>)
           
            r.children?.forEach((c, subIndex) => {
                resolvedRoutes.push(<Route key={index + "-" + subIndex} path={c.path} element={c.element}/>) 
            })
        })
        return resolvedRoutes
    },[routes])

    return(
        <>
        <Routes>
              {resolvedRoutes}
        </Routes>
        </>
        
    )
}

export default AppRouter