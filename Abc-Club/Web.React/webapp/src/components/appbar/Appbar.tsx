import { AppBar, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IAppState } from '../../interfaces/IAppState'
import { IListItem } from '../../interfaces/IListItem'
import { IUserData } from '../../interfaces/IUserData'
import { setUserData } from '../../redux/storeAccessor'
import DropDown from '../inputs/Dropdown'

const styles = makeStyles({
    root:{
        display: 'flex',
        position: 'relative',
        height: 'auto',
        maxHeight: '5rem'
    },
    container:{
        display: 'inerhit',
        alignContent: 'baseline',
        padding: '1rem'
    },
    title:{
        padding:'1rem'
    },
    dropDownContainer:{
        display:'flex',
        justifyContent: 'flex-end',
    }
})

interface IProps{
    userDataCollection: IUserData[]
}

const AbcClubAppBar: React.FC<IProps> = (props) =>{

    const {userDataCollection} = props
    const dispatch = useDispatch()

    const selector = useSelector<IAppState, IUserData>(state => state.userData)?? {} as IUserData
    const classes = styles()

    const userItems = React.useMemo(() =>{
        const items: IListItem[] = [{key: 0, value: 'Bitte wählen'}]

        userDataCollection?.forEach((data) =>{
            items.push({key: data.id, value: data.username})
        })

        return items
    },[userDataCollection])
    
    const setUser = React.useCallback((id: number) => {

        const data = userDataCollection.find(x => x.id === id)?? {} as IUserData
        dispatch(setUserData(data))
    },[userDataCollection, dispatch])

    const selectedItem = React.useMemo((): IListItem =>{
        return{
            key: selector.id,
            value: selector.username
        }
    },[selector.id, selector.username]) 

    return(
        <AppBar className={classes.root} color='primary'>
            <Toolbar>
                <Grid
                    className={classes.container}
                    container>
                    <Grid
                        className={classes.title}
                        item
                        xs = {6}>
                        <Typography variant='h4'>
                            Abc - Club
                        </Typography>
                    </Grid>
                    <Grid
                        className={classes.dropDownContainer}
                        item
                        xs = {6}>
                        <DropDown 
                            items={userItems} 
                            selectedItem={selectedItem}
                            setUserData={setUser}/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default AbcClubAppBar