db.Restaurants.insertOne({
    name: 'Le Café Français',
    storeID: 0,
    chain: false,
    location: { type: "Point", coordinates: [ 40, 5 ] },
    menu: {
        Appetizers: [
            {
                name: "Escargot à la Bourguignonne",
                description: "Snails baked in garlic butter and served with crusty bread"
            },
            {
                name: "Frisée aux Lardons",
                description: "Salad with frisée lettuce, bacon, boiled egg, and a warm mustard dressing",
                ingredents: ["bacon", "egg", "lettuce"]
            },
            {
                name: "Croque Monsieur",
                description: "Classic French sandwich with ham and cheese, grilled and served with a side salad"
            }
        ],
        Entrees: [
            {
                name: "Steak au Poivre",
                description: "Pan-seared steak with a peppercorn sauce, served with pommes frites and a mixed greens salad"
            },
            {
                name: "Coq au Vin",
                description: "Chicken braised in red wine with mushrooms and onions, served with mashed potatoes and green beans"
            },
            {
                name: "Sole Meunière",
                description: "Pan-seared Dover sole with a lemon butter sauce, served with roasted vegetables and a mixed greens salad"
            }
        ],
        Desserts: [
            {
                name: "Crème Brûlée",
                description: "Rich custard with a caramelized sugar top, served with fresh berries"
            },
            {
                name: "Profiteroles au Chocolat",
                description: "Puffed pastry filled with whipped cream and topped with warm chocolate sauce"
            },
            {
                name: "Tarte Tatin",
                description: "Upside-down caramelized apple tart, served with crème fraîche"
            }
        ],
        Drinks: [
            {
                name: "French 75",
                description: "Gin, Champagne, lemon juice, and sugar, served in a flute glass"
            },
            {
                name: "Kir Royale",
                description: "Champagne and crème de cassis, served in a flute glass"
            },
            {
                name: "Côtes du Rhône",
                description: "A red wine from the Rhône Valley region of France"
            }
        ]
    },
    hours: {
        mon: ['isoOpen', 'isoClose'],
        tue: ['isoOpen', 'isoClose'],
        wed: ['isoOpen', 'isoClose'],
        thu: ['isoOpen', 'isoClose'],
        fri: ['isoOpen', 'isoClose'],
        sat: ['isoOpen', 'isoClose'],
        sun: ['isoOpen', 'isoClose']
    },
    catagories: ['Diner', 'Fancy as Fuck (FaF)'],
    cuisene: ['American', 'French']
})