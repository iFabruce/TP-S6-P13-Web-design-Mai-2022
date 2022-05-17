const {Blog} = require("../models");

const vers_accueil = function(req,res) {
    res.render('accueil')   
}
const vers_blog = async function(req,res) {
    Blog.findAll().then((blogs) => {
        res.render('blog',{blogs})
    })
}
const vers_detail_blog =  async function(req,res) {
    Blog.findAll({
        where:{
            id: req.params.id
        }
    }).then((blog) => {
        console.log(req.params.id)
        res.render('detail_blog',{blog})
    })
        
}

module.exports = {vers_accueil,vers_blog,vers_detail_blog}