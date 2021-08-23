import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogCard from './BlogCard'
import store from '../store'
import { Provider } from 'react-redux'

const renderWithProvider = (componentToRender) => {
  return render(<Provider store={store()}>{componentToRender}</Provider>);
}

describe('<BlogCard />', () => {
  let component

  const blog = {
    title: 'What to know about hormonal imbalances',
    author: 'MedicalNewsToday',
    url: 'https://www.medicalnewstoday.com/articles/321486',
    likes: 1,
    user: {
      username: 'ninalina',
      name: 'Nina'
    }
  }

  const user = {
    username: 'ninalina',
    user: 'Nina'
  }

  beforeEach(() => {
    component = renderWithProvider(
      <BlogCard blog={blog} user={user} />
    )
    component.debug
  })

  test('renders content of title and author in header of the card', () => {
    const cardHeader = component.container.querySelector('[data-test-id="card-header"]')
    expect(cardHeader).toHaveTextContent(
      blog.title,
      blog.author,
    )
    expect(cardHeader).not.toHaveTextContent(
      blog.url,
      blog.likes
    )
  })

  test('renders button for liking and number of likes', () => {
    const likeButton = component.container.querySelector('[aria-label="like"]')
    const likes = component.container.querySelector('[data-test-id="number-of-likes"]')
    expect(likes).toHaveTextContent('1')
  })
})