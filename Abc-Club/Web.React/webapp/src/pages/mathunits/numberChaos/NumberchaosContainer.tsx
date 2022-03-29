import React, { CSSProperties } from 'react'
import MathunitContainer from '../MathUnitContainer'
import ButtonGroup from '../../../components/inputs/ButtonGroup'
import { IUnitResponseModel } from '../../../interfaces/IUnitResponseModel'
import DropContainer from '../../../components/dragNDrop/DropContainer'
import { Grid, Paper } from '@material-ui/core'
import MathunitSettingsBar from '../MathUnitSettingsBar'
import { LevelTypeEnum } from '../../../lib/enums/LevelTypeEnum'

interface IProps{
    unit: IUnitResponseModel
    inProgress: boolean
    level: LevelTypeEnum
    handleStart: () => void
    handleCancel: () => void
    handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void
    handleAllowDrop: (event: React.DragEvent<HTMLDivElement>) => void
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void
    handleLevelChanged: (level: number) => void
}

const style: CSSProperties = {display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto', minWidth: '3rem', height: 'auto', minHeight: '3rem', margin: '2rem', border: '1px solid lightgray'}

const NumberchaosContainer: React.FC<IProps> = (props) => {

    const {unit, inProgress, level, handleStart, handleCancel, handleDragStart, handleAllowDrop, handleDrop, handleLevelChanged} = props
    
    const btnValue = 'Start'

    const dragItems = React.useMemo((): JSX.Element[] =>{
        const items: number[] = JSON.parse(unit.unitContext.context)
    
        return items?.map((item) => {
            return(
                <Paper style={style}>
                    <DropContainer
                        id={item.toString()}
                        key={item}
                        style = {style}
                        handleDragStart={handleDragStart}
                        handleAllowDrop={handleAllowDrop}
                        handleDrop={handleDrop}>
                            {item}
                    </DropContainer>
                </Paper>)
        })
    },[handleDragStart, handleAllowDrop, handleDrop, unit.unitContext])

    const dropItems = React.useMemo(() =>{
        const items: number[] = JSON.parse(unit.unitContext.context)
       
        return items?.map((item) => {
            return(
                <DropContainer 
                    id={item.toString()}
                    key={item}
                    style = {style}
                    handleDragStart={handleDragStart}
                    handleAllowDrop={handleAllowDrop}
                    handleDrop={handleDrop}>
                    
                </DropContainer>)
        })
    },[handleAllowDrop, handleDrop, handleDragStart, unit.unitContext])

    return(
        <React.Fragment>
        <MathunitContainer
            title='Zahlenchaos'>
                <MathunitSettingsBar
                    disabled={inProgress}
                    level={level}
                    setLevel={handleLevelChanged}
                />
                {inProgress && (
                <React.Fragment>
                    <Grid 
                        justifyContent='center'
                        container>
                        {dragItems}
                    </Grid>
                    <Grid 
                        justifyContent='center'
                        container>
                        {dropItems}
                    </Grid>
                </React.Fragment>
            )}
        </MathunitContainer>
        <ButtonGroup    
            hasCancelBtn = {true}
            hasSaveBtn = {true}
            saveBtnValue = {btnValue}
            saveDisabled = {inProgress}
            handleClick = {handleStart}
            handleCancel = {handleCancel}/>
        </React.Fragment>
    )
}

export default NumberchaosContainer