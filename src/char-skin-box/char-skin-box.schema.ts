import { Schema } from 'mongoose';

export const charSkinBox = new Schema ({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    charSkinKeys: [{type: String}],
    updatedDate: { type: String, required: true },
})