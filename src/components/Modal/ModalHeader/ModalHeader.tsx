type Props = {
  title: string;
  close(): void;
};

const ModalHeader = ({ title, close }: Props) => (
  <div className="custom-modal-header justify-content-between d-flex align-items-center">
    <h3>{title}</h3>
    <button onClick={close}>
      <i></i>
    </button>
  </div>
);

export default ModalHeader;
