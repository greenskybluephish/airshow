import "../App.css";
import { useLocalStorage } from "../useStorage";
import { Outlet, useNavigate } from "react-router-dom";
import { AppShell, Button, Container, Header, Title } from "@mantine/core";
import { useState } from "react";

export function Layout() {
  const navigate = useNavigate();

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
              <Button variant='outline' style={{position: 'fixed', left: '2%'}} onClick={() => navigate('/')}>Home</Button>
              <Title>birdle</Title>

            </div>
          }
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colors.dark[8] },
      })}
    >
      <Container size="xs" padding="xs">
        <Outlet />
      </Container>
    </AppShell>
  );
}
