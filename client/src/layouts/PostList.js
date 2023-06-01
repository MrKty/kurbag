import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import sendRequest from "../utils/request";
import PostCard from "../components/PostCard";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    const fetchData = () => {
        try {
            setLoading(true);

            const p_id = posts.length > 0 ? posts[posts.length - 1].id : 0
            console.log(p_id)
            // Make an API request to fetch more data
            sendRequest('home-get-post', 'POST', {page, p_id}, (data) => {
                // Update the state with the new data
                const newPosts = [];
                for (const i in data.posts) {
                    console.log(data.posts[i])
                    newPosts.push(data.posts[i])
                }
                console.log(newPosts)
                setPosts([...posts, ...newPosts]);
                console.log(posts)
                // Update the page number
                setPage(prevPage => prevPage + 3);

                // Check if there are more items to load
                setHasMore(data.posts.length > 0);

                setLoading(false);
            });


        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
            >
                <ul>
                    {posts.map(post => (
                        <PostCard content={post.content} name={post.name} title={post.title}
                                  likeNumber={post.likeNumber} commentNumber={post.commentNumber}
                                  timestamp={post.timestamp}></PostCard>
                    ))}
                </ul>
            </InfiniteScroll>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default PostList;
