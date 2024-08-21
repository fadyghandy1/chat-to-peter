import * as Yup from 'yup'
import Delete from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'


export const attachmentsInputsvalidateSchema = Yup.object().shape({
  //   nameAr: Yup.string().nullable().required('This field is required'),
})

export const attachmentsTableColumns = (actions) => [
  { id: 'documentType', label: 'Document Type', align: 'center', renderColumn: 'documentType' },
  { id: 'date', label: 'Date', align: 'center', renderColumn: 'date' },
  { id: 'documentName', label: 'Document Name', align: 'center', renderColumn: 'documentName' },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
    renderColumn: (row) => (
      <>
        <div onClick={() => actions.deleteSelectedDocument(row)}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedDocument(row)}>
          <Edit />
        </div>
      </>
    ),
  },]

  export const contactsTableColumns = (actions)=> [ 
  { id: 'contactName', label: 'Name', align: 'center', renderColumn: 'contactName' },
  // { id: 'contactJob', label: 'Job', align: 'center', renderColumn: 'contactJob' },
  { id: 'contactPhone', label: 'Phone', align: 'center', renderColumn: 'contactPhone' },
  { id: 'contactEmail', label: 'Email', align: 'center', renderColumn: 'contactEmail' },
  // { id: 'contactUserName', label: 'UserName', align: 'center', renderColumn: 'contactUserName' },
  // { id: 'contactPassword', label: 'Password', align: 'center', renderColumn: 'contactPassword' },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
    renderColumn: (row) => (
      <>
      
      <div onClick={() => actions.deleteSelectedDocument(row)}>
        <Delete />
      </div>
      <div onClick={() => actions.editSelectedDocument(row)}>
        <Edit />
      </div>
      </>
    ),
  },]
