# Context API steps:
1. Create a context  using this syntax: 
    export const Context = createContext();

2. Create a context provider using this syntax:
    export const ContextProvider = (props)=>{
        const [state,setState] = useState(initialState)
        return (
            <Context.Provider value={{state,setState}}> // pass both the state and setter to be used
            {props.children}
            </Context.Provider>
        )
    }
This wraps all children and give them access to the context.

3. Wrap the whole application, or wherever the context is needed with the context provider.

    <ContextProvider>
    <App/>
    </ContextProvider>

4. Wherever the context needs to be used, use the use context hook and pass the context
    const {state,setState} = useContext(Context)
