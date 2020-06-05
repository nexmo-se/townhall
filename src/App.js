import React from 'react';

import SessionProvider from 'contexts/session';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CeoPage from "pages/CeoPage";
import EmployeePage from "pages/EmployeePage";
import ModeratorPage from "pages/ModeratorPage";
import GhostRiderPage from "pages/GhostRiderPage";
import MessageProvider from 'contexts/message';

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <MessageProvider>
          <Switch>
            <Route path="/presenter" component={CeoPage} />
            <Route path="/participant" component={EmployeePage} />
            <Route path="/moderator" component={ModeratorPage} />
            <Route path="/ghostrider" component={GhostRiderPage} />
          </Switch>
        </MessageProvider>
      </SessionProvider>
    </BrowserRouter>
  );
}

export default App;
