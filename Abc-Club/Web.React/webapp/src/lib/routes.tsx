import React, { StrictMode } from 'react'
import PageLayout from './PageLayout'
import { RouteObject } from 'react-router'
import NotFound from '../pages/NotFound'
import { IMenuItem } from '../interfaces/IMenuItem'

export const getRoutes = (): RouteObject[] =>{
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
                     element: <StrictMode><PageLayout><div>Mathematik</div></PageLayout></StrictMode>
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
                     element: <StrictMode><PageLayout><div>Deutsch</div></PageLayout></StrictMode>
                 }
             ]
         }
    ]
    
 }

 export const getMenuItems = (): IMenuItem[] => {
    const items: IMenuItem[] = []
    
    // add home 
    items.push({
        route: '/',
        title: 'Abc-Club',
        subTitle: 'Spielend lernen',
        subMenu:[]
    })

    // add math unit pages
    items.push({
        route: '/mathunits',
        title:'Mathe',
        subTitle:'Übungen Mathe',
        subMenu:[
            {
                route: '/mathunits/numberchaos',
                title: 'Zahlenchaos',
                subTitle: 'Sortiere die Zahlen',
                subMenu: []
            }
        ]
    })

    // add german unit pages
    items.push({
        route: '/germanunits',
        title: 'Deutsch',
        subTitle: 'Übungen Deutsch',
        subMenu:[
            {
                route: '/germanunits/test',
                title: 'Alphabet sortieren',
                subTitle: 'Übung Test',
                subMenu: []
            }
        ]
    })

    return items
 }