import { Grid } from '@material-ui/core'
import React from 'react'
import AbcClubAppBar from '../components/appbar/Appbar'
import useApi from '../hooks/useApi'
import { IUserData } from '../interfaces/IUserData'
import apiConfig from '../lib/apiConfig.json'


interface IProps{

}

const PageLayout: React.FC<IProps> = (props) => {

    const {children} = props

    const userService = useApi<IUserData>({
        serviceUrl: `${apiConfig.baseUrl}${apiConfig.userService.getUsers}`,
        method: 'GET',
    })


    if(!userService.dataIsBound){
        return null
    }

    return(
        <Grid
            container
            style={{height: '100vh', overflow: 'hidden'}}
            direction='row'
            justifyContent='center'>
            <Grid
                container>
                <AbcClubAppBar userDataCollection={userService.items} />
            </Grid>
            <Grid
                container>
                    {children}
            </Grid>
        </Grid>
    )
}

export default PageLayout