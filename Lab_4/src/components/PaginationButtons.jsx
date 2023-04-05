import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../styles/Pagination.css';

const PaginationButtons = ({pages, handleChange}) => {
  return (
    <div className='pagination-container'>
      <Stack spacing={2}>
        <Pagination defaultPage={1} count={pages} showFirstButton showLastButton onChange={handleChange} />
      </Stack>
    </div>
  );
}

export default PaginationButtons;
