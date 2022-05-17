
module.exports= (sequelize,DataTypes) => {
    const Blog = sequelize.define("Blog",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        titre: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        photo: {
            type: DataTypes.STRING
        }
        

    })
    return Blog;
}