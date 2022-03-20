import React from 'react'
import {InputProps, MenuItem, TextField, Typography} from '@material-ui/core'
import { IListItem } from '../../interfaces/IListItem'


interface IProps extends InputProps{
    items: IListItem[]
    selectedItem: IListItem
    setUserData: (id: number) => void
}

const DropDown: React.FC<IProps> = (props) => {

    const {items, selectedItem, setUserData} = props
    
    const [value, setValue] = React.useState<IListItem | null>(selectedItem?? null)

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        
        const item = items[parseInt(event.currentTarget.id)]
        setValue(item)

        setUserData(item.key)
    },[items, setUserData]);

    return(
        <TextField
            style={{minWidth: '10vw'}} 
            select
            value={value?.key?? items[0].key}
            color='primary'
            variant='outlined'
            onChange={handleChange}>
                {items.map((item)=>{
                    return(   
                        <MenuItem
                            id={item.key.toString()}
                            disabled = {item.key === 0}
                            key={item.key}
                            value={item.key}>
                               <Typography variant='h6'>
                                    {item.value}
                               </Typography>
                        </MenuItem>
                    ) 
                    
                })}
            </TextField>
            
    )
} 

export default DropDown