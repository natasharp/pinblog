import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
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

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('renders content of title and author only', () => {
    expect(component.container).toHaveTextContent(
      blog.title,
      blog.author
    )

    expect(component.container).not.toHaveTextContent(
      blog.url,
      blog.likes
    )
  })

  test('renders content of url and likes when button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('div:nth-child(2)')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
})