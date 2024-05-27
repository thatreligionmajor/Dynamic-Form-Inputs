const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			recipes: [
				{
					title: "Recipe Name (TM)",
					description: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					description: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire recipes array to look for the respective index
				//and change its color
				const recipes = store.recipes.map((elm, i) => {
					if (i === index) elm.description = color;
					return elm;
				});

				//reset the global store
				setStore({ recipes: recipes });
			}
		}
	};
};

export default getState;
