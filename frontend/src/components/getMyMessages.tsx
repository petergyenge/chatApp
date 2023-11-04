import { useRef, useState } from "react";
import { messageSendTime } from "./messageSendTime";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BsFillPencilFill } from 'react-icons/bs';
import { deleteMessages } from "../api/delete";
import { patchMessages } from "../api/patch";


interface GetMyMessagesProps {
  user: string;
  createdAt: string;
  message: string;
  id: string

}

const GetMyMessages = ({ user, createdAt, message, id }: GetMyMessagesProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const [modifypointer, setModifypointer] = useState(true)
  const [modifyMessage, setModifyMessage] = useState("")

  return (
    <div className="chat chat-start">
      <div className="chat-header flex justify-center items-center">
        {user}
        <time className="text-xs opacity-50 m-2">{messageSendTime(createdAt)}</time>

        <div>
          <div className="flex">
            <p className="flex text-center pr-2" onClick={openModal}><RiDeleteBin5Line /></p>
            <p onClick={() => { setModifypointer(!modifypointer) }}><BsFillPencilFill /></p>
          </div>
          <dialog ref={modalRef} className="modal ">
            <div className="modal-box bg-[#17252A] flex justify-center items-center flex-col">
              <div className="flex text-center items-center m-2">
                <p className="text-lg">Do you want to delete your message?</p>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3"
                    onClick={() => {
                      deleteMessages(id)
                      closeModal()
                    }}
                  >YES</button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3" onClick={closeModal}>NO</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      {modifypointer === true ?
        <div className="chat-bubble bg-[#2B7A78]">
          {message}
        </div>
        :
        <div>
          <input type="text" placeholder={message} className="input input-ghost w-full max-w-xs border-[#DEF2F1] rounded-lg"
            onChange={(e) => { setModifyMessage(e.target.value) }} />
          <button className="btn btn-neutral border-[#DEF2F1] mr-2" onClick={() => { patchMessages(id, modifyMessage), setModifypointer(!modifypointer)}}>Modify</button>
          <button className="btn btn-neutral border-[#DEF2F1] mt-2" onClick={() => { setModifypointer(!modifypointer) }}>Cancel</button>
        </div>
      }
    </div>
  )
}


export default GetMyMessages;



{/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3"
onClick={() => {
  patchMessages(id, message)
}}
>YES</button> */}