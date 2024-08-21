import { Checkbox, Grid } from '@mui/material'
import FormikAutocomplete from '../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../../components/common/AppField/AppField'

const Parties = () => {
  const { againsts, clients } = Logic()
  const intl = useIntl()

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.PARTIES' })}</div>

      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <AppField
            name="clients"
            // className="required"
            label={intl.formatMessage({ id: 'ADDFILE.CLIENTS' })}
            component={FormikAutocomplete}
            options={clients}
            optionKey="title"
            idPropName="title"
            isOptionEqualToValue={(option, value) => option.title == value.title}
            optionLabel="title"
            checkboxOption
            multiple
          />
        </Grid>
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <AppField
            name="againsts"
            // className="required"
            label={intl.formatMessage({ id: 'ADDFILE.AGAINSTS' })}
            component={FormikAutocomplete}
            options={againsts}
            optionKey="title"
            idPropName="title"
            isOptionEqualToValue={(option, value) => option.title == value.title}
            optionLabel="title"
            checkboxOption
            multiple
          />
        </Grid>
      </Grid>
    </StyledBox>
  )
}

export default Parties
