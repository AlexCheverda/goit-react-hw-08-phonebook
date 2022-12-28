import { createReducer } from "@reduxjs/toolkit";
import { filterContact } from "./filterActions";

export const filter = createReducer('', {
    [filterContact.type]: (_, action) => action.payload.toLowerCase(),
});