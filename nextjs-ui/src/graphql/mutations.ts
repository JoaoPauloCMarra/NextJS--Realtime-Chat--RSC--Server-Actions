export const MUTATION_ADD_MESSAGE = `
  mutation AddChat($message: String!, $sender: String!) {
    addChat(message: $message, sender: $sender) {
      message
      sender
    }
  }
`;
