import React, { useState } from 'react';
import { Stack, Button, Avatar } from '@mui/material';
import AccountBoxTwoTone from '@mui/icons-material/AccountBoxTwoTone';
import axios from 'axios';
const UploadImagePreview = ({ onChange }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange(file); // Pass the image data back to the parent component
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <Avatar
        sx={{ width: 100, height: 100 }}
        src={imagePreview}
      >
        {!imagePreview && <AccountBoxTwoTone sx={{ fontSize: '3rem' }}/>}
      </Avatar>
      <Button variant="contained" component="label">
        Upload
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleImageUpload}
        />
      </Button>
    </Stack>
  );
};

export default UploadImagePreview;
