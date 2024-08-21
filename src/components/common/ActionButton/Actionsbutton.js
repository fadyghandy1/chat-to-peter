import React, { useState } from 'react'
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material'
// import { makeStyles } from '@material-ui/core'
// import { THEME_CONTATANS } from '../../styles/constants'

// const useStyles = makeStyles((theme) => ({
//   viewIcon: {
//     color: 'white',
//     cursor: 'pointer',
//   },
//   speedDial: {
//     position: 'relative',

//     '&.MuiSpeedDial-directionLeft .MuiSpeedDial-actions': {
//       position: 'absolute',
//       right: theme.spacing(9),
//       paddingRight: 0,
//       backgroundColor: 'white',
//       marginRight: 0,
//       [theme.breakpoints.down('sm')]: {
//         right: theme.spacing(1),
//         position: 'relative',
//         flexWrap: 'wrap',
//         flex: 1,
//       },
//     },
//     '&.MuiSpeedDial-directionLeft .MuiSpeedDial-actionsClosed': {
//       display: 'none',
//     },
//   },
//   fab: {
//     backgroundColor: THEME_CONTATANS.blue,
//     width: 40,
//     height: 40,
//     margin: '10px 0px',
//     '&:hover': {
//       backgroundColor: THEME_CONTATANS.blue,
//     },
//   },
// }))

const Actionsbutton = ({ actions = [], className }) => {
  // const classes = useStyles()

  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen((prevState) => !prevState)
  }
  return (
    <>
      <SpeedDial onClick={handleClick} ariaLabel={`SpeedDial`} className={className} icon={<SpeedDialIcon className={'viewIcon'} />} open={open} direction={'left'} classes={{ fab: 'fab' }}>
        {actions.map((action, index) => (
          <SpeedDialAction
            key={index}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement="top"
            onClick={(e) => {
              e.preventDefault()
              action.onClick()
            }}
          />
        ))}
      </SpeedDial>
    </>
  )
}

export default Actionsbutton
