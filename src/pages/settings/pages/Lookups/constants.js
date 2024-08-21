import dayjs from 'dayjs'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'

export const InitialValueWizard = {
  fileId: null,
  caseMasterId: 100,
  fileNumber: '',
  fileType: null,
  fileCategory: null,
  officeBranch: null,
  clientFileNumber: '',
  year: dayjs(new Date()),
  receiveFileDate: null,
  claimValue: '',
  fileStatus: null,
  caseSummeryAr: '',
  caseSummeryEn: '',
  clients: [],
  againsts: [],
  // cosultants: [],
  // pleadingLawyers: [],
  // administrativeTaxpayers: [],
  // secretary: [],
  attachments: [],
  stages: [],
  // hearings: [],
}

export const lookupsTableColumns = (actions, intl) => [
  { id: 'descriptionEn', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME_EN' }), align: 'center', renderColumn: 'descriptionEn' },
  { id: 'descriptionAr', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME_AR' }), align: 'center', renderColumn: 'descriptionAr' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteLookup(row)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editLookup(row)}>
          <Edit />
        </div>
      </div>
    ),
  },
]
