// Store
export const initialState = {
    note_id: 21,
};

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_NOTE_ID":
            return {
                ...state,
                note_id: action.note_id,
            };
      
        default:
            return state;
    }
};

export default reducer;
