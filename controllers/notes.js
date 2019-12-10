const Note = require('../models/note');
const User = require('../models/user')
const morgan = require('morgan')


// New Note Entry
const noteEntry = async(req, res, next) => {
    const { title, content } = req.body;
    try {
        const newEntry = await new Note({
            title,
            content
        });
        await newEntry.save();
        return res.status(201).json({
            message: "New note created"
        });
    } catch (err) {
        return next(err)
    }
}

//Note Edit
const noteUpdate = async(req, res, next) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id
        const data = await Note.findOne({ _id: id })
            // console.log(data);
        if (!data) {
            return res.status(401).json({
                message: "Note does not exist"
            })
        } else {
            if (title) {
                data.title = title;
            }
            if (content) {
                data.content = content;
            }
            const dataX = await data.save((err, data) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).send({
                        message: 'Updated Successfully',
                        data
                    });
                }
            })
        }
    } catch (err) {
        return next(err)
    }
}

// Deleting a Note
const deleteNote = (req, res, next) => {
    const id = req.params.id
    Note.findByIdAndDelete({ _id: id }, (err, data) => {
        return res.status(200).json({
            message: 'Note deleted successfuuly'
        })

    })
}

// Display All Notes
const allNotes = async(req, res, next) => {
    try {
        const data = await Note.find({})
        res.status(200).json({
            data
        })
    } catch (err) {
        return next(err)
    }
}

// Display one Note
const singleNote = async(req, res, next) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id
        const data = await Note.findById({ _id: id })
        return res.status(200).json({
            data
        })
    } catch (err) {
        return next(err)
    }
}
module.exports = { noteEntry, noteUpdate, deleteNote, allNotes, singleNote };