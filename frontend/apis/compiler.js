import axios from "axios";

import { COMPILER_URL } from "./urls";

export const runCodeApi = async (data) => {
    return await axios
        .post(COMPILER_URL, data)
        .then(response => response.data);
}
