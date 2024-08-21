import { useRef, useState, useEffect } from 'react'
import UseFlashMessage from '../../../utils/hooks/UseFlashMessage'
import emptyImg from '../../../assets/images/emptyImg.png'
import { supportedFilesFormat } from '../../../utils/constants/config'
import { getImageTypeFromBase64 } from '../../../utils/common'

const Logic = (props) => {
  const { name, value } = props.field
  const [file, setFile] = useState(undefined)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(undefined)
  const [showClear, setShowClear] = useState(false)
  const { addFlashMessage } = UseFlashMessage()
  const webcamRef = useRef(null)
  const [showWebCam, setShowWeCam] = useState(false)
  const mobileDevice = window.matchMedia('(max-width: 767px)').matches

  useEffect(() => {
    if (value) {
      setImagePreviewUrl(value)
      let extension = getImageTypeFromBase64(value)
      if (extension) {
        setFile({ name: 'test', type: extension })
      }
      setShowClear(true)
    }
  }, [value])

  const handleImageUpload = (e) => {
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    if (file) {
      reader.onloadend = () => {
        setShowWeCam(false)
        setFile(file)
        debugger
        if (props.setFile) props.setFile({ name: file.name, file: reader.result, type: file.type })
        if (supportedFilesFormat.includes(file.type)) setImagePreviewUrl(reader.result)
        else setImagePreviewUrl(emptyImg)
        props.setFieldValue(props.field.name, reader.result)
        if (props.setFileType) props.setFileType(file.type)
      }

      reader.readAsDataURL(file)
      setShowClear(true)
    }
  }

  const capture = (e) => {
    e.preventDefault()
    const imageSrc = webcamRef.current.getScreenshot()

    setImagePreviewUrl(imageSrc)
    if (props.setFile) props.setFile({ name: 'screenshot.webp', file: imageSrc, type: 'image/webp' })
    props.setFieldValue(props.field.name, imageSrc)

    if (props.setFileType) props.setFileType('image/webp')
    setShowWeCam(false)
    setShowClear(true)
  }
  function isNewerVersion(clientAgentVersion, requiredVersion) {
    const clientParts = clientAgentVersion.replaceAll('.', '')
    const requiredParts = requiredVersion.replaceAll('.', '')
    const require = ~~requiredParts // parse int
    const client = ~~clientParts // parse int
    if (require > client) return false
    if (require < client || require === client) return true
  }

  function validateAgentVersion(onSucess) {
    var requiredVersion = '5.3.1.0'
    var command = 'GetVersion'
    var ws2 = new WebSocket('ws://localhost:8181')
    ws2.onopen = function () {
      ws2.send(command) // I WANT TO SEND THIS MESSAGE TO THE SERVER!!!!!!!!
    }
    ws2.onmessage = function (evt) {
      var agentVersion = evt.data
      if (agentVersion.startsWith('Error')) {
        addFlashMessage({ type: 'error', message: 'Please Update Agent or Contact Support.Cannot read Agent Version.' })
      } else {
        if (isNewerVersion(agentVersion, requiredVersion)) {
          ws2.close()
          onSucess()
        } else {
          addFlashMessage({ type: 'error', message: 'Please Update Agent or Contact Support.Required Version ' + requiredVersion + ' or later' })
        }
      }
      ws2.close()
    }
    ws2.onclose = function () {}
    ws2.onerror = function (error) {
      addFlashMessage({ type: 'error', message: 'Communication with TMS Agent Failed.Please,Open TMS Agent.' })
    }
    // ws2.addEventListener('error', function (event) {
    //   addFlashMessage({ type: 'error', message: 'Communication with TMS Agent Failed.Please,Open TMS Agent.' })
    // })
  }
  const handleImageScan = (e) => {
    e.preventDefault()
    if (mobileDevice) {
      setShowWeCam(true)
    } else {
      validateAgentVersion(ReadFile)
      function ReadFile() {
        var scan = 'scan'
        var ws = new WebSocket('ws://localhost:8181')
        ws.onopen = function () {
          ws.send(scan) // I WANT TO SEND THIS MESSAGE TO THE SERVER!!!!!!!!
        }
        ws.onmessage = function (evt) {
          var received_msg_uploadPhoto = evt.data
          if (received_msg_uploadPhoto.startsWith('Error')) {
            props.setFieldValue(name, undefined)
            setImagePreviewUrl(undefined)
            if (props.setFileType) props.setFileType(null)
          } else {
            setShowClear(true)
            props.setFieldValue(name, 'data:image/png;base64, ' + received_msg_uploadPhoto)
            setImagePreviewUrl('data:image/png;base64, ' + received_msg_uploadPhoto)
            if (props.setFileType) props.setFileType('image/png')
          }
          ws.close()
        }
        ws.onclose = function () {}
        ws.onerror = function (error) {}
        ws.addEventListener('error', function (event) {
          //
        })
      }
    }
  }
  const handleOpenCamera = (e) => {
    e.preventDefault()

    setShowWeCam(true)
    handleClear()
  }
  const handleClear = () => {
    setShowClear(false)

    props.setFieldValue(name, '')
    setImagePreviewUrl(undefined)
    setFile(undefined)

    if (props.setFile) props.setFile(null)
    if (props.setFileType) props.setFileType(null)
  }
  return { webcamRef, imagePreviewUrl, showClear, file, showWebCam, handleOpenCamera, handleImageUpload, handleClear, handleImageScan, capture }
}

export default Logic
