import { Types } from "aptos";
import AccountPage from "pages/AccountPage";
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
        <Route path="stashes" element={<StashPage />} />
      </Route>
    )
  );

  return router;
};
