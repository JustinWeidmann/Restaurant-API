db.Users.insertOne({
    username: 'XxxDietSlayerxxX',
    uid:{
        googleid: '518193934638AB69D'
    },
    profileImage: 'https://lh3.googleusercontent.com/ogw/AOh-ky13UxFfR5mfC1a4YU2_sGFd_Pv6PPku4sjXyTiKC3w=s32-c-mo',
    allergys:[
        {   // I want the user to be able to define an allergy if they wish. Enter name and foods, either ingredents or catigorys like greens
            allergy: 'women',
            foods:['beans', 'greens', 'potato'],
            sevarity: 'extreme'
        }
    ],
    diets:{ // You can only be on one diet
        custom: false,
        diet: 'vegan',
        foods:[meat, dairy]
    },
    prefrences:{
        likes:[salmon],
        dislikes:[mushrooms]
    }
})