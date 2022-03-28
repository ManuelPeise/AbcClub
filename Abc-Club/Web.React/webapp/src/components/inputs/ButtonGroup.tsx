import { Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'

const styles = makeStyles({
    btnGrpContainer:{
        display: 'flex',
        position: 'relative',
        padding:'2rem',
        justifyContent: 'flex-end'
    }
})

interface IProps{
    hasSaveBtn: boolean
    saveBtnValue: string
    hasCancelBtn: boolean
}

const ButtonGroup: React.FC<IProps> = (props) =>{

    const {hasCancelBtn, hasSaveBtn, saveBtnValue} = props
    const classes = styles()

    return(
        <Grid
            container
            className={classes.btnGrpContainer}>
            {hasCancelBtn &&(
            <Button>Abbrechen</Button>
            )}
            {hasSaveBtn &&(
            <Button>{saveBtnValue}</Button>
            )}
        </Grid>
    )
}

export default ButtonGroup