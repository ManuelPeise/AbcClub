import { Grid } from '@material-ui/core'
import React from 'react'
import ButtonGroup from '../../components/inputs/ButtonGroup'

interface IProps{
    title: string
}

const MathunitContainer: React.FC<IProps> = (props) =>{

    const {title} = props

    return(
        <Grid
            container>
            <Grid
                container>
                {title}
            </Grid>
            <Grid
                container>
                Content
            </Grid>
            <ButtonGroup/>
        </Grid>
    )
}

export default MathunitContainer