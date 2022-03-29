import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import DropDown from '../../components/inputs/Dropdown'
import { IListItem } from '../../interfaces/IListItem'
import { LevelTypeEnum } from '../../lib/enums/LevelTypeEnum'

const styles = makeStyles({
    settingsBarContainer:{
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-end',
        padding: '1rem',
        margin: '2rem',
        backgroundColor: 'lightgray',
        boxShadow: '2px 4px lightgray'
    }
})

interface IProps{
    level: LevelTypeEnum
    disabled: boolean
    setLevel: (level: number) => void
}

const MathunitSettingsBar: React.FC<IProps> = (props) =>{

    const {level, disabled, setLevel} = props
    const classes = styles()

    const items = React.useMemo((): IListItem[] =>{

        const data = [] as IListItem[]

        data.push({
            key: 0,
            value: LevelTypeEnum[LevelTypeEnum.easy]
        })

        data.push({
            key: 1,
            value: LevelTypeEnum[LevelTypeEnum.medium]
        })

        data.push({
            key: 2,
            value: LevelTypeEnum[LevelTypeEnum.expert]
        })
        return data
    },[])
    
    return(
        <Grid
            className={classes.settingsBarContainer}
            container>
                <DropDown
                    disabled={disabled}
                    items={items}
                    selectedItem={items.find(x => x.key === level as number)?? items[0]}
                    onHandleChange={setLevel}
                />
        </Grid>
    )
}

export default MathunitSettingsBar

