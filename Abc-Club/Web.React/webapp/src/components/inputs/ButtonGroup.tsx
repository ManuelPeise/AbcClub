import { Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const styles = makeStyles({
    btnGrpContainer:{
        display: 'flex',
        position: 'relative'
    }
})

interface IProps{

}

const ButtonGroup: React.FC<IProps> = (props) =>{

    const classes = styles()

    return(
        <Grid
            container
            className={classes.btnGrpContainer}>
            <Button>Abbrechen</Button>
            <Button>Speichern</Button>
            <Button>OK</Button>
        </Grid>
    )
}

export default ButtonGroup