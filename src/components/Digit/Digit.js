import React from 'react'
import { Actions } from '../../App'
const Digit =({dispatch, digit})=>{
    return(
        <button onClick={()=> dispatch({type:Actions.Add_digit, payload:{digit}})}>
            {digit}
        </button>
    )
} 

export default Digit;