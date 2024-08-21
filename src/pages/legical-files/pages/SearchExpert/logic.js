import { shallowEqual, useSelector } from 'react-redux'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { StyledBox } from './SearchExpertStyle';
import { useIntl } from 'react-intl'

function Logic() {
  const intl =useIntl()
    const state = useSelector((state) => {
        const { SearchExpertResult } = state.SearchExpert
        return { SearchExpertResult }
      }, shallowEqual)
    const rows = [
    { id: '1', name: 'Frozen yoghurt', phone: 2455885555, mobile: 152122555555, nationality: 'Egyptian' ,  branch: 1 },
    // { id: '2', name: 'Ice cream sandwich', calories: 237, fat: 9.0, printable: '', carbs: 37 },
    ];
    const actions = {
        delete: ()=>{console.log('delete')},
        edit: ()=>{console.log('edit')},
        show: ()=>{console.log('show')},
      }
    const columns = [
      { id: 'name', label: intl.formatMessage({ id: 'SEARCHCLIENT.NAME' }), align: 'left',  renderColumn: 'name' },
      { id: 'phone', label: intl.formatMessage({ id: 'SEARCHCLIENT.PHONE' }), align: 'center',  renderColumn: 'phone' },
      { id: 'mobile', label: intl.formatMessage({ id: 'SEARCHCLIENT.MOBILE' }), align: 'center',  renderColumn: 'mobile' },
      { id: 'nationality', label: intl.formatMessage({ id: 'SEARCHCLIENT.NATIONALITY' }), align: 'center',  renderColumn: 'nationality' },
      { id: 'branch', label: intl.formatMessage({ id: 'SEARCHCLIENT.BRANCH' }), align: 'center',  renderColumn: 'branch' },
      {
        id: 'actions',
        label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
        align: 'center',
        renderColumn: (row) => (
            <StyledBox>
                <div className='icon' onClick={() => actions.delete()}>
                    <Delete />
                </div>
                <div className='icon' onClick={() => actions.edit()}>
                    <Edit />
                </div>
                <div className='icon' onClick={() => actions.show()}>
                    <VisibilityOutlinedIcon />
                </div>
            </StyledBox>
        ),
      },
    ];
  return {state, rows, columns,}
}

export default Logic
