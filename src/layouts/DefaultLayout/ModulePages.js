import { Dashboard, Group, PersonAdd, PersonSearch, GroupAdd, Search, AddBusiness, AttachFile, PostAdd, ContentPasteSearch, CalendarViewMonth, Balance, CreateNewFolder, NotificationImportant, AddAlert, FindInPage, Today, Addchart, Article, Summarize, Schedule, Equalizer, ShowChart, TextSnippet, Person, Settings, VpnKey, Backup, Gavel, Feed, Photo } from '@mui/icons-material'
const modulePages = (intl) => {
  return [
    {
      name: intl.formatMessage({ id: 'MENU.DASHBOARD' }),
      icon: <Dashboard />,
      to: '/dashboard',
    },
    {
      name: intl.formatMessage({ id: 'MENU.CLIENTSANDAGAINST' }),
      icon: <Group />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.ADDCLIENT' }),
          icon: <PersonAdd />,
          to: '/clients-againsts/add-client',
        },
        {
          name: intl.formatMessage({ id: 'ADD.COPRORATE' }),
          icon: <AddBusiness />,
          to: '/clients-againsts/add-client-corporate',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHCLIENT' }),
          icon: <PersonSearch />,
          to: '/clients-againsts/search-client',
        },
        {
          name: intl.formatMessage({ id: 'MENU.ADDAGAINST' }),
          icon: <GroupAdd />,
          to: '/clients-againsts/add-against',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHAGAINST' }),
          icon: <Search />,
          to: '/clients-againsts/search-against',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.LEGICALFILES' }),
      icon: <AttachFile />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.ADDFILE' }),
          icon: <PostAdd />,
          to: '/legal-files/add-file',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHFILE' }),
          icon: <ContentPasteSearch />,
          to: '/legal-files/search-file',
        },
        {
          name: intl.formatMessage({ id: 'MENU.HEARINGSROLLSCHEDULE' }),
          icon: <CalendarViewMonth />,
          to: '/legal-files/hearings-roll-schedule',
        },
        {
          name: intl.formatMessage({ id: 'MENU.ADMINSCHEDULE' }),
          icon: <CalendarViewMonth />,
          to: '/legal-files/administrative-schedule',
        },
        {
          name: intl.formatMessage({ id: 'MENU.ADDEXPERT' }),
          icon: <PersonAdd />,
          to: '/legal-files/add-expert',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHEXPERT' }),
          icon: <PersonSearch />,
          to: '/legal-files/search-expert',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.LEGALCONSULTANTING' }),
      icon: <Balance />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.ADDCONSULTANT' }),
          icon: <CreateNewFolder />,
          to: '/legal-consultanting/add-consultant',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHCONSULTANT' }),
          icon: <ContentPasteSearch />,
          to: '/legal-consultanting/search-consultant',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.COMPLAINTS' }),
      icon: <NotificationImportant />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.ADDCOMPLAINTS' }),
          icon: <AddAlert />,
          to: '/complaints/add-complaint',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHCOMPLAINTS' }),
          icon: <FindInPage />,
          to: '/complaints/search-complaint',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.TIMESHEET' }),
      icon: <Today />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.ADDTIMESHEET' }),
          icon: <Addchart />,
          to: '/timesheet/add-timesheet',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHTIMESHEET' }),
          icon: <Search />,
          to: '/timesheet/search-timesheet',
        },
        {
          name: intl.formatMessage({ id: 'MENU.FOLLOWUPREPORT' }),
          icon: <Article />,
          to: '/timesheet/follow-up-report',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.REPORTS' }),
      icon: <Article />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.CASESREPORTS' }),
          icon: <Summarize />,
          to: '/reports/cases-reports',
        },
        {
          name: intl.formatMessage({ id: 'MENU.HEARINGROLLREPORTS' }),
          icon: <Summarize />,
          to: '/reports/hearing-roll-reports',
        },
        {
          name: intl.formatMessage({ id: 'MENU.EXPRTHEARINGSROLLSCHEDULE' }),
          icon: <Schedule />,
          to: '/reports/expert-hearings-roll-schedule',
        },
        {
          name: intl.formatMessage({ id: 'MENU.STATISTICIANTYPE' }),
          icon: <Equalizer />,
          to: '/reports/statistician-type',
        },
        {
          name: intl.formatMessage({ id: 'MENU.STATISTICIANSTATUS' }),
          icon: <ShowChart />,
          to: '/reports/statistician-status',
        },
        {
          name: intl.formatMessage({ id: 'MENU.DETAILEDREPORTFILE' }),
          icon: <TextSnippet />,
          to: '/reports/detailed-report-file',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.USERS' }),
      icon: <Person />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.ADDUSER' }),
          icon: <PersonAdd />,
          to: '/users/add-user',
        },
        {
          name: intl.formatMessage({ id: 'MENU.SEARCHUSER' }),
          icon: <PersonSearch />,
          to: '/users/search-user',
        },
      ],
    },
    {
      name: intl.formatMessage({ id: 'MENU.SETTINGS' }),
      icon: <Settings />,
      pages: [
        {
          name: intl.formatMessage({ id: 'MENU.SYSTEMCODES' }),
          icon: <VpnKey />,
          to: '/settings/system-codes',
        },
        {
          name: intl.formatMessage({ id: 'MENU.LOOKUPS' }),
          icon: <Backup />,
          to: '/settings/lookups',
        },
        {
          name: intl.formatMessage({ id: 'MENU.JUDGEMENTS' }),
          icon: <Gavel />,
          to: '/settings/judgements',
        },
        {
          name: intl.formatMessage({ id: 'MENU.BACkUP' }),
          icon: <Backup />,
          to: '/settings/backup',
        },
        {
          name: intl.formatMessage({ id: 'MENU.LAWFIRMDATA' }),
          icon: <Feed />,
          to: '/settings/law-firm-data',
        },
        {
          name: intl.formatMessage({ id: 'MENU.IMAGECONFIGURATION' }),
          icon: <Photo />,
          to: '/settings/image-configuration',
        },
      ],
    },
  ]
}
export default modulePages
