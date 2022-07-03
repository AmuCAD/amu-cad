import { Route, Routes } from "react-router-dom";

import EditPage from "../../../pages/EditPage";
import HomePage from "../../../pages/HomePage";
import AppHeader from "../AppHeader";
import GlobalModal from "../GlobalModal";
import GlobalStyles from "../GlobalStyles";

function App() {
  return (
    <>
      <GlobalModal />
      <GlobalStyles />
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </>
  );
}

export default App;
