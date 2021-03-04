const Course = require("../models/Course");

module.exports = {
  async index(req, res) {
    try {
      const { page = 1, limit = 5 } = req.query;

      const courses = await Course.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Course.countDocuments();

      return res.json({
        courses,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
    } catch (error) {
      return res.status(400).send({ msg: `Erro ao carregar os cursos`, error });
    }
  },

  async show(req, res) {
    try {
      const course = await Course.findById(req.params.id);

      return res.json(course);
    } catch (error) {
      return res.status(400).send({ msg: `Erro ao carregar a curso`, error });
    }
  },

  async store(req, res) {
    const { nome } = req.body;

    try {
      if (await Course.findOne({ nome }))
        res.status(400).send({ error: "Curso já existe" });

      const course = await Course.create(req.body);

      return res.json(course);
    } catch (error) {
      return res.status(400).send({ msg: `Erro ao criar a curso`, error });
    }
  },

  async update(req, res) {
    try {
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      });

      return res.json(course);
    } catch (error) {
      return res.status(400).send({ msg: `Erro ao atualizar a curso`, error });
    }
  },

  async destroy(req, res) {
    try {
      await Course.findByIdAndDelete(req.params.id);

      return res.send({ msg: "Apagado com sucesso" });
    } catch (error) {
      return res.status(400).send({ msg: `Erro ao destruir a curso`, error });
    }
  },

  async search(req, res) {
    try {
      const { search, page = 1, limit = 5 } = req.query;
      const courses = await Course.find({
        $or: [{ nome: { $regex: search } }, { categoria: { $regex: search } }]
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await Course.find({
        $or: [{ nome: { $regex: search } }, { categoria: { $regex: search } }]
      });

      return res.json({
        courses,
        totalPages: Math.ceil(count.length / limit),
        currentPage: page
      });
    } catch (error) {
      return res.status(400).send({ msg: `Erro ao carregar os cursos`, error });
    }
  }
};
