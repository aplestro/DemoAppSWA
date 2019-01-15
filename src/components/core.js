import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import AppContent from './app/index.js'
import ChannelContent from './channel/index.js'
import { getChannelID } from '../helpers/aplestro'

const channelID = getChannelID()

const App = () => {
	return channelID ? <ChannelContent channelID={channelID}/> : <AppContent/>
}
export default App
