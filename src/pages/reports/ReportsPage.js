import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { CasesReports } from "./pages/CasesReports/CasesReports";
import { HearingRollReports } from "./pages/HearingRollReports/HearingRollReports";
import { ExpertHearingsRollSchedule } from "./pages/ExpertHearingsRollSchedule/ExpertHearingsRollSchedule";
import { StatisticianType } from "./pages/StatisticianType/StatisticianType";
import { StatisticianStatus } from "./pages/StatisticianStatus/StatisticianStatus";
import { DetailedReportFile } from "./pages/DetailedReportFile/DetailedReportFile";

const ReportsPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="cases-reports"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <CasesReports />
          </>
        }
      />
      <Route
        path="hearing-roll-reports"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <HearingRollReports />
          </>
        }
      />
      <Route
        path="expert-hearings-roll-schedule"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <ExpertHearingsRollSchedule />
          </>
        }
      />
      <Route
        path="statistician-type"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <StatisticianType />
          </>
        }
      />
      <Route
        path="statistician-status"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <StatisticianStatus />
          </>
        }
      />
      <Route
        path="detailed-report-file"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <DetailedReportFile />
          </>
        }
      />
    </Route>
  </Routes>
);

export default ReportsPage;
