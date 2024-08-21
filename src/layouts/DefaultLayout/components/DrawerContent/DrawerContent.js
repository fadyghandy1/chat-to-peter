import { Divider, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Logo from '../../../../assets/images/Dubai_logo-1-1-1_ab6ffcbb-fc57-438d-ae7b-4bfd451275a1_400x.webp'
import MenuIcon from '@mui/icons-material/Menu'
import { AccordionDetailsRoot, DrawerHeader, ListRoot, NavLinkIconMain, StyledAccordion, StyledAccordionSummary } from './DrawerContent.styles'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { shallowEqual, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import modulePages from '../../ModulePages'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

const DrawerContent = ({ className, handleDrawerClose }) => {
  const [expanded, setExpanded] = useState(false)
  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  const intl = useIntl()

  const modules = useMemo(() => modulePages(intl), [])
  return (
    <div className={className}>
      <div style={{ overflowX: 'hidden' }}>
        <DrawerHeader>
          <div className="drawerHeaderLogo">
            <img src={Logo} alt="" />
            {/* <Typography variant={'h1'}>Traffic Management System</Typography> */}
          </div>
          <IconButton onClick={handleDrawerClose} className="drawerHeaderBtn">
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
      </div>
      <Divider />

      {modules.map((item, index) =>
        item?.pages && item?.pages.length > 0 ? (
          <React.Fragment key={index}>
            <StyledAccordion expanded={expanded === index} onChange={handleChangeAccordion(index)}>
              <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${index}-content`} id={`${index}-header`}>
                {item.icon && (
                  <ListItemIcon className="itemIconMain">
                    <NavLinkIconMain className="navLinkIcon">{item.icon}</NavLinkIconMain>
                  </ListItemIcon>
                )}

                {item.name}
              </StyledAccordionSummary>
              <AccordionDetailsRoot>
                <ListRoot component="nav" aria-label="navigation links">
                  {item.pages.map((child, i) => (
                    <ListItem className="listItem" button component={NavLink} to={child.to} key={i}>
                      <ListItemIcon className="itemIcon">
                        <NavLinkIconMain className="navLinkIcon">{child.icon}</NavLinkIconMain>
                      </ListItemIcon>

                      <ListItemText className="listItemTextRoot">{child.name}</ListItemText>
                    </ListItem>
                  ))}
                </ListRoot>
              </AccordionDetailsRoot>
            </StyledAccordion>
          </React.Fragment>
        ) : (
          <ListRoot component="nav" aria-label="navigation links" key={index} className="mainLink">
            <ListItem className="listItem" button component={NavLink} to={item.to}>
              <ListItemIcon>{item.icon ? <NavLinkIconMain className="navLinkIcon">{item.icon}</NavLinkIconMain> : <NavLinkIconMain className="navLinkIcon">fiber_manual_record</NavLinkIconMain>}</ListItemIcon>

              <ListItemText>{item.name}</ListItemText>
            </ListItem>
          </ListRoot>
        )
      )}
    </div>
  )
}

export default DrawerContent
