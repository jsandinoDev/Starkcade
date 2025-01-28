"use client";

import React, { useState } from 'react'
import { useAccountConnection } from '~~/hooks/starkcade/useAccountConnection';
import { ConflipConnectPage } from './ConflipConnectPage';
import { ConflipPlayPage } from './ConflipPlayPage';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import GenericModal from '~~/components/scaffold-stark/CustomConnectButton/GenericModal';


export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Add this click handler for the backdrop
    >
      <div 
        className="modal-box modal-border bg-modal  rounded-[8px] border flex flex-col gap-3 justify-around relative "
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export const CoinflipPage = () => {


    const tips = [
        "Choose heads or tails.",
"Enter the amount you want to play.",
" Click 'Double or Nothing'",
"Approve the amount in your wallet.",
"Wait for the transaction to complete."

    ]

    const { account } = useAccountConnection();
    const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);



    return (
        <>
            {
                account ?  <ConflipPlayPage /> : < ConflipConnectPage /> 
            }


           <div 
  className='fixed justify-end bottom-0 mx-4 my-4 right-0 cursor-help'
  title="Game rules and instructions"
  onClick={openModal}
>
  <QuestionMarkCircleIcon className="w-10 h-10 hover:scale-105 transition-transform" />
</div>


       <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className=" justify-between ">
            <h3 className="text-xl font-bold">Game Rules and Instructions</h3>

            <ul className="flex flex-col gap-2 pl-6 text-gray-700">
  {tips.map((tip, index) => (
    <li 
      className="list-disc list-inside text-sm leading-relaxed"
      key={index}
    >
      {tip}
    </li>
  ))}
</ul>

<h4 className="text-xl font-bold"> Have fun playing. Cheers!</h4>
            
          </div>
          
       </Modal>


          
            
            
        </>
    );
}
