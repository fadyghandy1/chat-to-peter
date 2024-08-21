import React, { useState } from 'react'
import { Modal, Backdrop, Fade, Box, Button, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Document, Page, pdfjs } from 'react-pdf'

import { StyledPDFModal } from './PDFPreview.styles'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js'

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

const PDFViewer = ({ imagePreviewUrl, handleClose, className, open }) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const goToPrevPage = () => setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)

  const goToNextPage = () => setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1)
  const handleText = (e) => {
    if (+e.target.value > 0) {
      setPageNumber(e.target.value >= numPages ? numPages : +e.target.value)
    } else {
      setPageNumber(1)
    }
  }

  return (
    <div className={className}>
      <Backdrop open={open} onClick={handleClose} sx={{ transition: 'opacity 0.5s' }} />
      <StyledPDFModal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <div>
            <nav className={'reactDisplayCenter'}>
              <Box m={0.5}>
                <Button onClick={goToPrevPage} variant="contained">
                  Prev
                </Button>
              </Box>
              <Box m={0.5}>
                <input type="number" style={{ height: 40, borderRadius:'4px' }} placeholder="input a number for search" onChange={handleText} />
              </Box>
              <Box m={0.5}>
                <Button onClick={goToNextPage} variant="contained">
                  Next
                </Button>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  className='close-button'
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              <p className={'paragraphBottom'}>
                Page {pageNumber} of {numPages}
              </p>
            </nav>
            <Document file={imagePreviewUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber}></Page>
            </Document>
          </div>
        </Fade>
      </StyledPDFModal>
    </div>
  )
}

export default PDFViewer
