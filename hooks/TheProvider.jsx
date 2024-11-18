import React, { useEffect, useState } from "react";
import TheContext from "./TheContext";
import { getLanguages, getUser } from "@/constants/local";

const TheProvider = (props) => {
    const [AlertState, setAlertState] = useState({
        visible: false,
        message: "",
        cancel: false,
        confirm: false,
        ok: false,
        loading: false,
    });
    const [LoginState, setLoginState] = useState(false);
    const [user, setUser] = useState();
    const [selectedCategory, setCategory] = useState('');
    const [pathValue, setPathValue] = useState("");
    const [Language, setLanguage] = useState("en");
    const [Search, setSearch] = useState(false);
    const Admin = user?._isAdmin;

    useEffect(() => {
        getLanguages(setLanguage);
        getUser(setUser);
    }, []);

    return (
        <TheContext.Provider
            value={{
                LoginState, setLoginState,
                AlertState, setAlertState,
                user, setUser,
                pathValue, setPathValue,
                Language, setLanguage,
                Admin,
                selectedCategory, setCategory,
                Search, setSearch
            }}
        >
            {props.children}
        </TheContext.Provider>
    );
};

export default TheProvider;