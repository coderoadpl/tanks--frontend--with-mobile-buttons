import React from 'react'
import { io } from 'socket.io-client'

import GameScreen from './components/GameScreen'
import WelcomeScreen from './components/WelcomeScreen'

const socket = io(process.env.REACT_APP_SOCKET_URL, { secure: true, autoConnect: false })

export const App = () => {
  const connectionIdRef = React.useRef(null)
  const [gameId, setGameId] = React.useState(null)
  const [errorMessage, setErrorMessage] = React.useState(null)

  const onJoinClick = React.useCallback(async (gameId) => {
    setErrorMessage(null)
    const response = await fetch(process.env.REACT_APP_API_URL + '/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, connectionId: connectionIdRef.current })
    })
    const data = await response.json()
    if (data.error) {
      setErrorMessage(data.error)
      return
    }
    setGameId(data.gameId)
  }, [])

  const onNewGameClick = React.useCallback(async () => {
    setErrorMessage(null)
    const response = await fetch(process.env.REACT_APP_API_URL + '/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ connectionId: connectionIdRef.current })
    })
    const data = await response.json()
    setGameId(data.gameId)
  }, [])

  React.useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      const connectionId = socket.id
      console.log(`Connected ${process.env.REACT_APP_SOCKET_URL} with id ${connectionId}`)
      connectionIdRef.current = connectionId
    })

    return () => socket.disconnect()
  }, [])

  return (
    gameId !== null ?
      <GameScreen
        gameId={gameId}
      />
      :
      <WelcomeScreen
        errorMessage={errorMessage}
        onJoinClick={onJoinClick}
        onNewGameClick={onNewGameClick}
      />
  )
}

export default App
