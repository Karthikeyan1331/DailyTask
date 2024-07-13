import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
const ButtonPage = ({ Name, SelectBox, selectboxName, onClickPrefer }) => {
    console.log(Name)
    const [btnName, setBtnName] = useState(Name)
    const [placeHolder, setPlaceHolder] = useState(selectboxName)
    const [showSelectOrNot, setShowSelectOrNot] = useState(onClickPrefer);
    const [age, setAge] = useState('');
    const [selectBox, setSelectBox] = useState(SelectBox)
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {
        setBtnName(Name);
        setSelectBox(SelectBox);
        setPlaceHolder(selectboxName)
        setShowSelectOrNot(onClickPrefer)
    }, [Name, SelectBox, selectboxName, onClickPrefer])
    const handleOnclick = () => {
        if (!showSelectOrNot) {
            setAge('')
        }
        setShowSelectOrNot(!showSelectOrNot)
    }
    return (
        <div className='d-flex'>
            <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={handleOnclick}>{btnName}</Button>
            {(showSelectOrNot && age !== "other") && <Box sx={{ minWidth: 150, marginLeft: 3 }}>
                <FormControl fullWidth ariant="outlined" >
                    <InputLabel id="demo-simple-select-label" sx={{ lineHeight: '20px' }}>{placeHolder}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                        sx={{
                            paddingTop: '6px',
                            paddingBottom: '6px',
                            height: 38
                        }}
                    >
                        {selectBox && Object.entries(selectBox).map(([key, value]) => (
                            <MenuItem key={value} value={value}>{key}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Box>}

            {(showSelectOrNot && age === "other") && <div className='input-group' style={{ width: '300px' }}>
                <input type="text" className="form-control Other" style={{borderRight:'none'}}  placeholder="" />
                <div className="input-group-append" >
                    <span className="input-group-text" style={{
                    borderRadius:'0px', height: '40px', background:'none', borderLeft:'none'
                }} id="basic-addon2" onClick={()=>setAge('')}><i className="bi bi-eraser"></i></span>
                </div>
            </div>}
        </div>
    )
}

export default ButtonPage
