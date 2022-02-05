import "../App.css";
import { useLocalStorage } from "../useStorage";
import { Outlet } from "react-router-dom";
import { AppShell, Container, Header, Title } from "@mantine/core";
import { useState } from "react";

export function Layout() {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} padding="xs">
          {
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Title>birdle</Title>
            </div>
          }
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.dark[8] },
      })}
    >
      {/* <div className="App"> */}
      <Container size="xs" padding="xs">
        <Outlet />
      </Container>
      {/* </div> */}
    </AppShell>
  );
}
