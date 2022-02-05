import { Wordle } from "./pages/Wordle";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";

import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="play" element={<Wordle />} />
      </Route>
    </Routes>
  );
}

export function Root() {
  return (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: "Open Sans, sans serif",
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <App />
    </MantineProvider>
  );
}
