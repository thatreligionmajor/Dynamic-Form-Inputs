import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
	
	const { store, actions } = useContext(Context);
	
	const [val,setVal]=useState([]);

	const handleAdd=()=>{
       const abc=[...val,[]]
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
										<button onClick={()=>handleDelete(i)} className="btn btn-warning">x</button>
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
