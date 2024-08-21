import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import dayjs from 'dayjs'

// import { StyledBox } from './SearchClient.styles'
////
export const InitialValueSearch = {
  fileNumber: '',
  caseNumber: '',
  caseSummeryAr: '',
  caseSummeryEn: '',
  year: '',
  fileType: null,
  fileCategory: null,
  officeBranch: null,
  fileStatus: null,
  clients: '',
  againsts: '',
  court: '',
}
export const searchTableColumns = (intl) => [
  { id: 'fileNumber', label: intl.formatMessage({ id: 'ADDFILE.FILENUMBER' }), align: 'left', renderColumn: 'caseFileNumber' },

  {
    id: 'opponentName',
    label: intl.formatMessage({ id: 'ADDCLIENT.OPENATNAME' }),
    align: 'center',
    renderColumn: (row) => {
      console.log(intl.locale, 'ffffady intl')
      const againsts = intl.locale === 'ar' ? row.againstAr : row.againstEn
      return againsts.map((against) => against).join(' , ')
    },
  },

  {
    id: 'clientName',
    label: intl.formatMessage({ id: 'ADDCLIENT.CLIENTNAME' }),
    align: 'center',
    renderColumn: (row) => {
      const clients = intl.locale === 'ar' ? row.clientAr : row.clientEn
      return clients.map((client) => client).join(' , ')
    },
  },
  { id: 'court', label: intl.formatMessage({ id: 'ADDFILE.COURT' }), align: 'center', renderColumn: intl.locale === 'ar' ? 'court.descriptionAr' : 'court.descriptionEn' },
  { id: 'caseType', label: intl.formatMessage({ id: 'ADDFILE.CASETYPE' }), align: 'center', renderColumn: intl.locale === 'ar' ? 'caseType.descriptionAr' : 'caseType.descriptionEn' },
  { id: 'receiveFileDate', label: intl.formatMessage({ id: 'ADDFILE.RECEIVEFILEDATE' }), align: 'center', renderColumn: (row) => <div>{row.receiveFileDate && dayjs(row.receiveFileDate).format('DD/MM/YYYY')}</div> },
  //     id: 'actions',
  //     label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
  //     align: 'center',
  //     renderColumn: (row) => (
  //       <StyledBox>
  //         <div className="delete-icon" onClick={() => actions.deleteClient(row)}>
  //           <Delete />
  //         </div>
  //         <div className="icon" onClick={() => actions.editClient(row)}>
  //           <Edit />
  //         </div>
  //         <div className="icon" onClick={() => actions.viewClient(row)}>
  //           <VisibilityOutlinedIcon />
  //         </div>
  //       </StyledBox>
  //     ),
  //   },
]
