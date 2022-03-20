import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProps{
    path: string
}

const NotFound: React.FC<IProps> = (props) =>{

    const {path} = props

    return(
        <Grid
            container
            style={{height: '100vh', padding: '2rem'}}
            justifyContent='center'
            direction='row'>
            <Grid 
                container
                justifyContent='center'>
                <Typography variant='h2'>Opp's..., da ist etwas schief gelaufen!</Typography>
            </Grid>
            <Grid 
                container
                justifyContent='center'>
                <Button>
                    <Link style={{textDecoration: 'none'}} to={path}>
                        <Typography variant='h4'>Zurück</Typography>
                    </Link>
                </Button>
                
            </Grid>
        </Grid>
    )
}

export default NotFound