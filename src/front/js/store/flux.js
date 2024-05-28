const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			recipes: [
				{
					title: "Recipe Name (TM)",
					description: "a very good recipe",
					ingredient: "sugar"
				},
				{
					title: "SECOND",
					description: "a very okay recipe",
					ingredient: "flour"
				}
			]
		},
		actions: {

			// Use getActions to call a function within a fuction
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
			
			saveRecipe: (title, ingredients, description, image) => {
					//get the store
					const store = getStore();

					let newRecipe = {
						user_id: store.user.id, // Include user_id here
						title: title,
						ingredients: ingredients,
						description: description,
						image: image
					}
					getActions().addRecipe(newRecipe);
				},

				addRecipe: (theNewRecipe) => {
					const store = getStore();
					let revisedStore = [...store.recipes, theNewRecipe];
					getActions().fetchAddRecipe(theNewRecipe);
					setStore({contacts: revisedStore})
				},

				fetchAddRecipe: newRecipe => {
					const store = getStore();
					const recipes = getStore().recipes

					const options = {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							// "Authorization": "Bearer " + store.token
						},
						body: JSON.stringify(
							{
							//add an id
							title: title,
							ingredients: ingredients,
							description: description,
							image: image
							}
						)
					}
					fetch(`${process.env.BACKEND_URL}api/user-recipes`, options)
						.then((response) => response.json())
						.then((data) => {
							recipes.push(newRecipe)
							setStore({ user: data.recipes })
							console.log("Here's the data from fetchAddRecipe() ", data)
						})
				},
			}
		}
	};

export default getState;
