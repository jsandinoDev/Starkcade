const Modal = ({ isOpen, onClose, children }: {
    isOpen: boolean,
    onClose: ()=> void,
    children: React.ReactNode
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="modal-box modal-border bg-modal  rounded-[8px] border flex flex-col gap-3 justify-around relative "
        onClick={(e) => e.stopPropagation()}
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

export default Modal;