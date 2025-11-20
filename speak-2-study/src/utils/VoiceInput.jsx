import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
//import useSpeechToText from './hooks/useSpeechToText'

const VoiceInput = () => {

    const commands = [
    {
      command: ["study", "topics"] 
    }
  ]

  const {transcript , browserSupportsSpeechRecognition , isMicrophoneAvailable} =useSpeechRecognition({commands});

  //checking browser support for web speeck API
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  //checking access to microphones
  if (!isMicrophoneAvailable) {
  //alert("To use Speak2Study allow access to microphones ")
  return <span>Please allow microphone access to use Speak2Study.</span>;
 }

  return (
    <div>
      <div id='container' >
      
      <textarea id='textArea'
      value={transcript}
      readOnly
      />
      
      <div >
      
      <button id='speak'
      onClick={() => SpeechRecognition.startListening({ continuous: true })}
      >
        Speak
      </button>
      
      <button id='stopSpeaking'
      onClick={SpeechRecognition.stopListening}
      >
        Stop Speaking
      </button>
      
      </div>
      
      </div>
    </div>
  )
}

export default VoiceInput
