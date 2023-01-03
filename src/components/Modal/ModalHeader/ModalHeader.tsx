type Props = {
  title: string;
  close(): void;
};

const ModalHeader = ({ title, close }: Props) => (
  <div className="modal-header">
    <h3>{title}</h3>
    <button onClick={close}>
      <i></i>
    </button>
  </div>
);

export default ModalHeader;
