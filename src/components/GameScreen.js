import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

import tankImage from '../images/tank.png'
import tankFiringImage from '../images/tank--firing.png'
import tankDestroyedImage from '../images/tank--destroyed.png'

export const GameScreen = (props) => {
  const { gameId, board, sendEvent } = props

  React.useEffect(() => {
    console.log('listeners')
    const keydownListener = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          sendEvent({ key: 'ArrowDown', eventName: 'keydown' })
          break
        case 'ArrowUp':
          sendEvent({ key: 'ArrowUp', eventName: 'keydown' })
          break
        case 'ArrowLeft':
          sendEvent({ key: 'ArrowLeft', eventName: 'keydown' })
          break
        case 'ArrowRight':
          sendEvent({ key: 'ArrowRight', eventName: 'keydown' })
          break
        case ' ':
          sendEvent({ key: 'Space', eventName: 'keydown' })
          break
        default:
      }
    }

    const keyupListener = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          sendEvent({ key: 'ArrowDown', eventName: 'keyup' })
          break
        case 'ArrowUp':
          sendEvent({ key: 'ArrowUp', eventName: 'keyup' })
          break
        case 'ArrowLeft':
          sendEvent({ key: 'ArrowLeft', eventName: 'keyup' })
          break
        case 'ArrowRight':
          sendEvent({ key: 'ArrowRight', eventName: 'keyup' })
          break
        case ' ':
          sendEvent({ key: 'Space', eventName: 'keyup' })
          break
        default:
      }
    }

    window.addEventListener('keydown', keydownListener)
    window.addEventListener('keyup', keyupListener)

    return () => {
      window.removeEventListener('keydown', keydownListener)
      window.removeEventListener('keyup', keyupListener)
    }
  }, [sendEvent])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0
        }}
      >
        GAME ID: {gameId} | TIME: {(board.time / 1000).toFixed(2)} / {(board.endTime / 1000).toFixed(2)}
      </Box>
      <Box
        sx={{
          width: board.dimensions.x,
          height: board.dimensions.y,
          backgroundColor: 'green',
          position: 'relative'
        }}
      >
        {
          board && board.objects && board.objects.map((object) => {
            const image = object.hp <= 0 ? tankDestroyedImage : object.isFiring ? tankFiringImage : tankImage

            return (
              <Box
                key={object.id}
                sx={{
                  position: 'absolute',
                  top: object.top,
                  left: object.left,
                  width: object.width,
                  height: object.height,
                  transform: 'rotate(' + object.rotation + 'deg)',
                  backgroundColor: object.hp === 0 ? 'red' : 'black',
                  backgroundPosition: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: 'url(' + image + ')'
                }}
              />
            )
          })
        }

      </Box>
    </Box>
  )
}

export const PropTypePlayer = PropTypes.shape({
  type: PropTypes.oneOf(['player']),
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  hp: PropTypes.number.isRequired
})

export const PropTypeBoard = PropTypes.shape({
  dimensions: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  time: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  objects: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypePlayer
  ])).isRequired
}).isRequired

GameScreen.propTypes = {
  board: PropTypeBoard,
  gameId: PropTypes.number.isRequired,
  sendEvent: PropTypes.func.isRequired
}

export default GameScreen
