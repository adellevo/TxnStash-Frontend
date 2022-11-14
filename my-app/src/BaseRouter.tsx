import { Types } from "aptos";
import AccountPage from "pages/AccountPage";
import AuthPage from "pages/AuthPage";
import CreatePage from "pages/CreatePage";
import StashPage from "pages/StashPage";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom";
export const BaseRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        {/* <Route path="/" element={<StartPage />} /> */}
        <Route path="account" element={<AccountPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="stashes" element={<StashPage />} />
      </Route>
    )
  );

  return router;
};
