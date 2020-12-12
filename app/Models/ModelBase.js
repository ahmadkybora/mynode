let Database = require('./../Database');
class ModelBase extends Database{
     Table;
    constructor() {
        super();
    }

   async create(data) {
        let result;
        let fields="("
        let valuesQ="("
        let values = [];
        Object.keys(data).forEach(key => {
            fields+=key+","
            valuesQ+="?,"
            values.push(data[key]);
        });
        fields=fields.substring(0, fields.length - 1);
        valuesQ=valuesQ.substring(0, valuesQ.length - 1);
        fields+=")"
        valuesQ+=")"
        let sql = "INSERT INTO " +
            this.Table
            +fields+
            " VALUES"+valuesQ;
        let connection = this.connect();
       let promise = new Promise((resolve) => {
           connection.query(sql, values, function (error, results) {
               resolve(results);
           })
       })
       result = await promise;
       return result;
    }

    async update(data,conditions) {
        let result;
        let fields=""
        let values = [];
        Object.keys(data).forEach(key => {
            fields+=key+"=?,"
            values.push(data[key]);
        });
        fields=fields.substring(0, fields.length - 1);
        fields+=""

        let fieldsConditions = ""
        let valuesConditions = [];
        let i=0;
        conditions.forEach(function(condition) {
            Object.keys(condition).forEach(key => {
                if(key==="condition" && i===0){
                    fieldsConditions+=""
                }
                if(key==="condition" && i!==0){
                    fieldsConditions+= " " +condition[key] + " "
                }
                if(key!=="operator" && key!=="condition"){
                    fieldsConditions+= key
                    valuesConditions.push(condition[key]);
                }
                if(key==="operator"){
                    fieldsConditions+=" " +condition[key]+" ?"
                }
                i++;
            });
        });
        values = values.concat(valuesConditions);
        let sql = "UPDATE " +
            this.Table +
            " SET "
            +fields+
            " WHERE "+fieldsConditions;
        let connection = this.connect();
        let promise = new Promise((resolve) => {
            connection.query(sql, values, function (error, results) {
                resolve(results);
            })
        })
        result = await promise;
        return result;
    }

   async delete(conditions) {
        let result
       let fieldsConditions = ""
       let valuesConditions = [];
       let i=0;
       conditions.forEach(function(condition) {
           Object.keys(condition).forEach(key => {
               if(key==="condition" && i===0){
                   fieldsConditions+=""
               }
               if(key==="condition" && i!==0){
                   fieldsConditions+= " " +condition[key] + " "
               }
               if(key!=="operator" && key!=="condition"){
                   fieldsConditions+= key
                   valuesConditions.push(condition[key]);
               }
               if(key==="operator"){
                   fieldsConditions+=" " +condition[key]+" ?"
               }
               i++;
           });
       });
       let sql = "DELETE FROM " +
           this.Table +
           " WHERE "+fieldsConditions;
       let connection = this.connect();
       let promise = new Promise((resolve) => {
           connection.query(sql, valuesConditions, function (error, results) {
               resolve(results);
           })
       })
       result = await promise;
       return result;
    }

   async read(data="ALL",conditions="ALL") {
        let result
        let fieldsConditions = ""
        let valuesConditions = [];
        let i=0;

        let fields =""
        if (data==="ALL"){
            fields=" * "
        }else{
            data.forEach(function(field) {
               fields+=field+","
            });
            fields=" " +fields.substring(0, fields.length - 1) + " ";
        }
        let sql=""
        if(conditions==="ALL"){
            sql="SELECT"+fields+"FROM "+this.Table
        }else{
            conditions.forEach(function(condition) {
                Object.keys(condition).forEach(key => {
                    if(key==="condition" && i===0){
                        fieldsConditions+=""
                    }
                    if(key==="condition" && i!==0){
                        fieldsConditions+= " " +condition[key] + " "
                    }
                    if(key!=="operator" && key!=="condition"){
                        fieldsConditions+= key
                        valuesConditions.push(condition[key]);
                    }
                    if(key==="operator"){
                        fieldsConditions+=" " +condition[key]+" ?"
                    }
                    i++;
                });
            });
            sql="SELECT"+fields+"FROM "+this.Table + " WHERE "+fieldsConditions
        }
       let connection = this.connect();
       let promise = new Promise((resolve) => {
           connection.query(sql, valuesConditions, function (error, results) {
               resolve(results);
           })
       })
       result = await promise;
       return result;
    }

    async find(id) {
        let result
        let sql="SELECT * FROM " + this.Table + " WHERE id=?"
        let connection = this.connect();
        let promise = new Promise((resolve) => {
            connection.query(sql, [id], function (error, results) {
                resolve(results[0]);
            })
        })
        result = await promise;
        return result;
    }
    async join(data="ALL",conditions="ALL",other_table , local_key,foreign_key){
        let result
        let fieldsConditions = ""
        let valuesConditions = [];
        let i=0;

        let fields =""
        if (data==="ALL"){
            fields=" * "
        }else{
            data.forEach(function(field) {
                fields+=field+","
            });
            fields=" " +fields.substring(0, fields.length - 1) + " ";
        }
        let sql=""
        if(conditions==="ALL"){
            sql="SELECT"+fields+"FROM "+this.Table+ " INNER JOIN "+other_table+" ON "+other_table+"."+foreign_key+"="+this.Table+"."+local_key
        }else{
            conditions.forEach(function(condition) {
                Object.keys(condition).forEach(key => {
                    if(key==="condition" && i===0){
                        fieldsConditions+=""
                    }
                    if(key==="condition" && i!==0){
                        fieldsConditions+= " " +condition[key] + " "
                    }
                    if(key!=="operator" && key!=="condition"){
                        fieldsConditions+= key
                        valuesConditions.push(condition[key]);
                    }
                    if(key==="operator"){
                        fieldsConditions+=" " +condition[key]+" ?"
                    }
                    i++;
                });
            });
            sql="SELECT"+fields+"FROM "+this.Table+ " INNER JOIN "+other_table+" ON "+other_table+"."+foreign_key+"="+this.Table+"."+local_key + " AND "+fieldsConditions
        }

        let connection = this.connect();
        let promise = new Promise((resolve) => {
            connection.query(sql, valuesConditions, function (error, results) {
                resolve(results);
            })
        })
        result = await promise;
        return result;
    }
    async upload_single_file(file,patch){

    }
}
module.exports=ModelBase;
