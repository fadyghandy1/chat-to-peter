import { Box, Grid } from '@mui/material'
import Logic from './Logic'
import AppField from '../../../../../../../components/common/AppField/AppField'
import FormikAutocomplete from '../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import { StyledBox } from '../../wizard.styles'
import MaskedField from '../../../../../../../components/common/MaskedField/MaskedField'
import ConfirmationDialog from '../../../../../../../components/common/ConfirmationDialog/ConfirmationDialog.styles'

function OpponentDetails({ setFieldValue, errors }) {
  const { cities, clientTypes, nationalities, handleConfirm, handleCancel, setAgainstNameArInputValue, setAgainstNameEnInputValue, intl, isEnglish, showDialog } = Logic({ setFieldValue })

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDOPPONENT.OPPONENT_DETAILS' })}</div>

      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {/* <AppField name="nameAr" label={intl.formatMessage({ id: 'ADDOPPONENT.NAME_AR' })} helperText={errors.nameAr} className="required" /> */}
          <AppField
            component={MaskedField}
            name="nameAr"
            label={intl.formatMessage({ id: 'ADDOPPONENT.NAME_AR' })}
            helperText={errors.nameAr}
            className="required"
            mask={/^[\u0600-\u06FF0-9 ]+$/}
            // unmask={'typed'}

            onAccept={(value, mask) => {
              setAgainstNameArInputValue(value.trim())
              setFieldValue('nameAr', value.trim())
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {/* <AppField name="nameEn" label={intl.formatMessage({ id: 'ADDOPPONENT.NAME_EN' })} helperText={errors.nameEn} className="required" /> */}
          <AppField
            component={MaskedField}
            name="nameEn"
            label={intl.formatMessage({ id: 'ADDOPPONENT.NAME_EN' })}
            helperText={errors.nameEn}
            className="required"
            mask={/^[a-zA-Z0-9\s]+$/}
            // unmask={'typed'}
            onAccept={(value, mask) => {
              setAgainstNameEnInputValue(value.trim())
              setFieldValue('nameEn', value.trim())
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="mobile" label={intl.formatMessage({ id: 'ADDOPPONENT.MOBILE' })} helperText={errors.mobile} type="tel" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="telephone" label={intl.formatMessage({ id: 'ADDOPPONENT.TELEPHONE' })} helperText={errors.telephone} type="tel" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="email" label={intl.formatMessage({ id: 'ADDOPPONENT.EMAIL' })} helperText={errors.email} type="email" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="passport" label={intl.formatMessage({ id: 'ADDOPPONENT.PASSPORT' })} helperText={errors.passport} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField disabled={false} name="nationality" label={intl.formatMessage({ id: 'ADDOPPONENT.NATIONALITY' })} component={FormikAutocomplete} options={nationalities} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="postCode" label={intl.formatMessage({ id: 'ADDOPPONENT.POSTCODE' })} helperText={errors.postCode} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField disabled={false} name="city" label={intl.formatMessage({ id: 'ADDOPPONENT.CITY' })} component={FormikAutocomplete} options={cities} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="fax" label={intl.formatMessage({ id: 'ADDOPPONENT.FAX' })} helperText={errors.fax} type="tel" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="street" label={intl.formatMessage({ id: 'ADDOPPONENT.STREET' })} helperText={errors.street} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="apartment" label={intl.formatMessage({ id: 'ADDOPPONENT.APARTMENT' })} helperText={errors.apartment} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="buildingNu" label={intl.formatMessage({ id: 'ADDOPPONENT.BUILDINGNUM' })} helperText={errors.buildingNu} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField disabled={false} name="clientType" label={intl.formatMessage({ id: 'ADDOPPONENT.CLIENT_TYPE' })} component={FormikAutocomplete} options={clientTypes} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {/* <AppField name="localIdentificationNumber" label={intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' })} helperText={errors.localIdentificationNumber} /> */}
          <AppField
            component={MaskedField}
            name="localIdentificationNumber"
            label={intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' })}
            mask="000-0000-0000000-0"
            // unmask={'typed'}
            placeholder="000-0000-0000000-0"
            lazy={true}
            onAccept={(value, mask) => {
              setFieldValue('localIdentificationNumber', value)
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="reference" label={intl.formatMessage({ id: 'ADDOPPONENT.REFERENCE' })} helperText={errors.reference} />
        </Grid>
        <Grid item lg={8} md={8} sm={6} xs={12}>
          <AppField name="address" className="required" label={intl.formatMessage({ id: 'ADDOPPONENT.Address' })} helperText={errors.address} />
        </Grid>
      </Grid>
      <ConfirmationDialog onClick={handleConfirm} onClose={handleCancel} visible={showDialog} title={intl.formatMessage({ id: 'Validation.NAME.EXIST' })}>
        {intl.formatMessage({ id: 'Validation.NAME.CONTINUE' })}
      </ConfirmationDialog>
    </StyledBox>
  )
}

export default OpponentDetails
