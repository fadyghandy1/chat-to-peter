import { Edit, Delete } from '@mui/icons-material'

export const contactsTableColumns = (actions, intl) => [
  { id: 'contactName', label: intl.formatMessage({ id: 'ADDCLIENT.NAME' }), align: 'center', renderColumn: 'contactName' },
  { id: 'contactJob', label: intl.formatMessage({ id: 'ADDCLIENT.JOB' }), align: 'center', renderColumn: 'contactJob' },
  { id: 'contactMobile', label: intl.formatMessage({ id: 'ADDCLIENT.MOBILE' }), align: 'center', renderColumn: 'contactMobile' },
  { id: 'contactEmail', label: intl.formatMessage({ id: 'ADDCLIENT.EMAIL' }), align: 'center', renderColumn: 'contactEmail' },
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
      </div>
    ),
  },
]
