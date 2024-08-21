import { Box, styled } from '@mui/material'

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  '.icon': {
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    svg: {
      fontSize: '20px',
    },
  },
  '.delete-icon': {
    cursor: 'pointer',
    color: 'red',
    svg: {
      fontSize: '20px',
    },
  },
}))
