import { Box, Grid } from '@mui/material'
import AppField from '../../../../../../components/common/AppField/AppField.styles'
import Logic from './logic'
import FormikAutocomplete from '../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import MaskedField from '../../../../../../components/common/MaskedField/MaskedField'
import { modes } from '../../../../../../components/common/wizard'
import { StyledBox } from '../../../../../../assets/styles/components.styles'
import ConfirmationDialog from '../../../../../../components/common/ConfirmationDialog/ConfirmationDialog.styles'

function ClientDetails({ setFieldValue, errors, mode, corporate = false }) {
  const { clientType, branches, nationalities, companies, generateUserName, setClientArInputValue, setClientNameEnInputValue, handleConfirm, handleCancel, showDialog, intl, isEnglish } = Logic({ setFieldValue, corporate })

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDCLIENT.CLIENT_DETAILS' })}</div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppField
            component={MaskedField}
            name="clientArName"
            label={intl.formatMessage({ id: 'ADDCLIENT.NAME_AR' })}
            mask={/^[\u0600-\u06FF0-9 ]+$/}
            ///
            // unmask={'typed'}

            onAccept={(value, mask) => {
              setClientArInputValue(value.trim())
              setFieldValue('clientArName', value.trim())
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <AppField
            component={MaskedField}
            name="clientEnName"
            label={intl.formatMessage({ id: 'ADDCLIENT.NAME_EN' })}
            mask={/^[a-zA-Z0-9\s]+$/}
            // unmask={'typed'}

            onAccept={(value, mask) => {
              setClientNameEnInputValue(value.trim())
              setFieldValue('clientEnName', value)
              if (mode === modes.ADD) {
                setFieldValue('credentialUserName', generateUserName(value?.trim()))
              }
            }}
          />
        </Grid>
        {corporate && (
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <AppField name="branchId" disabled={false} label={intl.formatMessage({ id: 'ADDCLIENT.BRANCH' })} component={FormikAutocomplete} options={branches} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" helperText={errors.branchId} isOptionEqualToValue={(option, value) => option.id == value.id} />
          </Grid>
        )}
        {corporate && (
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <AppField name="company" disabled={false} label={intl.formatMessage({ id: 'ADDCLIENT.Company' })} component={FormikAutocomplete} options={companies} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" helperText={errors.company} isOptionEqualToValue={(option, value) => option.id == value.id} />
          </Grid>
        )}
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="telephoneNumber" label={intl.formatMessage({ id: 'ADDCLIENT.TELEPHONE' })} helperText={errors.telephoneNumber} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="fax" label={intl.formatMessage({ id: 'ADDCLIENT.FAX' })} helperText={errors.fax} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="mobileNumber" label={intl.formatMessage({ id: 'ADDCLIENT.MOBILE' })} helperText={errors.mobileNumber} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="nationalityId" label={intl.formatMessage({ id: 'ADDCLIENT.NATIONALITY' })} disabled={false} component={FormikAutocomplete} options={nationalities} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" isOptionEqualToValue={(option, value) => option.id == value.id} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="postalCode" label={intl.formatMessage({ id: 'ADDCLIENT.POSTCODE' })} helperText={errors.postalCode} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="cityId" label={intl.formatMessage({ id: 'ADDCLIENT.CITY' })} disabled={false} component={FormikAutocomplete} options={branches} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" helperText={errors.cityId} isOptionEqualToValue={(option, value) => option.id == value.id} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="street" label={intl.formatMessage({ id: 'ADDCLIENT.STREET' })} helperText={errors.street} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="apartmentNumber" label={intl.formatMessage({ id: 'ADDCLIENT.APARTMENT' })} helperText={errors.apartmentNumber} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="buildingNumber" label={intl.formatMessage({ id: 'ADDCLIENT.BUILDINGNUM' })} helperText={errors.buildingNumber} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField type="email" name="email" label={intl.formatMessage({ id: 'ADDCLIENT.EMAIL' })} helperText={errors.email} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField type="email" name="email2" label={intl.formatMessage({ id: 'ADDCLIENT.EMAIL2' })} helperText={errors.email2} />
        </Grid>

        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField disabled={false} name="clientTypeId" label={intl.formatMessage({ id: 'ADDCLIENT.CLIENT' })} component={FormikAutocomplete} options={clientType} optionLabel={isEnglish ? 'descriptionEn' : 'descriptionAr'} optionKey="id" idPropName="id" helperText={errors.clientTypeId} isOptionEqualToValue={(option, value) => option.id == value.id} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          {/* <AppField name="valueOfWorkingHour" label={intl.formatMessage({ id: 'ADDCLIENT.VOWH' })}
           helperText={errors.valueOfWorkingHour} /> */}
          <AppField
            component={MaskedField}
            name="valueOfWorkingHour"
            label={intl.formatMessage({ id: 'ADDCLIENT.VOWH' })}
            mask={[
              {
                mask: Number, // enable number mask
                scale: 2, // digits after point, 0 for integers
                thousandsSeparator: '', // any single char
                padFractionalZeros: false, // if true, then pads zeros at end to the length of scale
                normalizeZeros: true, // appends or removes zeros at ends
                radix: ',', // fractional delimiter
                mapToRadix: ['.'], // symbols to process as radix}
              },
            ]}
            unmask={'typed'}
            onAccept={(value, mask) => {
              setFieldValue('valueOfWorkingHour', value)
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="referenceNumber" label={intl.formatMessage({ id: 'ADDCLIENT.REFERENCENUMBER' })} helperText={errors.referenceNumber} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField
            component={MaskedField}
            name="localIdentificationNumber"
            label={intl.formatMessage({ id: 'ADDCLIENT.LOCALNUMBER' })}
            mask="000-0000-0000000-0"
            placeholder="000-0000-0000000-0"
            lazy={true}
            // unmask={'typed'}
            onAccept={(value, maskRef) => {
              setFieldValue('localIdentificationNumber', value)
            }}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="passportNumber" label={intl.formatMessage({ id: 'ADDCLIENT.PASSPORTNUMBER' })} helperText={errors.passportNumber} />
        </Grid>

        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="attachments" disabled component={FileUpload} title="Attachments" setFieldValue={setFieldValue} errorMessage={errors.attachments ? errors.attachments : undefined} />
        </Grid> */}
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField name="companyName" label={intl.formatMessage({ id: 'ADDCLIENT.Company' })} helperText={errors.company} />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField multiline minRows={2} maxRows={4} name="address" label={intl.formatMessage({ id: 'ADDCLIENT.Address' })} helperText={errors.address} />
        </Grid>
      </Grid>
      <ConfirmationDialog onClick={handleConfirm} onClose={handleCancel} visible={showDialog} title={intl.formatMessage({ id: 'Validation.NAME.EXIST' })}>
        {intl.formatMessage({ id: 'Validation.NAME.CONTINUE' })}
      </ConfirmationDialog>
    </StyledBox>
  )
}

export default ClientDetails
