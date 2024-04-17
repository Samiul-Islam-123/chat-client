const data = [
    {
        conversationID : "conv1",
        messages : [
            {
                senderID : "user1",
                receiverID : "user2",
                time : "10:00 AM",
                content : "Hey, how are you?"
            },
            {
                senderID : "user2",
                receiverID : "user1",
                time : "10:05 AM",
                content : "I'm good, thanks! How about you?"
            },
            {
                senderID : "user1",
                receiverID : "user2",
                time : "10:10 AM",
                content : "I'm doing well too. What are you up to?"
            },
        ]
    },
    {
        conversationID : "conv2",
        messages : [
            {
                senderID : "user3",
                receiverID : "user1",
                time : "Yesterday",
                content : "Hey, can we meet today?"
            },
            {
                senderID : "user1",
                receiverID : "user3",
                time : "Yesterday",
                content : "Sure, what time works for you?"
            },
            {
                senderID : "user3",
                receiverID : "user1",
                time : "Yesterday",
                content : "How about 3 PM?"
            }
        ]
    },
    {
        conversationID : "conv3",
        messages : [
            {
                senderID : "user4",
                receiverID : "user1",
                time : "2 days ago",
                content : "Hi there!"
            },
            {
                senderID : "user1",
                receiverID : "user4",
                time : "2 days ago",
                content : "Hello!"
            }
        ]
    }
];


export default data;