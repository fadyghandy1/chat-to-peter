import dayjs from 'dayjs'
import { Edit, Download, Delete, Visibility } from '@mui/icons-material'
export const attachmentsTableColumns = (actions, intl) => [
  {
    id: 'attachmentType',
    label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' }),
    align: 'center',
    renderColumn: (row) => {
      return <div style={{ display: 'flex', justifyContent: 'center' }}>{row.attachmentNameOfTypeAR ? row.attachmentNameOfTypeAR : row.attachmentType?.descriptionAr}</div>
    },
  },
  { id: 'issuedDate', label: intl.formatMessage({ id: 'ADDFILE.ISSUEDDATE' }), align: 'center', renderColumn: (row) => <div>{row.issuedDate && dayjs(row.issuedDate).format('DD/MM/YYYY')}</div> },
  { id: 'expiryDate', label: intl.formatMessage({ id: 'ADDFILE.EXPIRYDATE' }), align: 'center', renderColumn: (row) => <div>{row.expiryDate && dayjs(row.expiryDate).format('DD/MM/YYYY')}</div> },
  { id: 'attachmentName', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' }), align: 'center', renderColumn: 'attachmentName' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '7px' }}>
        <div onClick={() => actions.deleteSelectedDocument(row, index)} style={{ color: 'red', cursor: 'pointer' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedDocument(row, index)} style={{ cursor: 'pointer' }}>
          <Edit />
        </div>
        <div onClick={() => actions.downloadSelectedDocument(row, index)}>
          <Download />
        </div>
        <div onClick={() => actions.viewSelectedDocument(row, index)}>
          <Visibility />
        </div>
      </div>
    ),
  },
]
