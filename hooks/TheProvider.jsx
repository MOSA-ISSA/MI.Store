import React, { useEffect, useState } from "react";
import TheContext from "./TheContext";
import { getLanguages } from "@/constants/local";

const TheProvider = (props) => {
    const [AlertState, setAlertState] = useState({
        visible: false,
        message: "",
        cancel: false,
        confirm: false,
        ok: false,
        loading: false,
    });
    const [user, setUser] = useState();
    const [group, setGroup] = useState();
    const [pathValue, setPathValue] = useState("");
    const [Language, setLanguage] = useState("en");
    const Admin = user?._isAdmin;

    useEffect(() => {
        getLanguages(setLanguage)
    }, []);

    return (
        <TheContext.Provider
            value={{
                AlertState,setAlertState,
                user, setUser,
                group, setGroup,
                pathValue,setPathValue,
                Language,setLanguage,
                Admin,
            }}
        >
            {props.children}
        </TheContext.Provider>
    );
};

export default TheProvider;