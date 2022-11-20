const Family = require('./models/db')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

mongoose.connect(process.env.MONGODB_URL);

async function setFamilyMembersArray(parentId, familyMembersArray) {
    const parent = (await Family.findOne({ _id: parentId })).toJSON()
    familyMembersArray.push(parent)
    const childrenIds = await Family.find({ parent: parentId }).select({ _id: 1 })
    for (id of childrenIds) {
        await setFamilyMembersArray(id, familyMembersArray)
    }
}

function setFamilyTreeWithRoot(familyMembersArray) {
    let familyTreeRoot
    const idMapping = familyMembersArray.reduce((acc, member, index) => {
        acc[member._id] = index
        return acc
    }, {})
    familyMembersArray.forEach((member) => {
        if (member.parent === null) {
            familyTreeRoot = member
            return
        }
        const parentEl = familyMembersArray[idMapping[member.parent.toString()]]
        if (!parentEl) {
            familyTreeRoot = member
            return
        }
        parentEl.children = [...(parentEl.children || []), member];
    })
    return familyTreeRoot
}

async function setFamilyTreeArray(rootMembersArray, familyTreeArray) {
    for await (rootMember of rootMembersArray) {
        let famTreeArr = []
        await setFamilyMembersArray(rootMember._id, famTreeArr)
        let famTreeRoot = setFamilyTreeWithRoot(famTreeArr)
        familyTreeArray.push(famTreeRoot)
    }
}

app.post('/add', async (req, res) => {
    try {
        if (req.body?.name?.trim()) {
            const newFamilyMember = (await Family.create(req.body)).toJSON()
            res.status(201).send({ message: 'created a new entry', entry: newFamilyMember })
        } else {
            res.status(400).send({ message: 'need family member details and a name to create a new entry' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error' })
    }
})

app.post('/get_children', async (req, res) => {
    try {
        if (req.body.parentId?.trim()) {
            const children = await Family.find({ parent: req.body.parentId }).select({ name: 1 }).exec()
            res.status(200).send({ message: 'search complete', children: children })
        } else {
            res.status(400).send({ message: 'need parent ID to find children' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error' })
    }
})

app.post('/get_details', async (req, res) => {
    try {
        if (req.body.id?.trim()) {
            const memberDetails = (await Family.findOne({ _id: req.body.id })).toJSON()
            res.status(200).send(memberDetails)
        } else {
            res.status(400).send({ message: 'ID invalid' })
        }
    } catch (error) {
        res.status(500).send({ message: 'Error' })
    }
})

app.post('/get_trees', async (req, res) => {
    try {
        let perPage = 20
        const rootMembersArray = req.body.searchQuery.trim() ? await Family.find({ name: new RegExp(`\\b${req.body.searchQuery.trim()}`, "i") })/* .skip(perPage * parseInt(req.body.pageNumber)).limit(20) */ : await Family.find({ parent: null })/* .skip(perPage * parseInt(req.body.pageNumber)).limit(20) */
        let familyTreeArray = []
        await setFamilyTreeArray(rootMembersArray, familyTreeArray)
        res.send(familyTreeArray)
    } catch (error) {
        res.status(500).send({ message: "error" })
        console.error(error);
    }

})

app.delete('/delete', async (req, res) => {
    try {
        let deleted = await Family.deleteOne({ _id: req.body.memberId })
        res.send("Deleted")
    } catch (error) {
        res.status(500).send({ message: "error" })
        console.error(error);
    }

})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
})