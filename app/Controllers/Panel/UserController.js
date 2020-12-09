const User = require('../../Models/UserModel.js');

exports.findAll = (req, res) => {
    User.findAll((err, user) => {
        if(err)
            res.json({
                status: false,
                message: 'failed',
                data: err,
            });

        res.json({
            status: true,
            message: 'success',
            data: user,
        });
    });
};

exports.create = (req, err, res) => {
    const new_user = new User(req.body);
    if(req.body.constructor === Object && Object.keys(req.body).length === 0)
    {
        res.json({
            status: false,
            message: 'Please provide all required field',
            data: err,
        })
    }
    else
    {
        User.create(new_user, (res, user) => {
            if(err)
                res.json({
                    status: false,
                    message: 'failed',
                    data: err,
                });

            res.json({
                status: true,
                message: 'success',
                data: user,
            });
        });
    };
};

exports.finById = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err)
            res.json({
                status: false,
                message: 'failed',
                data: err
            });

        res.json({
            status: true,
            message: 'success',
            data: user,
        });
    });
};

exports.update = (req, res) => {
    User.update(req.params.id, (err, user) => {
        if(err)
            res.json({
                status: false,
                message: 'failed',
                data: err,
            });

        res.json({
            status: true,
            message: 'success',
            data: user,
        });
    });
};

exports.delete = (req, res) => {
    User.delete(req.params.id, (err) => {
        if(err)
            res.json({
                status: false,
                message: 'failed',
                data: err,
            });

        res.json({
            status: true,
            message: 'success',
            data: null,
        });
    });
};