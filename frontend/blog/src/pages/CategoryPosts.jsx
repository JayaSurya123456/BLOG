import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from 'axios'
import { useParams } from "react-router-dom";

export default function CategoryPosts(){

	const [posts,setPosts]=useState([])
	const [category,setCategory]=useState(null)
    const {id}=useParams()

	const fetchPosts= async()=>{
	 const response = await axios.get(`http://localhost:3000/api/posts/category/${id}`)
	 setPosts(response.data)
	}
    
	const fetchCategory= async()=>{
	const response = await axios.get(`http://localhost:3000/api/categories/${id}`)
	 setCategory(response.data)
	}

	useEffect(()=>{
		fetchPosts()
		fetchCategory()
	},[])

    if(!category){
        return<p>Loading...</p>
    }
    return <>
    
	
    <main>
        <div class="container mt-4">
            <div class="row">
                {/*  Main Content  */}
                <div class="col-lg-8">
                    <h1 class="mb-4">{category.name}</h1>
                       {
                         posts.length>0 ? posts.map((post)=><Post post={post}/>):<h4>No Post Available</h4>
                       }
              
                </div>

               
            </div>
        </div>
    </main>

    </>
}

