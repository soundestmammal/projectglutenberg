const queryFixture = {
    businesses: [
        {
            name: 'Apple Restaurant',
            coordinates: {
                latitude: 45,
                longitude: -71
            },
            location: {
                display_address: [
                    "123 Cool Way",
                    "San Francisco, CA 9xxxx"
                ]
            },
            image_url: "https://s3-media.cdn/fdnwinfeiwnfiwnfw",
            price: "$$$$$",
            phone: "+1123567890",
            categories: [{
                alias: "gluten-free",
                title: 'Gluten Free'
            }],
            id: "ID4applerestaurant"
        },
        {
            name: 'Blackberry Restaurant',
            coordinates: {
                latitude: 40,
                longitude: -73
            },
            location: {
                display_address: [
                    "1000 Fifth Ave",
                    "New York, NY 1xxxx"
                ]
            },
            image_url: "https://s3-media.cdn/fdnwinfeiwnfiwnfw",
            price: "$$$$$",
            phone: "+1123567890",
            categories: [{
                alias: "gluten-free",
                title: 'Gluten Free'
            }],
            id: "ID4blackberryrestaurant"
        },
        {
            name: 'Limewire Restaurant',
            coordinates: {
                latitude: 38,
                longitude: -110
            },
            location: {
                display_address: [
                    "321 Cool Way",
                    "San Francisco, CA 9xxxx"
                ]
            },
            image_url: "https://s3-media.cdn/fdnwinfeiwnfiwnfw",
            price: "$$$$$",
            phone: "+1123567890",
            categories: [{
                alias: "gluten-free",
                title: 'Gluten Free'
            }],
            id: "ID4limewirerestaurant"
        }
    ]
}

module.exports = {
    queryFixture
}