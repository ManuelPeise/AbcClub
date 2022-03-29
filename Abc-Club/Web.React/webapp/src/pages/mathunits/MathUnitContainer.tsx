import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import PageTitleContainer from '../../components/pageTitle/PageTitleContainer'

const styles = makeStyles({
    mathUnitContainer:{
        display: 'flex',
        position:'relative',
        width: '100vw'
    },
    contentContainer:{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 'inherit'
    }
})

interface IProps{
    title: string
}

const MathunitContainer: React.FC<IProps> = (props) =>{

    const {title, children} = props
    const classes = styles()

    return(
        <Grid
            container
            justifyContent='center'
            spacing={3}
            className={classes.mathUnitContainer}>
            <PageTitleContainer title={title}/>
            <Grid
                className={classes.contentContainer}
                container>
                {children}
            </Grid>
        </Grid>
    )
}

export default MathunitContainer