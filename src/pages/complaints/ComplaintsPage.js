import { Navigate, Routes, Route, Outlet } from "react-router-dom";
import { AddComplaint } from "./pages/AddComplaint/AddComplaint";
import { SearchComplaint } from "./pages/SearchComplaint/SearchComplaint";

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

const ComplaintsPage = () => (
  <Routes>
    <Route
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="add-complaint"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>Add</PageTitle> */}
            <AddComplaint />
          </>
        }
      />
      <Route
        path="search-complaint"
        element={
          <>
            {/* <PageTitle breadcrumbs={profileBreadCrumbs}>search</PageTitle> */}
            <SearchComplaint />
          </>
        }
      />
    </Route>
  </Routes>
);

export default ComplaintsPage;
