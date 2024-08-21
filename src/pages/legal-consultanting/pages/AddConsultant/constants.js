import dayjs from 'dayjs'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'

export const InitialValueWizard = {
  firstParty: [],
  secondParty: [],
  fileNumber: '',
  fileType: null,
  officeBranch: null,
  fileCategory: null,
  clientFileNumber: '',
  year: dayjs(new Date()),
  fileStatus: null,
  caseSummeryAr: '',
  caseSummeryEn: '',
  receiveFileDate: '',
  claimValue: '',
  clients: [],
  againsts: [],
  cosultants: [],
  pleadingLawyers: [],
  administrativeTaxpayers: [],
  secretary: [],
  attachments: [],
  stages: [],
}
export const attachmentsTableColumns = (actions, intl) => [
  { id: 'attachmentType', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' }), align: 'center', renderColumn: 'attachmentType.title' },
  { id: 'attachmentEndDate', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTENDDATE' }), align: 'center', renderColumn: 'attachmentEndDate' },
  { id: 'attachmentName', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' }), align: 'center', renderColumn: 'attachmentName' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteSelectedDocument(row, index)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedDocument(row, index)}>
          <Edit />
        </div>
      </div>
    ),
  },
]
export const stagesTableColumns = (actions, intl) => [
  { id: 'date', label: intl.formatMessage({ id: 'DATE' }), align: 'center', renderColumn: 'date' },
  { id: 'consultant', label: intl.formatMessage({ id: 'ADDCONSULT.CONSULTANT' }), align: 'center', renderColumn: 'consultant.title' },
  { id: 'followUpDetails', label: intl.formatMessage({ id: 'ADDCONSULT.FOLLOWUP_DETAILS' }), align: 'center', renderColumn: 'followUpDetails' },
  { id: 'action', label: intl.formatMessage({ id: 'ADDCONSULT.ACTIONS' }), align: 'center', renderColumn: 'action' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteSelectedDocument(row, index)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedDocument(row, index)}>
          <Edit />
        </div>
      </div>
    ),
  },
]
