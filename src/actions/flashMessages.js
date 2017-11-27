export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const CLEAR_FLASH_MESSAGES = "CLEAR_FLASH_MESSAGES";

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
}

export function clearFlashMessages() {
  return { type: CLEAR_FLASH_MESSAGES }
}
