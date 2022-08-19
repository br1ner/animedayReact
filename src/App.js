import React, { useState, useEffect } from "react";
import PostServise from "./API/PostService";
import FilterPost from "./Components/FilterPost";
import PostForm from "./Components/PostForm";
import PostList from "./Components/PostList";
import MyButton from "./Components/UI/Button/MyButton";
import Loader from "./Components/UI/Loader/Loader";
import MyModal from "./Components/UI/MyModal/MyModal";
import { useFetching } from "./hooks/useFetching";
import { usePosts } from './hooks/usePosts';
import { getPageCount, getPagesArray } from './utils/pages';
import './styles/App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  let pagesArray = getPagesArray(totalPages);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostServise.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  const changePage = (p) => {
    setPage(p);
    fetchPosts(limit, p);
  }

  return (
    <div className="App">
      <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
      <MyButton style={{ marginTop: 30 }} onClick={e => setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <FilterPost
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Error ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Слава Україні" />

      }
      <div className="page__wrapper">
        {pagesArray.map(p =>
          <span
            key={p}
            className={page === p ? 'page page__current' : 'page'}
            onClick={() => changePage(p)}
          >
            {p}
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
