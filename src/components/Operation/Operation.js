import React from 'react'
import { Actions } from '../../App'

const Operation=({dispatch, operation})=>{
    return (
        <button onClick={()=>dispatch({type:Actions.Choose_operation, payload:{operation}})}>
            {operation}
        </button>
    )
}


export default Operation;