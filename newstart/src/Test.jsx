import React from 'react'
import { Context } from './App'
import Button from '@mui/material/Button';
const Test = () => {
    const [signedIn, setSignedIn] = React.useContext(Context)
    return (
        <div>
            <Button variant="contained"
                color="primary" onClick={() => setSignedIn(!signedIn)}>
                {signedIn?"ToggleButton":"ToggleOut"}
            </Button>
        </div>
    )
}

export default Test
