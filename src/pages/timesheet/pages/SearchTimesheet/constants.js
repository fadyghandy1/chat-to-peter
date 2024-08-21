import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { StyledBox } from './SearchTimesheet.styles'
import dayjs from 'dayjs'

// export const InitialValueSearch = {
//   caseFileNumber: '',
//   caseNumber: '',
//   dateStartwork: '',
//   description: '',
//   doingwork: '',
//   staffName: '',
// }
// const formattedDate = dayjs(doingwork).format('MM/DD/YYYY')

export const searchTableColumns = (actions, intl) => [
  { id: 'caseFileNumber', label: intl.formatMessage({ id: 'SEARCHTIMESHEET.CASEFILENUMBER' }), align: 'left', renderColumn: 'caseFileNumber' },
  { id: 'caseNumber', label: intl.formatMessage({ id: 'SEARCHTIMESHEET.CASENUMBER' }), align: 'left', renderColumn: 'caseNumber' },
  { id: 'dateStartwork', label: intl.formatMessage({ id: 'SEARCHTIMESHEET.DATESTARTWORK' }), align: 'center', renderColumn: (row) => <div>{row.dateStartwork && dayjs(row.dateStartwork).format('DD/MM/YYYY')}</div> },
  { id: 'description', label: intl.formatMessage({ id: 'SEARCHTIMESHEET.DESCRIPTION' }), align: 'center', renderColumn: 'description' },
  { id: 'doingwork', label: intl.formatMessage({ id: 'SEARCHTIMESHEET.DOINGWORK' }), align: 'center', renderColumn: (row) => <div>{row.doingwork && dayjs(row.doingwork).format('DD/MM/YYYY')}</div> },
  { id: 'staffName', label: intl.formatMessage({ id: 'SEARCHTIMESHEET.STAFFNAME' }), align: 'center', renderColumn: 'staffName' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row) => {
      debugger
      return (
        <StyledBox>
          <div className="delete-icon" onClick={() => actions.deleteTimesheet(row)}>
            <Delete />
          </div>
          <div className="icon" onClick={() => actions.editTimesheet(row)}>
            <Edit />
          </div>
        </StyledBox>
      )
    },
  },
]
