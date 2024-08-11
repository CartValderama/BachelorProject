import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useState, createContext } from "react";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export default function Modal({ buttonName, children, icon, big, primary }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <ModalContext.Provider value={{ closeModal }}>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className={`${big ? "flex w-full items-center justify-center gap-x-1 bg-white p-6 transition duration-300 ease-in hover:bg-stone-200" : `${primary ? "bg-sky-900 text-white hover:bg-stone-700" : "bg-stone-200 text-stone-700 hover:bg-stone-300"} flex items-center justify-center rounded border px-3 py-2  font-medium transition duration-200 ease-in`}`}
        >
          <Icon
            path={icon}
            size={1}
            className="mx-1"
            color={`${primary ? "white" : "#44403C"}`}
          />
          <span
            className={`hidden sm:inline ${primary ? "text-white" : "text-stone-700"}`}
          >
            {buttonName}
          </span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all">
                  <button
                    onClick={closeModal}
                    className="absolute right-0 top-0 m-2"
                  >
                    <Icon path={mdiClose} size={1} />
                  </button>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ModalContext.Provider>
  );
}
