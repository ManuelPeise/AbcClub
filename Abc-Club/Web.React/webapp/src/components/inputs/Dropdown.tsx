import React from 'react'
import {InputProps, MenuItem, TextField, Typography} from '@material-ui/core'
import { IListItem } from '../../interfaces/IListItem'


interface IProps extends InputProps{
    items: IListItem[]
    selectedItem: IListItem
    onHandleChange: (id: number) => void
}

const DropDown: React.FC<IProps> = (props) => {

    const {items, selectedItem, disabled, onHandleChange} = props
    
    const [value, setValue] = React.useState<IListItem | null>(selectedItem?? null)

    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        
        const item = items[parseInt(event.currentTarget.id)]
        setValue(item)

        onHandleChange(item.key)
    },[items, onHandleChange]);

    return(
        <TextField
            style={{minWidth: '10vw'}} 
            select
            value={value?.key?? items[0].key}
            color='primary'
            variant='outlined'
            disabled={disabled}
            onChange={handleChange}>
                {items.map((item)=>{
                    return(   
                        <MenuItem
                            id={item.key.toString()}
                            disabled = {item.key === -1}
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