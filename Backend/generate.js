const fs = require('fs');
const path = require('path');

const models = [
  { name: 'Slider', path: '/slider', collection: 'sliderinfo', methods: ['post', 'get', 'put', 'delete'] },
  { name: 'Program', path: '/programs', collection: 'programsCol', methods: ['post', 'get', 'put', 'delete'] },
  { name: 'Project', path: '/projects', collection: 'projectCol', methods: ['post', 'get', 'getById', 'put', 'delete'] },
  { name: 'Activity', path: '/activities', collection: 'activiesCol', methods: ['post', 'get', 'delete'] },
  { name: 'Team', path: '/teams', collection: 'TeamCol', methods: ['post', 'get', 'patch', 'delete'] },
  { name: 'News', path: '/news', collection: 'newsCol', methods: ['post', 'get', 'patch', 'delete'] },
  { name: 'Photo', path: '/photos', collection: 'photoCol', methods: ['post', 'get', 'delete'] },
  { name: 'Video', path: '/video', collection: 'videoCol', methods: ['post', 'get', 'delete'] },
  { name: 'Event', path: '/event', collection: 'eventCol', methods: ['post', 'get', 'getById', 'put', 'delete'] },
  { name: 'Partner', path: '/partner', collection: 'partnerCol', methods: ['post', 'get', 'delete'] },
];

models.forEach(model => {
  const controllerContent = `const { collections, ObjectId } = require('../config/db');

${model.methods.includes('post') ? `const create${model.name} = async (req, res) => {
  try {
    const data = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
    const result = await collections.${model.collection}.insertOne(data);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};` : ''}

${model.methods.includes('get') ? `const get${model.name}s = async (req, res) => {
  try {
    const result = await collections.${model.collection}.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};` : ''}

${model.methods.includes('getById') ? `const get${model.name}ById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const result = await collections.${model.collection}.findOne({ _id: new ObjectId(id) });
    if (!result) return res.status(404).json({ error: "Not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};` : ''}

${(model.methods.includes('put') || model.methods.includes('patch')) ? `const update${model.name} = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const updateDoc = { $set: updatedData };
    const options = { returnOriginal: false };
    
    // Some routes used updateOne, some findOneAndUpdate, but updateOne is safe generic
    const result = await collections.${model.collection}.updateOne(query, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};` : ''}

${model.methods.includes('delete') ? `const delete${model.name} = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
    const query = { _id: new ObjectId(id) };
    const result = await collections.${model.collection}.deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};` : ''}

module.exports = {
  ${model.methods.includes('post') ? `create${model.name},` : ''}
  ${model.methods.includes('get') ? `get${model.name}s,` : ''}
  ${model.methods.includes('getById') ? `get${model.name}ById,` : ''}
  ${(model.methods.includes('put') || model.methods.includes('patch')) ? `update${model.name},` : ''}
  ${model.methods.includes('delete') ? `delete${model.name},` : ''}
};
`;

  fs.writeFileSync(path.join(__dirname, 'Controler', `${model.name}Controller.js`), controllerContent);

  const routeContent = `const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { ${[
    model.methods.includes('post') && `create${model.name}`,
    model.methods.includes('get') && `get${model.name}s`,
    model.methods.includes('getById') && `get${model.name}ById`,
    (model.methods.includes('put') || model.methods.includes('patch')) && `update${model.name}`,
    model.methods.includes('delete') && `delete${model.name}`
  ].filter(Boolean).join(', ')} } = require('../Controler/${model.name}Controller');

${model.methods.includes('post') ? `router.post('/', verifyToken, create${model.name});` : ''}
${model.methods.includes('get') ? `router.get('/', get${model.name}s);` : ''}
${model.methods.includes('getById') ? `router.get('/:id', get${model.name}ById);` : ''}
${model.methods.includes('put') ? `router.put('/:id', verifyToken, update${model.name});` : ''}
${model.methods.includes('patch') ? `router.patch('/:id', verifyToken, update${model.name});` : ''}
${model.methods.includes('delete') ? `router.delete('/:id', verifyToken, delete${model.name});` : ''}

module.exports = router;
`;

  fs.writeFileSync(path.join(__dirname, 'Router', `${model.name}Route.js`), routeContent);
});

console.log("All boilerplates generated!");
