import { styled, Modal } from '@mui/material'

export const StyledPDFModal = styled(Modal)(({ theme }) => ({
  '& .reactDisplayCenter': {
    display: 'flex !important',
    justifyContent: 'center !important',
  },
  '& .close-button': {
    backgroundColor: 'white',
    position: 'absolute',
    right: 8,
    top: 8,
  },
  // '& .react-pdf__Page':{
  //   maxWidth: 'fit-content',
  //   margin: 'auto'
  // },
  '& .paragraphBottom': {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  '& .react-pdf__Page__canvas' : {
    margin: 'auto'
  }
}))
