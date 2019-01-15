import { makeid } from '../helpers/utils'

let mainCallback = null

function listener(e) {
	if (e.origin !== 'https://aplestro.com') {
		return;
	}

	function getReceivedMessage(received){
		if (typeof received === "string"){
			return JSON.parse(received);
		}
		return received;
	}

	const message = getReceivedMessage(e.data)
	if (mainCallback) {
		mainCallback(message)
	}	
}

window.addEventListener("message", listener);

export const createRecord = (text) => {
  const message = JSON.stringify({action: 'SWA|CREATE_DATA', params:{
    data: text
  }});

  window.parent.postMessage(message, '*');
}

export const deleteRecord = (recordId) => {
  const message = JSON.stringify({action: 'SWA|DELETE_DATA', params:{
    id: recordId
  }});

  window.parent.postMessage(message, '*');
}

export const readRecords = () => {
  const message = JSON.stringify({action: 'SWA|READ_DATA', params:{
    type: 'CHANNEL'
  }});

  window.parent.postMessage(message, '*');
}

export const setMainCallback = (inputMainCallback) => {
	mainCallback = inputMainCallback
}

export const createMessage = (text) => {
  const message = JSON.stringify({action: 'SWA|CREATE_MESSAGE', params:{
	text
  }})
  window.parent.postMessage(message, '*');
}
