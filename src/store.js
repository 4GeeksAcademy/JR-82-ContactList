export const initialStore=()=>{
  return{
    message: null,
    contacts: [
     {fullName: "", email: "", phone: "", address: "", background: null}
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_contact':

      const { fullName, email, phone, address } = action.payload

      return {
        ...store,
        contacts: [...store.contacts, { id: Date.now(), fullName, email, phone, address, background: null }]
      };
    default:
      throw Error('Unknown action.');
  }    
}
