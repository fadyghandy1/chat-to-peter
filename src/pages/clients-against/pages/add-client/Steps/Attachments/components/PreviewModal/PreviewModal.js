import React, { forwardRef } from 'react'
import Logic from './Logic'
import PDFPreview from '../../../../../../../../components/common/PDFViewer/PDFPreview/PDFPreview'
import ImgPreview from '../../../../../../../../components/common/ImgViewer/ImgPreview/ImgPreview'

const PreviewModal = forwardRef(({}, ref) => {
  const { row, isPDF, open, handleClose } = Logic({ ref })

  return <>{row && (isPDF ? <PDFPreview open={open} handleClose={handleClose} imagePreviewUrl={row.attachment} /> : <ImgPreview open={open} handleClose={handleClose} imagePreviewUrl={row.attachment} />)}</>
})

export default PreviewModal
