import { Grid } from '@mui/material'
import StyledAppField from '../../../../../../../components/common/AppField/AppField'
import FormikAutocomplete from '../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import AppDatePicker from '../../../../../../../components/common/AppDatePicker/AppDatePicker'
import AppField from '../../../../../../../components/common/AppField/AppField'
import { useIntl } from 'react-intl'

const ConsultantDetails = () => {
  const { fileTypes, officeBranches, fileCategories, fileStatuses, againsts, clients } = Logic()
  const intl = useIntl()
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCONSULT.CONSULT_DETAILS' })}</div>

      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <StyledAppField name="firstParty" label={intl.formatMessage({ id: 'ADDCONSULT.FIRST_PARTY' })} component={FormikAutocomplete} options={againsts} optionKey="title" idPropName="title" isOptionEqualToValue={(option, value) => option.title == value.title} optionLabel="title" checkboxOption multiple />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField name="secondParty" label={intl.formatMessage({ id: 'ADDCONSULT.SECOND_PARTY' })} component={FormikAutocomplete} options={clients} optionKey="title" idPropName="title" isOptionEqualToValue={(option, value) => option.title == value.title} optionLabel="title" checkboxOption multiple />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField disabled={false} name="fileNo" label={intl.formatMessage({ id: 'ADDCONSULT.FILENO' })} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField disabled={false} name="fileType" label={intl.formatMessage({ id: 'ADDFILE.FILETYPE' })} component={FormikAutocomplete} optionLabel="sTitle" options={fileTypes} getOptionLabel={(option) => (option.sTitle ? option.sTitle : '')} optionKey="sTitle" idPropName="sTitle" isOptionEqualToValue={(option, value) => option.sTitle == value.sTitle} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField disabled={false} name="fileCategory" label={intl.formatMessage({ id: 'ADDFILE.FILECATEGORY' })} component={FormikAutocomplete} options={fileCategories} optionLabel="sTitle" getOptionLabel={(option) => (option.sTitle ? option.sTitle : '')} optionKey="sTitle" idPropName="sTitle" isOptionEqualToValue={(option, value) => option.sTitle == value.sTitle} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField disabled={false} name="officeBranch" label={intl.formatMessage({ id: 'ADDFILE.OFFICEBRANCH' })} component={FormikAutocomplete} options={officeBranches} optionLabel="sTitle" getOptionLabel={(option) => (option.sTitle ? option.sTitle : '')} optionKey="sTitle" idPropName="sTitle" isOptionEqualToValue={(option, value) => option.sTitle == value.sTitle} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField name="clientFileNumber" label={intl.formatMessage({ id: 'ADDFILE.CLIENTFILENUMBER' })} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField component={AppDatePicker} label={intl.formatMessage({ id: 'ADDFILE.RECEIVEFILEDATE' })} name="receiveFileDate" />
        </Grid>
        <Grid item sm={6} xs={12}>
          <StyledAppField disabled={false} name="fileStatus" label={intl.formatMessage({ id: 'ADDFILE.FILESTATUS' })} component={FormikAutocomplete} options={fileStatuses} optionLabel="sTitle" getOptionLabel={(option) => (option.sTitle ? option.sTitle : '')} optionKey="sTitle" idPropName="sTitle" isOptionEqualToValue={(option, value) => option.sTitle == value.sTitle} />
        </Grid>
        <Grid item xs={12}>
          <StyledAppField name="consultationDetails" label={intl.formatMessage({ id: 'ADDCONSULT.CONSULT_DETAILS' })} rows={3} multiline />
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default ConsultantDetails
