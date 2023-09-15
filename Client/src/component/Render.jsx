import '@fortawesome/fontawesome-free/css/all.min.css';
import Level from "./Level";
import Button from './Button';
import Card from "./Card";
import { useEffect, useRef, useState } from 'react';
import { SERVER, SERVER_KEY } from "../env"
import Alert from './Alert';

function Render() {

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

  const handleOpenModal = (id, level) => {

    setIsModalOpen(true);
    setmodalId({id, level});

  };

  const handleCloseModal = () => {

    setIsModalOpen(false);

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

    console.log("deleting", id);
    // complete the deleting operation then close
    handleCloseModal();

  }

  async function fetchData(filter) {

    fetch(`${SERVER}/contacts?filter=${filter}&key=${SERVER_KEY}`)
      .then((response) => {

        if (!response.ok) {
          throw response.json();
        }

        return response.json();

      })
      .then((json) => {

        // load the data
        loadRender(json.data);

      })
      .catch((error) => {

        console.error('Fetch error:', error);

      });
      
  }

  // side effects
  useEffect(() => {

    input_ref.current?.focus();

    fetchData(searchText);

  }, [search, searchText])

  return (
    <div className="sm:w-1/2 mx-auto fade-in">

      <div className="
          sticky top-0 left-0 bg-white z-20
          py-2 px-4 flex justify-between items-center
          border-b-2
        ">

        {search === false ?
          <>
            <div className="text-lg fade-in">My Contact Circle</div>
            <div className="flex items-center">
              <Button><i className="fa fa-add"></i></Button>
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

      <div className="px-4 mb-4 overflow-auto">
        {render.length <= 0 ? <Alert type={"failed"} message={"No Contacts Found!"} /> : ""}
        {render.map((contacts, idx) =>
          <Level key={idx} level={idx} opener={handleOpenModal}>
            {contacts}
          </Level>
        )}
      </div>

      <Card
        isOpen={isModalOpen}
        onDelete={() => handleDelete(modalID)}
        id={modalID}
        onClose={handleCloseModal}
      />

    </div>
  );
}

export default Render;