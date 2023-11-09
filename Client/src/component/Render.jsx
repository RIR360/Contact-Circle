import '@fortawesome/fontawesome-free/css/all.min.css';
import Alert from './Alert';
import Button from './Button';
import Card from "./Card";
import CreateContact from "./CreateContact";
import Level from "./Level";
import Loader from "./Loader";
import { useEffect, useRef, useState } from 'react';
import { deleteContact, getContacts } from '../lib/fetcher';
import Toast from './Toast';

function Render() {

  // loading state
  const [isLoading, setIsLoading] = useState(true);
  // render data
  const [render, loadRender] = useState([]);
  // search box toggling hook
  const [search, setSearch] = useState(false);
  const input_ref = useRef(null);
  // searching hook
  const [searchText, setSearchText] = useState('');
  // modal opening hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalID, setmodalId] = useState('');
  // creating state
  const [isCreating, setCreating] = useState(false);
  // creating state
  const [isCreatingOwner, setCreatingOwner] = useState(false);
  // toast messages
  const [showToast, setShowToast] = useState(false);
  const [toast_info, setToast] = useState({});

  const toggleToast = (type, text) => {

    setShowToast(true);
    setToast({ type, text });

  }

  const handleOpenModal = (_id) => {

    setIsModalOpen(true);
    setmodalId(_id);

  };

  const handleCloseModal = () => {

    setIsModalOpen(false);
    setCreating(false);
    setCreatingOwner(false);
    // reload
    setIsLoading(true);

  };

  const toggleSearch = () => {

    // reset the input box text
    setSearchText("");
    setSearch(prevSearch => prevSearch === false ? true : false);

  }

  const searchContact = (event) => {

    setSearchText(event.target.value.toLowerCase());

  }

  // deleting contacts
  function handleDelete(_id) {

    deleteContact(_id).then(() => {

      setIsLoading(true);
      handleCloseModal();
      toggleToast("success", "A contact has been deleted successfully!");

    }).catch(err => {

      toggleToast("error", err.toString());

    })

  }

  function createContact() {

    // load an empty editing card
    setCreating(true);
    setIsModalOpen(true);

  }

  function createOwner() {

    // load an empty editing card
    setCreating(true);
    setCreatingOwner(true);
    setIsModalOpen(true);

  }

  // side effects
  useEffect(() => {

    input_ref.current?.focus();

    getContacts(searchText).then(data => {
      
      loadRender(data);
      setIsLoading(false);

    }).catch(err => {

      toggleToast("error", err.toString());

    })

  }, [search, searchText, isLoading])

  return (

    <div className="sm:w-1/2 mx-auto fade-in text-gray-600">

      <div className="
          sticky top-0 left-0 bg-white z-20
          py-2 px-4 flex justify-between items-center
          border-b-2
        ">

        {search === false ?
          <>
            <div className="text-lg fade-in">My Contact Circle</div>
            <div className="flex items-center">
              { render.owner_exists ? <></> :
                <Button handleClick={createOwner} className="bg-orange-500 text-white text">
                  <i className="fa fa-user"></i>
                </Button>
              }
              <Button handleClick={createContact}><i className="fa fa-add"></i></Button>
              <Button handleClick={toggleSearch}><i className="fa fa-search"></i></Button>
            </div>
          </>
          :
          <>
            <div className="flex w-full">
              <input ref={input_ref} type="search"
                onChange={searchContact}
                value={searchText} className="
                  scale-in-hor-right
                  block w-full py-2 px-4 me-2 text-sm text-gray-900
                  border border-gray-300 rounded-lg bg-stone-100
                " placeholder="Search anything about your contacts!" required
              />
              <Button handleClick={toggleSearch}><i className="fa fa-close"></i></Button>
            </div>
          </>
        }

      </div>

      {isLoading ? <div><Loader className="text-3xl text-orange-600 m-4"></Loader></div> :
        <div className="px-4 mb-4 overflow-auto fade-in">
          {render.data.length <= 0 ? <Alert type={"failed"} message={"No Contacts Found!"} /> : ""}
          {render.data.map((contacts, idx) =>
            <Level key={idx} level={idx} opener={handleOpenModal}>
              {contacts}
            </Level>
          )}
        </div>
      }

      {isModalOpen ?
        isCreating ?
          <CreateContact
            onClose={handleCloseModal}
            ownerCreating={isCreatingOwner}
            toast={toggleToast}
          /> 
          : 
          <Card
            onDelete={() => handleDelete(modalID)}
            _id={modalID}
            onClose={handleCloseModal}
            toast={toggleToast}
          /> 
        : <></>
      }

      <Toast
        type={toast_info.type}
        message={toast_info.text}
        showToast={showToast}
        setShowToast={setShowToast}
      />

    </div>

  );
}

export default Render;