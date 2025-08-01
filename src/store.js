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
    default:
      throw Error('Unknown action.');
  }    
}
