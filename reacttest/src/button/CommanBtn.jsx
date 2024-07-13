import React from 'react'
import Button from '@mui/material/Button';
import ButtonPage from './ButtonPage';
import './style.css'
const CommanBtn = () => {
    let arr = { "Option 1": "Opt1", "Option 2": "Opt2", "Option 3": "Opt3", "Other": "other" }
    
    return (
        <div className='container mt-5 inside'>
            <ButtonPage Name="Not preferable" SelectBox={arr} selectboxName="Select" onClickPrefer={false} />
            <ButtonPage Name="Not preferable" SelectBox={arr} selectboxName="Select Box" onClickPrefer={false}/>
            <ButtonPage Name="Not preferable" SelectBox={arr} selectboxName="Select Box" onClickPrefer={false}/>
            <ButtonPage Name="Not preferable" SelectBox={arr} selectboxName="Select Box" onClickPrefer={false}/>
            <ButtonPage Name="Not preferable" SelectBox={arr} selectboxName="Select Box" onClickPrefer={false}/>
            <ButtonPage Name="Not preferable" SelectBox={arr} selectboxName="Select Box" onClickPrefer={false}/>
            <ButtonPage Name="Not" SelectBox={arr} selectboxName="Select Box" onClickPrefer={false}/>
        </div>
    )
}

export default CommanBtn
