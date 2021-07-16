import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Chocolate Fudge Brownie Bites' }
  })

  fireEvent.change(authorInput, {
    target: { value: 'Sadia Badiei' }
  })

  fireEvent.change(urlInput, {
    target: { value: 'https://medium.com/https://www.pickuplimes.com/single-post/2016/10/14/Chocolate-Fudge-Brownie-Bites-at-dawn/definitely-read-you-dont-know-js-ede8106393b6' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Chocolate Fudge Brownie Bites')
  expect(createBlog.mock.calls[0][0].author).toBe('Sadia Badiei')
  expect(createBlog.mock.calls[0][0].url).toBe('https://medium.com/https://www.pickuplimes.com/single-post/2016/10/14/Chocolate-Fudge-Brownie-Bites-at-dawn/definitely-read-you-dont-know-js-ede8106393b6')
})