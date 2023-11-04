import { useRef } from "react";
import { messageSendTime } from "./messageSendTime";
import { FiMoreHorizontal } from 'react-icons/fi';
import { deleteMessages } from "../api/delete";


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



  return (
    <div className="chat chat-start">
      <div className="chat-header flex justify-center items-center">
        {user}
        <time className="text-xs opacity-50 m-2">{messageSendTime(createdAt)}</time>

        <div>
          <p className="flex text-center" onClick={openModal}><FiMoreHorizontal /></p>

          <dialog ref={modalRef} className="modal ">
            <div className="modal-box bg-[#17252A] flex justify-center items-center flex-col">
              <div className="flex text-center items-center m-2">
                <p className="text-lg">Do you want to delete your message?</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3" 
                onClick={() => {
                  deleteMessages(id)
                  closeModal()
                }}
                >YES</button>
              </div>
              <div className="flex text-center items-center m-2">
                <p className="text-lg">Do you want to modify your message? -Not working yet</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-3">YES</button>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={closeModal}>Close</button>
                </form>
              </div>
            </div>
          </dialog>


        </div>
      </div>
      <div className="chat-bubble bg-[#2B7A78]">
        {message}
      </div>
    </div>
  )
}


export default GetMyMessages;