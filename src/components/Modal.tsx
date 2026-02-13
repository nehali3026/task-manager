interface Props {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ title, children, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-slate-800 mb-6">{title}</h2>

        {children}
      </div>
    </div>
  );
};

export default Modal;
