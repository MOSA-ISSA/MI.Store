import React, { useEffect, useState } from "react";
import TheContext from "./TheContext";
import { getLanguages, getUser } from "@/constants/local";
import { getAllCategories } from './../api/category.api';

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
    const [Categories, setCategories] = useState([{ name: 'Loading...', image: 'https://via.placeholder.com/150' }]);
    const [selectedCategory, setCategory] = useState('');
    const [pathValue, setPathValue] = useState("");
    const [Language, setLanguage] = useState("en");
    const [Search, setSearch] = useState(false);
    const Admin = user?._isAdmin;

    const getAllCategoryApi = async () => {
        const categories = await getAllCategories()
            .catch((error) => console.log(error))
        // .finally(() => setLoading(false));
        setCategories(categories?.data || []);
        console.log("categories", categories?.data?.length);
    }

    useEffect(() => {
        getLanguages(setLanguage);
        getUser(setUser);
    }, []);

    useEffect(() => {
        getAllCategoryApi();
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
                Search, setSearch,
                Categories, setCategories
            }}
        >
            {props.children}
        </TheContext.Provider>
    );
};

export default TheProvider;