export const initialState = {
  avatar: '',
  favorites: [],
  appointments: [],
  name: '',
  email: '',
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setAvatar':
      return {...state, avatar: action.payload.avatar};
      break;

    case 'name':
      return {...state, name: action.payload.name};
      break;

    case 'email':
      return {...state, email: action.payload.email};
      break;

    default:
      return false;
  }
};
