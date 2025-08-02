export const initialStore=()=>{
  return{
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_contact':
      return { ...store, contacts: Array.isArray(action.payload) ? action.payload : [] };

    case 'ADD_AGENDA':
      return {
        ...store,
        contacts: action.payload ? [...store.contacts, action.payload] : store.contacts,
      };
    case 'edit_contact':
      return {
        ...store,
        contacts: store.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case 'delete_contact':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload.id),
      };
    default:
      throw Error('Unknown action.');
  }    
}
