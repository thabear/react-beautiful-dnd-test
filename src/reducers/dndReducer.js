import { DRAGGED_AND_DROPPED } from '../actions/types';

const createList = (num, spread = 0) =>
    Array.from({length: num}, (v, k) => k).map(k => ({
        id: `${k + spread}`,
        content: `${k + spread}`
    }))

const initialState = {
    row1: createList(5),
    row2: createList(3, 5)
}

export default function(state = initialState, action) {
    switch(action.type) {
        case DRAGGED_AND_DROPPED:
            return {
                ...state,
                row1: action.list1,
                row2: action.list2
            };
        default:
            return {
                ...state
            }
    }
}
