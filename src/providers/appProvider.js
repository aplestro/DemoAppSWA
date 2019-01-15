import { makeid } from '../helpers/utils'

export const createChannel = (channelParams) => {
  const message = JSON.stringify({action: 'SWA|CREATE_CHANNEL', params:{
	avatar: channelParams.channelAvatar,
	title: channelParams.channelName,
	url: `channel/${makeid()}`
  }})
  window.parent.postMessage(message, '*');
}
