const notificationReducer = (
  state = { message: null, isError: false },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { message: action.data, isError: action.isError }
    default:
      return state
  }
}

export const setNotification = (message, isError) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message,
    isError,
  }
}

export default notificationReducer
