import React, { StrictMode } from 'react'
import { Routes, Route, RouteObject } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import PageLayout from './PageLayout'

const AppRouter: React.FC = () => {

    const routes = React.useMemo((): RouteObject[] =>{
       return[
            {
                path: "/",
                element: <PageLayout><div>Home</div></PageLayout>,
                children: [
                    {
                        index: true,
                        path:'/*',
                        element: <PageLayout><NotFound path='/'/></PageLayout>
                    }
                ]
            },
            {
                path: "/mathunits",
                element: <div>Math</div>,
                children: [
                    {
                        index: true,
                        element: <PageLayout><NotFound path='/mathunits'/></PageLayout>
                    },
                    {
                        path: "/mathunits/numberchaos",
                        element: <div>Mathematik</div>
                    }
                ]
            },
            {
                path: "/germanunits",
                element: <div>German</div>,
                children: [
                    {
                        index: true,
                        element: <PageLayout><NotFound path='/germanunits'/></PageLayout>
                    },
                    {
                        path: "/germanunits/test",
                        element: <StrictMode><div>Deutsch</div></StrictMode>
                    }
                ]
            }
       ]
       
    },[])
    
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