import Button from '@mui/material/Button';
import React from 'react';

interface CreateButtonProps {
  onClick: () => void;
}

const Createbutton: React.FC<CreateButtonProps> = ({ onClick }) => {
  return (
    <Button
      sx={{
        width: '90px',
        height: '34px',
        borderRadius: '6px',
        opacity: 1,
        textTransform: 'none',
        backgroundColor: '#015d82',
        color: 'white',
        '&:hover': {
          backgroundColor: '#015d82x',
        },
      }}
      onClick={onClick}
    >
      Create +
    </Button>
  );
};

export default Createbutton;
