import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
  children,
  isOpen = false,
  noClose = false,
  close = () => {},
  title,
  className,
  width,
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={`fixed inset-0 z-40 overflow-visible overflow-y-auto bg-blue-900 bg-opacity-90 ${className}`}
        onClose={() => !noClose && close()}>
        <div className="fixed inset-0 bg-black-800 opacity-80" />
        <div className="flex justify-center items-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div
              className={`border border-gray-200 mx-auto ${
                width ? width : "w-full md:w-1/2 2xl:w-1/4"
              } h-screen md:inline-block text-black-700 px-6 py-2 overflow-visible text-left align-middle transition-all transform bg-white shadow-xl md:rounded-2xl md:my-8`}>
              <div className="relative flex items-center">
                <div className="flex-grow">
                  <Dialog.Title as="h3">{title}</Dialog.Title>
                </div>
                <div>
                  {!noClose && (
                    <XIcon
                      className="absolute right-0 w-6 h-6 top-2"
                      onClick={close}
                    />
                  )}
                </div>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
