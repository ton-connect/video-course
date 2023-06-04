import {createContext} from "react";

export const BackendTokenContext = createContext<{ token: string | null, setToken?: (val: string | null) => void }>({ token: null })
