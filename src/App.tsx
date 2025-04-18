import {
  Refine
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import "./App.css";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";
import { authProvider } from "./authProvider";
import Home from "./__root/pages/Home";
import RootLayout from "./__root/RootLayout";
import RestaurantProfile from "./__root/pages/RestaurantProfile";
import SearchBar from "./components/search/SearchBar";
import SearchPage from "./__root/pages/Search";
import ProfilePage from "./__root/pages/Profile";
import ContactPage from "./__root/pages/ContactPage";
import FAQPage from "./__root/pages/FAQPage";
import TermsAndConditionsPage from "./__root/pages/TermsAndConditionsPage";
import PrivacyPolicyPage from "./__root/pages/PrivacyPolicyPage";
import AboutUsPage from "./__root/pages/AboutUsPage";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            routerProvider={routerBindings}
            authProvider={authProvider}
            
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "x069RL-6gvjUb-kEVWam",
            }}
          >
            <Routes>
              <Route
                element={
                  <RootLayout>
                    <Outlet />
                  </RootLayout>
                }
              >
                <Route index element={<Home />} />
                <Route path="/restaurant/:id" element={<RestaurantProfile />} />
                <Route path="/search" element={<SearchPage />}/>
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/terms-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
