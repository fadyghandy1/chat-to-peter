import { Box, Grid } from '@mui/material'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../../components/common/AppField/AppField'
import Logic from './logic'
import { StyledBox } from '../../wizard.styles'

function ClientDetails({ errors }) {
  // const { serviceCenterOptions, selectedBranch, setSelectedBranch, state } = Logic(values)
  // console.log('selectedBranch', selectedBranch)
  const intl = useIntl()
  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCLIENT.CLIENT_DETAILS' })}</div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppField name="nameAr" label={intl.formatMessage({ id: 'ADDCLIENT.NAME_AR' })} helperText={errors.nameAr} />
        </Grid>
        <Grid item xs={12}>
          <AppField name="nameEn" label={intl.formatMessage({ id: 'ADDCLIENT.NAME_EN' })} helperText={errors.nameEn} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="branch" label={intl.formatMessage({ id: 'ADDCLIENT.BRANCH' })} helperText={errors.branch} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="telephone" label={intl.formatMessage({ id: 'ADDCLIENT.TELEPHONE' })} helperText={errors.telephone} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="fax" label={intl.formatMessage({ id: 'ADDCLIENT.FAX' })} helperText={errors.fax} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="mobile" label={intl.formatMessage({ id: 'ADDCLIENT.MOBILE' })} helperText={errors.mobile} />
        </Grid>
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="nationality" label={intl.formatMessage({id: 'ADDCLIENT.NATIONALITY'})} helperText={errors.nationality} />
        </Grid> */}
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="postCode" label={intl.formatMessage({ id: 'ADDCLIENT.POSTCODE' })} helperText={errors.postCode} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="city" label={intl.formatMessage({ id: 'ADDCLIENT.CITY' })} helperText={errors.city} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="street" label={intl.formatMessage({ id: 'ADDCLIENT.STREET' })} helperText={errors.street} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="apartment" label={intl.formatMessage({ id: 'ADDCLIENT.APARTMENT' })} helperText={errors.apartment} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="buildingNu" label={intl.formatMessage({ id: 'ADDCLIENT.BUILDINGNUM' })} helperText={errors.buildingNu} />
        </Grid>
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="email1" label={intl.formatMessage({id: 'ADDCLIENT.EMAIL'})} helperText={errors.email1} />
        </Grid> */}
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="email2" label={intl.formatMessage({id: 'ADDCLIENT.EMAIL2'})} helperText={errors.email2} />
        </Grid> */}
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="client" label={intl.formatMessage({id: 'ADDCLIENT.CLIENT'})} helperText={errors.client} />
        </Grid> */}
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="valueOfWH" label="Value Of Working Hour" helperText={errors.valueOfWH} />
        </Grid> */}
        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="attachments" disabled component={FileUpload} title="Attachments" setFieldValue={setFieldValue} errorMessage={errors.attachments ? errors.attachments : undefined} />
        </Grid> */}
        {/* <Grid item xs={12}>
          <AppField name="company" label="Company" helperText={errors.company} />
        </Grid> */}
        <Grid item xs={12}>
          <AppField multiline rows={2} maxRows={4} name="address" label={intl.formatMessage({ id: 'ADDCLIENT.Address' })} helperText={errors.address} />
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default ClientDetails
