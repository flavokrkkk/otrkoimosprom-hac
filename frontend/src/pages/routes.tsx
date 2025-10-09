import RootPage from "./(applicant)/rootPage";
import ErrorPage from "./(applicant)/errorPage";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import AuthPage from "./(auth)/authPage";
import { ERouteNames } from "@/shared";
import { vacancyDetailAction } from "@/entities/vacancy/actions/vacancyDetailAction";
import { routesWithHoc } from "@/shared/lib/utils/routesWithHoc";
import { privatePage } from "@/entities/viewer/lib/hoc/privatePage";

const ApplicantPage = lazy(() => import("@/pages/(applicant)/applicantPage"));
const ProfilePage = lazy(() => import("@/pages/(applicant)/profilePage"));

const AdminPage = lazy(() => import("@/pages/(admin)/adminPage"));

const UniversityPage = lazy(
  () => import("@/pages/(university)/universityPage")
);

const StudentPage = lazy(() => import("@/pages/(university)/studentPage"));
const UniversityInternshipPage = lazy(
  () => import("@/pages/(university)/universityInternshipPage")
);

const CompanyPage = lazy(() => import("@/pages/(company)/companyPage"));
const CandidatesPage = lazy(() => import("@/pages/(company)/candidatesPage"));
const ManagementPage = lazy(() => import("@/pages/(company)/managementPage"));

const VacancyPage = lazy(() => import("@/pages/(applicant)/vacancyPage"));
const InterviewsPage = lazy(() => import("@/pages/(applicant)/interviewsPage"));

const RegisterPage = lazy(() => import("@/pages/(auth)/registerPage"));
const LoginPage = lazy(() => import("@/pages/(auth)/loginPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ERouteNames.EMPTY_ROUTE,
        element: <Outlet />,
        children: [
          ...routesWithHoc(privatePage, [
            {
              path: ERouteNames.EMPTY_ROUTE,
              element: <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />,
            },
            {
              path: ERouteNames.DASHBOARD_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <ApplicantPage />,
                },
                {
                  path: ERouteNames.VACANCY_DETAIL_ROUTE,
                  element: (
                    <Navigate to={ERouteNames.DASHBOARD_ROUTE} replace />
                  ),
                },
                {
                  path: ERouteNames.VACANCY_ROUTE,
                  loader: vacancyDetailAction,
                  element: <VacancyPage />,
                },
                {
                  path: ERouteNames.PROFILE_ROUTE,
                  element: <Outlet />,
                  children: [
                    {
                      path: ERouteNames.EMPTY_ROUTE,
                      element: <ProfilePage />,
                    },
                  ],
                },
                {
                  path: ERouteNames.INTERVIEWS_ROUTE,
                  element: <InterviewsPage />,
                },
              ],
            },
            {
              path: ERouteNames.DASHBOARD_COMPANY_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <CompanyPage />,
                },
                {
                  path: ERouteNames.CANDIDATES_ROUTE,
                  element: <CandidatesPage />,
                },
                {
                  path: ERouteNames.MANAGEMENT_ROUTE,
                  element: <ManagementPage />,
                },
              ],
            },
            {
              path: ERouteNames.DASHBOARD_UNIVERSITY_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <UniversityPage />,
                },
                {
                  path: ERouteNames.STUDENT_ROUTE,
                  element: <StudentPage />,
                },
                {
                  path: ERouteNames.UNIVERSITY_INTERNSHIP_ROUTE,
                  element: <UniversityInternshipPage />,
                },
              ],
            },
            {
              path: ERouteNames.DASHBOARD_ADMIN_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <AdminPage />,
                },
              ],
            },
          ]),
        ],
      },
      {
        path: ERouteNames.AUTH_ROUTE,
        element: <AuthPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ERouteNames.EMPTY_ROUTE,
            element: <Navigate to={ERouteNames.REGISTER_ROUTE} replace />,
          },
          {
            path: ERouteNames.REGISTER_ROUTE,
            element: <RegisterPage />,
          },
          {
            path: ERouteNames.LOGIN_ROUTE,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
