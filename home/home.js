
// Example usage:
const data = [
    {
        type: "text",
        metaData: {
            css: {
                backgroundColor: "red",
                fontSize: "23px",
            },
            events: {
                "click": {
                    type: "click",
                    run: function () {
                        console.log('Text clicked');
                    }
                }
            }
        },
        data: "This is text content"
    },
    {
        metaData: {
            "alt": "alter text",
            "css" : {
                height:"200px",
            }
        },
        type: "image",
        data: {
            path: "./src/image/profile/pruthviraj.jpg",
        },

    }
];

export { data };
