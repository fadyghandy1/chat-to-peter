import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { StyledBox } from './SearchAgainst.styles'

export const searchTableColumns = (actions, intl) => [
  { id: 'againstEnName', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME_EN' }), align: 'left', renderColumn: 'nameEn' },
  { id: 'againstArName', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME_AR' }), align: 'left', renderColumn: 'nameAr' },
  { id: 'phoneNumber', label: intl.formatMessage({ id: 'SEARCHCLIENT.PHONE' }), align: 'center', renderColumn: 'phoneNumber' },
  { id: 'mobileNumber', label: intl.formatMessage({ id: 'SEARCHCLIENT.MOBILE' }), align: 'center', renderColumn: 'mobileNumber' },
  { id: 'nationality', label: intl.formatMessage({ id: 'SEARCHCLIENT.NATIONALITY' }), align: 'center', renderColumn: 'nationalityNameAR' },
  { id: 'city', label: intl.formatMessage({ id: 'SEARCHCLIENT.CITY' }), align: 'center', renderColumn: 'cityNameAR' },
  { id: 'localIdentificationNumber', label: intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' }), align: 'center', renderColumn: 'localIdentificationNumber' },
  { id: 'passportNumber', label: intl.formatMessage({ id: 'ADDCLIENT.PASSPORTNUMBER' }), align: 'center', renderColumn: 'passportNumber' },

  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row) => (
      <StyledBox>
        <div className="delete-icon" onClick={() => actions.deleteOpponent(row)}>
          <Delete />
        </div>
        <div className="icon" onClick={() => actions.editOpponent(row)}>
          <Edit />
        </div>
        <div className="icon" onClick={() => actions.viewOpponent()}>
          <VisibilityOutlinedIcon />
        </div>
      </StyledBox>
    ),
  },
]
