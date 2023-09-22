import '@fortawesome/fontawesome-free/css/all.min.css';
import Alert from './Alert';
import Button from './Button';
import Card from "./Card";
import CreateContact from "./CreateContact";
import Level from "./Level";
import Loader from "./Loader";
import { useEffect, useRef, useState } from 'react';
import { deleteContact, getContacts } from '../lib/fetcher';

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
  const [modalID, setmodalId] = useState('0');
  // creating state
  const [isCreating, setCreating] = useState(false);

  const handleOpenModal = (id) => {

    setIsModalOpen(true);
    setmodalId(id);

  };

  const handleCloseModal = () => {

    setIsModalOpen(false);
    setCreating(false);
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
  function handleDelete(id) {

    deleteContact(id).then(data => {

      setIsLoading(true);
      handleCloseModal();

    })

  }

  function createContact() {

    // load an empty editing card
    setCreating(true);
    setIsModalOpen(true);

  }

  // side effects
  useEffect(() => {

    input_ref.current?.focus();

    getContacts(searchText).then(data => {
      
      loadRender(data);
      setIsLoading(false);

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

      {isLoading ? <div><Loader className="text-3xl text-orange-600 my-4"></Loader></div> :
        <div className="px-4 mb-4 overflow-auto fade-in">
          {render.length <= 0 ? <Alert type={"failed"} message={"No Contacts Found!"} /> : ""}
          {render.map((contacts, idx) =>
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
          /> 
          : 
          <Card
            onDelete={() => handleDelete(modalID)}
            id={modalID}
            onClose={handleCloseModal}
          /> 
        : <></>
      }

    </div>

  );
}

export default Render;