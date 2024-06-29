
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
        type: "image",
        metaData: {
            css: {
                border: "1px solid black",
            },
            events: {
                "mouseover": {
                    type: "mouseover",
                    run: function () {
                        console.log('Image hovered');
                    }
                }
            },
            other: {
                title: "Example Image",
                altText: "Alt text for image",
                time: "2024-06-30"
            }
        },
        data: "img/src/pic.png"
    },
    {
        type: "element",
        metaData: {
            class: "example-element",
        },
        data: [
            {
                type: "text",
                data: "Nested text content"
            }
        ]
    }
];

export { data };
