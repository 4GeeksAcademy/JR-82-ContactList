export const initialStore=()=>{
  return{
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_contact':

      return {
        ...store,
        contacts: action.payload || []
      };

    case 'ADD_AGENDA':
      return {
        ...store,
        contacts: action.payload 
      };
    default:
      throw Error('Unknown action.');
  }    
}
