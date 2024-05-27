import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
	
	const { store, actions } = useContext(Context);
	
	const [val, setVal]=useState([]);

	const handleAdd=()=>{
       const abc = [...val,[]]
       setVal(abc)
    }

    const handleChange=(onChangeValue,i)=>{
		const inputdata=[...val]
		inputdata[i]=onChangeValue.target.value;
		setVal(inputdata)
    }

    const handleDelete=(i)=>{
       const deletVal=[...val]
       deletVal.splice(i,1)
       setVal(deletVal)  
    }

    console.log(val,"data-")

	return(
    <>
	<div className="container">
		<div className="row d-flex align-items-center justify-content-center">
			<div className="col-4">
				<div className="d-flex justify-content-center">
					<button onClick={()=>handleAdd()} className="btn btn-primary my-3">Add</button>
				</div>
				<div>
					{val.map((data,i)=>{
						return (
							<>						
								<div class="input-group mb-3">
										<input value={data} onChange={e=>handleChange(e,i)} className="form-control" />
										<button onClick={()=>handleDelete(i)} className="btn btn-danger">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
												<path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
											</svg>
										</button>
								</div>
							</>
						)
					})}

				</div>
			</div>
		</div>
	</div>
    </>
);
};
