import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { AddFile } from "./pages/AddFile/AddFile";
import { SearchFile } from "./pages/SearchFile/SearchFile";
import { HearingsRollSchedule } from "./pages/HearingsRollSchedule/HearingsRollSchedule";
import { AdministrativeSchedule } from "./pages/AdministrativeSchedule/AdministrativeSchedule";
import  AddExpert  from "./pages/AddExpert/AddExpert";
import { SearchExpert } from "./pages/SearchExpert/SearchExpert";

// const profileBreadCrumbs: Array<PageLink> = [
//   {
//     title: "Profile",
//     path: "/crafted/pages/profile/overview",
//     isSeparator: false,
//     isActive: false,
//   },
//   {
//     title: "",
//     path: "",
//     isSeparator: true,
//     isActive: false,
//   },
// ];

const LegicalFilesPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="add-file"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <AddFile />
          </>
        }
      />
      <Route
        path="search-file"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <SearchFile />
          </>
        }
      />
      <Route
        path="hearings-roll-schedule"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <HearingsRollSchedule />
          </>
        }
      />
      <Route
        path="administrative-schedule"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <AdministrativeSchedule />
          </>
        }
      />
      <Route
        path="add-expert"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <AddExpert />
          </>
        }
      />
      <Route
        path="search-expert"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <SearchExpert />
          </>
        }
      />
    </Route>
  </Routes>
);

export default LegicalFilesPage;
