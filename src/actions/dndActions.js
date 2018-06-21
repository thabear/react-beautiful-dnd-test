import { DRAGGED_AND_DROPPED } from './types';

export const doDnD = (list1, list2) => dispatch => {
    //console.log(list1[0]);
    list1.forEach(el => {
        console.log(el);
    });
    dispatch({
        type: DRAGGED_AND_DROPPED,
        list1,
        list2
    });
};
