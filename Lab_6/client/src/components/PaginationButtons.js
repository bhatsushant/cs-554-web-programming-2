import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../styles/PaginationButtons.scss'

export default function PaginationButtons( { count, handlePageChange, currentPage }) {
  return (
    <div className='pagination-container'>
      <Stack spacing={2}>
        <Pagination count={count} defaultPage={1} page={currentPage} onChange={handlePageChange} showFirstButton showLastButton />
      </Stack>
    </div>
  );
}
