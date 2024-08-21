import { Grid } from '@mui/material'
import FormikAutocomplete from '../../../../../../../components/common/FormikAutocomplete/FormikAutocomplete'
import Logic from './Logic'
import { StyledBox } from '../../wizard.styles'
import { useIntl } from 'react-intl'
import AppField from '../../../../../../../components/common/AppField/AppField'

const Teamwork = () => {
  const { pleadingLawyers, cosultants, administrativeTaxpayers, secretaryList } = Logic()
  const intl = useIntl()

  return (
    <StyledBox p={4}>
      <div className="stepsTitle">{intl.formatMessage({ id: 'ADDFILE.TEAMWORK' })}</div>

      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField
            name="cosultants"
            // className="required"
            label={intl.formatMessage({ id: 'ADDFILE.CONSULTANT' })}
            component={FormikAutocomplete}
            options={cosultants}
            optionKey="title"
            idPropName="title"
            isOptionEqualToValue={(option, value) => option.title == value.title}
            optionLabel="title"
            checkboxOption
            multiple
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField
            name="pleadingLawyers"
            // className="required"
            label={intl.formatMessage({ id: 'ADDFILE.PLEADINGLAWER' })}
            component={FormikAutocomplete}
            options={pleadingLawyers}
            optionKey="title"
            idPropName="title"
            isOptionEqualToValue={(option, value) => option.title == value.title}
            optionLabel="title"
            checkboxOption
            multiple
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField
            name="administrativeTaxpayers"
            // className="required"
            label={intl.formatMessage({ id: 'ADDFILE.ADMINISTRATIVETAXPAYER' })}
            component={FormikAutocomplete}
            options={administrativeTaxpayers}
            optionKey="title"
            idPropName="title"
            isOptionEqualToValue={(option, value) => option.title == value.title}
            optionLabel="title"
            checkboxOption
            multiple
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <AppField
            name="secretary"
            // className="required"
            label={intl.formatMessage({ id: 'ADDFILE.SECRETARY' })}
            component={FormikAutocomplete}
            options={secretaryList}
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

export default Teamwork
