import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogDetails from './BlogDetails'

describe('<BlogDetails />', () => {
  let component

  const blog = {
    title: 'What to know about hormonal imbalances',
    author: 'MedicalNewsToday',
    url: 'https://www.medicalnewstoday.com/articles/321486',
    likes: 1,
    user: {
      username: 'ninalina',
      user: 'Nina'
    }
  }

  const user = {
    username: 'ninalina',
    user: 'Nina'
  }

  test('updates likes', () => {
    const handleLike = jest.fn()
    component = render(
      <BlogDetails blog={blog} user={user} handleLike={handleLike} />
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})