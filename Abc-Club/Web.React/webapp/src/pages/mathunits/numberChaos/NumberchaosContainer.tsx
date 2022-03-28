import React from 'react'
import MathunitContainer from '../MathUnitContainer'
import ButtonGroup from '../../../components/inputs/ButtonGroup'

interface IProps{

}

const NumberchaosContainer: React.FC<IProps> = (props) => {

    return(
        <React.Fragment>
        <MathunitContainer
            title='Zahlenchaos'>
            <div>
                Das ist nur ein test
            </div>
        </MathunitContainer>
        <ButtonGroup    
            hasCancelBtn = {true}
            hasSaveBtn = {true}
            saveBtnValue = 'Start'/>
        </React.Fragment>
    )
}

export default NumberchaosContainer