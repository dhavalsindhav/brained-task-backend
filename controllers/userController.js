const { User } = require("../models")
const path = require('path');
const fs = require('fs').promises;


async function create(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image uploaded' });
        }
        const user = await User.create({
            ...req.body,
            avatar: req.file.filename
        });
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function update(req, res) {
    try {
        const existingUser = await User.findByPk(req.params.id);
        if (req.file) {
            req.body.avatar = req.file.filename;
            if (existingUser.avatar) {
                const oldAvatarPath = path.join(__dirname, '..', 'uploads', existingUser.avatar);
                await fs.unlink(oldAvatarPath);
            }
        } else {
            if (existingUser.avatar) {
                req.body.avatar = existingUser.avatar;
            }
        }
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        const updatedUser = await User.findByPk(req.params.id);

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred', error });
    }
}

async function show(req, res) {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        user.avatar = user.avatar ? path.join('/uploads', user.avatar) : null;
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function remove(req, res) {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

async function list(req, res) {

    try {
        const users = await User.findAll();
        const usersWithPath = users.map(user => {
            user.avatar = user.avatar ? path.join('/uploads', user.avatar) : null;
            return { ...user.toJSON() };
        });
        return res.status(200).json(usersWithPath);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }

}



module.exports = {
    create,
    list,
    update,
    remove,
    show
}