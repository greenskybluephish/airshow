import { ChangeEvent, FC, ReactNode, useEffect, useRef, useState } from 'react'
import '../App.css'
import { useLocalStorage } from '../useStorage'
import { Link } from 'react-router-dom'
import { Button, Container, Text, Space } from '@mantine/core'

interface Record {
  wins: number
  losses: number
  total: number
}

export function Home() {
  const [showStats, setShowStats] = useState(false)
  const [record, setRecord] = useLocalStorage<Record>('wordle', {
    total: 0,
    wins: 0,
    losses: 0,
  })
  return (
    <Container padding="xl">
      <Space h="xl"></Space>
      <Button size="xl" color="indigo" component={Link} to="play">
        Start a new game
      </Button>
      <Space h="xl"></Space>
      <Button
        fullWidth
        size="xl"
        color="indigo"
        onClick={() => setShowStats(!showStats)}
      >
        Stats
      </Button>
      {showStats && (
        <div className="topBox">
          <p className="stats">Total Games Started: {record.total} </p>
          <p className="stats">Wins: {record.wins} </p>
          <p className="stats">Losses: {record.losses} </p>
          <Button
            fullWidth
            size="xl"
            color="indigo"
            onClick={() =>
              setRecord({
                total: 0,
                wins: 0,
                losses: 0,
              })
            }
          >
            Reset Stats
          </Button>
        </div>
      )}
    </Container>
  )
}
