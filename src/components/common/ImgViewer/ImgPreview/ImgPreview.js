import React, { useState } from 'react'
import { Backdrop, Fade, Skeleton } from '@mui/material'
import { StyledModal } from './ImgPreview.styles'

const ImgPreview = ({ imagePreviewUrl, className, open, handleClose }) => {
  return (
    <div className={className}>
      <>
        <StyledModal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" className={'modal'} open={open} onClose={handleClose} closeAfterTransition>
          <Fade in={open}>
            <div className={'paper'}>{imagePreviewUrl ? <img className={'imgXL'} src={imagePreviewUrl} alt="..." /> : <Skeleton className={'skeleton'} variant="rect" />}</div>
          </Fade>
        </StyledModal>
        <Backdrop open={open} timeout={500} onClick={handleClose} />
      </>
    </div>
  )
}

export default ImgPreview
