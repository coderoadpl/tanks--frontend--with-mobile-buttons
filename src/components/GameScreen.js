import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const GameScreen = (props) => {
  const { gameId, board } = props
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
        GAME ID: {gameId}
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
            return (
              <Box
                key={object.id}
                sx={{
                  position: 'absolute',
                  top: object.top,
                  left: object.left,
                  width: object.width,
                  height: object.height,
                  transform: 'rotate(' + object.rotation + ')deg',
                  backgroundColor: 'black'
                }}
              >
              </Box>
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
  objects: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypePlayer
  ])).isRequired
}).isRequired

GameScreen.propTypes = {
  board: PropTypeBoard,
  gameId: PropTypes.number.isRequired
}

export default GameScreen
