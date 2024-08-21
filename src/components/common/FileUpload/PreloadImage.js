import { useRef } from 'react'
import ImgViewer from '../ImgViewer/ImgViewer.styles'
import PDFViewer from '../PDFViewer/PDFViewer.styles'
import imageNotfound from '../../../assets/images/imageNotfound.jpeg'

const PreloadImage = ({ value, file, imagePreviewUrl, disabled = false }) => {
  const canvasRef = useRef()
  let comp = disabled ? <img src={imageNotfound} alt="" width="100%" height="100%" /> : null
  if (value && file?.type == 'application/pdf') {
    return <PDFViewer imagePreviewUrl={imagePreviewUrl} canvasRef={canvasRef} />
  } else if (value) {
    return <ImgViewer imagePreviewUrl={imagePreviewUrl} />
  } else if (file) {
    return <ImgViewer imagePreviewUrl={imagePreviewUrl} />
  }
  return comp
}

export default PreloadImage
