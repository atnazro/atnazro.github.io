

const data = [
    {
        elementType: "img",
        data: {
            path: "./src/image/profile/pruthviraj.jpg",
            alt: "Profile pic",
            css: {
                height: "200px",
                margin: "20px",
            }
        }
    },
    {
        elementType: "p",
        data: {
            text: "Hey there! I'm Pruthviraj, coming to you from Mahuva, a cozy town in Gujarat, India.",
            css: {
                background: "black",
                margin: "10px",
                color: "white"
            }
        }
    },

    {
        elementType: "div",
        data: {
            children: [
                {
                    elementType: "p",

                    data: {
                        text: "This is a nested paragraph inside a div.",
                        css: {
                            background: "blue",
                            color: "white",
                            padding: "10px"
                        },
                        events: {
                            click: function () {
                                console.log("click")
                            }
                        },
                    }
                },

            ],
            css: {
                border: "1px solid black",
                padding: "20px",
                margin: "20px"
            }
        }
    }
];


export { data }