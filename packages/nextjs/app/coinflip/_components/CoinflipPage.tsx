"use client";

import React, { useState } from 'react'
import { useAccountConnection } from '~~/hooks/starkcade/useAccountConnection';
import { ConflipConnectPage } from './ConflipConnectPage';
import { ConflipPlayPage } from './ConflipPlayPage';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import GenericModal from '~~/components/scaffold-stark/CustomConnectButton/GenericModal';
import { tips } from '~~/utils/Constants';
import Modal from '~~/components/ui/Modal';




export const CoinflipPage = () => {

  const { account } = useAccountConnection();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);



  return (
    <>
      {
        account ? <ConflipPlayPage /> : < ConflipConnectPage />
      }


      <div
        className='fixed justify-end bottom-0 mx-4 my-4 right-0 cursor-pointer'
        title="Game rules and instructions"
        onClick={openModal}
      >
        <QuestionMarkCircleIcon className="w-10 h-10 hover:scale-105 transition-transform" />
      </div>


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold border-b pb-2 text-center">
            Game Rules and Instructions
          </h3>

          <ul className="flex flex-col gap-3 pl-6 text-gray-400">
            {tips.map((tip, index) => (
              <li
                className="list-decimal list-inside text-sm leading-relaxed hover:text-teal-700 hover:font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500"
                key={index}
              >
                {tip}
              </li>
            ))}
          </ul>


          <h4 className="text-lg font-bold text-center mt-4 text-green-600">
            Have fun playing. Cheers!
          </h4>
        </div>
      </Modal>






    </>
  );
}
