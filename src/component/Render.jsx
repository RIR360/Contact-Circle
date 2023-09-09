import '@fortawesome/fontawesome-free/css/all.min.css';
import Avatar from "./Avatar";
import Level from "./Level";
import Button from './Button';
import Card from "./Card";
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import database from '../lib/firebase';


function Render() {

  // rendered data
  const [render, setRender] = useState([]);

  // search box toggling hook
  const [search, setSearch] = useState(false);

  // searching hook
  const input_ref = useRef(null);
  const [searchText, setSearchText] = useState('');

  // modal opening hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setmodalId] = useState(0);


  const handleOpenModal = (id) => {

    setIsModalOpen(true);
    setmodalId(id);

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

    // successfull deletion
    handleCloseModal();

  }

  // side effects
  useEffect(() => {

    // focus the input box if it present
    input_ref.current?.focus();

    getAvatars().then((data) => {

      setRender(data);

    });

  }, [search])

  // getting avatars - load the data from firebase
  const getAvatars = async () => {

    const data = await getDocs(collection(database, "contacts"));

    // find filtered data
    let filtered = data.docs.map(doc => (
      { ...doc.data(), id: doc.id }
    ))

    // level the data
    let labeled = [];
    // get the labels
    [0, 1].forEach((level, idx) => {

      let contacts = [];
      filtered.forEach(contact => {
        
        if (contact.level === level) {

          contacts.push(<Avatar key={contact.id} data={contact} open={handleOpenModal} />)

        }
      })

      labeled[level] = contacts;

    });


    return labeled;

  }

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
        {render.map((contacts, idx) =>
          <Level key={idx} level={idx}>
            {contacts}
          </Level>
        )}
      </div>

      <Card   
        isOpen={isModalOpen}
        onDelete={() => handleDelete(modalId)} 
        data={{}} 
        onClose={handleCloseModal} 
      />

    </div>
  );
}

export default Render;
