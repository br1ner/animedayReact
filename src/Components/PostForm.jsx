import React, { useState } from 'react';
import MyButton from './UI/Button/MyButton';
import MyInput from './UI/Input/MyInput';

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: '', body: '' });
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        };
        create(newPost);
        setPost({ title: '', body: '' });
    };
    
    return (
        <form>
            <MyInput type="text" placeholder="Назва поста" value={post.title} onChange={e => setPost({ ...post, title: e.target.value })} />
            <MyInput type="text" placeholder="Опис поста" value={post.body} onChange={e => setPost({ ...post, body: e.target.value })} />
            <MyButton onClick={addNewPost}>Создать</MyButton>
        </form>
    )
}
export default PostForm