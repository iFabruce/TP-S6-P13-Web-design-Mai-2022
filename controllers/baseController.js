
const { request } = require('express');
const pool = require('../config/db.config')

/****************************SELECT*********************************/
const getTableName = (s) => {
    tab = JSON.stringify(s)
    tab = tab.slice(1,tab.length-1) //Elimine les accolades au debut et à la fin
    return ((tab.split(",")[0]).split(":")[1]).replaceAll('"',"")
}

const mapParams =  (s) => {
    tab = JSON.stringify(s)
    tab = tab.slice(1,tab.length-1)
    const myMap = new Map();
    var i=0
    const spl = tab.split(",")
    spl.shift()
    while(i < spl.length){
        paramName = (spl[i].split(":")[0]).replaceAll('"',"")
        paramValue= (spl[i].split(":")[1]).replaceAll('"',"'")
        myMap.set(paramName,paramValue)
        i++
    }
    return myMap
}

const select = async(req,res) => {
    try {
        console.log("ee")
        var table =getTableName(req.body)
        var condition = ""
        i=0
        var request = `SELECT * FROM ${table}`
        //Si il existe une condition
        if(mapParams(req.body).size > 0 ){
            var params = mapParams(req.body)
            params.forEach(function(value, key) {
                i!=params.size-1 ? condition+= `${key} = ${value} and ` : condition+= `${key} = ${value}`;
                request += ` where ${condition}`
                i++
            });
        }
        console.log(request)
        const exec = await pool.query(request);
        // res.json(exec.rows);
        
     
    } catch (error) {
        console.log(error.message)
    }
}

/****************************INSERT*************************/
//RECUPERER LES PARAMETRES ET LES CONCATENE EN STRING(
const getParams = (s) => {
    params=[]
    tab=((JSON.stringify(s)).slice(0,ss=((JSON.stringify(s))).length-1)).split(",")
    params.push((tab[0].split(':')[1]).slice(1,(tab[0].split(':')[1]).length-1)) //Recupere le nom de la table
    tab.shift()
    result="",i=0
    tab.forEach(element => {
        i!=tab.length-1 ? result+=element.split(":")[1]+"," : result+=element.split(":")[1] ;
        i++
    });
    result = result.replaceAll('"', "'");
    params.push(result)
    return params;
}

const insert = async(req,res) => {
    try {
        const table = getParams(req.body)[0]
        const values = getParams(req.body)[1];
        var request = `INSERT INTO ${table} VALUES(default,${values})`
        const exec = await pool.query(request);
    } catch (error) {
        console.log(error.message)
    }
}

/****************************UPDATE*************************/
const update = async(req,res) => {
    try {
        const {table,id,column,newValue} = req.body 
        var request = `UPDATE ${table} SET ${column} = '${newValue}' WHERE id= ${id}`
        const exec = await pool.query(request);
    } catch (error) {
        console.log(error.message)
    }
}

/****************************DELETE*************************/
const del = async(req,res) => {
    try {
        const {table,id} = req.body 
        var request = `DELETE FROM ${table} WHERE id= ${id}`
        const exec = await pool.query(request);
    } catch (error) {
        console.log(error.message)
    }
}

/****************LOGIN ET INSCRIPTION*************/
const login = (req,res) => {
    const utilisateur = select(req,res);
    if(utilisateur.length != 0){
        console.log("vers accueil")
    }else{
        console.log("compte inexistant") 
    }        
}
const inscription = (req,res) => {
    insert(res,req);
    console.log("vers login")
}

module.exports = {select,insert,update,del}
