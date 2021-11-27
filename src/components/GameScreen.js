import React from 'react'
import PropTypes from 'prop-types'

import { Box } from '@mui/material'

export const GameScreen = (props) => {
  const { gameId } = props
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
      GameScreen | {gameId}
    </Box>
  )
}

GameScreen.propTypes = {
  gameId: PropTypes.string.isRequired
}

export default GameScreen
