const userSchema = require('./schema');
const shortid = require('shortid');
const path = require('path');
const flash = require('connect-flash');

exports.create_user = (req,res)=>{
    
    const Name = req.body.name;
    const Email = req.body.email;
    const ID = shortid.generate();

    userSchema.findOne({email: Email}).then((doc)=>{
        if(doc){
            console.log(`User with email ${Email} exist`);
            //res.status(500).json({code: 0,message: `User already exist`});
            req.flash('info','User already exist');
            res.locals.message = req.flash();
            res.render('createUser');
        }else{
            const newUser = new userSchema({
                id: ID,
                name: Name,
                email: Email
            });
            newUser.save().then(()=>{
                console.log('New User created');
                //res.status(200).json({code: 1,message: `New User created`});
                req.flash('info','new user created');
                res.locals.message = req.flash();
                res.render('createUser');
            }).catch((e)=>{
                console.log(` Unable to create user -> ${e}`);
                //res.status(500).json({code: 0,message: `Unable to create user`});
                req.flash('info','Unable to create user');
                res.locals.message = req.flash();
                res.reder('createUser');
            });
        }
    }).catch((e)=>{
        console.log(`Error in querying the userSchema db to check for the existing user -> ${e}`);
    });
}

exports.get_user = (req,res)=>{
    userSchema.find({}).then((docsArray)=>{
        const array = [];
        const userObj = {};
        docsArray.forEach((doc)=>{
            const obj = {};
            obj.id = doc.id;
            obj.name = doc.name;
            obj.email = doc.email;
            array.push(obj);
        });
        userObj.info = 'success';
        userObj.array = array;
        res.render('showUser',{data:userObj});
        //res.status(200).json({code: 1,message: `User data`,payload: array});
    }).catch((e)=>{
        const userObj = {};
        console.log(`Error in getting the user data -> ${e}`);
        //res.status(500).json({code: 0,message: `Error in getting the user data`});
        userObj.info = 'error';
        userObj.message = 'Please try again after some time';
        res.render('showUser',{data:userObj});
    });
}

exports.update_user = (req,res)=>{
    // send in the format of - http://localhost:3000/update/1234?name=ayush 
    const id = req.params.id;
    const name = req.query.name;
    userSchema.findOneAndUpdate({id: id},{$set: {name: name}}).then((doc)=>{
        if(doc){
            console.log(`Data has been updated successfully`);
            res.status(200).json({code: 1,message: `Data has been updated successfully`});
        }else{
            console.log(`User doesn't exist`);
            res.status(404).json({code: 0,message: `User doesn't exist`});
        }
    }).catch((e)=>{
        console.log(`Error in updating the user data -> ${e}`);
        res.status(500).json({code: 0,message: `Error in updating the user data`});
    });
}

exports.delete_user = (req,res)=>{

    const id = req.body.id;
    userSchema.findOneAndRemove({id: id}).then((doc)=>{
        if(doc){
            console.log(`User deleted successfully`);
            res.status(200).json({code: 1,message: `User deleted successfully`});
        }else{
            console.log(`User doesn't exist`);
            res.status(404).json({code: 0,message: `User not found`});
        }
    }).catch((e)=>{
        console.log(`Error in deleting the user -> ${e}`);
        res.status(500).json({code: 0,message: `Error in deleting the user`});
    });
}

exports.send_HomePage = (req,res)=>{
    res.sendFile(__dirname+'/html/index.html');
}

exports.send_createUser_page = (req,res)=>{
    res.render('createUser');
}