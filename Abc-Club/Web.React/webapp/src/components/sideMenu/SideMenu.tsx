import { Box, Drawer, List, makeStyles } from '@material-ui/core'
import React from 'react'
import { getMenuItems } from '../../lib/routes'
import SideMenuListItem from './SideMenuListItem'

const styles = makeStyles({
    itemList:{
        width: '15vw'  
    }
})

interface IProps{
    open: boolean
    toggleOpen: () => void
}

const SideMenu: React.FC<IProps> = (props) =>{

    const {open, toggleOpen} = props
    const [selectedKey, setSelectedKey] = React.useState<string>("")
    const classes = styles()
    const menuItemCollention = getMenuItems()

    const onSelectedKeyChanged = React.useCallback((key: string)=>{
        setSelectedKey(key)
    },[])

    const itemList = React.useMemo(() =>{
        return(

            <Box
                role='presentation'
                // onClick={toggleOpen}
                onKeyDown={toggleOpen}>
                <List className={classes.itemList} disablePadding>
                    {menuItemCollention?.map((item) =>{
                        return(
                            <SideMenuListItem 
                                item={item} 
                                selectedKey={selectedKey}
                                toggleOpen={toggleOpen}
                                onSelectedKeyChanged = {onSelectedKeyChanged}
                                />
                        )
                    })}
                </List>
            </Box>
        )
    },[menuItemCollention, classes, selectedKey, onSelectedKeyChanged, toggleOpen])

    return(
        <Drawer
            open = {open}
            onClose = {toggleOpen}
            keepMounted>
            {itemList}
        </Drawer>
    )
} 

export default SideMenu