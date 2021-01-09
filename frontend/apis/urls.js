import { stripTrailingSlash } from "utils/urls";

export const BASE_URL = stripTrailingSlash(process.env.REACT_APP_BASE_URL);

export const COMPILER_URL = `${BASE_URL}/compiler/api/code/`;
