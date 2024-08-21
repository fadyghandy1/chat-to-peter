import React from 'react'
import { FormControl, FormHelperText, TextField } from '@mui/material'
import { CloudUpload as CloudUploadIcon, CameraAlt as CameraIcon } from '@mui/icons-material'
import AppButton from '../AppButton/AppButton'
import { supportedFilesFormat } from '../../../utils/constants/config'
import PreloadImage from './PreloadImage'
import { StyledAvatar } from './FileUpload.styles'
import Webcam from 'react-webcam'
import Logic from './logic'

const FileUpload = (props) => {
  const { className, errorMessage, uploadBtnTitle = 'upload', scanBtnTitle = 'Scan', cameraBtnTitle = 'camera', title, disabled, showScanBtn = true, showCameraBtn = false } = props
  const { name, supportedFormat = supportedFilesFormat } = props.field
  const fileUpload = React.createRef()

  const { webcamRef, imagePreviewUrl, showClear, file, showWebCam, handleOpenCamera, handleImageUpload, handleClear, handleImageScan, capture } = Logic(props)
  return (
    <>
      <div className={className}>
        {showWebCam && (
          <div className="cameraView">
            <Webcam
              audio={false}
              ref={webcamRef}
              width={'100%'}
              height={'100%'}
              // videoConstraints={{
              //   facingMode: { exact: 'environment' },
              // }}
              screenshotQuality={'1'}
            />
            <button className="captureButton" onClick={capture} type="button"></button>
          </div>
        )}
        {props.form.values[name] && <PreloadImage value={props.form.values[name]} file={file} imagePreviewUrl={imagePreviewUrl} />}
        {!disabled && (
          <FormControl fullWidth error={!!errorMessage}>
            <div className="container" style={{ display: 'flex', flex: '1', justifyContent: 'space-between' }}>
              <p className="label">{title}</p>
              {showScanBtn && (
                <AppButton color="lightgrey" disabled={disabled} component="label" fullWidth className={'buttonScan'} type="button">
                  <StyledAvatar isError={!!errorMessage}>
                    <CameraIcon />
                  </StyledAvatar>
                  {scanBtnTitle && <span>{scanBtnTitle}</span>}
                  <TextField
                    onClick={(event) => {
                      event.target.value = null
                      handleImageScan(event)
                    }}
                    className={'hidden'}
                    id={name}
                    name={name}
                    type="file"
                    ref={fileUpload}
                    style={{ display: 'none' }}
                    helperText={errorMessage}
                  />
                </AppButton>
              )}
              {showCameraBtn && (
                <AppButton color="lightgrey" disabled={disabled} component="label" fullWidth className={'buttonScan'} type="button">
                  <StyledAvatar isError={!!errorMessage}>
                    <CameraIcon />
                  </StyledAvatar>
                  {cameraBtnTitle && <span>{cameraBtnTitle}</span>}
                  <TextField
                    onClick={(event) => {
                      event.target.value = null
                      handleOpenCamera(event)
                    }}
                    className={'hidden'}
                    id={name}
                    name={name}
                    type="file"
                    ref={fileUpload}
                    style={{ display: 'none' }}
                    helperText={errorMessage}
                  />
                </AppButton>
              )}

              <AppButton fullWidth color="lightgrey" component="label" className={'buttonUpload'} disabled={disabled} type="button">
                <StyledAvatar isError={!!errorMessage}>
                  <CloudUploadIcon />
                </StyledAvatar>
                {uploadBtnTitle && <span>{uploadBtnTitle}</span>}
                <input
                  onClick={(event) => {
                    event.target.value = null
                  }}
                  className={'hidden'}
                  id={name}
                  name={name}
                  type="file"
                  accept={supportedFormat}
                  onChange={(event) => {
                    handleImageUpload(event)
                  }}
                  ref={fileUpload}
                  style={{ display: 'none' }}
                  helpertext={errorMessage}
                />
              </AppButton>
            </div>

            {props.form.values[name] && showClear && (
              <AppButton variant="text" style={{ display: 'block', textAlign: 'left' }} onClick={() => handleClear()}>
                Clear File
              </AppButton>
            )}

            {errorMessage && <FormHelperText id="passport-copy">{errorMessage}</FormHelperText>}
          </FormControl>
        )}
      </div>
    </>
  )
}

export default FileUpload
