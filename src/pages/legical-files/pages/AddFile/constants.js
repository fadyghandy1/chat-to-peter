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
export const attachmentsTableColumns = (intl) => [
  // { id: 'attachmentType', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' }), align: 'center', renderColumn: 'attachmentTypeId' },
  // { id: 'attachmentEndDate', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTENDDATE' }), align: 'center', renderColumn: 'expiryDate' },
  // { id: 'attachmentName', label: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' }), align: 'center', renderColumn: 'name' },
  // { id: 'attachmentName', label: intl.formatMessage({ id: 'ADDFILE.CASENUMBER' }), align: 'center', renderColumn: 'caseNumber' },
  { name: 'attachmentType', title: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTTYPE' }) },
  { name: 'expiryDate', title: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTENDDATE' }) },
  { name: 'name', title: intl.formatMessage({ id: 'ADDFILE.ATTACHMENTNAME' }) },
  { name: 'caseNumber', title: intl.formatMessage({ id: 'ADDFILE.CASENUMBER' }) },
  { name: 'actions', title: '' },
]
// console.log(clientCharacteristic, 'fffff')
export const stagesTableColumns = (actions, intl) => [
  { id: 'caseNumber', label: intl.formatMessage({ id: 'ADDFILE.CASENUMBER' }), align: 'center', renderColumn: 'caseNumber' },
  { id: 'caseStage', label: intl.formatMessage({ id: 'ADDFILE.CASESTAGE' }), align: 'center', renderColumn: 'caseStage.descriptionEn' },
  // { id: 'clientCapacity', label: intl.formatMessage({ id: 'ADDFILE.CLIENTCAPACITY' }), align: 'center', renderColumn: 'clientCharacteristic.descriptionEn' },
  {
    id: 'opponentName',
    label: intl.formatMessage({ id: 'ADDCLIENT.OPENATNAME' }),
    align: 'center',
    renderColumn: (row) => {
      console.log(intl.locale, 'ffffady intl')
      return <div>{row['casesAgainsts'] && row['casesAgainsts'].flatMap((data) => (intl.locale == 'ar' ? data.nameInArabic : data.nameInEnglish)).join('   ,  ')}</div>
    },
  },
  {
    id: 'clientName',
    label: intl.formatMessage({ id: 'ADDCLIENT.CLIENTNAME' }),
    align: 'center',
    renderColumn: (row) => {
      return <div>{row['casesClients'] && row['casesClients'].flatMap((data) => (intl.locale == 'ar' ? data.nameInArabic : data.nameInEnglish)).join('   ,  ')}</div>
    },
  },
  { id: 'directorate', label: intl.formatMessage({ id: 'ADDFILE.DIRECTORATE' }), align: 'center', renderColumn: 'caseDirectorate.descriptionEn' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteSelectedDocument(row)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedDocument(row)}>
          <Edit />
        </div>
      </div>
    ),
  },
]

export const hearingsTableColumns = (actions, intl) => [
  { id: 'caseNumber', label: intl.formatMessage({ id: 'ADDFILE.CASENUMBER' }), align: 'center', renderColumn: 'caseDetails.caseNumber' },
  { id: 'hearingType', label: intl.formatMessage({ id: 'ADDFILE.HEARINGTYPE' }), align: 'center', renderColumn: 'hearingType.descriptionEn' },
  { id: 'nextHearingDate', label: intl.formatMessage({ id: 'ADDFILE.NEXTHEARINGDATE' }), align: 'center', renderColumn: (row) => (row.nextHearingDate ? dayjs(new Date(row.nextHearingDate)).format('MM/DD/YYYY') : '') },
  { id: 'hallNo', label: intl.formatMessage({ id: 'ADDFILE.HALLNO' }), align: 'center', renderColumn: 'hallNumber' },
  { id: 'directorate', label: intl.formatMessage({ id: 'ADDFILE.DIRECTORATE' }), align: 'center', renderColumn: 'caseDetails.caseDirectorate.descriptionEn' },
  { id: 'currentDecisionEn', label: intl.formatMessage({ id: 'ADDFILE.CURRENTDECISION_EN' }), align: 'center', renderColumn: 'hearingDesigionEn' },
  {
    id: 'actions',
    label: intl.formatMessage({ id: 'SEARCHCLIENT.ACTIONS' }),
    align: 'center',
    renderColumn: (row, index) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div onClick={() => actions.deleteSelectedDocument(row, index)} style={{ color: 'red' }}>
          <Delete />
        </div>
        <div onClick={() => actions.editSelectedHearing(row)}>
          <Edit />
        </div>
      </div>
    ),
  },
]
