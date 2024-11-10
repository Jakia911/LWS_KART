import { useSession } from "next-auth/react";

interface Modal {
  isOpen: boolean;

  closeModal: () => void;
}

const Modal: React.FC<Modal> = (isOpen, closeModal) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const {data:session,status}=useSession();

  const userName = session? user?.name;

  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  const handleSubmit = ()=>{
    
const updatedUser ={
    userName:userName,
    name,
    email
}
  }


  isOpen ? (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <input
        type="submit"
        value="Submit"
        className="bg-black text-white w-full py-2 rounded-md"
      />
    </form>
  ) : null;
};

export default Modal;
