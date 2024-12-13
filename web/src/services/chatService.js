export const getMessages = async () => {
    // Mocking the response data for now
    const data = [
      {
        sender: 'shoyab',
        message_id: 1,
        sender_id: 1,
        receiver_id: 2,
        excerpt: "Hello!",
        timestamp: "2024-12-13T14:53:00Z",
        status: "read",
        message_type: "text"
      },
      {
        sender: 'anirudh',
        message_id: 2,
        sender_id: 2,
        receiver_id: 1,
        excerpt: "Hi there!",
        timestamp: "2024-12-13T14:54:00Z",
        status: "delivered",
        message_type: "text"
      },
      {
        sender: 'Deep',
        message_id: 3,
        sender_id: 1,
        receiver_id: 2,
        excerpt: "How are you?",
        timestamp: "2024-12-13T14:55:00Z",
        status: "sent",
        message_type: "text"
      },
      {
        sender: 'Esha',
        message_id: 4,
        sender_id: 1,
        receiver_id: 2,
        excerpt: "Check out this image!",
        timestamp: "2024-12-13T14:56:00Z",
        status: "get",
        message_type: "image",
        media_url: "https://example.com/sample-image.jpg" // URL for an image
      }
    ];
    
    // Simulate a delay as if fetching data from an API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000); // Mock API delay of 1 second
    });
  };
  