import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { StyledBox } from './SearchClient.styles'
////
export const InitialValueSearch = {
  name: '',
  clientArName: '',
  clientEnName: '',
  phoneNumber: '',
  mobileNumber: '',
  nationality: null,
  branch: null,
}
export const searchTableColumns = (actions, intl) => [
  { id: 'clientArName', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME_AR' }), align: 'left', renderColumn: 'clientArName' },
  { id: 'clientEnName', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME_EN' }), align: 'left', renderColumn: 'clientEnName' },
  { id: 'phoneNumber', label: intl.formatMessage({ id: 'SEARCHCLIENT.PHONE' }), align: 'center', renderColumn: 'telephoneNumber' },
  { id: 'mobileNumber', label: intl.formatMessage({ id: 'SEARCHCLIENT.MOBILE' }), align: 'center', renderColumn: 'mobileNumber' },
  { id: 'nationality', label: intl.formatMessage({ id: 'SEARCHCLIENT.NATIONALITY' }), align: 'center', renderColumn: 'nationality.descriptionAr' },
  { id: 'branch', label: intl.formatMessage({ id: 'SEARCHCLIENT.BRANCH' }), align: 'center', renderColumn: 'branch.descriptionAr' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row) => (
      <StyledBox>
        <div className="delete-icon" onClick={() => actions.deleteClient(row)}>
          <Delete />
        </div>
        <div className="icon" onClick={() => actions.editClient(row)}>
          <Edit />
        </div>
        <div className="icon" onClick={() => actions.viewClient(row)}>
          <VisibilityOutlinedIcon />
        </div>
      </StyledBox>
    ),
  },
]
