import React from 'react'
import { io } from 'socket.io-client'

import GameScreen from './components/GameScreen'
import WelcomeScreen from './components/WelcomeScreen'
import GameEndedOverlay from './components/GameEndedOverlay'

const socket = io(process.env.REACT_APP_SOCKET_URL, { secure: true, autoConnect: false })

export const App = () => {
  const connectionIdRef = React.useRef(null)
  const [board, setBoard] = React.useState(null)
  const [gameEnded, setGameEnded] = React.useState(false)
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

  const sendEvent = React.useCallback(async ({ key, eventName }) => {
    console.log('emit', key, eventName, socket)
    socket.emit('PLAYER_ACTION', { key, eventName })
  }, [])

  const onReplayClick = React.useCallback(async () => {
    setGameEnded(false)
    setGameId(null)
    setBoard(null)
  }, [])

  React.useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      const connectionId = socket.id
      console.log(`Connected ${process.env.REACT_APP_SOCKET_URL} with id ${connectionId}`)
      connectionIdRef.current = connectionId
    })

    socket.on('BOARD_CHANGED', setBoard)
    socket.on('GAME_ENDED', () => setGameEnded(true))

    return () => socket.disconnect()
  }, [])

  return (
    <>
      {
        gameId !== null ?
          <GameScreen
            gameId={gameId}
            board={board}
            sendEvent={sendEvent}
          />
          :
          <WelcomeScreen
            errorMessage={errorMessage}
            onJoinClick={onJoinClick}
            onNewGameClick={onNewGameClick}
          />
      }
      {
        gameEnded ?
          <GameEndedOverlay
            onReplayClick={onReplayClick}
          />
          :
          null
      }
    </>
  )
}

export default App
