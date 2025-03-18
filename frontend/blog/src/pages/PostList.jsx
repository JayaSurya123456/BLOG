import { useEffect, useState } from "react";
import Post from "../components/Post";
import axios from 'axios'
import { Link } from "react-router-dom";

export default function PostList(){

	const [posts,setPosts]=useState([])
	const [categories,setCategories]=useState([])


	const fetchPosts= async()=>{
	//  const response = await axios.get('http://localhost:3000/api/posts')
	 const response = await axios.get('https://blog-548v.onrender.com/api/posts')

	 setPosts(response.data)
	}
    
	const fetchCategories= async()=>{
	// const response = await axios.get('http://localhost:3000/api/categories')
	const response = await axios.get('https://blog-548v.onrender.com/api/categories')

	 setCategories(response.data)
	}

	useEffect(()=>{
		fetchPosts()
		fetchCategories()
	},[])

    return <>
    
	<main>
		<div class="container mt-4">
			<div class="row">
				{/* Main Content  */}
				<div class="col-lg-8">
					<h1 class="mb-4">Latest Posts</h1>

				{
			posts.length>0 ? posts.map((post)=><Post post={post}/>):<h4>No Post Available</h4>
				}
					{/* <Post/> */}
                    </div>


                 {/* Side Bar */}
				<div class="col-lg-4">
					
					<div class="card mb-4">
						<div class="card-body">
							<h5 class="card-title">Categories</h5>
							<ul class="list-group">
								{categories.map(category=><li class="list-group-item"><Link to={`/posts/category/${category._id}`} class="text-black">{category.name}</Link></li>)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>



	</main>

    </>
}