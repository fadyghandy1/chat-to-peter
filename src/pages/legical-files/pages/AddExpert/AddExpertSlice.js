import { generateSlice } from '../../../../store/GenerateSlice'

export const AddExpertSlice = generateSlice({
  name: 'addClient',
  initialState: {
    attachmentsValues: {
      documentType: '',
      date: '',
      documentName: '',
      document: '',
    },
    contactsValues: {
      contactName: '',
      contactJob: '',
      contactPhone: '',
      contactEmail:'',
      contactUserName: '',
      contactPassword: ''
    }
  },
})
