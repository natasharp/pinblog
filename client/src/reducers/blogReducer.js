const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'UPDATE_BLOG':
    return state.map((blog) => (blog.id !== action.data.id ? blog : action.data))
  case 'DELETE_BLOG':
    return state.filter((blog) => blog.id !== action.data)
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return async (dispatch) => {
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: blog,
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: id,
  }
}

export default reducer