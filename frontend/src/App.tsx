import { useState, useEffect } from 'react'
import './App.css'
import { loadMessages } from './api/get'
import { Messages } from './api/get'
import { postMessage } from './api/post'
import { messageSendTime } from './components/messageSendTime'
import GetMyMessages from './components/getMyMessages'

function App() {

  const [userName, setUserName] = useState("")
  const [userMessage, setUserMessage] = useState("")
  const [messages, setMessages] = useState<Messages[] | null>()
  const [error, setError] = useState<string | null>(null);



  const getMessages = async () => {
    const response = await loadMessages()
    if (!response.success) {
      setError("A szerver nem elérhető");
    } else {
      setMessages(response.data)
    }
  }

  useEffect(() => {
    getMessages()
    return () => { };
  });


  return (
    <>
      <div className='min-h-screen flex justify-evenly items-center flex-col main-container bg-[#3AAFA9] text-[#feffff]'>
        {
          <p>{error}</p>
        }
        <div className="form-control w-full max-w-xs mb-8 p-2 rounded-lg bg-[#17252A]">
          <label className="label">
            <span className="label-text text-[#feffff] ">What is your name?</span>
          </label>
          <input type="text" placeholder="Type your name" className="input input-ghost w-full max-w-xs border-[#DEF2F1] rounded-lg"
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <span className="label-text text-[#feffff] py-2">Message</span>
          <input type="text" placeholder="Type your message" className="input input-ghost w-full max-w-xs border-[#DEF2F1] rounded-lg"
            value={userMessage}
            onChange={(e) => { setUserMessage(e.target.value) }}
          />
          {!userName || !userMessage ? <button className='btn mt-2'>Add message or User name</button> :
            <button className="btn btn-neutral border-[#DEF2F1] mt-2"
              onClick={() => {
                postMessage(userName, userMessage)
                setUserMessage("")
              }}
            >Send</button>
          }
        </div>
        <div className="card w-96 bg-[#17252A] shadow-xl">
          <div className="card-body">
            {messages?.slice().reverse().map((message) => (
              <>
                {userName == message.user ?
                  <GetMyMessages
                    user={message.user}
                    createdAt={message.createdAt}
                    message={message.message}
                    id={message.id}
                  />
                  :
                  <div className="chat chat-end">
                    <div className="chat-header">
                      {message.user}
                      <time className="text-xs opacity-50 m-2">{messageSendTime(message.createdAt)}</time>
                    </div>
                    <div className="chat-bubble bg-[#2B7A78]">{message.message}</div>
                  </div>
                }
              </>
            ))}
          </div>
        </div>
      </div>





    </>
  )
}

export default App